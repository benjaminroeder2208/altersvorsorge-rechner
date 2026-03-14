import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import CalculatorPreview from "@/components/landing/CalculatorPreview";
import FaqSection from "@/components/landing/FaqSection";
import FooterSection from "@/components/landing/FooterSection";
import AnimatedSection from "@/components/landing/AnimatedSection";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const topicLinks = [
  { to: "/altersvorsorgedepot", label: "Was ist das Altersvorsorgedepot?", desc: "Grundlagen und Funktionsweise des geplanten Altersvorsorgedepots." },
  { to: "/altersvorsorgedepot-foerderung", label: "Staatliche Förderung", desc: "Grundzulage, Kinderzulage und Steuervorteile im Überblick." },
  { to: "/altersvorsorgedepot-auszahlung", label: "Auszahlung im Alter", desc: "Wie die Entnahme im Ruhestand funktionieren soll." },
  { to: "/altersvorsorgedepot-vs-etf-sparplan", label: "Vergleich mit ETF-Sparplan", desc: "Förderung vs. Flexibilität — was passt besser?" },
  { to: "/altersvorsorgedepot-vs-riester", label: "Vergleich mit Riester", desc: "Die wichtigsten Unterschiede zum bisherigen Riester-Modell." },
];

const RechnerPage = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <CalculatorPreview />

      {/* Topic links section */}
      <section className="section-padding">
        <div className="container max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Mehr zum Altersvorsorgedepot</h2>
            <p className="text-muted-foreground mt-2">Vertiefen Sie Ihr Wissen rund um das geplante Altersvorsorgedepot.</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-4">
              {topicLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-sm mb-1">{link.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{link.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FaqSection />
      <FooterSection />
    </main>
  </>
);

export default RechnerPage;
