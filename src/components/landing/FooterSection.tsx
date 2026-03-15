import { Link } from "react-router-dom";

const sections = [
  {
    title: "Rechner",
    links: [
      { to: "/", label: "Altersvorsorgedepot Rechner" },
      { to: "/rentenluecken-rechner", label: "Rentenlückenrechner" },
    ],
  },
  {
    title: "Altersvorsorgedepot",
    links: [
      { to: "/altersvorsorgedepot", label: "Überblick" },
      { to: "/altersvorsorgedepot-foerderung", label: "Förderung" },
      { to: "/altersvorsorgedepot-auszahlung", label: "Auszahlung" },
      { to: "/altersvorsorgedepot-gesetz", label: "Gesetzentwurf" },
    ],
  },
  {
    title: "Vergleiche",
    links: [
      { to: "/altersvorsorgedepot-vs-riester", label: "vs. Riester" },
      { to: "/altersvorsorgedepot-vs-etf-sparplan", label: "vs. ETF-Sparplan" },
    ],
  },
  {
    title: "Informationen",
    links: [
      { to: "/blog", label: "Blog" },
      { to: "/#faq", label: "FAQ", isAnchor: true },
    ],
  },
];

const FooterSection = () => (
  <footer className="py-16 border-t border-border bg-secondary/30">
    <div className="container max-w-5xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="font-semibold text-sm mb-4">{section.title}</p>
            <ul className="space-y-2.5">
              {section.links.map((link) => (
                <li key={link.to}>
                  {"isAnchor" in link ? (
                    <a
                      href={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-semibold text-foreground text-sm">
            altersvorsorge-rechner.com
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
        </div>
        <p>© {new Date().getFullYear()} altersvorsorge-rechner.com</p>
      </div>

      <div className="mt-6 text-xs text-muted-foreground/60 text-center max-w-2xl mx-auto leading-relaxed">
        Alle Angaben basieren auf dem aktuellen Stand des Gesetzgebungsverfahrens und stellen keine Anlageberatung dar.
      </div>
    </div>
  </footer>
);

export default FooterSection;
