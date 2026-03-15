import AnimatedSection from "./AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Was ist das Altersvorsorgedepot?",
    a: "Das Altersvorsorgedepot ist ein im aktuellen Gesetzentwurf vorgesehenes Modell für die private Altersvorsorge. Es ermöglicht renditeorientierte Investitionen in Fonds oder ETFs — ohne die bisher bei Riester-Produkten übliche Beitragsgarantie. Die Beiträge werden staatlich gefördert.",
  },
  {
    q: "Ist das Gesetz bereits beschlossen?",
    a: "Nein. Der Gesetzentwurf befindet sich noch im parlamentarischen Verfahren. Alle auf dieser Seite dargestellten Informationen basieren auf dem aktuellen Entwurf und können sich im Laufe des Gesetzgebungsprozesses ändern.",
  },
  {
    q: "Was unterscheidet das Altersvorsorgedepot von Riester?",
    a: "Der wichtigste Unterschied: Beim Altersvorsorgedepot entfällt die verpflichtende Beitragsgarantie. Dadurch können die Beiträge vollständig am Kapitalmarkt angelegt werden, was langfristig höhere Renditechancen ermöglicht. Zudem soll die Förderstruktur vereinfacht und die Kosten durch einen Effektivkostendeckel begrenzt werden.",
  },
  {
    q: "Wer kann geförderte Beiträge leisten?",
    a: "Die genauen Fördervoraussetzungen werden im finalen Gesetz festgelegt. Der aktuelle Entwurf sieht eine breite Zugänglichkeit vor, ähnlich dem bisherigen Riester-System. Grundsätzlich sollen rentenversicherungspflichtig Beschäftigte und weitere Personengruppen förderberechtigt sein.",
  },
  {
    q: "Wie hoch ist die maximale Förderung?",
    a: "Die Grundzulage beträgt im Entwurf bis zu 35 % auf Eigenbeiträge bis 1.200 € und 20 % auf Beiträge zwischen 1.200 € und 1.800 €. Für jedes Kind gibt es zusätzlich bis zu 300 € pro Jahr. Dazu kommt ein möglicher Steuervorteil durch den Sonderausgabenabzug.",
  },
  {
    q: "Was passiert mit dem Geld bei schlechter Marktentwicklung?",
    a: "Da keine Beitragsgarantie vorgesehen ist, kann der Depotwert zwischenzeitlich auch unter die Summe der eingezahlten Beiträge fallen. Bei langfristiger Anlage über 20 oder mehr Jahre haben breit gestreute Aktienportfolios historisch betrachtet positive Renditen erzielt — eine Garantie dafür gibt es allerdings nicht.",
  },
];

const FaqSection = () => (
  <section id="faq" className="section-padding">
    <div className="container max-w-3xl mx-auto px-6">
      <AnimatedSection className="mb-12">
        <h2 className="heading-section">Häufig gestellte Fragen</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-secondary rounded-2xl px-6 border-none">
              <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AnimatedSection>
    </div>
  </section>
);

export default FaqSection;