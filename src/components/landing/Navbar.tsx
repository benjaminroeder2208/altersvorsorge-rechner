import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/altersvorsorgedepot-rechner", label: "Rechner" },
  { to: "/altersvorsorgedepot", label: "Altersvorsorgedepot" },
  { to: "/altersvorsorgedepot-foerderung", label: "Förderung" },
  { to: "/altersvorsorgedepot-vs-riester", label: "Vergleich" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
        <Link to="/altersvorsorgedepot-rechner" className="font-semibold text-sm tracking-tight">
          altersvorsorge-depot.com
        </Link>
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors hidden sm:block ${
                location.pathname === link.to
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#faq"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            FAQ
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
