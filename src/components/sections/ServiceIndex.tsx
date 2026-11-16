"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { images, type ImageKey } from "@/content/images";
import { Arrow } from "@/components/ui/Buttons";

type Item = { slug: string; name: string; short: string; image?: ImageKey };

/**
 * Numbered service index. On wide screens, hovering or focusing a row shows that service's
 * photograph in the panel beside the list; services without a photograph show the default.
 */
export function ServiceIndex({ items, fallback }: { items: Item[]; fallback: ImageKey }) {
  const [active, setActive] = useState(0);
  const current = items[active]?.image ?? fallback;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <ol className="border-t border-line lg:col-span-7" onMouseLeave={() => undefined}>
        {items.map((s, i) => (
          <li key={s.slug} className="border-b border-line">
            <Link
              href={`/services/${s.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 md:grid-cols-[3.5rem_1fr_auto] md:py-7"
            >
              <span className={`font-mono text-sm transition-colors duration-300 ${active === i ? "text-red" : "text-mute"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="display block text-[1.6rem] leading-tight transition-transform duration-500 ease-out group-hover:translate-x-1.5 md:text-[2.05rem]">
                  {s.name}
                </span>
                <span className="mt-2 block max-w-xl text-[0.97rem] leading-relaxed text-mute">{s.short}</span>
              </span>
              <span
                className={`flex h-11 w-11 items-center justify-center self-center rounded-full border transition-all duration-500 ${
                  active === i ? "border-ink bg-ink text-paper" : "border-line text-ink"
                } group-hover:border-ink group-hover:bg-ink group-hover:text-paper`}
                aria-hidden="true"
              >
                <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="relative hidden lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--nav-h)+2rem)] aspect-[4/5] overflow-hidden rounded-[28px] bg-sand">
          <AnimatePresence initial={false}>
            <motion.div
              key={current}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={images[current].src}
                alt={images[current].alt}
                fill
                sizes="(min-width: 1024px) 40vw, 1px"
                className="object-cover"
                style={{ objectPosition: images[current].focus }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
