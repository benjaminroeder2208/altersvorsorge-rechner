import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Mail, Download, Check, FileText, Loader2, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { generateNewsletterChecklistPDFBase64 } from "@/utils/generateNewsletterPDF";
import FooterSection from "@/components/landing/FooterSection";
import Navbar from "@/components/landing/Navbar";

type Status = "idle" | "loading" | "sent" | "resubscribe" | "already" | "suppressed" | "error";

const NewsletterLandingPage = () => {
  const [email, setEmail] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);
  const [dsgvo, setDsgvo] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = isValidEmail && dsgvo && status !== "loading";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    setErrorMsg(null);

    let pdfBase64: string | null = null;
    try {
      pdfBase64 = await generateNewsletterChecklistPDFBase64();
    } catch (err) {
      console.warn("PDF-Generierung fehlgeschlagen, fahre ohne PDF fort", err);
    }

    try {
      const { data, error } = await supabase.functions.invoke("newsletter-signup", {
        body: {
          email: email.trim(),
          subscribed_to_newsletter: newsletterOptIn,
          dsgvo_accepted: true,
          source: "newsletter_landing",
          pdf_base64: pdfBase64,
        },
      });

      if (error) {
        setStatus("error");
        setErrorMsg("Etwas ist schiefgelaufen. Bitte später erneut versuchen.");
        return;
      }

      const s = data?.status;
      if (s === "pending") setStatus("sent");
      else if (s === "resubscribe_pending") setStatus("resubscribe");
      else if (s === "already_confirmed") setStatus("already");
      else if (s === "suppressed") setStatus("suppressed");
      else if (data?.error === "dsgvo_required") {
        setStatus("error");
        setErrorMsg("Bitte stimme der Datenschutzerklärung zu.");
      } else if (data?.error === "invalid_email") {
        setStatus("error");
        setErrorMsg("Bitte gib eine gültige E-Mail-Adresse ein.");
      } else {
        setStatus("error");
        setErrorMsg("Etwas ist schiefgelaufen. Bitte später erneut versuchen.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Verbindungsfehler. Bitte erneut versuchen.");
    }
  }

  return (
    <>
      <Helmet>
        <title>Kostenlose Altersvorsorge-Checkliste — 3 Szenarien als PDF</title>
        <meta
          name="description"
          content="Lade die kostenlose Checkliste mit 3 konkreten Altersvorsorge-Szenarien (Start mit 25, 35, 45 Jahren) als PDF herunter — inklusive Förderung und monatlicher Auszahlung."
        />
        <link rel="canonical" href="https://altersvorsorge-rechner.com/newsletter" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
        <Navbar />

        <main className="flex-1 w-full">
          {/* Hero + Form */}
          <section className="container max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-16 md:pt-20 md:pb-24">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
              {/* Left: copy */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="min-w-0"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Kostenlose Checkliste
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4 break-words hyphens-auto">
                  Altersvorsorge-Checkliste:{" "}
                  <span className="text-primary">3 Szenarien</span> mit konkreten €-Zahlen
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Erfahre auf 2 Seiten, wie viel Kapital und monatliche Rente bei Start
                  mit <strong>25</strong>, <strong>35</strong> oder <strong>45 Jahren</strong>{" "}
                  realistisch erreichbar sind — inklusive maximaler staatlicher Förderung
                  und Renditeannahme von 7 % p.a.
                </p>

                <ul className="space-y-2.5 mb-2">
                  {[
                    "3 Szenarien mit Beitrag, Förderung und Auszahlung",
                    "Auf Basis des Altersvorsorgedepots ab 2027",
                    "Sofort als PDF nach Bestätigung — kein Account nötig",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-foreground/90 min-w-0 break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Right: form card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm min-w-0 w-full"
              >
                {status === "sent" ? (
                  <div className="text-center py-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold mb-2">Fast geschafft!</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Wir haben dir eine Bestätigungsmail an{" "}
                      <strong className="text-foreground">{email}</strong> gesendet.
                      Nach Klick auf den Link erhältst du die Checkliste direkt als PDF.
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                      Keine Mail im Posteingang? Schau auch im Spam-Ordner nach.
                    </p>
                  </div>
                ) : status === "resubscribe" ? (
                  <div className="text-center py-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold mb-2">Willkommen zurück!</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Wir haben dir eine neue Bestätigungsmail an{" "}
                      <strong className="text-foreground">{email}</strong> gesendet.
                      Bitte bestätige deine erneute Anmeldung per Klick auf den Link —
                      danach erhältst du die Checkliste wieder als PDF.
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                      Keine Mail im Posteingang? Schau auch im Spam-Ordner nach.
                    </p>
                  </div>
                ) : status === "already" ? (
                  <div className="text-center py-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold mb-2">Schon angemeldet</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Diese E-Mail-Adresse ist bereits bestätigt. Falls du die
                      Checkliste nicht mehr findest, schreib uns kurz an
                      info@altersvorsorge-rechner.com.
                    </p>
                  </div>
                ) : status === "suppressed" ? (
                  <div className="text-center py-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h2 className="text-lg font-bold mb-2">Anmeldung nicht möglich</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Diese E-Mail steht auf unserer Sperrliste (z. B. nach Abmeldung).
                      Bitte kontaktiere uns unter info@altersvorsorge-rechner.com.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-4" noValidate>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-bold">Jetzt kostenlos sichern</h2>
                    </div>

                    <div>
                      <label htmlFor="newsletter-email" className="text-sm font-medium block mb-1.5">
                        E-Mail-Adresse
                      </label>
                      <Input
                        id="newsletter-email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="deine@email.de"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        maxLength={320}
                        disabled={status === "loading"}
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="newsletter-opt"
                        checked={newsletterOptIn}
                        onCheckedChange={(c) => setNewsletterOptIn(c === true)}
                        className="mt-0.5"
                        disabled={status === "loading"}
                      />
                      <label
                        htmlFor="newsletter-opt"
                        className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                      >
                        Ja, ich möchte den wöchentlichen Newsletter mit Tipps zur
                        Altersvorsorge erhalten. Abmeldung jederzeit per Klick.
                      </label>
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="newsletter-dsgvo"
                        checked={dsgvo}
                        onCheckedChange={(c) => setDsgvo(c === true)}
                        className="mt-0.5"
                        disabled={status === "loading"}
                      />
                      <label
                        htmlFor="newsletter-dsgvo"
                        className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                      >
                        Ich akzeptiere die{" "}
                        <Link to="/datenschutz" className="underline hover:text-primary">
                          Datenschutzerklärung
                        </Link>
                        . Bestätigung erfolgt per Double-Opt-In.
                      </label>
                    </div>

                    {errorMsg && (
                      <p className="text-xs text-destructive">{errorMsg}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={!canSubmit}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          PDF wird vorbereitet...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Kostenlose Checkliste herunterladen
                        </>
                      )}
                    </Button>

                    <p className="text-[11px] text-muted-foreground/80 leading-relaxed text-center pt-1">
                      <Shield className="inline w-3 h-3 mr-1 -mt-0.5" />
                      Vertraulich. Keine Weitergabe an Dritte. Abmeldung jederzeit
                      mit einem Klick.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </section>

          {/* What you get */}
          <section className="bg-secondary/30 border-y border-border py-16">
            <div className="container max-w-5xl mx-auto px-6">
              <h2 className="text-2xl font-bold text-center mb-10">
                Das steckt in deiner Checkliste
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Szenario 1 — Start mit 25",
                    desc: "42 Jahre Laufzeit. Maximaler Zinseszins-Effekt mit 150 €/Monat Eigenbeitrag.",
                  },
                  {
                    title: "Szenario 2 — Start mit 35",
                    desc: "32 Jahre Laufzeit. Solide Basis für eine spürbare Zusatzrente.",
                  },
                  {
                    title: "Szenario 3 — Start mit 45",
                    desc: "22 Jahre Laufzeit. Auch der späte Einstieg lohnt sich noch.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="bg-card border border-border rounded-xl p-5"
                  >
                    <h3 className="font-semibold text-base mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-8 max-w-xl mx-auto leading-relaxed">
                Berechnungen basieren auf 7 % p.a. (langfristige Durchschnittsrendite eines
                breit gestreuten Aktien-ETF, Quelle: DAI-Renditedreieck) und der vollen
                Grundzulage des neuen Altersvorsorgedepots ab 2027.
              </p>
            </div>
          </section>
        </main>

        <FooterSection />
      </div>
    </>
  );
};

export default NewsletterLandingPage;
