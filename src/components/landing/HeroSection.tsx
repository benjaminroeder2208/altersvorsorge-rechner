import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 20 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.6, delay, ease }
});

const HeroSection = () =>
<section className="relative min-h-[90vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
    {/* Background image */}
    <img
    src="/rechner-screenshot.png"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_top]" />
  

    {/* Dark overlay */}
    <div
    className="absolute inset-0"
    style={{
      background:
      "linear-gradient(to bottom, rgba(10,20,50,0.75) 0%, rgba(10,20,50,0.55) 60%, rgba(10,20,50,0.85) 100%)"
    }} />
  

    <div className="container relative z-10 text-center max-w-3xl mx-auto px-6 py-32">
      {/* Badge */}
      <motion.div {...anim(0.1)} className="mb-6">
        <span
        className="inline-block px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest text-white"
        style={{
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.25)"
        }}>
        
          ✦ Mit KI-Auswertung &amp; Experten-Chat
        </span>
      </motion.div>

      {/* H1 */}
      <motion.h1
      {...anim(0.3)}
      className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
      
        ein Altersvorsorge
      </motion.h1>

      {/* Subtitle */}
      <motion.p
      {...anim(0.5)}
      className="text-base md:text-lg max-w-2xl mx-auto mb-10"
      style={{ color: "rgba(255,255,255,0.8)" }}>
      
        Simuliere es jetzt — mit staatlicher Förderung, KI-Analyse und persönlichem Experten-Chat.
        Kostenlos und unabhängig.
      </motion.p>

      {/* CTAs */}
      <motion.div
      {...anim(0.7)}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
      
        <a
        href="#rechner"
        className="inline-flex items-center px-8 py-4 rounded-full bg-[#1B4FD8] text-white font-medium text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#1B4FD8]/30">
        
          Jetzt berechnen
        </a>
        <a
        href="#mehr"
        className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-medium text-base text-white transition-colors"
        style={{ border: "1px solid rgba(255,255,255,0.4)" }}>
        
          Mehr erfahren
          <ArrowDown className="w-4 h-4" />
        </a>
      </motion.div>

      {/* Disclaimer */}
      <motion.p
      className="text-[11px] max-w-lg mx-auto"
      style={{ color: "rgba(255,255,255,0.5)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}>
      
        Stand: aktueller Gesetzentwurf zur Reform der steuerlich geförderten privaten Altersvorsorge.
        Änderungen im Gesetzgebungsverfahren sind möglich.
      </motion.p>
    </div>
  </section>;


export default HeroSection;