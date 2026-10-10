import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import ChapterHeading from "./ChapterHeading";
import TopicCompass from "./TopicCompass";

const topics = [
  { to: "/altersvorsorgedepot", label: "Was ist das Altersvorsorgedepot?", desc: "Grundlagen und Funktionsweise des beschlossenen Altersvorsorgedepots.", category: "Grundlagen" },
  { to: "/altersvorsorgedepot-foerderung", label: "Staatliche Förderung", desc: "Grundzulage, Kinderzulage und Steuervorteile im Überblick.", category: "Förderung" },
  { to: "/altersvorsorgedepot-auszahlung", label: "Auszahlung im Alter", desc: "Wie die Entnahme im Ruhestand funktionieren soll.", category: "Ruhestand" },
  { to: "/altersvorsorgedepot-vs-etf-sparplan", label: "Vergleich mit ETF-Sparplan", desc: "Förderung vs. Flexibilität — was passt besser?", category: "Anlage" },
  { to: "/altersvorsorgedepot-vs-riester", label: "Vergleich mit Riester", desc: "Die wichtigsten Unterschiede zum bisherigen Riester-Modell.", category: "Vergleich" },
];

export default function EditorialSections() {
  return <>
    <section id="mehr" aria-labelledby="editorial-title" className="border-b border-border py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <ChapterHeading number="04" label="Wissen, das weiterbringt">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <h2 id="editorial-title" className="max-w-xl break-words text-2xl font-semibold leading-tight sm:text-3xl md:text-5xl">Mehr zum<br className="hidden sm:block" /> Altersvorsorgedepot</h2>
              <p className="max-w-sm text-base leading-relaxed text-muted-foreground lg:pb-1">Vertiefe dein Wissen rund um das beschlossene Altersvorsorgedepot.</p>
            </div>
          </ChapterHeading>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => <AnimatedSection key={topic.to} delay={index * 0.04}>
            <Link to={topic.to} className="group flex h-full min-h-56 flex-col border-t border-border py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:pr-7 lg:min-h-64">
              <div className="mb-6 flex items-center justify-between"><span className="text-xs font-medium uppercase text-muted-foreground">{topic.category}</span><span aria-hidden="true" className="font-display text-3xl font-medium tabular-nums text-ghost">0{index + 1}</span></div>
              <h3 className="max-w-xs text-xl font-semibold leading-snug transition-colors group-hover:text-primary">{topic.label}</h3>
              <p className="mb-6 mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{topic.desc}</p>
              <ArrowUpRight aria-hidden="true" className="mt-auto h-5 w-5 text-primary transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>)}
          <AnimatedSection delay={0.2} className="border-t border-border py-7 sm:pr-7">
            <p className="mb-6 text-xs font-medium uppercase text-muted-foreground">Persönliche Orientierung</p>
            <h3 className="text-xl font-semibold">Deine Fragen.<br />Deine Vorsorge.</h3>
            <p className="mb-5 mt-3 text-sm leading-relaxed text-muted-foreground">Besprich deine Situation mit dem KI-Vorsorgeassistenten.</p>
            <Button asChild variant="link" className="h-auto justify-start whitespace-normal px-0 text-left"><Link to="/ai-vorsorgeassistent">Zum Assistenten <ArrowUpRight aria-hidden="true" /></Link></Button>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <section aria-labelledby="guides-title" className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <AnimatedSection className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div><p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground"><BookOpen aria-hidden="true" className="h-4 w-4 text-primary" />Weiterlesen</p><h2 id="guides-title" className="text-3xl font-semibold md:text-4xl">Unsere Ratgeber</h2><p className="mt-3 text-muted-foreground">Fundierte Artikel rund um Altersvorsorge und Rente.</p></div>
          <Button asChild variant="link" className="px-0"><Link to="/blog">Alle Ratgeber <ArrowRight aria-hidden="true" /></Link></Button>
        </AnimatedSection>
        <div className="grid gap-x-12 lg:grid-cols-[1.2fr_1fr]">
          <Link to="/blog/altersvorsorgedepot-2027" className="group relative flex flex-col border-y border-border py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:py-10">
            <p className="mb-5 flex items-center gap-2 text-xs font-medium uppercase text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Im Fokus · Reform 2027</p>
            <h3 className="max-w-md break-words text-2xl font-semibold leading-tight transition-colors group-hover:text-primary sm:text-3xl md:text-4xl">Altersvorsorgedepot<br className="hidden sm:block" /> 2027 erklärt</h3>
            <p className="mb-8 mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">Alles zum neuen Altersvorsorgedepot: Förderung, Funktionsweise, Start 2027.</p>
            <span className="mt-auto flex items-center gap-3 text-sm font-medium text-primary">Artikel lesen <ArrowUpRight aria-hidden="true" className="h-5 w-5 transition-transform motion-safe:group-hover:translate-x-1" /></span>
          </Link>
          <div className="flex flex-col">
            {[
              { to: "/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst", label: "Was ist die Rentenlücke?", desc: "Wie groß die Lücke wirklich ist — und was du dagegen tun kannst.", tag: "Rentenwissen" },
              { to: "/rentenluecken-rechner", label: "Rentenlückenrechner", desc: "Berechne deine persönliche Rentenlücke in 30 Sekunden.", tag: "Deine Zahlen" },
            ].map((guide) => <Link key={guide.to} to={guide.to} className="group flex flex-1 flex-col border-b border-border py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:first:border-t">
              <p className="mb-3 text-xs font-medium uppercase text-muted-foreground">{guide.tag}</p>
              <div className="flex items-start justify-between gap-4"><h3 className="text-xl font-semibold transition-colors group-hover:text-primary">{guide.label}</h3><ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-primary transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" /></div>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{guide.desc}</p>
            </Link>)}
          </div>
        </div>
      </div>
    </section>
    <TopicCompass />
  </>;
}