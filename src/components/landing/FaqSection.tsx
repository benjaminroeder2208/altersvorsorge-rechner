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
    a: "Das Altersvorsorgedepot ist ein im Gesetzentwurf vorgesehenes Modell für die private Altersvorsorge. Es ermöglicht renditeorientierte Investitionen in Fonds oder ETFs — ohne die bisher übliche Beitragsgarantie.",
  },
  {
    q: "Ist das Gesetz bereits beschlossen?",
    a: "Nein. Der Gesetzentwurf befindet sich noch im parlamentarischen Verfahren. Änderungen im Laufe des Gesetzgebungsprozesses sind möglich.",
  },
  {
    q: "Was unterscheidet das Modell von Riester?",
    a: "Im Gegensatz zu Riester-Produkten soll das Altersvorsorgedepot ohne verpflichtende Beitragsgarantie auskommen und stärker auf Kapitalmarktrenditen setzen. Die Förderstruktur soll vereinfacht werden.",
  },
  {
    q: "Wer kann geförderte Beiträge leisten?",
    a: "Die genauen Fördervoraussetzungen werden im finalen Gesetz festgelegt. Der aktuelle Entwurf sieht eine breite Zugänglichkeit für förderberechtigte Personen vor.",
  },
  {
    q: "Wann wird der Rechner verfügbar sein?",
    a: "Der Rechner befindet sich in der Entwicklung. Sobald belastbare Rahmenbedingungen aus dem Gesetzgebungsverfahren vorliegen, wird er veröffentlicht.",
  },
];

const FaqSection = () => (
  <section id="faq" className="section-padding">
    <div className="container max-w-2xl mx-auto px-6">
      <AnimatedSection className="text-center mb-16">
        <h2 className="heading-section">Häufig gestellte Fragen</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 border-none">
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