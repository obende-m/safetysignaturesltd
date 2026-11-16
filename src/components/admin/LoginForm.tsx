"use client";

import { useActionState } from "react";
import { signIn } from "@/lib/admin/actions";
import { initialFormState } from "@/lib/forms/schemas";
import { describe, Field, FormMessage, SubmitButton, submitWithoutReset } from "@/components/forms/FormParts";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, initialFormState);
  const e = state.errors ?? {};
  return (
    <form action={action} onSubmit={submitWithoutReset(action)} noValidate className="grid gap-5">
      <Field id="email" label="Email" error={e.email}>
        <input id="email" name="email" type="email" autoComplete="username" className="field" defaultValue={state.values?.email} {...describe("email", e.email)} />
      </Field>
      <Field id="password" label="Password" error={e.password}>
        <input id="password" name="password" type="password" autoComplete="current-password" className="field" {...describe("password", e.password)} />
      </Field>
      <FormMessage message={state.message} />
      <SubmitButton pending={pending} pendingLabel="Signing in">Sign in</SubmitButton>
    </form>
  );
}
