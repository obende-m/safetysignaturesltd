/** A slow, endless strip of words. The list is repeated once so the loop is seamless; the copy is hidden from screen readers. */
export function Marquee({ items, className = "", dot = "bg-red" }: { items: string[]; className?: string; dot?: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center">
          <span className="display whitespace-nowrap px-6 text-[clamp(1.4rem,2.6vw,2.2rem)] md:px-10">{t}</span>
          <span className={`h-2.5 w-2.5 shrink-0 rotate-45 ${dot}`} aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] ${className}`}>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
