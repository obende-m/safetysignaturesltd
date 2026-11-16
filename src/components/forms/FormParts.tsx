"use client";

import { startTransition, useEffect, useRef, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Arrow } from "@/components/ui/Buttons";

/** Hidden anti-spam fields: a honeypot and the time the form was opened. */
export function SpamGuard() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const input = ref.current;
    if (!input) return;
    const openedAt = String(Date.now());
    input.value = openedAt;
    // React resets the form after every submission; restore the time the form was opened.
    const form = input.form;
    const restore = () => setTimeout(() => (input.value = openedAt), 0);
    form?.addEventListener("reset", restore);
    return () => form?.removeEventListener("reset", restore);
  }, []);
  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {/* No value prop: React must not touch this field after the effect fills it in. */}
      <input ref={ref} type="hidden" name="startedAt" />
    </>
  );
}

export function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="ml-1.5 font-normal text-mute">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-mute">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** aria props tying a control to its hint or error text. */
export const describe = (id: string, error?: string, hint?: boolean) => ({
  "aria-invalid": error ? (true as const) : undefined,
  "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
});

export function SubmitButton({ children, pendingLabel, pending: pendingProp }: { children: ReactNode; pendingLabel: string; pending?: boolean }) {
  const status = useFormStatus();
  const pending = pendingProp ?? status.pending;
  return (
    <button type="submit" className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto" disabled={pending}>
      {pending ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
          {pendingLabel}
        </>
      ) : (
        <>
          {children}
          <Arrow />
        </>
      )}
    </button>
  );
}

export function FormMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div role="alert" className="rounded-2xl border border-red/30 bg-red/5 px-5 py-4 text-[0.95rem] text-red-deep">
      {message}
    </div>
  );
}

export function SuccessPanel({ title, message, children }: { title: string; message?: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className="rounded-[28px] bg-ink p-8 text-paper outline-none md:p-12">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10.5l4 4 8-9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h2 className="display mt-8 text-[2.2rem] leading-tight">{title}</h2>
      {message && <p className="mt-4 max-w-[52ch] text-mute-dark">{message}</p>}
      {children}
    </div>
  );
}

/**
 * A controlled value that resets to `fromServer` whenever the server returns new values.
 * Used for <select>s, which the browser's form reset would otherwise return to the placeholder.
 */
export function useServerValue(fromServer: string) {
  const [value, setValue] = useState(fromServer);
  const [seen, setSeen] = useState(fromServer);
  if (fromServer !== seen) {
    setSeen(fromServer);
    setValue(fromServer);
  }
  return [value, setValue] as const;
}

/**
 * Submits through a transition instead of the form's native action, so a failed submission
 * leaves every field (including selects and file inputs) exactly as the visitor left it.
 * The form keeps `action` as well, so it still posts without JavaScript.
 */
export function submitWithoutReset(dispatch: (fd: FormData) => void) {
  return (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    startTransition(() => dispatch(fd));
  };
}
