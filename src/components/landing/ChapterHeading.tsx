import type { ReactNode } from "react";

export default function ChapterHeading({ number, label, children, dark = false }: { number: string; label: string; children: ReactNode; dark?: boolean }) {
  return <div className="relative mb-10">
    <span aria-hidden="true" className={`pointer-events-none absolute -top-12 right-0 select-none font-display text-8xl font-bold md:text-[144px] ${dark ? "text-trust-ghost" : "text-ghost"}`}>{number}</span>
    <p className={`relative mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase ${dark ? "text-trust-muted" : "text-muted-foreground"}`}><span className={dark ? "text-accent" : "text-primary"}>{number}</span><span className={`h-px w-8 ${dark ? "bg-trust-line" : "bg-border"}`} />{label}</p>
    <div className="relative">{children}</div>
  </div>;
}