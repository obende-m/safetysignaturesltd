"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { mainNav, primaryAction, type NavItem } from "@/content/site";
import { images } from "@/content/images";
import { Logo } from "@/components/ui/Logo";
import { Arrow } from "@/components/ui/Buttons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus whenever the route changes.
  const [seenPath, setSeenPath] = useState(pathname);
  if (pathname !== seenPath) {
    setSeenPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  const isActive = (item: NavItem) =>
    pathname === item.href ||
    pathname.startsWith(item.href + "/") ||
    item.children?.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled || open || mobileOpen
          ? "border-b border-line/80 bg-paper/92 shadow-[0_10px_30px_-24px_rgba(11,20,48,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-paper"
      }`}
    >
      <div className="wrap flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Logo priority />

        <nav aria-label="Main" className="hidden lg:block" onMouseLeave={scheduleClose}>
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.label} onMouseEnter={() => (item.children ? openMenu(item.label) : setOpen(null))}>
                {item.children ? (
                  <button
                    type="button"
                    aria-expanded={open === item.label}
                    aria-controls={`menu-${item.label}`}
                    onClick={() => setOpen(open === item.label ? null : item.label)}
                    className={`group flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[0.95rem] font-[520] transition-colors hover:text-navy ${
                      isActive(item) ? "text-navy" : "text-ink"
                    }`}
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      aria-hidden="true"
                      className={`transition-transform duration-300 ${open === item.label ? "rotate-180" : ""}`}
                    >
                      <path d="M1.5 3.5L5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex min-h-11 items-center rounded-full px-4 text-[0.95rem] font-[520] transition-colors hover:text-navy ${
                      isActive(item) ? "text-navy" : "text-ink"
                    }`}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <AnimatePresence>
            {open && (
              <MegaPanel
                key={open}
                item={mainNav.find((n) => n.label === open)!}
                onEnter={() => openMenu(open)}
                onLeave={scheduleClose}
              />
            )}
          </AnimatePresence>
        </nav>

        <div className="flex items-center gap-3">
          <Link href={primaryAction.href} className="btn btn-primary hidden min-h-11! py-2.5! sm:inline-flex">
            {primaryAction.label}
            <Arrow />
          </Link>
          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-ink/15 px-4 text-sm font-[550] lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span>{mobileOpen ? "Close" : "Menu"}</span>
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span className={`absolute left-0 top-0.5 h-[1.5px] w-4 bg-current transition-transform duration-300 ${mobileOpen ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0.5 left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${mobileOpen ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>{mobileOpen && <MobileMenu pathname={pathname} />}</AnimatePresence>
    </header>
  );
}

function MegaPanel({ item, onEnter, onLeave }: { item: NavItem; onEnter: () => void; onLeave: () => void }) {
  const reduce = useReducedMotion();
  const isServices = item.label === "Services";
  return (
    <motion.div
      id={`menu-${item.label}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={reduce ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.18 } }}
      transition={{ duration: 0.4, ease }}
      className="absolute inset-x-0 top-[var(--nav-h)] border-b border-line bg-paper shadow-[0_30px_60px_-40px_rgba(11,20,48,0.45)]"
    >
      <div className="wrap grid grid-cols-12 gap-10 py-10">
        <ul className={`${isServices ? "col-span-8 grid-cols-2" : "col-span-8 grid-cols-2"} grid gap-x-10 gap-y-1`}>
          {item.children!.map((child, i) => (
            <motion.li
              key={child.href}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease, delay: 0.03 * i }}
            >
              <Link href={child.href} className="group block rounded-2xl px-4 py-3.5 transition-colors hover:bg-sand/70">
                <span className="flex items-center justify-between gap-4 font-[560] text-ink">
                  {child.label}
                  <Arrow className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </span>
                {child.description && <span className="mt-1 block text-sm leading-snug text-mute">{child.description}</span>}
              </Link>
            </motion.li>
          ))}
        </ul>
        <Link
          href={isServices ? "/services" : "/about"}
          className="group col-span-4 flex flex-col overflow-hidden rounded-2xl bg-ink text-paper"
        >
          <span className="photo-frame relative block aspect-[16/9]">
            <Image
              src={isServices ? images.guardsLineUp.src : images.guardsHandshake.src}
              alt=""
              fill
              sizes="420px"
              className="object-cover"
            />
          </span>
          <span className="flex items-center justify-between gap-4 px-5 py-4 font-[560]">
            {isServices ? "See all services" : "Read about the company"}
            <Arrow />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);
  const baseId = useId();
  return (
    <motion.div
      id="mobile-menu"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 bottom-0 top-[var(--nav-h)] overflow-y-auto bg-paper lg:hidden"
    >
      <nav aria-label="Main" className="wrap flex min-h-full flex-col pb-8 pt-4">
        <ul className="divide-y divide-line border-b border-line">
          {mainNav.map((item, i) => (
            <motion.li
              key={item.label}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.04 * i }}
            >
              {item.children ? (
                <>
                  <button
                    type="button"
                    className="display flex min-h-16 w-full items-center justify-between text-left text-[1.9rem]"
                    aria-expanded={expanded === item.label}
                    aria-controls={`${baseId}-${i}`}
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  >
                    {item.label}
                    <span aria-hidden="true" className={`text-xl transition-transform duration-300 ${expanded === item.label ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded === item.label && (
                      <motion.ul
                        id={`${baseId}-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className={`flex min-h-12 items-center py-1 pl-1 text-[1.05rem] ${pathname === c.href ? "text-red" : "text-ink/80"}`}
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                        <li className="h-3" aria-hidden="true" />
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link href={item.href} className="display flex min-h-16 items-center text-[1.9rem]">
                  {item.label}
                </Link>
              )}
            </motion.li>
          ))}
        </ul>
        <div className="mt-auto pt-10">
          <Link href={primaryAction.href} className="btn btn-primary w-full">
            {primaryAction.label}
            <Arrow />
          </Link>
        </div>
      </nav>
    </motion.div>
  );
}
