import { Check, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ChapterHeading from "./ChapterHeading";
import { Button } from "@/components/ui/button";

const items = [
  ["Unabhängig", "Keine Produktempfehlungen. Deine Zahlen stehen im Mittelpunkt."],
  ["Nachvollziehbar", "Offene Annahmen und Quellen statt versteckter Versprechen."],
  ["Kostenlos", "Rechner und Ratgeber ohne Bezahlschranke."],
];

export default function TrustSection() {
  return <section id="unabhaengigkeit" className="relative bg-trust py-16 text-trust-foreground md:py-24">
    <div className="container max-w-6xl px-6">
      <ChapterHeading number="03" label="Eine gute Grundlage" dark><h2 className="text-3xl font-semibold leading-tight md:text-5xl">Deine Zukunft verdient<br />klare Antworten.</h2></ChapterHeading>
      <div className="grid gap-8 border-t border-trust-line pt-8 md:grid-cols-3">
        {items.map(([title, text]) => <div key={title}><Check className="mb-4 h-5 w-5 text-accent" /><h3 className="mb-2 text-lg font-semibold">{title}</h3><p className="max-w-xs text-sm leading-relaxed text-trust-muted">{text}</p></div>)}
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-trust-line pt-6"><p className="text-xs text-trust-muted">Grundlage: Gesetzesbeschluss vom 27. März 2026 · Drs. 21/4996</p><Button asChild variant="ghost" className="text-trust-foreground hover:bg-trust-line hover:text-trust-foreground"><Link to="/ueber-uns">Wer dahintersteht<ArrowUpRight /></Link></Button></div>
    </div>
  </section>;
}