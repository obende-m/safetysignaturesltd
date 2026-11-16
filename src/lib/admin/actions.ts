"use server";

import { redirect } from "next/navigation";
import { refresh, updateTag } from "next/cache";
import { z } from "zod";
import { createSessionClient } from "@/lib/supabase/server";
import { createAdminClient, isServiceConfigured } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/env";
import { fieldErrors, type FormState } from "@/lib/forms/schemas";
import { requireStaff } from "./auth";

/* ----------------------------------------------------------------------------
 * Sign in / out
 * -------------------------------------------------------------------------- */

const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter your staff email address"),
  password: z.string().min(1, "Enter your password"),
});

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!isSupabaseConfigured()) {
    return { status: "error", message: "Supabase is not configured for this deployment yet." };
  }
  const parsed = signInSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", errors: fieldErrors(parsed.error), values: { email: String(formData.get("email") ?? "") } };

  const supabase = await createSessionClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) {
    return { status: "error", message: "That email and password do not match a staff account.", values: { email: parsed.data.email } };
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).maybeSingle();
  if (!profile) {
    await supabase.auth.signOut();
    return { status: "error", message: "This account does not have access to the admin area." };
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/* ----------------------------------------------------------------------------
 * Enquiries and applications
 * -------------------------------------------------------------------------- */

const enquiryUpdate = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "in_progress", "closed"]),
  staffNotes: z.string().max(4000).optional().default(""),
});

export async function updateEnquiry(formData: FormData) {
  await requireStaff();
  const d = enquiryUpdate.parse(Object.fromEntries(formData));
  const supabase = await createSessionClient();
  const { error } = await supabase.from("enquiries").update({ status: d.status, staff_notes: d.staffNotes || null }).eq("id", d.id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function deleteEnquiry(formData: FormData) {
  await requireStaff("admin");
  const id = z.string().uuid().parse(formData.get("id"));
  const supabase = await createSessionClient();
  const { error } = await supabase.from("enquiries").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

const applicationUpdate = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "reviewing", "shortlisted", "rejected", "hired"]),
  staffNotes: z.string().max(4000).optional().default(""),
});

