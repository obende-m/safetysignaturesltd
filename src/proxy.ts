import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { publishedServices } from "@/content/services";

const serviceSlugs = new Set(publishedServices.map((s) => s.slug));

/**
 * Runs for /admin and /services/<slug>.
 *
 * /admin: Refreshes the Supabase session cookie and sends signed-out visitors
 * to the sign-in page. This is an optimistic check: every admin page and action verifies the
 * user and their staff role again on the server, and Row Level Security enforces it in the database.
 */
export async function proxy(request: NextRequest) {
  // Unknown or unpublished service pages get a real 404 status. With Cache Components the
  // page shell is prerendered, so the page's own notFound() could only send a soft 404.
  const service = request.nextUrl.pathname.match(/^\/services\/([^/]+)\/?$/);
  if (service) {
    if (serviceSlugs.has(service[1])) return NextResponse.next();
    return NextResponse.rewrite(new URL("/_missing", request.url), { status: 404 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isLogin = request.nextUrl.pathname === "/admin/login";

  if (!url || !key) return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLogin) {
    const login = request.nextUrl.clone();
    login.pathname = "/admin/login";
    login.search = "";
    return NextResponse.redirect(login);
  }

  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/services/:slug"],
};
