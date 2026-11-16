"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { submitEnquiry } from "@/lib/forms/actions";
import { initialFormState } from "@/lib/forms/schemas";
import { describe, Field, FormMessage, SpamGuard, SubmitButton, SuccessPanel, useServerValue, submitWithoutReset } from "./FormParts";

export function EnquiryForm({ services }: { services: readonly string[] }) {
  const [state, action, pending] = useActionState(submitEnquiry, initialFormState);
  const e = state.errors ?? {};
  const v = state.values ?? {};

  // Pre-select a service when the visitor arrives from a service page (?service=Event Security).
  const wanted = useSearchParams().get("service")?.toLowerCase();
  const fromUrl = services.find((s) => s.toLowerCase() === wanted) ?? "";
  const [service, setService] = useServerValue(v.service ?? fromUrl);

  if (state.status === "success") {
    return (
      <SuccessPanel title="Thank you. Your request is in." message={state.message}>
        <Link href="/services" className="btn btn-outline mt-8 text-paper">
          See our services
        </Link>
      </SuccessPanel>
    );
  }

  return (
    <form action={action} onSubmit={submitWithoutReset(action)} noValidate className="relative grid gap-6 sm:grid-cols-2">
      <SpamGuard />
      <input type="hidden" name="sourcePage" value="/contact" />

      <Field id="fullName" label="Full name" error={e.fullName}>
        <input id="fullName" name="fullName" className="field" autoComplete="name" required defaultValue={v.fullName} {...describe("fullName", e.fullName)} />
      </Field>
      <Field id="organisation" label="Organisation" optional error={e.organisation}>
        <input id="organisation" name="organisation" className="field" autoComplete="organization" defaultValue={v.organisation} {...describe("organisation", e.organisation)} />
      </Field>
      <Field id="email" label="Email" error={e.email}>
        <input id="email" name="email" type="email" className="field" autoComplete="email" required defaultValue={v.email} {...describe("email", e.email)} />
      </Field>
      <Field id="phone" label="Phone" error={e.phone}>
        <input id="phone" name="phone" type="tel" className="field" autoComplete="tel" required defaultValue={v.phone} {...describe("phone", e.phone)} />
      </Field>
      <Field id="service" label="Service needed" error={e.service}>
        <select id="service" name="service" className="field" required value={service} onChange={(ev) => setService(ev.target.value)} {...describe("service", e.service)}>
          <option value="" disabled>
            Choose a service
          </option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>
      <Field id="location" label="Location of the site or event" error={e.location}>
        <input id="location" name="location" className="field" autoComplete="address-level2" required defaultValue={v.location} {...describe("location", e.location)} />
      </Field>
      <Field
        id="message"
        label="What do you need?"
        hint="The type of site or event, the hours you need cover and anything that concerns you."
        error={e.message}
        className="sm:col-span-2"
      >
        <textarea id="message" name="message" className="field" required defaultValue={v.message} {...describe("message", e.message, true)} />
      </Field>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed text-ink/85">
          <input type="checkbox" name="consent" defaultChecked={v.consent === "on"} className="mt-1 h-5 w-5 shrink-0 accent-navy" {...describe("consent", e.consent)} />
          <span>
            Safety Signatures may use these details to reply to my request, as described in the{" "}
            <Link href="/privacy" className="text-navy underline underline-offset-2">
              privacy notice
            </Link>
            .
          </span>
        </label>
        {e.consent && (
          <p id="consent-error" className="field-error" role="alert">
            {e.consent}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2">
        <FormMessage message={state.message} />
        <div>
          <SubmitButton pending={pending} pendingLabel="Sending your request">Send the request</SubmitButton>
        </div>
      </div>
    </form>
  );
}
