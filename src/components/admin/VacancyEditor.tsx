"use client";

import { useActionState } from "react";
import { saveVacancy } from "@/lib/admin/actions";
import { initialFormState } from "@/lib/forms/schemas";
import { describe, Field, FormMessage, SubmitButton, submitWithoutReset } from "@/components/forms/FormParts";

export type VacancyInput = {
  id?: string;
  title: string;
  slug: string;
  location: string;
  employmentType: string;
  summary: string;
  requirements: string;
  closingDate: string;
  published: "true" | "false";
};

export function VacancyEditor({ initial }: { initial: VacancyInput }) {
  const [state, action, pending] = useActionState(saveVacancy, initialFormState);
  const v = { ...initial, ...(state.values ?? {}) } as VacancyInput;
  const e = state.errors ?? {};
  return (
    <form action={action} onSubmit={submitWithoutReset(action)} noValidate className="mt-8 grid max-w-3xl gap-6">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="title" label="Job title" error={e.title}>
          <input id="title" name="title" className="field" defaultValue={v.title} {...describe("title", e.title)} />
        </Field>
        <Field id="slug" label="URL name" hint="e.g. security-officer-ikeja" error={e.slug}>
          <input id="slug" name="slug" className="field font-mono text-sm" defaultValue={v.slug} {...describe("slug", e.slug, true)} />
        </Field>
        <Field id="location" label="Location" error={e.location}>
          <input id="location" name="location" className="field" defaultValue={v.location} {...describe("location", e.location)} />
        </Field>
        <Field id="employmentType" label="Type" error={e.employmentType}>
          <input id="employmentType" name="employmentType" className="field" defaultValue={v.employmentType} {...describe("employmentType", e.employmentType)} />
        </Field>
      </div>
      <Field id="summary" label="About the role" error={e.summary}>
        <textarea id="summary" name="summary" className="field" defaultValue={v.summary} {...describe("summary", e.summary)} />
      </Field>
      <Field id="requirements" label="Requirements" optional hint="One per line." error={e.requirements}>
        <textarea id="requirements" name="requirements" className="field" defaultValue={v.requirements} {...describe("requirements", e.requirements, true)} />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="closingDate" label="Closing date" optional error={e.closingDate}>
          <input id="closingDate" name="closingDate" type="date" className="field" defaultValue={v.closingDate} />
        </Field>
        <Field id="published" label="Status">
          <select id="published" name="published" className="field" defaultValue={v.published}>
            <option value="false">Draft (not on the website)</option>
            <option value="true">Published</option>
          </select>
        </Field>
      </div>
      <FormMessage message={state.message} />
      <div>
        <SubmitButton pending={pending} pendingLabel="Saving">Save the vacancy</SubmitButton>
      </div>
    </form>
  );
}
