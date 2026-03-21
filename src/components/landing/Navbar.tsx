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
        <Link to="/" className="shrink-0 flex items-center">
          <svg width="172" height="36" viewBox="0 0 172 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M4,34 C8,28 14,20 22,13 L22,34 Z" fill="#1B4FD8" fillOpacity="0.07"/>
            <path d="M4,34 C8,28 14,20 22,13" fill="none" stroke="#1B4FD8" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M22,13 C26,8 30,5 36,2" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeDasharray="2.5,2"/>
            <circle cx="4" cy="34" r="2" fill="#1B4FD8" opacity="0.3"/>
            <circle cx="13" cy="24" r="2.5" fill="#1B4FD8" opacity="0.6"/>
            <circle cx="22" cy="13" r="3" fill="#1B4FD8"/>
            <circle cx="36" cy="2" r="5" fill="#F59E0B" opacity="0.2"/>
            <circle cx="36" cy="2" r="3" fill="#F59E0B"/>
            <line x1="4" y1="34" x2="40" y2="34" stroke="#1B4FD8" strokeWidth="1.2" strokeLinecap="round" opacity="0.2"/>
            <text x="50" y="18" fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="500" fill="currentColor" letterSpacing="-0.3">altersvorsorge</text>
            <text x="50" y="31" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="400" fill="#9CA3AF" letterSpacing="0.2">rechner.com</text>
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
