import CalculatorPageHeader from "@/components/landing/CalculatorPageHeader";
import ChapterHeading from "@/components/landing/ChapterHeading";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import PageHead from "@/components/seo/PageHead";
import RentenlueckenRechner from "@/components/landing/RentenlueckenRechner";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/rentenluecken-rechner";

const jsonLd = [
{
  "@type": "WebApplication",
  name: "Rentenlückenrechner",
  url: `${BASE}${PATH}`,
  description: "Berechne deine persönliche Rentenlücke in 30 Sekunden.",
  applicationCategory: "FinanceApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }
},
{
  "@type": "BreadcrumbList",
  itemListElement: [
  { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
  { "@type": "ListItem", position: 2, name: "Rentenlückenrechner", item: `${BASE}${PATH}` }]

}];


const RentenlueckenRechnerPage = () =>
<>
    <PageHead
    title="Rentenlückenrechner — Rentenlücke kostenlos berechnen"
    description="Berechne deine Rentenlücke in 30 Sekunden: Wie viel fehlt dir monatlich im Ruhestand – und was musst du zurücklegen, um die Lücke zu schließen?"
    path={PATH}
    jsonLd={jsonLd} />
  
    <Navbar />

    <main className="calculator-subpage overflow-x-clip pt-28 pb-20 md:pt-36">
      <div className="container max-w-6xl mx-auto px-5 md:px-8">
          <CalculatorPageHeader title="Rentenlückenrechner." breadcrumb="Rentenlückenrechner" description="Berechne in 30 Sekunden, wie groß deine persönliche Rentenlücke ist — und was du monatlich brauchst, um sie zu schließen." />

        <RentenlueckenRechner />

        {/* Bottom text section */}
        <div className="mt-20 border-t border-border pt-12 space-y-4">
          <ChapterHeading number="04" label="Einordnung"><h2 className="heading-section">Was bedeutet das für dich?</h2></ChapterHeading>
          <p className="text-base leading-relaxed text-muted-foreground">
            Die Rentenlücke ist für die meisten Berufstätigen in Deutschland real — sie liegt häufig zwischen 800 und 1.600 € pro Monat. Ab 2027 bietet das neue Altersvorsorgedepot eine staatlich geförderte Möglichkeit, diese Lücke gezielt zu schließen. Wer früh anfängt, braucht weniger monatlichen Eigenbeitrag — der Zinseszins und die Förderung arbeiten für dich.
          </p>
          <Link
          to="/altersvorsorgedepot"
          className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline">
          
            Mehr zum Altersvorsorgedepot erfahren <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Weiterführende Artikel */}
        <div className="mt-12">
          <p className="text-sm font-semibold mb-4">Weiterführende Artikel</p>
          <div className="space-y-2">
            <Link to="/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst" className="group flex items-center justify-between gap-4 border-b border-border py-5 transition-colors hover:text-primary text-sm">
              <span>Was ist die Rentenlücke? Ratgeber</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </Link>
            <Link to="/blog/rentenlucke-mit-30-40-50" className="group flex items-center justify-between gap-4 border-b border-border py-5 transition-colors hover:text-primary text-sm">
              <span>Rentenlücke mit 30, 40 oder 50</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </Link>
          </div>
          




        
        </div>

        {/* Disclaimer */}
        <div className="mt-16 p-5 bg-muted/50 border border-border/60 rounded-lg space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase  mb-2">Hinweise & Haftungsausschluss</p>

          <div className="space-y-3 text-[0.8rem] text-disclaimer-foreground leading-relaxed">
            <div>
              <p className="not-italic font-medium text-muted-foreground mb-1">Grundlage und Aktualität</p>
              <p>Diese Berechnung basiert auf dem Altersvorsorgereformgesetz, das am 27. März 2026 vom Bundestag beschlossen wurde. Das Altersvorsorgedepot startet am 1. Januar 2027.</p>
            </div>

            <div>
              <p className="not-italic font-medium text-muted-foreground mb-1">Rentenberechnung</p>
              <p>Die gesetzliche Rente wird vereinfacht auf Basis von Entgeltpunkten geschätzt. Als Bezugsgröße dient der Durchschnittslohn 2024 (45.358 € brutto/Jahr). Der aktuelle Rentenpunktwert beträgt 39,32 € pro Monat. Die Anzahl der angerechneten Einzahljahre wird pauschal geschätzt: verbleibende Jahre bis zum Rentenalter 67 zuzüglich 10 Jahren, maximal 45 Jahre. Tatsächliche Rentenhöhen hängen von der individuellen Erwerbsbiografie, Lücken im Versicherungsverlauf (z.&nbsp;B. durch Elternzeit, Studium, Selbstständigkeit oder Arbeitslosigkeit), freiwilligen Zusatzbeiträgen und künftigen Rentenanpassungen ab. Auf die Bruttorente werden pauschal 13 % für Kranken- und Pflegeversicherungsbeiträge abgezogen — der tatsächliche Abzug variiert je nach Krankenkasse und individuellem Beitragssatz.</p>
            </div>

            <div>
              <p className="not-italic font-medium text-muted-foreground mb-1">Einkommensbasis und Bedarfsberechnung</p>
              <p>Der monatliche Bedarf im Alter wird auf Basis des vom Nutzer eingegebenen Nettogehalts berechnet. Das eingegebene Bruttogehalt dient ausschließlich der Rentenberechnung. Die tatsächliche Steuer- und Abgabenlast hängt von Steuerklasse, Familienstand, Kinderfreibeträgen, weiteren Einkünften und dem jeweiligen Grenzsteuersatz ab und kann erheblich vom eingegebenen Wert abweichen.</p>
            </div>

            <div>
              <p className="not-italic font-medium text-muted-foreground mb-1">Kapitalbedarf und Entnahmephase</p>
              <p>Der benötigte Kapitalbedarf wird als gleichmäßige Entnahme der monatlichen Rentenlücke über 18 Jahre (Alter 67 bis 85) berechnet. Eine Verzinsung des Kapitals während der Entnahmephase wird nicht berücksichtigt — die tatsächlich benötigte Kapitalsumme wäre bei laufender Verzinsung geringer. Auszahlungsmodelle des Altersvorsorgedepots (z.&nbsp;B. Teilverrentung, lebenslange Rente, flexible Entnahme) können die tatsächlichen monatlichen Beträge erheblich beeinflussen. Eine Lebenserwartung über 85 Jahre ist nicht berücksichtigt.</p>
            </div>

            <div>
              <p className="not-italic font-medium text-muted-foreground mb-1">Sparrate und Renditeannahme</p>
              <p>Die monatlich notwendige Sparrate wird mit der Rentenbarwertformel berechnet. Als Renditeannahme werden 7 % p.a. zugrunde gelegt — ein historisch plausibler Richtwert für breit gestreute Aktienportfolios (siehe z.&nbsp;B. <a href="https://www.dai.de/detail/msci-world-rendite-dreieck-fuer-die-monatliche-geldanlage-1" target="_blank" rel="noopener noreferrer" className="underline">MSCI-World-Renditedreieck des Deutschen Aktieninstituts</a>), jedoch keine Prognose und keine Garantie. Die tatsächliche Wertentwicklung hängt von der gewählten Anlageform, der Marktentwicklung, den anfallenden Kosten und dem konkreten Investitionszeitpunkt ab. Kapitalanlagen bergen Risiken, einschließlich des möglichen Verlusts des eingesetzten Kapitals. Frühere Wertentwicklungen sind kein verlässlicher Indikator für künftige Ergebnisse.</p>
            </div>

            <div>
              <p className="not-italic font-medium text-muted-foreground mb-1">Förderberechnung</p>
              <p>Der Vorteil durch das Altersvorsorgedepot wird vereinfacht mit einem pauschalen Förderbonus von 40 % auf den Eigenbeitrag dargestellt. Die tatsächliche Förderstruktur gemäß § 84 EStG (beschlossen 27.03.2026) ist zweistufig: 50 % Grundzulage auf Eigenbeiträge bis 360 € pro Jahr (max. 180 €) + 25 % auf Beiträge zwischen 360 € und 1.800 € pro Jahr (max. 360 €) = max. 540 €/Jahr. Hinzu kommt eine Kinderzulage von bis zu 300 € pro Kind und Jahr (100 % der Eigenbeiträge, voll ab 25 €/Monat) sowie ein Steuervorteil durch den Sonderausgabenabzug. Der tatsächliche Fördervorteil kann je nach persönlicher Situation höher oder niedriger ausfallen.</p>
            </div>

            <div>
              <p className="not-italic font-medium text-muted-foreground mb-1">Inflation</p>
              <p>Inflation ist in dieser Berechnung nicht berücksichtigt. Die dargestellten Beträge sind nominale Werte. Die reale Kaufkraft des angesparten Kapitals und der monatlichen Auszahlung wird durch Inflation gemindert.</p>
            </div>

            <div>
              <p className="not-italic font-medium text-muted-foreground mb-1">Kein Ersatz für individuelle Beratung</p>
              <p>Diese Simulation dient ausschließlich der ersten Orientierung und stellt keine Anlageberatung, Steuerberatung oder Rechtsberatung dar. Für eine individuelle Einschätzung empfehlen wir die Beratung durch einen zugelassenen Finanz- oder Steuerberater sowie die persönliche Renteninformation der Deutschen Rentenversicherung.</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <FooterSection />
  </>;


export default RentenlueckenRechnerPage;