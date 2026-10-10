import { useState, useEffect } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatHeroEuro, getHeroExample, HERO_PERSONAS, useHeroPersona } from "./heroPersonas";

const navLinks = [
  { to: "/", label: "Rechner" },
  { to: "/rentenluecken-rechner", label: "Rentenlücke" },
  { to: "/fruehstart-rente-rechner", label: "Frühstartrente" },
  { to: "/riester-vergleich-rechner", label: "Riestervergleich" },
  { to: "/altersvorsorgedepot", label: "Altersvorsorgedepot" },
  { to: "/blog", label: "Blog" },
];

const LogoIcon = () => (
  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-trust">
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M6 29H30" className="stroke-trust-foreground" strokeOpacity="0.3" strokeWidth="1" />
      <path d="M7 26C17 26 22 22 28 8" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="8" r="2.5" className="fill-primary" />
    </svg>
  </span>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const hero = useHeroPersona();
  const persona = HERO_PERSONAS[hero.index];
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);
      setShowCta(window.scrollY > 300);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname, location.hash]);
  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  const calculatorLink = location.pathname === "/" ? "#rechner" : "/#rechner";
  const searchLink = `/suche${location.pathname === "/suche" ? location.search : ""}`;

  return (
    <nav aria-label="Hauptnavigation" className="sticky top-0 z-50 w-full px-3 py-3 sm:px-6">
      <div className={`relative mx-auto max-w-7xl rounded-2xl border border-border/70 backdrop-blur-xl transition-colors duration-300 ${scrolled ? "bg-background/95 shadow-header" : "bg-background/80"}`}>
        <div className="flex h-16 items-center justify-between gap-2 px-3 sm:gap-4 sm:px-5">
          <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="altersvorsorge-rechner.com">
            <LogoIcon />
            <span className="flex flex-col font-display leading-tight sm:block">
              <span className="text-[13px] font-bold text-foreground sm:text-sm">altersvorsorge<span className="hidden text-primary sm:inline">—</span></span>
              <span className="text-[11px] font-medium text-foreground sm:text-sm">rechner<span className="text-muted-foreground">.com</span></span>
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link, index) => (
              <Link key={link.to} to={link.to} aria-current={location.pathname === link.to ? "page" : undefined}
                className={`group relative rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${location.pathname === link.to ? "bg-primary-soft text-primary-soft-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                <span aria-hidden="true" className="pointer-events-none absolute -top-1.5 left-2.5 translate-y-1 text-[9px] font-display text-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">{String(index + 1).padStart(2, "0")}</span>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {location.pathname === "/" && hero.visible && <span className="hidden items-center gap-2 rounded-full border border-border bg-teal-soft px-3 py-1.5 text-[10px] font-medium text-trust lg:flex xl:hidden 2xl:flex"><span className="h-1 w-1 rounded-full bg-trust" />{persona.name} · {formatHeroEuro(getHeroExample(persona.age).capitalWithFunding)} €</span>}
            <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground max-[360px]:hidden" title="Suche öffnen">
              <Link to={searchLink} aria-label="Suche öffnen"><Search /></Link>
            </Button>
            {showCta && (
              <Button asChild size="sm" className="h-9 rounded-lg px-3 text-xs sm:text-sm">
                <Link to={calculatorLink} onClick={(event) => {
                  if (location.pathname === "/") {
                    event.preventDefault();
                    setMobileOpen(false);
                    document.getElementById("rechner")?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
                  }
                }}>Berechnen<ArrowUpRight className="hidden sm:block" /></Link>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-foreground xl:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"} aria-expanded={mobileOpen} aria-controls="site-mobile-navigation">
              {mobileOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div id="site-mobile-navigation" className="grid max-h-[70dvh] grid-cols-1 gap-1 overflow-y-auto border-t border-border px-3 py-3 sm:grid-cols-2 xl:hidden">
            <Button asChild variant="ghost" className="hidden justify-start max-[360px]:flex">
              <Link to={searchLink}><Search />Suche öffnen</Link>
            </Button>
            {navLinks.map((link, index) => (
              <Link key={link.to} to={link.to} aria-current={location.pathname === link.to ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${location.pathname === link.to ? "bg-primary-soft text-primary-soft-foreground font-semibold" : "text-foreground hover:bg-muted"}`}>
                <span className="font-display text-[10px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>{link.label}
              </Link>
            ))}
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px overflow-hidden" aria-hidden="true">
          <motion.div className="h-full origin-left bg-primary" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
