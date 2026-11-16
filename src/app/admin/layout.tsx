import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Safety Signatures admin" },
  robots: { index: false, follow: false },
};

// The admin area is private and always dynamic; it is not expected to navigate instantly.
export const instant = false;

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-svh bg-paper">{children}</div>;
}
