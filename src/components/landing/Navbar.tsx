import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : ""
      }`}
    >
      <div className="container max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-semibold text-sm tracking-tight">altersvorsorge-rechner.com</span>
        <a
          href="#waitlist"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Frühzugang
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
