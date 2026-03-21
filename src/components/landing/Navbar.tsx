import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Rechner" },
  { to: "/rentenluecken-rechner", label: "Rentenlücke" },
  { to: "/altersvorsorgedepot", label: "Altersvorsorgedepot" },
  { to: "/altersvorsorgedepot-foerderung", label: "Förderung" },
  { to: "/blog", label: "Blog" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);
      setShowCta(window.scrollY > 300);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname === to;
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-xl ${
        scrolled ? "shadow-sm border-b border-border/50" : ""
      }`}
    >
      <div className="container max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-3">
        <Link to="/" className="shrink-0 flex items-center" aria-label="altersvorsorge-rechner.com">
          <svg width="148" height="32" viewBox="0 0 148 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M3,30 C7,24 11,17 18,11 L18,30 Z" fill="#1B4FD8" fillOpacity="0.07"/>
            <path d="M3,30 C7,24 11,17 18,11" fill="none" stroke="#1B4FD8" strokeWidth="2" strokeLinecap="round"/>
            <path d="M18,11 C21,7 24,5 29,2" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2.5,2"/>
            <circle cx="3" cy="30" r="1.8" fill="#1B4FD8" fillOpacity="0.3"/>
            <circle cx="11" cy="20" r="2.2" fill="#1B4FD8" fillOpacity="0.65"/>
            <circle cx="18" cy="11" r="2.8" fill="#1B4FD8"/>
            <circle cx="29" cy="2" r="4.5" fill="#F59E0B" fillOpacity="0.2"/>
            <circle cx="29" cy="2" r="2.8" fill="#F59E0B"/>
            <line x1="3" y1="30" x2="33" y2="30" stroke="#1B4FD8" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.2"/>
            <text x="40" y="15" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="500" fill="currentColor" style={{letterSpacing: "-0.3px"}}>altersvorsorge</text>
            <text x="40" y="27" fontFamily="system-ui, sans-serif" fontSize="9.5" fontWeight="400" fill="#9CA3AF" style={{letterSpacing: "0.2px"}}>rechner.com</text>
          </svg>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                isActive(link.to)
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={location.pathname === "/" ? "#faq" : "/#faq"}
            className="px-3 py-1.5 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* Sticky CTA */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className={`shrink-0 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-opacity duration-200 hover:opacity-90 active:scale-[0.97] ${
            showCta ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Berechnen →
        </Link>

        {/* Mobile toggle */}
        <button
          className="sm:hidden p-2 text-muted-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:hidden bg-background border-b border-border px-6 pb-4 space-y-1"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive(link.to)
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/#faq"
            className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
