import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Buttons";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="pt-[var(--nav-h)]">
          <div className="wrap flex min-h-[70svh] flex-col justify-center py-20">
            <p className="font-mono text-sm text-red">404</p>
            <h1 className="display t-1 mt-6 max-w-[16ch]">This page could not be found</h1>
            <p className="lead mt-6 max-w-[48ch] text-mute">The link may be out of date, or the page may have moved.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/">Go to the homepage</ButtonLink>
              <ButtonLink href="/services" variant="outline">
                See our services
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
