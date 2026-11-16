import "server-only";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/env";
import { createSessionClient } from "@/lib/supabase/server";

export type StaffRole = "admin" | "editor";
export type Staff = { id: string; email: string; name: string | null; role: StaffRole };

/** Returns the signed-in staff member, or null when signed out or not on the staff list. */
export async function getStaff(): Promise<Staff | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase.from("profiles").select("full_name, role").eq("id", user.id).maybeSingle();
  if (!profile) return null;
  return { id: user.id, email: user.email ?? "", name: profile.full_name, role: profile.role as StaffRole };
}

/** For admin pages and actions: redirects anyone who is not staff. */
export async function requireStaff(role: StaffRole = "editor"): Promise<Staff> {
  const staff = await getStaff();
  if (!staff) redirect("/admin/login");
  if (role === "admin" && staff.role !== "admin") redirect("/admin?error=forbidden");
  return staff;
}
