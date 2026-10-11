import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MAX_GRUNDZULAGE_AB_2027 } from "@/lib/foerderung";

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

const FaqSection = ({ query }: { query: string | null }) => {
  const terms = query?.toLocaleLowerCase("de-DE").split(/\s+/).filter((term) => term.length > 2) ?? [];
  const matches = (faq: typeof faqs[number]) => terms.some((term) => `${faq.q} ${faq.a}`.toLocaleLowerCase("de-DE").includes(term));
  const answers = terms.length ? [...faqs.filter(matches), ...faqs.filter((faq) => !matches(faq))] : faqs;

  return (
  <div id="faq" role="region" aria-label="Antworten zur Altersvorsorge" className="scroll-mt-28">
        <Accordion key={query ?? "all"} type="single" collapsible className="min-w-0">
          {answers.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q} className="border-border transition-colors data-[state=open]:bg-teal-soft/20">
              <AccordionTrigger className="gap-4 py-5 text-left text-sm font-medium hover:no-underline hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:text-primary">
                <span className="min-w-0 leading-relaxed">{faq.q}</span>
              </AccordionTrigger>
              <AccordionContent className="pr-6 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
  </div>
  );
};

export default FaqSection;
