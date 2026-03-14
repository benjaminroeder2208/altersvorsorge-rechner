import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

    <div className="container relative z-10 text-center max-w-4xl mx-auto px-6 py-32">
      <motion.h1
        className="heading-hero mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Das Altersvorsorgedepot
        <br />
        einfach erklärt
      </motion.h1>

      <motion.p
        className="text-body max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Die Bundesregierung plant eine grundlegende Reform der privaten Altersvorsorge.
        Ein zentraler Baustein: das Altersvorsorgedepot — ein staatlich gefördertes Depot
        für langfristigen Vermögensaufbau mit Fonds und ETFs.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <a
          href="#rechner"
          className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
        >
          Jetzt berechnen
        </a>
        <a
          href="#was-ist"
          className="inline-flex items-center gap-2 px-6 py-4 text-muted-foreground font-medium text-base transition-colors hover:text-foreground"
        >
          Mehr erfahren
          <ArrowDown className="w-4 h-4" />
        </a>
      </motion.div>

      <motion.p
        className="text-xs text-muted-foreground/60 max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Stand: aktueller Gesetzentwurf zur Reform der steuerlich geförderten privaten Altersvorsorge. Änderungen im Gesetzgebungsverfahren sind möglich.
      </motion.p>
    </div>
  </section>
);

export default HeroSection;