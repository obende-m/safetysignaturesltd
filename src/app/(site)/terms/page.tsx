import { LegalPage } from "@/components/sections/LegalPage";
import { company } from "@/content/company";
import { creditedImages } from "@/content/images";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/terms",
  title: "Website terms",
  description: "Terms of use for the Safety Signatures Limited website, and credits for the openly licensed photographs it uses.",
});

// Draft for legal review before launch. See CONTENT-STATUS.md.
export default function TermsPage() {
  return (
    <LegalPage title="Website terms" updated="16 November 2026">
      <p>
        These terms apply to your use of this website, which is operated by {company.name}. By using the website you
        accept them.
      </p>

      <h2>Information on this website</h2>
      <p>
        The information on this website describes our services in general terms. It is not an offer or a contract.
        The scope, staffing and price of any service are agreed in writing after we have assessed your requirements.
      </p>
      <p>
        Security advice in our Security Insights articles is general guidance. Take advice on your own circumstances
        before relying on it.
      </p>

      <h2>Links to other websites</h2>
      <p>
        News coverage on this website links to articles published by other organisations. We are not responsible for
        their content, and a link does not mean we endorse everything in the article.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The {company.shortName} name, logo and the content of this website belong to {company.name} or are used with
        permission. You may share links to our pages, but you may not copy our content or logo for commercial use
        without our written permission.
      </p>

      <h2>Using the forms</h2>
      <p>
        Please send only accurate information through our forms, and do not use them to send unsolicited marketing or
        harmful files. We may remove or ignore submissions that misuse the forms.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms. The date at the top shows when they were last changed.</p>

      <h2 id="photo-credits">Photograph credits</h2>
      <p>
        Most photographs on this website show Safety Signatures officers and events. Some service pages use openly
        licensed photographs that do not show our staff or clients:
      </p>
      <ul>
        {creditedImages.map((img) => (
          <li key={img.credit!.url}>
            {img.alt}. Photograph by {img.credit!.by}, {img.credit!.licence},{" "}
            <a href={img.credit!.url} target="_blank" rel="noopener noreferrer">
              via Wikimedia Commons
            </a>
            .
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
