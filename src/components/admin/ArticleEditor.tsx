"use client";

import { useActionState, useState } from "react";
import { saveArticle } from "@/lib/admin/actions";
import { initialFormState } from "@/lib/forms/schemas";
import { mediaCategoryLabels } from "@/content/articles";
import { describe, Field, FormMessage, SubmitButton, submitWithoutReset } from "@/components/forms/FormParts";

export type ArticleInput = {
  id?: string;
  kind: "media" | "insight";
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  publication: string;
  sourceUrl: string;
  publishedAt: string;
  dateLabel: string;
  readingMinutes: string;
  status: "draft" | "published";
};

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export function ArticleEditor({ initial }: { initial: ArticleInput }) {
  const [state, action, pending] = useActionState(saveArticle, initialFormState);
  const v = { ...initial, ...(state.values ?? {}) } as ArticleInput;
  const e = state.errors ?? {};
  const [kind, setKind] = useState<ArticleInput["kind"]>(v.kind);
  const [slug, setSlug] = useState(v.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id));

  return (
    <form action={action} onSubmit={submitWithoutReset(action)} noValidate className="mt-8 grid max-w-3xl gap-6">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}

      <Field id="kind" label="Type">
        <select id="kind" name="kind" className="field" value={kind} onChange={(ev) => setKind(ev.target.value as ArticleInput["kind"])}>
          <option value="insight">Security Insights article (written by us)</option>
          <option value="media">Press coverage (link to another publication)</option>
        </select>
      </Field>

      <Field id="title" label="Title" error={e.title}>
        <input
          id="title"
          name="title"
          className="field"
          defaultValue={v.title}
          onChange={(ev) => !slugTouched && setSlug(toSlug(ev.target.value))}
          {...describe("title", e.title)}
        />
      </Field>

      <Field id="slug" label="URL name" hint="Used in the page address. Lower-case letters, numbers and hyphens." error={e.slug}>
        <input
          id="slug"
          name="slug"
          className="field font-mono text-sm"
          value={slug}
          onChange={(ev) => {
            setSlugTouched(true);
            setSlug(ev.target.value);
          }}
          {...describe("slug", e.slug, true)}
        />
      </Field>

      <Field id="excerpt" label="Summary" hint="One or two sentences shown in lists and search results." error={e.excerpt}>
        <textarea id="excerpt" name="excerpt" className="field !min-h-24" defaultValue={v.excerpt} {...describe("excerpt", e.excerpt, true)} />
      </Field>

      {kind === "media" ? (
        <>
          <Field id="category" label="Kind of coverage" error={e.category}>
            <select id="category" name="category" className="field" defaultValue={v.category || "media_feature"}>
              {Object.entries(mediaCategoryLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="publication" label="Publication" error={e.publication}>
              <input id="publication" name="publication" className="field" defaultValue={v.publication} {...describe("publication", e.publication)} />
            </Field>
            <Field id="sourceUrl" label="Link to the article" error={e.sourceUrl}>
              <input id="sourceUrl" name="sourceUrl" type="url" className="field" defaultValue={v.sourceUrl} {...describe("sourceUrl", e.sourceUrl)} />
            </Field>
          </div>
        </>
      ) : (
        <>
          <Field id="category" label="Topic" hint="For example: Residential, Events, Seasonal, Workplace." error={e.category}>
            <input id="category" name="category" className="field" defaultValue={v.category} {...describe("category", e.category, true)} />
          </Field>
          <Field
            id="body"
            label="Article"
            hint="Separate paragraphs with a blank line. Start a line with ## for a heading, or - for a bullet point."
            error={e.body}
          >
            <textarea id="body" name="body" className="field !min-h-[420px] font-mono text-sm" defaultValue={v.body} {...describe("body", e.body, true)} />
          </Field>
          <Field id="readingMinutes" label="Reading time in minutes" optional>
            <input id="readingMinutes" name="readingMinutes" type="number" min={0} max={120} className="field max-w-40" defaultValue={v.readingMinutes} />
          </Field>
        </>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="publishedAt" label="Date" error={e.publishedAt}>
          <input id="publishedAt" name="publishedAt" type="date" className="field" defaultValue={v.publishedAt} {...describe("publishedAt", e.publishedAt)} />
        </Field>
        <Field id="dateLabel" label="Date shown instead" optional hint='Use when the exact day is unknown, e.g. "March 2025".'>
          <input id="dateLabel" name="dateLabel" className="field" defaultValue={v.dateLabel} />
        </Field>
      </div>

      <Field id="status" label="Status">
        <select id="status" name="status" className="field max-w-xs" defaultValue={v.status}>
          <option value="draft">Draft (not on the website)</option>
          <option value="published">Published</option>
        </select>
      </Field>

      <FormMessage message={state.message} />
      <div>
        <SubmitButton pending={pending} pendingLabel="Saving">Save the article</SubmitButton>
      </div>
    </form>
  );
}
