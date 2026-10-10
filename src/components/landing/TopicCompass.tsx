import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const results = submitted === null ? [] : [...topics.filter((topic) => topic.keywords.test(submitted)), ...topics.filter((topic) => !topic.keywords.test(submitted))].slice(0, 3);
  return <div className="mt-12 border-y border-border py-8 md:mt-16">
    <div className="grid gap-8 md:grid-cols-2">
      <div><p className="mb-3 flex items-center gap-2 text-xs font-semibold text-primary"><Sparkles className="h-4 w-4" />Dein Themen-Kompass</p><h3 className="text-2xl font-semibold">Was beschäftigt dich?</h3><form className="mt-5 flex gap-2" onSubmit={(event) => { event.preventDefault(); if (question.trim()) setSubmitted(question.trim()); }}><Input aria-label="Deine Frage zur Altersvorsorge" placeholder="Zum Beispiel: Was wird gefördert?" value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={300} required className="h-12 min-w-0 bg-card" /><Button type="submit" size="icon" className="h-12 w-12 shrink-0" aria-label="Passende Themen finden"><ArrowRight /></Button></form></div>
      <div aria-live="polite">{submitted !== null ? <ol>{results.map((topic, index) => <li key={topic.to}><Link to={topic.to} className="group flex items-center gap-4 border-b border-border py-4 text-sm"><span className="font-display text-primary">0{index + 1}</span><span className="flex-1">{topic.title}</span><ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></li>)}</ol> : <div className="flex h-full flex-col justify-center"><p className="text-sm leading-relaxed text-muted-foreground">Du möchtest deine persönliche Situation besprechen?</p><Button asChild variant="link" className="mt-2 justify-start px-0"><Link to="/ai-vorsorgeassistent">Zum KI-Vorsorgeassistenten<ArrowUpRight /></Link></Button></div>}</div>
    </div>
  </div>;
}