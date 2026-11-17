import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/brand/safety-signatures-logo.png";
import logoOnDark from "../../../public/images/brand/safety-signatures-logo-on-dark.png";

/**
 * The official logo. The supplied file is 198×88 px, so it is never displayed wider than its
 * native size. Replace with the vector file when supplied.
 *
 * - `chip`: on navy grounds the full-colour logo sits on a white tile so the navy lettering stays legible.
 * - `mobileOnDark` (approved by the client, 17 November 2026): below the desktop breakpoint the logo
 *   sits straight on the navy header in its on-dark version, where the navy lettering is white and
 *   the red stays red (safety-signatures-logo-on-dark.png, made from the original by recolouring
 *   only the navy and grey pixels). From the desktop breakpoint up, the colour logo and tile return.
 */
export function Logo({
  className = "",
  priority = false,
  chip = false,
  mobileOnDark = false,
  width = 132,
  imgClassName = "",
}: {
  className?: string;
  priority?: boolean;
  chip?: boolean;
  mobileOnDark?: boolean;
  width?: number;
  /** Responsive sizing for the image, e.g. "w-[88px] lg:w-[112px]". */
  imgClassName?: string;
}) {
  const height = Math.round((width * 88) / 198);
  // Class names are written out in full so Tailwind can find them.
  const chipClass = "rounded-2xl bg-white px-3 py-1.5 shadow-[0_6px_18px_-10px_rgba(0,0,0,0.55)] ring-1 ring-white/40";
  const chipFromDesktop =
    "lg:rounded-2xl lg:bg-white lg:px-3 lg:py-1.5 lg:shadow-[0_6px_18px_-10px_rgba(0,0,0,0.55)] lg:ring-1 lg:ring-white/40";
  const lift = "transition-transform duration-500 hover:-translate-y-0.5";
  const linkClass = mobileOnDark ? `${lift} ${chip ? chipFromDesktop : ""}` : chip ? `${chipClass} ${lift}` : "";
  const alt = "Safety Signatures Limited, Reliability Assured";

  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${linkClass} ${className}`} aria-label="Safety Signatures Limited, home">
      {mobileOnDark && (
        <Image
          src={logoOnDark}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          unoptimized
          className={`h-auto lg:hidden ${imgClassName}`}
        />
      )}
      <Image
        src={logo}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        unoptimized
        className={`h-auto ${mobileOnDark ? "hidden lg:block" : ""} ${imgClassName}`}
      />
    </Link>
  );
}
