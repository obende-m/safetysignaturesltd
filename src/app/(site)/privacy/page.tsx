import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/privacy",
  title: "Privacy notice",
  description: "How Safety Signatures Limited collects, uses, stores and protects personal data sent through this website.",
});

// Draft for legal review before launch. See CONTENT-STATUS.md.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice" updated="16 November 2026">
      <p>
        This notice explains how {company.name} (&ldquo;we&rdquo;) handles personal data that you send us through this
        website. We process personal data in line with the Nigeria Data Protection Act 2023.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Consultation requests:</strong> your name, organisation, email address, phone number, the service you
          need, the location and the description you write.
        </li>
        <li>
          <strong>Job applications:</strong> your name, contact details, state of residence, qualification, years of
          experience, whether you have served in a uniformed service, any note you add and the CV you upload.
        </li>
        <li>
          <strong>Technical data:</strong> a one-way coded version of your IP address and your browser type, used only to
          stop spam and repeated automated submissions. We do not store your IP address itself.
        </li>
      </ul>
      <p>This website does not use advertising or tracking cookies. Staff who sign in to manage the site use a session cookie.</p>

      <h2>Why we use it</h2>
      <ul>
        <li>To reply to your request, assess your site and prepare a proposal, at your request.</li>
        <li>To assess job applications and contact shortlisted applicants, at your request.</li>
        <li>To protect the website and our staff from spam and misuse, which is in our legitimate interest.</li>
      </ul>
      <p>We do not sell personal data, and we do not use it for marketing without your separate consent.</p>

      <h2>Who can see it</h2>
      <p>
        Only authorised Safety Signatures staff can see enquiries and applications. They sign in to a protected
        administration area. CVs are stored in private storage and are opened through links that expire after a short
        time. Our website host and database provider process the data on our behalf under contract, and may store it
        outside Nigeria with appropriate safeguards.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Consultation requests: up to 24 months after we receive them, unless they lead to a contract.</li>
        <li>Job applications and CVs: up to 12 months after we receive them, unless you join us.</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        You may ask to see the personal data we hold about you, ask us to correct or delete it, object to how we use it,
        or withdraw your consent. You may also complain to the Nigeria Data Protection Commission.
      </p>
      <p>
        To make a request, use the <Link href="/contact">contact form</Link> and choose &ldquo;Not sure yet&rdquo; as the
        service, saying that your message is a privacy request.
      </p>
    </LegalPage>
  );
}
