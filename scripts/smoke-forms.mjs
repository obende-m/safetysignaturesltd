#!/usr/bin/env node
/**
 * Browser smoke test for the public forms, driven through Chrome's DevTools protocol.
 *
 *   node scripts/smoke-forms.mjs http://localhost:3000
 *
 * Checks, on /contact and /careers:
 *  1. an empty submission shows a field error under each required field (server-side validation);
 *  2. a submission sent faster than a person could type is refused (time-trap spam guard);
 *  3. a complete submission either succeeds (database connected) or shows a clear failure
 *     message (database not connected). It must never show a success message without saving.
 *
 * Set CHROME_PATH if Chrome is not in a standard location. Needs Node 22+ (global WebSocket).
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);
const chromePath = candidates.find((p) => existsSync(p));
if (!chromePath) throw new Error("Chrome not found. Set CHROME_PATH.");

const profile = mkdtempSync(join(tmpdir(), "ss-smoke-"));
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn(chromePath, [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "--no-first-run",
  "--window-size=1280,900",
  "about:blank",
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws;
let id = 0;
const pending = new Map();
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + " " + (r.exceptionDetails.exception?.description ?? ""));
  return r.result.value;
};
const goto = async (path) => {
  await send("Page.navigate", { url: "about:blank" });
  await sleep(300);
  await send("Page.navigate", { url: base + path });
  for (let i = 0; i < 60; i++) {
    await sleep(250);
    const ready = await evaluate("document.readyState === 'complete' && !!document.querySelector('form')").catch(() => false);
    if (ready) break;
  }
  await sleep(1200); // hydration
};
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};

try {
  let target;
  for (let i = 0; i < 40 && !target; i++) {
    await sleep(250);
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      target = list.find((t) => t.type === "page");
    } catch {}
  }
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) p.reject(new Error(msg.error.message));
      else p.resolve(msg.result);
    }
  };
  await send("Page.enable");
  await send("Runtime.enable");
  await send("DOM.enable");

  const submitAndWait = async () => {
    await evaluate("document.querySelector('form button[type=submit]').click()");
    for (let i = 0; i < 40; i++) {
      await sleep(250);
      const busy = await evaluate("!!document.querySelector('form button[type=submit][disabled]')").catch(() => false);
      if (!busy && i > 2) break;
    }
    await sleep(400);
  };
  const errorsShown = () => evaluate("[...document.querySelectorAll('.field-error')].map(e => e.textContent)");
  const alertText = () =>
    evaluate("[...document.querySelectorAll('[role=alert]:not(.field-error), [role=status]')].map(e => e.textContent.trim()).join(' | ')");
  const setValue = (sel, value) =>
    evaluate(`(() => {
      const el = document.querySelector(${JSON.stringify(sel)});
      const proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, ${JSON.stringify(value)});
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    })()`);

  /* ---------------- Contact ---------------- */
  await goto("/contact");
  await sleep(3200); // pass the time trap for the validation test
  await submitAndWait();
  const contactErrors = await errorsShown();
  check("contact: empty form shows field errors", contactErrors.length >= 6, `${contactErrors.length} errors`);

  await goto("/contact");
  await setValue("#fullName", "Smoke Test");
  await setValue("#email", "smoke-test@example.com");
  await setValue("#phone", "08000000000");
  await setValue("#service", "Manned Guarding");
  await setValue("#location", "Ikeja, Lagos");
  await setValue("#message", "Automated smoke test of the consultation form. Please ignore.");
  await evaluate("document.querySelector('input[name=consent]').click()");
  await submitAndWait(); // sent immediately: should trip the time trap
  const fast = await alertText();
  check("contact: instant submission is refused by the time trap", /wait a moment/i.test(fast), fast.slice(0, 80));

  await sleep(3200);
  if (process.env.DEBUG) console.log("startedAt before retry:", await evaluate("document.querySelector('input[name=startedAt]').value"), "now", Date.now());
  await submitAndWait();
  if (process.env.DEBUG) console.log("errors after retry:", await evaluate("[...document.querySelectorAll('.field-error')].map(e => e.id + ': ' + e.textContent)"), await evaluate("[...document.querySelectorAll('input,select,textarea')].map(e => e.name + '=' + (e.type==='checkbox'?e.checked:e.value)).join(' ')"), "startedAt:", await evaluate("document.querySelector('input[name=startedAt]').value"));
  const contactOutcome = await alertText();
  const contactSaved = /request is in/i.test(contactOutcome);
  const contactHonest = /not connected|could not|went wrong/i.test(contactOutcome);
  check(
    "contact: complete form either saves or reports a clear failure",
    contactSaved || contactHonest,
    contactSaved ? "saved to database" : contactOutcome.slice(0, 100),
  );

  /* ---------------- Careers ---------------- */
  await goto("/careers");
  await sleep(3200);
  await submitAndWait();
  const appErrors = await errorsShown();
  check("careers: empty form shows field errors incl. CV", appErrors.length >= 7 && appErrors.some((e) => /CV/.test(e)), `${appErrors.length} errors`);

  // A text file renamed .pdf must be rejected by the server's file-signature check.
  await goto("/careers");
  await sleep(3200);
  const fake = join(profile, "cv.pdf");
  writeFileSync(fake, "this is not really a pdf");
  const { root } = await send("DOM.getDocument");
  const { nodeId } = await send("DOM.querySelector", { nodeId: root.nodeId, selector: "#cv" });
  await send("DOM.setFileInputFiles", { nodeId, files: [fake] });
  await setValue("#position", "Security officer");
  await setValue("#fullName", "Smoke Test");
  await setValue("#email", "smoke-test@example.com");
  await setValue("#phone", "08000000000");
  await setValue("#stateOfResidence", "Lagos");
  await setValue("#qualification", "OND or equivalent");
  await setValue("#experienceYears", "2");
  await evaluate("document.querySelector('input[name=previousService][value=no]').click()");
  await evaluate("document.querySelector('input[name=consent]').click()");
  if (process.env.DEBUG) console.log("careers startedAt:", await evaluate("document.querySelector('input[name=startedAt]').value"), "now", Date.now(), "website=", await evaluate("document.querySelector('input[name=website]').value"));
  await submitAndWait();
  const cvErrors = await errorsShown();
  check("careers: a fake PDF is rejected by the file check", cvErrors.some((e) => /PDF, DOC or DOCX/.test(e)), (cvErrors.join("; ") || (await alertText())).slice(0, 120));

  // A genuine (minimal) PDF must either be saved with the application or fail with a clear message.
  const real = join(profile, "smoke-test-cv.pdf");
  writeFileSync(
    real,
    "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n" +
      "3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 200 200]>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n",
  );
  const doc2 = await send("DOM.getDocument");
  const cvNode = await send("DOM.querySelector", { nodeId: doc2.root.nodeId, selector: "#cv" });
  await send("DOM.setFileInputFiles", { nodeId: cvNode.nodeId, files: [real] });
  await submitAndWait();
  const appOutcome = await alertText();
  const appSaved = /application is in|received|thank/i.test(appOutcome) && !/could not|went wrong|not connected/i.test(appOutcome);
  const appHonest = /not connected|could not|went wrong/i.test(appOutcome);
  check(
    "careers: a real PDF application either saves or reports a clear failure",
    appSaved || appHonest,
    appSaved ? "saved to database" : (appOutcome || (await errorsShown()).join("; ")).slice(0, 120),
  );
} catch (err) {
  console.error(err);
  results.push({ name: "script", ok: false });
} finally {
  ws?.close();
  chrome.kill();
  await sleep(500);
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {}
}

const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
