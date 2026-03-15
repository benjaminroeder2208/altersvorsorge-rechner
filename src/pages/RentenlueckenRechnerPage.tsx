import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import AnimatedSection from "@/components/landing/AnimatedSection";
import PageHead from "@/components/seo/PageHead";
import RentenlueckenRechner from "@/components/landing/RentenlueckenRechner";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/rentenluecken-rechner";

const jsonLd = [
  {
    "@type": "WebApplication",
    name: "Rentenlückenrechner",
    url: `${BASE}${PATH}`,
    description: "Berechne deine persönliche Rentenlücke in 30 Sekunden.",
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Rentenlückenrechner", item: `${BASE}${PATH}` },
    ],
  },
];

const RentenlueckenRechnerPage = () => (
  <>
    <PageHead
      title="Rentenlückenrechner — Rentenlücke kostenlos berechnen"
      description="Berechne deine persönliche Rentenlücke in 30 Sekunden. Wie viel fehlt dir monatlich im Ruhestand — und was musst du heute zurücklegen, um die Lücke zu schließen?"
      path={PATH}
      jsonLd={jsonLd}
    />
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
            className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
          >
            Mehr zum Altersvorsorgedepot erfahren <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 p-5 bg-secondary rounded-xl">
          <p className="text-xs text-muted-foreground/70 italic leading-relaxed">
            Vereinfachte Berechnung auf Basis des aktuellen Gesetzentwurfs zur Reform der privaten Altersvorsorge. Alle Berechnungen basieren auf vereinfachten Annahmen (Rendite 7 % p.a., pauschale Abzüge). Tatsächliche Renten- und Steuerwerte können erheblich abweichen. Diese Seite stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
          </p>
        </div>
      </div>
    </main>

    <FooterSection />
  </>
);

export default RentenlueckenRechnerPage;
