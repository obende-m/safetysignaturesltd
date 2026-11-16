import { NextResponse, type NextRequest } from "next/server";
import { getStaff } from "@/lib/admin/auth";
import { createSessionClient } from "@/lib/supabase/server";

/**
 * Opens an applicant's CV for signed-in staff. The file lives in a private bucket; this
 * creates a signed URL that expires after 60 seconds and redirects to it.
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const staff = await getStaff();
  if (!staff) return new NextResponse("Not found", { status: 404 });

  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new NextResponse("Not found", { status: 404 });

  const supabase = await createSessionClient();
  const { data: row } = await supabase.from("applications").select("cv_path").eq("id", id).maybeSingle();
  if (!row?.cv_path) return new NextResponse("Not found", { status: 404 });

  const { data, error } = await supabase.storage.from("applications").createSignedUrl(row.cv_path, 60, { download: true });
  if (error || !data) return new NextResponse("Could not open the file", { status: 500 });

  return NextResponse.redirect(data.signedUrl, { headers: { "Cache-Control": "private, no-store" } });
}
