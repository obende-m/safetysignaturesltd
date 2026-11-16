import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "@/components/admin/LoginForm";
import { isSupabaseConfigured } from "@/lib/env";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  const configured = isSupabaseConfigured();
  return (
    <main id="main" className="flex min-h-svh items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Logo />
        <div className="mt-10 rounded-[28px] border border-line bg-white p-8 md:p-10">
          <h1 className="display text-[2rem] leading-tight">Staff sign in</h1>
          <p className="mt-2 text-mute">For Safety Signatures staff who manage enquiries, applications and website content.</p>
          {configured ? (
            <div className="mt-8">
              <LoginForm />
            </div>
          ) : (
            <p className="mt-8 rounded-2xl bg-sand p-5 text-[0.95rem] leading-relaxed">
              The database is not connected for this deployment. Add the Supabase environment variables described in
              DEPLOYMENT.md, then reload this page.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
