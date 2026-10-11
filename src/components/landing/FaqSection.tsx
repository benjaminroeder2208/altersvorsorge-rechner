import AnimatedSection from "./AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MAX_GRUNDZULAGE_AB_2027, MAX_GRUNDZULAGE_AB_2029, GRUNDZULAGE_SATZ_AB_2027 } from "@/lib/foerderung";

const faqs = [
  {
    q: "Was ist das Altersvorsorgedepot?",
    a: "Das Altersvorsorgedepot ist ein vom Bundestag am 27. März 2026 beschlossenes Modell für die private Altersvorsorge. Es ermöglicht renditeorientierte Investitionen in Fonds oder ETFs — ohne die bisher bei Riester-Produkten übliche Beitragsgarantie. Die Beiträge werden staatlich gefördert.",
  },
  {
    q: "Ist das Gesetz bereits beschlossen?",
    a: "Ja. Der Bundestag hat das Altersvorsorgereformgesetz am 27. März 2026 beschlossen. Das Altersvorsorgedepot startet am 1. Januar 2027.",
  },
  {
    q: "Was unterscheidet das Altersvorsorgedepot von Riester?",
    a: "Der wichtigste Unterschied: Beim Altersvorsorgedepot entfällt die verpflichtende Beitragsgarantie. Dadurch können die Beiträge vollständig am Kapitalmarkt angelegt werden, was langfristig höhere Renditechancen ermöglicht. Zudem soll die Förderstruktur vereinfacht werden. Beim Standardprodukt (Standarddepot Altersvorsorge) sind die Kosten gesetzlich auf maximal 1,0 % p.a. Effektivkosten begrenzt — für andere Depot-Varianten ohne Standardprodukt-Zertifizierung gilt dieser Deckel nicht.",
  },
  {
    q: "Wer kann geförderte Beiträge leisten?",
    a: "Die genauen Fördervoraussetzungen werden im finalen Gesetz festgelegt. Der aktuelle Entwurf sieht eine breite Zugänglichkeit vor, ähnlich dem bisherigen Riester-System. Grundsätzlich sollen rentenversicherungspflichtig Beschäftigte und weitere Personengruppen förderberechtigt sein.",
  },
  {
    q: "Wie hoch ist die maximale Förderung?",
    a: `Die Grundzulage besteht aus zwei Tranchen: 50 % auf Eigenbeiträge bis 360 €/Jahr (max. 180 €) und 25 % auf Eigenbeiträge zwischen 360 € und 1.800 €/Jahr (max. 360 €). Die maximale Grundzulage beträgt ${MAX_GRUNDZULAGE_AB_2027} €/Jahr. Für jedes Kind gibt es zusätzlich bis zu 300 € pro Jahr (100 % der Eigenbeiträge). Dazu kommt ein möglicher Steuervorteil durch den Sonderausgabenabzug.`,
  },
  {
    q: "Was passiert mit dem Geld bei schlechter Marktentwicklung?",
    a: "Da keine Beitragsgarantie vorgesehen ist, kann der Depotwert zwischenzeitlich auch unter die Summe der eingezahlten Beiträge fallen. Bei langfristiger Anlage über 20 oder mehr Jahre haben breit gestreute Aktienportfolios historisch betrachtet positive Renditen erzielt — eine Garantie dafür gibt es allerdings nicht.",
  },
];

const FaqSection = () => (
  <div id="faq" role="region" aria-labelledby="faq-title" className="mt-14 scroll-mt-28 border-t border-border pt-10 md:mt-20 md:pt-14">
      <AnimatedSection delay={0.1} className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <p className="mb-4 text-xs font-medium uppercase text-muted-foreground">Fragen & Antworten</p>
          <h3 id="faq-title" className="max-w-xs font-display text-2xl font-semibold leading-snug md:text-3xl">Häufig gestellte Fragen</h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">Das Wichtigste zu Förderung, Voraussetzungen und Risiken.</p>
        </div>
        <Accordion type="single" collapsible className="min-w-0 border-t border-border">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border transition-colors data-[state=open]:bg-teal-soft/20">
              <AccordionTrigger className="gap-4 px-3 py-6 text-left font-display font-semibold hover:no-underline hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-5 [&>svg]:text-primary">
                <span className="flex min-w-0 items-start gap-4 sm:gap-6"><span aria-hidden="true" className="pt-0.5 font-sans text-xs font-medium text-muted-foreground">0{i + 1}</span><span className="min-w-0 leading-relaxed">{faq.q}</span></span>
              </AccordionTrigger>
              <AccordionContent className="pl-11 pr-5 pb-6 text-sm text-muted-foreground leading-relaxed sm:pl-[4.25rem]">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AnimatedSection>
  </div>
);

export default FaqSection;
