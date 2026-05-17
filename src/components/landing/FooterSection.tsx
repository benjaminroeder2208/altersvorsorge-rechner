import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { openCookieSettings } from "@/lib/cookieConsent";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/>
  </svg>
);

const sections = [
{
  title: "Rechner",
  links: [
  { to: "/", label: "Altersvorsorgedepot Rechner" },
  { to: "/rentenluecken-rechner", label: "Rentenlückenrechner" },
  { to: "/fruehstart-rente-rechner", label: "Frühstartrentenrechner" },
  { to: "/riester-vergleich-rechner", label: "Riestervergleich" }]

},
{
  title: "Altersvorsorgedepot",
  links: [
  { to: "/altersvorsorgedepot", label: "Überblick" },
  { to: "/altersvorsorgedepot-foerderung", label: "Förderung" },
  { to: "/altersvorsorgedepot-auszahlung", label: "Auszahlung" },
  { to: "/altersvorsorgedepot-gesetz", label: "Das Gesetz" }]

},
{
  title: "Vergleiche",
  links: [
  { to: "/altersvorsorgedepot-vs-riester", label: "vs. Riester" },
  { to: "/altersvorsorgedepot-vs-etf-sparplan", label: "vs. ETF-Sparplan" }]

},
{
  title: "Informationen",
  links: [
  { to: "/blog", label: "Blog" },
  { to: "/newsletter", label: "Newsletter & Checkliste" },
  { to: "/einbetten", label: "Rechner einbetten" },
  { to: "/ueber-uns", label: "Über Uns" }]

}];


const FooterSection = () =>
<footer className="py-16 border-t border-border bg-secondary/30">
    <div className="container max-w-5xl mx-auto px-6">
      <div className="max-w-xl mx-auto mb-10 pb-8 border-b border-border text-center">
        <p className="font-semibold text-sm mb-4">Wer wir sind</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          altersvorsorge-rechner.com wurde von Benjamin Röder gegründet — mit über 20 Jahren Erfahrung in der Finanzbranche. Unser Ziel: Altersvorsorge verständlich machen — ohne Bankberater-Sprache. Alle Inhalte und Rechner sind kostenlos.{" "}
          <Link to="/ueber-uns" className="text-foreground underline-offset-4 hover:underline font-medium">
            Mehr über uns
          </Link>
          .
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {sections.map((section) =>
      <div key={section.title}>
            <p className="font-semibold text-sm mb-4">{section.title}</p>
            <ul className="space-y-2.5">
              {section.links.map((link) =>
          <li key={link.to}>
                  {"isAnchor" in link ?
            <a
              href={link.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              
                      {link.label}
                    </a> :

            <Link
              to={link.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              
                      {link.label}
                    </Link>
            }
                </li>
          )}
            </ul>
          </div>
      )}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-semibold text-foreground text-sm">
            altersvorsorge-rechner.com
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/suche" className="hover:text-foreground transition-colors">Suche</Link>
          <Link to="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
          <button
            type="button"
            onClick={openCookieSettings}
            aria-haspopup="dialog"
            aria-label="Cookie-Einstellungen öffnen"
            title="Cookie-Einstellungen öffnen"
            className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            <Cookie className="h-3.5 w-3.5" aria-hidden="true" />
            Cookie-Einstellungen
          </button>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/company/altersvorsorge-rechner-com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/altersvorsorge.rechner/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>
        <p>© {new Date().getFullYear()} altersvorsorge-rechner.com</p>
      </div>

      <div className="mt-6 text-xs text-muted-foreground/60 text-center max-w-2xl mx-auto leading-relaxed">
        Alle Inhalte und Berechnungen dienen ausschließlich der allgemeinen Information und stellen keine Anlage-, Steuer- oder Rechtsberatung dar. Angaben zum Altersvorsorgedepot basieren auf dem Altersvorsorgereformgesetz (beschlossen 27.03.2026).
      </div>
    </div>
  </footer>;


export default FooterSection;