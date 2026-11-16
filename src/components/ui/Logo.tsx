import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/brand/safety-signatures-logo.png";

/**
 * The official logo, shown unaltered on a light ground. The supplied file is 198×88 px, so it
 * is never displayed wider than its native size. Replace with the vector file when supplied.
 */
export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`} aria-label="Safety Signatures Limited, home">
      <Image src={logo} alt="Safety Signatures Limited, Reliability Assured" width={132} height={59} priority={priority} unoptimized />
    </Link>
  );
}
