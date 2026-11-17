import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/brand/safety-signatures-logo.png";

/**
 * The official logo, shown unaltered. The supplied file is 198×88 px, so it is never displayed
 * wider than its native size. On navy grounds it sits on a white chip (`chip`) so the navy
 * lettering stays legible. Replace with the vector file when supplied.
 */
export function Logo({
  className = "",
  priority = false,
  chip = false,
  width = 132,
  imgClassName = "",
}: {
  className?: string;
  priority?: boolean;
  chip?: boolean;
  width?: number;
  /** Responsive sizing for the image, e.g. "w-[88px] lg:w-[112px]". */
  imgClassName?: string;
}) {
  const height = Math.round((width * 88) / 198);
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${
        chip
          ? "rounded-xl bg-white px-2 py-1 shadow-[0_6px_18px_-10px_rgba(0,0,0,0.55)] ring-1 ring-white/40 transition-transform duration-500 hover:-translate-y-0.5 lg:rounded-2xl lg:px-3 lg:py-1.5"
          : ""
      } ${className}`}
      aria-label="Safety Signatures Limited, home"
    >
      <Image
        src={logo}
        alt="Safety Signatures Limited, Reliability Assured"
        width={width}
        height={height}
        priority={priority}
        unoptimized
        className={`h-auto ${imgClassName}`}
      />
    </Link>
  );
}
