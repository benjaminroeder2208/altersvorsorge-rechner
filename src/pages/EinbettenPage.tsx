import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Shield, BarChart3, Copy, Check } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import AnimatedSection from "@/components/landing/AnimatedSection";
import PageHead from "@/components/seo/PageHead";

const BASE = "https://altersvorsorge-rechner.com";

const EMBED_CODE_BASIC = `<iframe
  src="${BASE}/embed"
  width="100%"
  height="600"
  frameborder="0"
  title="Altersvorsorge Rechner"
  loading="lazy">
</iframe>`;

const EMBED_CODE_CUSTOM = `<iframe
  src="${BASE}/embed?color=%231B4FD8&utm_source=DEINBLOGNAME"
  width="100%"
  height="600"
  frameborder="0"
  title="Altersvorsorge Rechner"
  loading="lazy">
</iframe>`;

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy}
      className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
      {copied ? <><Check className="w-3 h-3" /> Kopiert ✓</> : <><Copy className="w-3 h-3" /> Code kopieren</>}
    </button>
  );
};

const advantages = [
  { icon: Zap, title: "Kostenlos & ohne Registrierung", desc: "Kein Account, kein Vertrag, kein Haken. Einfach Code kopieren und einbetten." },
  { icon: Shield, title: "DSGVO-konform", desc: "Alle Datenschutzhinweise sind im Rechner integriert. Deine Nutzer sind geschützt." },
  { icon: BarChart3, title: "Immer aktuell", desc: "Der Rechner wird automatisch aktualisiert wenn sich das Altersvorsorgedepot-Gesetz ändert. Du musst nichts tun." },
];

const jsonLd = [
  {
    "@type": "WebPage",
    name: "Altersvorsorge Rechner einbetten",
    url: `${BASE}/einbetten`,
    description: "Bette den Altersvorsorge Rechner kostenlos auf deiner Website ein.",
    isPartOf: { "@type": "WebSite", url: `${BASE}/` },
  },
];

const EinbettenPage = () => (
  <>
    <PageHead
      title="Altersvorsorge Rechner einbetten — kostenlos & DSGVO-konform"
      description="Bette den Altersvorsorge Rechner kostenlos auf deiner Website ein. DSGVO-konform, immer aktuell, in 2 Minuten fertig."
      path="/einbetten"
      jsonLd={jsonLd}
    />
    <Navbar />

    <main className="pt-24 pb-20">
      <div className="container max-w-3xl mx-auto px-6">

        {/* Hero */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
              Den Altersvorsorge-Rechner kostenlos einbetten
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Biete deinen Lesern echten Mehrwert — ganz einfach indem du diesen Rechner direkt auf deiner Seite einbindest. Kostenlos, ohne Registrierung, in 2 Minuten eingebettet.
            </p>
          </div>
        </AnimatedSection>

        {/* Live preview */}
        <AnimatedSection>
          <div className="mb-16">
            <iframe
              src={`${BASE}/embed`}
              width="100%"
              height="580"
              frameBorder="0"
              title="Altersvorsorge Rechner Vorschau"
              loading="lazy"
              className="rounded-xl border border-border shadow-lg"
            />
          </div>
        </AnimatedSection>

        {/* Code section */}
        <AnimatedSection>
          <div className="mb-16 space-y-10">
            <h2 className="text-2xl font-bold tracking-tight">So einfach geht's</h2>

            <div>
              <p className="text-sm font-medium mb-3">Schritt 1: Kopiere diesen Code in deinen Artikel oder deine Website:</p>
              <div className="relative">
                <pre className="bg-secondary rounded-xl p-5 pr-28 text-xs font-mono text-muted-foreground overflow-x-auto leading-relaxed whitespace-pre-wrap">
                  {EMBED_CODE_BASIC}
                </pre>
                <CopyButton text={EMBED_CODE_BASIC} />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Schritt 2: Passe optional die Farbe an:</p>
              <div className="relative">
                <pre className="bg-secondary rounded-xl p-5 pr-28 text-xs font-mono text-muted-foreground overflow-x-auto leading-relaxed whitespace-pre-wrap">
                  {EMBED_CODE_CUSTOM}
                </pre>
                <CopyButton text={EMBED_CODE_CUSTOM} />
              </div>
              <p className="text-xs text-muted-foreground/60 mt-3">
                Ersetze DEINBLOGNAME durch den Namen deiner Website — sobald unser Dashboard live ist, kannst du sehen welche Leads von dir kommen.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Advantages */}
        <AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {advantages.map((a) => (
              <div key={a.title} className="bg-secondary rounded-2xl p-6">
                <a.icon className="w-5 h-5 text-primary mb-3" />
                <p className="font-semibold text-sm mb-2">{a.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Terms */}
        <AnimatedSection>
          <div className="mb-16">
            <h2 className="text-lg font-bold mb-4">Nutzungsbedingungen</h2>
            <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-2xl">
              Die Einbettung ist kostenlos und für nicht-kommerzielle sowie kommerzielle Websites erlaubt. Bedingungen: (1) Der "Powered by altersvorsorge-rechner.com" Link im Rechner darf nicht entfernt werden. (2) Der Rechner darf nicht in einem iframe mit display:none oder Breite 0 eingebettet werden. (3) Wir behalten uns vor, die Einbettung bei missbräuchlicher Verwendung zu sperren. Der Rechner wird ohne Gewähr bereitgestellt. Alle Angaben basieren auf dem aktuellen Gesetzentwurf.
            </p>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection>
          <div className="rounded-2xl bg-primary p-8 text-center mb-16">
            <p className="text-primary-foreground font-semibold mb-2">Fragen zur Einbettung?</p>
            <p className="text-primary-foreground/80 text-sm">
              Schreib uns an:{" "}
              <a href="mailto:info@altersvorsorge-rechner.com" className="underline underline-offset-4 hover:text-primary-foreground">
                info@altersvorsorge-rechner.com
              </a>
            </p>
          </div>
        </AnimatedSection>

      </div>
    </main>

    <FooterSection />
  </>
);

export default EinbettenPage;
