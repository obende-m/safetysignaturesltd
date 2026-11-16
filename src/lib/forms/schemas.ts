import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(7, "Enter a phone number we can call, including the area or network code")
  .max(20, "Enter a phone number of up to 20 characters")
  .regex(/^[+()\d\s-]+$/, "Use digits, spaces and + only in the phone number");

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120, "Use 120 characters or fewer"),
  organisation: z.string().trim().max(160, "Use 160 characters or fewer").optional().default(""),
  email: z.string().trim().toLowerCase().email("Enter an email address like name@company.com").max(200),
  phone,
  service: z.string().trim().min(1, "Choose the service you need").max(80),
  location: z.string().trim().min(2, "Enter the town or area where the service is needed").max(160),
  message: z
    .string()
    .trim()
    .min(20, "Describe what you need in at least 20 characters")
    .max(4000, "Keep the description under 4,000 characters"),
  consent: z.literal("on", { error: "Confirm that we may use these details to reply to you" }),
});

export const applicationSchema = z.object({
  vacancyId: z.string().uuid().optional().or(z.literal("")).default(""),
  position: z.string().trim().min(2, "Enter the position you are applying for").max(120),
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().toLowerCase().email("Enter an email address like name@example.com").max(200),
  phone,
  stateOfResidence: z.string().trim().min(2, "Enter the state you live in").max(60),
  qualification: z.string().trim().min(1, "Choose your highest qualification").max(80),
  experienceYears: z.coerce
    .number({ error: "Enter your years of security experience as a number" })
    .int("Enter whole years")
    .min(0, "Enter 0 or more years")
    .max(50, "Enter 50 years or fewer"),
  previousService: z.enum(["yes", "no"], { error: "Tell us whether you have served in a uniformed service" }),
  coverNote: z.string().trim().max(3000, "Keep the note under 3,000 characters").optional().default(""),
  consent: z.literal("on", { error: "Confirm that we may use these details to assess your application" }),
});

export const qualificationOptions = [
  "Secondary school certificate (SSCE/WAEC/NECO)",
  "OND or equivalent",
  "HND or bachelor's degree",
  "Postgraduate degree",
  "Other",
] as const;

export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_TYPES: Record<string, { ext: string; magic: number[] }> = {
  "application/pdf": { ext: "pdf", magic: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { ext: "docx", magic: [0x50, 0x4b, 0x03, 0x04] }, // ZIP
  "application/msword": { ext: "doc", magic: [0xd0, 0xcf, 0x11, 0xe0] }, // OLE2
};

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
