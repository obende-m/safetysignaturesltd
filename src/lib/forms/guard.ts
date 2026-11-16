import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Spam checks shared by the public forms: a honeypot field and a minimum fill time. */
export function looksAutomated(formData: FormData) {
  const honeypot = String(formData.get("website") ?? "");
  if (honeypot.length > 0) return true;
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (!startedAt || Number.isNaN(startedAt)) return true;
  const elapsed = Date.now() - startedAt;
  return elapsed < 3000 || elapsed > 1000 * 60 * 60 * 24;
}

/** A salted hash of the client IP, so we can rate-limit without storing the address itself. */
export async function clientFingerprint() {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "unknown").split(",")[0].trim();
  const salt = process.env.RATE_LIMIT_SALT ?? "safety-signatures";
  return {
    ipHash: createHash("sha256").update(`${salt}:${ip}`).digest("hex"),
    userAgent: (h.get("user-agent") ?? "").slice(0, 300),
  };
}

/** True when this fingerprint has sent `limit` or more rows to `table` in the last `minutes`. */
export async function isRateLimited(
  db: SupabaseClient,
  table: "enquiries" | "applications",
  ipHash: string,
  limit = 3,
  minutes = 15,
) {
  const since = new Date(Date.now() - minutes * 60_000).toISOString();
  const { count, error } = await db
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if (error) {
    console.error("[forms] Rate limit check failed:", error.message);
    return false;
  }
  return (count ?? 0) >= limit;
}
