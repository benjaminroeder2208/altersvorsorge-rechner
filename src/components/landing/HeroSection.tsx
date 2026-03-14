import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Subtle gradient orb */}
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

    <div className="container relative z-10 text-center max-w-4xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">Bald verfügbar</span>
        </div>
      </motion.div>

      <motion.h1
        className="heading-hero mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Die Zukunft der Altersvorsorge beginnt mit einem Depot.
      </motion.h1>

      <motion.p
        className="text-body max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Ein modernes Altersvorsorge-Depot ermöglicht langfristigen Vermögensaufbau
        mit ETFs und staatlicher Förderung.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <a
          href="#waitlist"
          className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
        >
          Frühzugang zum Rechner erhalten
        </a>
        <a
          href="#problem"
          className="inline-flex items-center gap-2 px-6 py-4 text-muted-foreground font-medium text-base transition-colors hover:text-foreground"
        >
          Mehr erfahren
          <ArrowDown className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
