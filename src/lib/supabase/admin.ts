import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { publicEnv } from "@/lib/env";

/**
 * Service-role client. Bypasses Row Level Security, so it is used only inside server actions
 * after the input has been validated (public forms) or the caller has been verified as staff.
 */
let client: SupabaseClient | null = null;

export function getServiceKey() {
  return process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
}

export function isServiceConfigured() {
  return Boolean(publicEnv.supabaseUrl && getServiceKey());
}

export function createAdminClient() {
  if (!isServiceConfigured()) {
    throw new Error("Supabase service credentials are not configured.");
  }
  client ??= createClient(publicEnv.supabaseUrl, getServiceKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
