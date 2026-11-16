"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { submitApplication } from "@/lib/forms/actions";
import { initialFormState, qualificationOptions } from "@/lib/forms/schemas";
import { describe, Field, FormMessage, SpamGuard, SubmitButton, SuccessPanel, useServerValue, submitWithoutReset } from "./FormParts";

type VacancyOption = { id: string; title: string };

export function ApplicationForm({ vacancies }: { vacancies: VacancyOption[] }) {
  const [state, action, pending] = useActionState(submitApplication, initialFormState);
  const [fileName, setFileName] = useState<string>("");
  const e = state.errors ?? {};
  const v = state.values ?? {};
  const [vacancyId, setVacancyId] = useServerValue(v.vacancyId ?? "");
  const [qualification, setQualification] = useServerValue(v.qualification ?? "");


  if (state.status === "success") {
    return <SuccessPanel title="Thank you. Your application is in." message={state.message} />;
  }

  return (
    <form action={action} onSubmit={submitWithoutReset(action)} noValidate className="relative grid gap-6 sm:grid-cols-2">
      <SpamGuard />

      {vacancies.length > 0 ? (
        <Field id="vacancyId" label="Vacancy" className="sm:col-span-2" error={e.vacancyId}>
          <select id="vacancyId" name="vacancyId" className="field" value={vacancyId} onChange={(ev) => setVacancyId(ev.target.value)}>
            <option value="">General application</option>
            {vacancies.map((vac) => (
              <option key={vac.id} value={vac.id}>
                {vac.title}
              </option>
            ))}
          </select>
        </Field>
      ) : (
        <input type="hidden" name="vacancyId" value="" />
      )}

      <Field id="position" label="Position you are applying for" hint="For example: security officer, supervisor or driver." error={e.position} className="sm:col-span-2">
        <input id="position" name="position" className="field" required defaultValue={v.position} {...describe("position", e.position, true)} />
      </Field>
      <Field id="fullName" label="Full name" error={e.fullName}>
        <input id="fullName" name="fullName" className="field" autoComplete="name" required defaultValue={v.fullName} {...describe("fullName", e.fullName)} />
      </Field>
      <Field id="email" label="Email" error={e.email}>
        <input id="email" name="email" type="email" className="field" autoComplete="email" required defaultValue={v.email} {...describe("email", e.email)} />
      </Field>
      <Field id="phone" label="Phone" error={e.phone}>
        <input id="phone" name="phone" type="tel" className="field" autoComplete="tel" required defaultValue={v.phone} {...describe("phone", e.phone)} />
      </Field>
      <Field id="stateOfResidence" label="State of residence" error={e.stateOfResidence}>
        <input id="stateOfResidence" name="stateOfResidence" className="field" autoComplete="address-level1" required defaultValue={v.stateOfResidence} {...describe("stateOfResidence", e.stateOfResidence)} />
      </Field>
      <Field id="qualification" label="Highest qualification" error={e.qualification}>
        <select id="qualification" name="qualification" className="field" required value={qualification} onChange={(ev) => setQualification(ev.target.value)} {...describe("qualification", e.qualification)}>
          <option value="" disabled>
            Choose a qualification
          </option>
          {qualificationOptions.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </Field>
      <Field id="experienceYears" label="Years of security experience" error={e.experienceYears}>
        <input id="experienceYears" name="experienceYears" type="number" min={0} max={50} inputMode="numeric" className="field" required defaultValue={v.experienceYears} {...describe("experienceYears", e.experienceYears)} />
      </Field>

      <fieldset className="sm:col-span-2" aria-describedby={e.previousService ? "previousService-error" : undefined}>
        <legend className="field-label">Have you served in the military, police or another uniformed service?</legend>
        <div className="mt-1 flex gap-3">
          {(["yes", "no"] as const).map((opt) => (
            <label key={opt} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-line bg-white px-5 has-[:checked]:border-navy has-[:checked]:bg-navy/5">
              <input type="radio" name="previousService" value={opt} defaultChecked={v.previousService === opt} className="h-4 w-4 accent-navy" />
              {opt === "yes" ? "Yes" : "No"}
            </label>
          ))}
        </div>
        {e.previousService && (
          <p id="previousService-error" className="field-error" role="alert">
            {e.previousService}
          </p>
        )}
      </fieldset>

      <Field id="coverNote" label="Anything else we should know" optional error={e.coverNote} className="sm:col-span-2">
        <textarea id="coverNote" name="coverNote" className="field" defaultValue={v.coverNote} {...describe("coverNote", e.coverNote)} />
      </Field>

      <Field id="cv" label="CV" hint="PDF or Word document, 5 MB at most." error={e.cv} className="sm:col-span-2">
        <label
          htmlFor="cv"
          className={`flex min-h-[72px] cursor-pointer items-center justify-between gap-4 rounded-xl border border-dashed bg-white px-5 py-4 transition-colors hover:border-navy ${
            e.cv ? "border-red" : "border-line"
          }`}
        >
          <span className="truncate text-[0.95rem] text-ink/85">{fileName || "Choose a file to upload"}</span>
          <span className="shrink-0 rounded-full border border-ink/20 px-4 py-2 text-sm font-[550]">Browse</span>
        </label>
        <input
          id="cv"
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          required
          onChange={(ev) => setFileName(ev.target.files?.[0]?.name ?? "")}
          {...describe("cv", e.cv, true)}
        />
      </Field>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed text-ink/85">
          <input type="checkbox" name="consent" defaultChecked={v.consent === "on"} className="mt-1 h-5 w-5 shrink-0 accent-navy" {...describe("consent", e.consent)} />
          <span>
            Safety Signatures may store and use these details and my CV to assess my application, as described in the{" "}
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
          <SubmitButton pending={pending} pendingLabel="Sending your application">Send the application</SubmitButton>
        </div>
      </div>
    </form>
  );
}
