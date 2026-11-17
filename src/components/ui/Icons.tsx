/** Small line icons drawn on a 24px grid. Decorative unless a label is passed. */
type IconProps = { className?: string; label?: string };

function Svg({ className = "", label, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </svg>
  );
}

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" />
  </Svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
  </Svg>
);

export const PinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0119 9.5C19 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
);

export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </Svg>
);

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

/** Round red-tinted badge with a check mark, used on "what is included" cards. */
export function CheckBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-red/10 text-red ${className}`} aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

/** Brand marks for the social profiles (simple single-colour glyphs). */
export function SocialIcon({ name, className = "" }: { name: string; className?: string }) {
  const n = name.toLowerCase();
  const common = { className, width: 20, height: 20, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true as const };
  if (n.includes("facebook"))
    return (
      <svg {...common}>
        <path d="M13.5 21v-7.5H16l.4-3H13.5V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
      </svg>
    );
  if (n.includes("instagram"))
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  if (n.includes("twitter") || n === "x" || n.startsWith("x "))
    return (
      <svg {...common}>
        <path d="M17.6 3.5h3l-6.6 7.5 7.7 9.5h-6l-4.7-5.9-5.4 5.9h-3l7-7.9L2.3 3.5h6.1l4.3 5.5 4.9-5.5zm-1 15.3h1.7L7.5 5.1H5.7l10.9 13.7z" />
      </svg>
    );
  if (n.includes("linkedin"))
    return (
      <svg {...common}>
        <path d="M6.9 8.8H3.7V20h3.2V8.8zM5.3 3.5a1.9 1.9 0 100 3.8 1.9 1.9 0 000-3.8zM20.3 13.6c0-3-1.6-5-4.4-5-1.4 0-2.4.8-2.8 1.5V8.8H10V20h3.2v-5.6c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.7 1.8 3V20h3.2v-6.4z" />
      </svg>
    );
  if (n === "share")
    return (
      <Svg className={className}>
        <circle cx="18" cy="5.5" r="2.5" />
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="18.5" r="2.5" />
        <path d="M8.2 10.8l7.6-4.1M8.2 13.2l7.6 4.1" />
      </Svg>
    );
  return <ShieldIcon className={className} />;
}
