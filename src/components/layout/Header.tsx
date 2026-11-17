"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { mainNav, primaryAction, type NavItem } from "@/content/site";
import { images } from "@/content/images";
import { formatPhone, primaryEmail, primaryPhone, telHref } from "@/content/company";
import { Logo } from "@/components/ui/Logo";
import { Arrow } from "@/components/ui/Buttons";
import { ScrollProgress } from "@/components/motion/Reveal";

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
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href ||
        pathname.startsWith(item.href + "/") ||
        item.children?.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"));

  const itemClass = (item: NavItem) =>
    `flex min-h-10 items-center gap-1.5 rounded-full px-3.5 text-[0.92rem] font-[550] tracking-[-0.01em] transition-all duration-300 ${
      isActive(item) ? "bg-white text-navy-deep shadow-[0_4px_14px_-6px_rgba(0,0,0,0.45)]" : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <header
      // No backdrop blur while the mobile menu is open: a backdrop-filter makes the header the
      // containing block for its fixed children, which would squash the full-screen menu to 0px.
      className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,box-shadow] duration-500 ${
        mobileOpen
          ? "bg-navy-deep"
          : scrolled || open
            ? "bg-navy-deep/95 shadow-[0_14px_34px_-20px_rgba(5,12,35,0.7)] backdrop-blur-xl"
            : "bg-navy-deep"
      }`}
    >
      {/* Thin brand stripe along the top edge. */}
      <div className="h-[3px] bg-gradient-to-r from-red via-red to-navy" aria-hidden="true" />
      <div className="wrap flex h-[calc(var(--nav-h)-3px)] items-center justify-between gap-6">
        <Logo priority chip mobileOnDark width={112} imgClassName="w-[104px] lg:w-[112px]" />

        <nav aria-label="Main" className="hidden lg:block" onMouseLeave={scheduleClose}>
          <ul className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.06] p-1">
            {mainNav.map((item) => (
              <li key={item.label} onMouseEnter={() => (item.children ? openMenu(item.label) : setOpen(null))}>
                {item.children ? (
                  <button
                    type="button"
                    aria-expanded={open === item.label}
                    aria-controls={`menu-${item.label}`}
                    onClick={() => setOpen(open === item.label ? null : item.label)}
                    className={`group ${itemClass(item)}`}
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
                    className={itemClass(item)}
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
          {primaryPhone() && (
            <a
              href={telHref(primaryPhone()!.value)}
              className="hidden min-h-11 items-center gap-2 px-2 text-[0.92rem] font-[550] text-white/85 transition-colors hover:text-white 2xl:inline-flex"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              <span className="sr-only">Call Lagos</span>
              {formatPhone(primaryPhone()!.value)}
            </a>
          )}
          {/* Visibility sits on a wrapper: .btn sets its own display, which would override `hidden`. */}
          <span className="hidden sm:block">
            <Link href={primaryAction.href} className="btn btn-primary min-h-11! py-2.5!">
              {primaryAction.label}
              <Arrow />
            </Link>
          </span>
          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/25 px-4 text-sm font-[600] text-white lg:hidden"
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

      <ScrollProgress className="absolute inset-x-0 bottom-0 h-[2px] bg-red" />
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
      className="absolute inset-x-0 top-[var(--nav-h)] border-b border-line bg-paper text-ink shadow-[0_30px_60px_-40px_rgba(11,20,48,0.45)]"
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
              <Link href={child.href} className="group block rounded-2xl px-4 py-3.5 transition-colors hover:bg-sand">
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
      className="fixed inset-x-0 bottom-0 top-[var(--nav-h)] overflow-y-auto bg-paper text-ink lg:hidden"
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
          <div className="mt-6 grid gap-1 text-[0.97rem]">
            {primaryPhone() && (
              <a href={telHref(primaryPhone()!.value)} className="inline-flex min-h-11 items-center">
                Call Lagos: {formatPhone(primaryPhone()!.value)}
              </a>
            )}
            {primaryEmail() && (
              <a href={`mailto:${primaryEmail()!.value}`} className="inline-flex min-h-11 items-center break-all">
                {primaryEmail()!.value}
              </a>
            )}
            <Link href="/contact#phone-lines" className="inline-flex min-h-11 items-center text-navy">
              Phone lines for every state
            </Link>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}
