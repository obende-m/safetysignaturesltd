"use server";

import { randomUUID } from "node:crypto";
import { createAdminClient, isServiceConfigured } from "@/lib/supabase/admin";
import { clientFingerprint, isRateLimited, looksAutomated } from "./guard";
import {
  applicationSchema,
  CV_MAX_BYTES,
  CV_TYPES,
  enquirySchema,
  fieldErrors,
  type FormState,
} from "./schemas";

const UNAVAILABLE =
  "We could not send your message because our enquiry system is not connected yet. Please try again later.";

const values = (formData: FormData, keys: string[]) =>
  Object.fromEntries(keys.map((k) => [k, String(formData.get(k) ?? "")]));

export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const keep = values(formData, ["fullName", "organisation", "email", "phone", "service", "location", "message", "consent"]);

  // Bots get the same reply as people so the check cannot be probed, but nothing is stored.
  if (looksAutomated(formData)) {
    return { status: "error", message: "Please wait a moment and send the form again.", values: keep };
  }

  const parsed = enquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", errors: fieldErrors(parsed.error), values: keep };
  }

  if (!isServiceConfigured()) {
    return { status: "error", message: UNAVAILABLE, values: keep };
  }

  const db = createAdminClient();
  const { ipHash, userAgent } = await clientFingerprint();

  if (await isRateLimited(db, "enquiries", ipHash)) {
    return {
      status: "error",
      message: "We have received several messages from you in the last few minutes. Please try again in 15 minutes.",
      values: keep,
    };
  }

  const d = parsed.data;
  const { error } = await db.from("enquiries").insert({
    full_name: d.fullName,
    organisation: d.organisation || null,
    email: d.email,
    phone: d.phone,
    service: d.service,
    location: d.location,
    message: d.message,
    source_page: String(formData.get("sourcePage") ?? "").slice(0, 200) || null,
    consent: true,
    ip_hash: ipHash,
    user_agent: userAgent,
  });

  if (error) {
    console.error("[forms] Enquiry insert failed:", error.message);
    return { status: "error", message: "Something went wrong while sending your request. Please try again.", values: keep };
  }

  return {
    status: "success",
    message: `Your consultation request is in, ${d.fullName.split(" ")[0]}. Our team will contact you at ${d.email} or by phone.`,
  };
}

async function matchesMagic(file: File, magic: number[]) {
  const head = new Uint8Array(await file.slice(0, magic.length).arrayBuffer());
  return magic.every((b, i) => head[i] === b);
}

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const keep = values(formData, [
    "vacancyId",
    "position",
    "fullName",
    "email",
    "phone",
    "stateOfResidence",
    "qualification",
    "experienceYears",
    "previousService",
    "coverNote",
    "consent",
  ]);

  if (looksAutomated(formData)) {
    return { status: "error", message: "Please wait a moment and send the form again.", values: keep };
  }

  const raw = Object.fromEntries([...formData.entries()].filter(([k]) => k !== "cv"));
  const parsed = applicationSchema.safeParse(raw);
  const errors = parsed.success ? {} : fieldErrors(parsed.error);

  const cv = formData.get("cv");
  const file = cv instanceof File && cv.size > 0 ? cv : null;
  const type = file ? CV_TYPES[file.type] : undefined;
  if (!file) errors.cv = "Attach your CV as a PDF or Word document";
  else if (file.size > CV_MAX_BYTES) errors.cv = "Attach a CV of 5 MB or less";
  else if (!type || !(await matchesMagic(file, type.magic))) errors.cv = "Attach your CV as a PDF, DOC or DOCX file";

  if (!parsed.success || Object.keys(errors).length > 0) {
    return { status: "error", errors, values: keep };
  }

  if (!isServiceConfigured()) {
    return { status: "error", message: UNAVAILABLE.replace("message", "application"), values: keep };
  }

  const db = createAdminClient();
  const { ipHash, userAgent } = await clientFingerprint();

  if (await isRateLimited(db, "applications", ipHash, 2, 60)) {
    return { status: "error", message: "We have already received an application from you in the last hour.", values: keep };
  }

  const d = parsed.data;
  const path = `${new Date().getUTCFullYear()}/${randomUUID()}.${type!.ext}`;

  const upload = await db.storage.from("applications").upload(path, file!, {
    contentType: file!.type,
    upsert: false,
  });
  if (upload.error) {
    console.error("[forms] CV upload failed:", upload.error.message);
    return { status: "error", message: "We could not upload your CV. Please try again.", values: keep };
  }

  const { error } = await db.from("applications").insert({
    vacancy_id: d.vacancyId || null,
    position: d.position,
    full_name: d.fullName,
    email: d.email,
    phone: d.phone,
    state_of_residence: d.stateOfResidence,
    qualification: d.qualification,
    experience_years: d.experienceYears,
    previous_service: d.previousService === "yes",
    cover_note: d.coverNote || null,
    cv_path: path,
    consent: true,
    ip_hash: ipHash,
    user_agent: userAgent,
  });

  if (error) {
    console.error("[forms] Application insert failed:", error.message);
    await db.storage.from("applications").remove([path]);
    return { status: "error", message: "Something went wrong while sending your application. Please try again.", values: keep };
  }

  return {
    status: "success",
    message: `Your application for ${d.position} is in. We will contact shortlisted applicants at ${d.email}.`,
  };
}
