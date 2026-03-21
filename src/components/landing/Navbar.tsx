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

const LogoIcon = () => (
  <svg
    width="26"
    height="24"
    viewBox="0 0 26 24"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path d="M2,22 C5,17 9,12 15,7 L15,22 Z"
      fill="#1B4FD8" fillOpacity="0.08" />
    <path d="M2,22 C5,17 9,12 15,7"
      fill="none" stroke="#1B4FD8"
      strokeWidth="1.8" strokeLinecap="round" />
    <path d="M15,7 C18,4 20,3 23,1"
      fill="none" stroke="#F59E0B"
      strokeWidth="1.6" strokeLinecap="round"
      strokeDasharray="2,1.8" />
    <circle cx="2" cy="22" r="1.4"
      fill="#1B4FD8" fillOpacity="0.3" />
    <circle cx="9" cy="14" r="1.7"
      fill="#1B4FD8" fillOpacity="0.65" />
    <circle cx="15" cy="7" r="2.2"
      fill="#1B4FD8" />
    <circle cx="23" cy="1" r="3.5"
      fill="#F59E0B" fillOpacity="0.2" />
    <circle cx="23" cy="1" r="2.2"
      fill="#F59E0B" />
    <line x1="2" y1="22" x2="26" y2="22"
      stroke="#1B4FD8" strokeWidth="1"
      strokeLinecap="round" strokeOpacity="0.2" />
  </svg>
);

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
        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 flex items-center gap-2"
          aria-label="altersvorsorge-rechner.com"
        >
          <LogoIcon />
          <div className="flex flex-col leading-none">
            <span
              className="text-[13px] font-medium text-foreground"
              style={{ letterSpacing: "-0.3px" }}
            >
              altersvorsorge
            </span>
            <span
              className="text-[9.5px] font-normal text-muted-foreground mt-0.5"
              style={{ letterSpacing: "0.2px" }}
            >
              rechner.com
            </span>
          </div>
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
