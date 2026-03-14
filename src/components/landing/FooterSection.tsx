import { Link } from "react-router-dom";

const FooterSection = () => (
  <footer className="py-12 border-t border-border">
    <div className="container max-w-5xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
        <div>
          <span className="font-semibold text-sm tracking-tight">altersvorsorge-depot.com</span>
          <p className="text-xs text-muted-foreground mt-1">Informationen zum geplanten Altersvorsorgedepot</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <Link to="/altersvorsorgedepot-foerderung" className="hover:text-foreground transition-colors">Förderung</Link>
          <Link to="/altersvorsorgedepot-auszahlung" className="hover:text-foreground transition-colors">Auszahlung</Link>
          <Link to="/altersvorsorgedepot-vs-riester" className="hover:text-foreground transition-colors">vs. Riester</Link>
          <Link to="/altersvorsorgedepot-vs-etf-sparplan" className="hover:text-foreground transition-colors">vs. ETF-Sparplan</Link>
          <Link to="/altersvorsorgedepot-gesetzesentwurf" className="hover:text-foreground transition-colors">Gesetzentwurf</Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} altersvorsorge-depot.com</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-foreground transition-colors">Impressum</a>
          <a href="#" className="hover:text-foreground transition-colors">Datenschutz</a>
        </div>
      </div>
      <div className="mt-6 text-xs text-muted-foreground/60 text-center max-w-2xl mx-auto leading-relaxed">
        Alle Angaben basieren auf dem aktuellen Stand des Gesetzgebungsverfahrens und stellen keine Anlageberatung dar.
      </div>
    </div>
  </footer>
);

export default FooterSection;
