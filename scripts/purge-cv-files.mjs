#!/usr/bin/env node
/**
 * Removes CV files in the private "applications" bucket that no longer belong to an
 * application row (for example after public.purge_expired_records() has run).
 *
 *   node --env-file=.env.local scripts/purge-cv-files.mjs          # dry run
 *   node --env-file=.env.local scripts/purge-cv-files.mjs --delete # delete orphaned files
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY first.");
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });
const doDelete = process.argv.includes("--delete");

const { data: rows, error } = await db.from("applications").select("cv_path");
if (error) throw error;
const keep = new Set(rows.map((r) => r.cv_path));

const orphans = [];
const { data: folders, error: listError } = await db.storage.from("applications").list("", { limit: 1000 });
if (listError) throw listError;
for (const folder of folders) {
  let offset = 0;
  for (;;) {
    const { data: files, error: e } = await db.storage.from("applications").list(folder.name, { limit: 1000, offset });
    if (e) throw e;
    for (const f of files) {
      const path = `${folder.name}/${f.name}`;
      if (!keep.has(path)) orphans.push(path);
    }
    if (files.length < 1000) break;
    offset += 1000;
  }
}

console.log(`${orphans.length} orphaned CV file(s).`);
if (doDelete && orphans.length) {
  for (let i = 0; i < orphans.length; i += 100) {
    const { error: e } = await db.storage.from("applications").remove(orphans.slice(i, i + 100));
    if (e) throw e;
  }
  console.log("Deleted.");
} else if (orphans.length) {
  console.log("Dry run. Pass --delete to remove them.");
}
