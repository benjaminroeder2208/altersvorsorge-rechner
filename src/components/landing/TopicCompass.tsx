import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChapterHeading from "./ChapterHeading";
import AnimatedSection from "./AnimatedSection";
import FaqSection from "./FaqSection";

const topics = [
  { title: "Staatliche Förderung verstehen", to: "/altersvorsorgedepot-foerderung", keywords: /förder|zulage|kind|staat|steuer/i },
  { title: "Deine Rentenlücke berechnen", to: "/rentenluecken-rechner", keywords: /lücke|rente|gehalt|einkommen|monat/i },
  { title: "Altersvorsorgedepot oder ETF-Sparplan?", to: "/altersvorsorgedepot-vs-etf-sparplan", keywords: /etf|fonds|spar|rendite|depot/i },
  { title: "Riester und Altersvorsorgedepot vergleichen", to: "/altersvorsorgedepot-vs-riester", keywords: /riester|vertrag|wechsel|kündig/i },
  { title: "Auszahlung im Ruhestand", to: "/altersvorsorgedepot-auszahlung", keywords: /auszahl|ruhestand|entnahme/i },
];

export default function TopicCompass() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const results = submitted === null ? topics : [...topics.filter((topic) => topic.keywords.test(submitted)), ...topics.filter((topic) => !topic.keywords.test(submitted))].slice(0, 3);
  return <section aria-labelledby="compass-title" className="border-y border-border bg-teal-soft/30 section-padding">
    <div className="container mx-auto max-w-6xl px-6">
      <AnimatedSection>
        <ChapterHeading number="05" label="Dein Themen-Kompass">
          <h2 id="compass-title" className="heading-section max-w-2xl">Was beschäftigt dich?</h2>
        </ChapterHeading>
      </AnimatedSection>
      <AnimatedSection delay={0.1} className="grid gap-10 lg:grid-cols-2 lg:gap-20">
      <div>
        <p className="mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">Förderung, Rentenlücke oder Riester: Finde das passende Thema und Antworten auf die häufigsten Fragen.</p>
        <form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); if (question.trim()) setSubmitted(question.trim()); }}>
          <Input aria-label="Deine Frage zur Altersvorsorge" placeholder="Was möchtest du wissen?" value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={300} required className="h-14 min-w-0 rounded-md bg-background text-base" />
          <Button type="submit" size="icon" className="h-14 w-14 shrink-0 rounded-md" aria-label="Passende Themen finden"><ArrowRight aria-hidden="true" /></Button>
        </form>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {["Förderung", "Rentenlücke", "Riester"].map((suggestion) => <Button key={suggestion} type="button" variant="link" className="h-9 px-0 text-sm text-muted-foreground hover:text-primary" onClick={() => { setQuestion(suggestion); setSubmitted(suggestion); }}>{suggestion}<ArrowUpRight aria-hidden="true" className="h-3 w-3" /></Button>)}
        </div>
      </div>
      <div className="min-h-56 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0" aria-live="polite" aria-atomic="true">
         <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">{submitted !== null ? "Passend zu deiner Frage" : "Deine Themen im Überblick"}</p><ol>{results.map((topic, index) => <li key={topic.to}><Link to={topic.to} className="group flex min-h-16 items-center gap-4 border-b border-border py-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span aria-hidden="true" className="font-display text-primary">0{index + 1}</span><span className="flex-1 font-medium transition-colors group-hover:text-primary">{topic.title}</span><ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-primary transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" /></Link></li>)}</ol>
      </div>
      </AnimatedSection>
       <FaqSection />
    </div>
  </section>;
}