export async function updateApplication(formData: FormData) {
  await requireStaff();
  const d = applicationUpdate.parse(Object.fromEntries(formData));
  const supabase = await createSessionClient();
  const { error } = await supabase.from("applications").update({ status: d.status, staff_notes: d.staffNotes || null }).eq("id", d.id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function deleteApplication(formData: FormData) {
  await requireStaff("admin");
  const id = z.string().uuid().parse(formData.get("id"));
  const supabase = await createSessionClient();
  const { data: row, error: readError } = await supabase.from("applications").select("cv_path").eq("id", id).single();
  if (readError) throw new Error(readError.message);
  const { error } = await supabase.from("applications").delete().eq("id", id);
  if (error) throw new Error(error.message);
  // Remove the CV file too. Storage deletes go through the service client after the staff check above.
  if (row?.cv_path && isServiceConfigured()) {
    await createAdminClient().storage.from("applications").remove([row.cv_path]);
  }
  refresh();
}

/* ----------------------------------------------------------------------------
 * Articles (press coverage and Security Insights)
 * -------------------------------------------------------------------------- */

const slug = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "Enter a URL name of at least 3 characters")
  .max(120)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lower-case letters, numbers and single hyphens only");

const articleSchema = z
  .object({
    id: z.string().uuid().optional().or(z.literal("")),
    kind: z.enum(["media", "insight"]),
    title: z.string().trim().min(3, "Enter a title").max(240),
    slug,
    excerpt: z.string().trim().min(10, "Enter a summary of at least 10 characters").max(600),
    body: z.string().trim().max(40000).optional().default(""),
    category: z.string().trim().max(60).optional().default(""),
    publication: z.string().trim().max(120).optional().default(""),
    sourceUrl: z.string().trim().max(500).optional().default(""),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date"),
    dateLabel: z.string().trim().max(40).optional().default(""),
    readingMinutes: z.coerce.number().int().min(0).max(120).optional(),
    status: z.enum(["draft", "published"]),
  })
  .superRefine((a, ctx) => {
    if (a.kind === "media") {
      if (!a.publication) ctx.addIssue({ code: "custom", path: ["publication"], message: "Enter the publication's name" });
      if (!/^https:\/\//.test(a.sourceUrl)) ctx.addIssue({ code: "custom", path: ["sourceUrl"], message: "Enter the article's https:// link" });
    }
    if (a.kind === "insight" && a.body.length < 50) {
      ctx.addIssue({ code: "custom", path: ["body"], message: "Write the article body (at least 50 characters)" });
    }
  });

export async function saveArticle(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireStaff();
  const values = Object.fromEntries([...formData.entries()].map(([k, v]) => [k, String(v)]));
  const parsed = articleSchema.safeParse(values);
  if (!parsed.success) return { status: "error", errors: fieldErrors(parsed.error), values };

  const a = parsed.data;
  const row = {
    kind: a.kind,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    body: a.body || null,
    category: a.category || null,
    publication: a.publication || null,
    source_url: a.sourceUrl || null,
    published_at: a.publishedAt,
    date_label: a.dateLabel || null,
    reading_minutes: a.readingMinutes || null,
    status: a.status,
  };

  const supabase = await createSessionClient();
  const { error } = a.id
    ? await supabase.from("articles").update(row).eq("id", a.id)
    : await supabase.from("articles").insert(row);

  if (error) {
    const msg = error.code === "23505" ? "Another article already uses this URL name." : error.message;
    return { status: "error", message: msg, values };
  }

  updateTag("articles");
  redirect("/admin/articles?saved=1");
}

export async function deleteArticle(formData: FormData) {
  await requireStaff("admin");
  const id = z.string().uuid().parse(formData.get("id"));
  const supabase = await createSessionClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  updateTag("articles");
  refresh();
}

/* ----------------------------------------------------------------------------
 * Vacancies
 * -------------------------------------------------------------------------- */

const vacancySchema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  title: z.string().trim().min(2, "Enter the job title").max(120),
  slug,
  location: z.string().trim().min(2, "Enter the location").max(120),
  employmentType: z.string().trim().min(2).max(60),
  summary: z.string().trim().min(10, "Describe the role in at least 10 characters").max(2000),
  requirements: z.string().trim().max(4000).optional().default(""),
  closingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  published: z.enum(["true", "false"]),
});

export async function saveVacancy(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireStaff();
  const values = Object.fromEntries([...formData.entries()].map(([k, v]) => [k, String(v)]));
  const parsed = vacancySchema.safeParse(values);
  if (!parsed.success) return { status: "error", errors: fieldErrors(parsed.error), values };

  const v = parsed.data;
  const row = {
    title: v.title,
    slug: v.slug,
    location: v.location,
    employment_type: v.employmentType,
    summary: v.summary,
    requirements: v.requirements || null,
    closing_date: v.closingDate || null,
    published: v.published === "true",
  };
  const supabase = await createSessionClient();
  const { error } = v.id
    ? await supabase.from("vacancies").update(row).eq("id", v.id)
    : await supabase.from("vacancies").insert(row);

  if (error) {
    const msg = error.code === "23505" ? "Another vacancy already uses this URL name." : error.message;
    return { status: "error", message: msg, values };
  }
  updateTag("vacancies");
  redirect("/admin/vacancies?saved=1");
}

export async function deleteVacancy(formData: FormData) {
  await requireStaff("admin");
  const id = z.string().uuid().parse(formData.get("id"));
  const supabase = await createSessionClient();
  const { error } = await supabase.from("vacancies").delete().eq("id", id);
  if (error) throw new Error(error.message);
  updateTag("vacancies");
  refresh();
}
