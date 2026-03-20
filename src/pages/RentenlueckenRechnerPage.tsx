import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import AnimatedSection from "@/components/landing/AnimatedSection";
import PageHead from "@/components/seo/PageHead";
import RentenlueckenRechner from "@/components/landing/RentenlueckenRechner";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from
"@/components/ui/breadcrumb";

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
    description="Berechne deine persönliche Rentenlücke in 30 Sekunden. Wie viel fehlt dir monatlich im Ruhestand — und was musst du heute zurücklegen, um die Lücke zu schließen?"
    path={PATH}
    jsonLd={jsonLd} />
  
    <Navbar />

    <main className="pt-24 pb-20">
      <div className="container max-w-2xl mx-auto px-6">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Rentenlückenrechner</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <AnimatedSection>
          <Badge variant="secondary" className="mb-4 text-xs font-medium">
            Kostenlos &amp; unverbindlich
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
            Rentenlückenrechner
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-12">
            Berechne in 30 Sekunden, wie groß deine persönliche Rentenlücke ist — und was du monatlich brauchst, um sie zu schließen.
          </p>
        </AnimatedSection>

        <RentenlueckenRechner />

        {/* Bottom text section */}
        <div className="mt-16 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
            Was bedeutet das für dich?
          </h2>
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
            <Link to="/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
              <span>Was ist die Rentenlücke? Ratgeber</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </Link>
            <Link to="/blog/rentenlucke-mit-30-40-50" className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm">
              <span>Rentenlücke mit 30, 40 oder 50</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </Link>
          </div>
          




        
        </div>

        {/* Disclaimer */}
        <div className="mt-16 p-5 bg-secondary rounded-xl space-y-4">
          <p className="text-sm font-semibold text-foreground">Hinweise zur Berechnung</p>

          <div className="space-y-3 text-[0.8rem] text-muted-foreground/70 italic leading-relaxed">
            <div>
              <p className="not-italic font-medium text-muted-foreground mb-1">Grundlage und Aktualität</p>
              <p>Diese Berechnung basiert auf dem Gesetzentwurf zur Reform der steuerlich geförderten privaten Altersvorsorge in der zum Zeitpunkt der Erstellung verfügbaren Fassung. Das Altersvorsorgedepot ist noch nicht in Kraft — der geplante Start ist der 1. Januar 2027. Änderungen im Gesetzgebungsverfahren können dazu führen, dass einzelne Förderbedingungen, Zulagenhöhen oder steuerliche Regelungen im finalen Gesetz abweichen.</p>
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
              <p>Die monatlich notwendige Sparrate wird mit der Rentenbarwertformel berechnet. Als Renditeannahme werden 7 % p.a. zugrunde gelegt — ein historisch plausibler Richtwert für breit gestreute Aktienportfolios, jedoch keine Prognose und keine Garantie. Die tatsächliche Wertentwicklung hängt von der gewählten Anlageform, der Marktentwicklung, den anfallenden Kosten und dem konkreten Investitionszeitpunkt ab. Kapitalanlagen bergen Risiken, einschließlich des möglichen Verlusts des eingesetzten Kapitals. Frühere Wertentwicklungen sind kein verlässlicher Indikator für künftige Ergebnisse.</p>
            </div>

            <div>
              <p className="not-italic font-medium text-muted-foreground mb-1">Förderberechnung</p>
              <p>Der Vorteil durch das Altersvorsorgedepot wird vereinfacht mit einem pauschalen Förderbonus von 35 % auf den Eigenbeitrag dargestellt. Die tatsächliche Förderstruktur ist gestaffelt: 35 % Grundzulage auf Eigenbeiträge bis 1.200 € pro Jahr, 20 % auf Beiträge zwischen 1.200 € und 1.800 € pro Jahr. Hinzu kommt eine Kinderzulage von bis zu 300 € pro Kind und Jahr sowie ein Steuervorteil durch den Sonderausgabenabzug, dessen Höhe vom individuellen Grenzsteuersatz abhängt. Der tatsächliche Fördervorteil kann je nach persönlicher Situation höher oder niedriger ausfallen als dargestellt.</p>
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