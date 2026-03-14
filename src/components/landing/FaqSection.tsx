import AnimatedSection from "./AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Was ist ein Altersvorsorge-Depot?",
    a: "Ein Altersvorsorge-Depot ist ein speziell für die Altersvorsorge konzipiertes Wertpapierdepot, in dem Sie langfristig in ETFs und andere Anlageformen investieren können — mit steuerlichen Vorteilen und staatlicher Förderung.",
  },
  {
    q: "Wie funktionieren ETF-Investments?",
    a: "ETFs (Exchange Traded Funds) bilden Indizes wie den MSCI World ab und ermöglichen Ihnen, mit einem einzigen Produkt in Tausende von Unternehmen weltweit zu investieren — kostengünstig und transparent.",
  },
  {
    q: "Welche Rendite ist realistisch?",
    a: "Historisch haben globale Aktienmärkte langfristig durchschnittlich 7–8 % Rendite pro Jahr erzielt. Vergangene Ergebnisse sind keine Garantie für zukünftige Renditen.",
  },
  {
    q: "Wann wird der Rechner verfügbar sein?",
    a: "Wir arbeiten intensiv an der Fertigstellung. Tragen Sie sich in die Warteliste ein, um als Erster informiert zu werden, sobald der Rechner online geht.",
  },
];

const FaqSection = () => (
  <section className="section-padding bg-secondary">
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
