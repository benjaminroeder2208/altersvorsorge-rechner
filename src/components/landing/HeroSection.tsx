import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import HeroIllustration from "./HeroIllustration";

const ease = [0.25, 0.1, 0.25, 1] as const;

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 20 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.6, delay, ease }
});

const HeroSection = () =>
<section className="relative min-h-[auto] md:min-h-[90vh] flex items-center overflow-hidden bg-background">
    {/* Right blue tint — desktop only */}
    <div
    className="absolute top-0 right-0 bottom-0 w-1/2 hidden md:block"
    style={{ background: "#EEF3FF" }} />
  

    <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center py-20 md:py-0 px-6">
      {/* Left column — Text */}
      <div className="flex flex-col items-start">
        {/* Badge */}
        <motion.div {...anim(0.1)} className="mb-6">
          <span
          className="inline-block px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest"
          style={{
            background: "#EEF3FF",
            border: "1px solid #BFDBFE",
            color: "#1B4FD8",
            letterSpacing: "0.05em"
          }}>
          
            ✦ Mit KI-Auswertung & PDF-Auswertung
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
        {...anim(0.3)}
        className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6"
        style={{ letterSpacing: "-0.02em" }}>
        
          <span className="text-foreground">150 € im Monat.</span>
          <br />
          <span style={{ color: "#1B4FD8" }} className="font-bold">255.000 € im Alter.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
        {...anim(0.5)}
        className="text-base text-muted-foreground mb-10 max-w-lg"
        style={{ lineHeight: 1.7 }}>
        
          So viel Kapital könnte ein 35-Jähriger mit 150 € monatlich aufbauen — plus staatliche Förderung des geplanten Altersvorsorgedepots. Jetzt persönliche Altersvorsorge berechnen: mit KI-Analyse und individueller Auswertung als PDF. Kostenlos und unabhängig.
        

      
      
      </motion.p>

        {/* CTAs */}
        <motion.div {...anim(0.7)} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
        
          <a
          href="#rechner"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full text-white font-medium text-base transition-opacity hover:opacity-90"
          style={{ background: "#1B4FD8" }}>
          
            Jetzt berechnen
          </a>
          <a
          href="#vergleich"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-base transition-colors"
          style={{ color: "#1B4FD8" }}>
          
            Mehr erfahren
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
        className="text-xs text-muted-foreground/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}>
        
          Stand: aktueller Gesetzentwurf. Änderungen möglich.
        </motion.p>
      </div>

      {/* Right column — Illustration */}
      <div className="relative h-[280px] md:h-[480px]">
        <HeroIllustration />
      </div>
    </div>
  </section>;


export default HeroSection;