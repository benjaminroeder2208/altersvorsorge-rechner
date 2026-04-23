import { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BlogNewsletterWidget = () => {
  const [email, setEmail] = useState("");
  const [dsgvo, setDsgvo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<false | "new" | "resubscribe">(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }
    if (!dsgvo) {
      setError("Bitte akzeptiere die Datenschutzerklärung.");
      return;
    }

    setLoading(true);
    try {
      let pdfBase64: string | null = null;
      try {
        const { generateNewsletterChecklistPDFBase64 } = await import(
          "@/utils/generateNewsletterPDF"
        );
        pdfBase64 = await generateNewsletterChecklistPDFBase64();
      } catch (pdfErr) {
        console.warn("PDF-Generierung fehlgeschlagen, fahre ohne PDF fort", pdfErr);
      }

      const { data, error: fnErr } = await supabase.functions.invoke("newsletter-signup", {
        body: {
          email: trimmed,
          subscribed_to_newsletter: true,
          dsgvo_accepted: true,
          source: "blog",
          pdf_base64: pdfBase64,
        },
      });
      if (fnErr) throw fnErr;
      if (data?.error) throw new Error(data.error);
      trackEvent("newsletter_signup", {
        email: trimmed,
        source: "blog_widget",
      });
      setSuccess(data?.status === "resubscribe_pending" ? "resubscribe" : "new");
    } catch (err) {
      console.error("Newsletter signup error:", err);
      setError("Etwas ist schiefgelaufen. Bitte versuche es später erneut.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const isResub = success === "resubscribe";
    return (
      <div className="mt-12 p-6 bg-secondary/60 border border-border/60 rounded-2xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Check className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-1">
            {isResub ? "Willkommen zurück!" : "Fast geschafft!"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isResub
              ? "Wir haben dir eine neue Bestätigungsmail geschickt. Bitte bestätige deine erneute Anmeldung per Klick auf den Link — danach erhältst du die Checkliste wieder als PDF."
              : "Wir haben dir eine Bestätigungsmail geschickt. Klicke auf den Link darin, um deine Anmeldung abzuschließen — danach bekommst du die kostenlose Checkliste als PDF."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 p-6 md:p-8 bg-secondary/60 border border-border/60 rounded-2xl">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground text-lg">
          Newsletter: Wissen zur Altersvorsorge
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Erhalte unsere kostenlose Checkliste mit 3 Szenarien (25/35/45 Jahre) und regelmäßige Tipps
        zum neuen Altersvorsorgedepot ab 2027 — kein Spam, jederzeit abbestellbar.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            maxLength={320}
            className="bg-background"
          />
          <Button type="submit" disabled={loading} className="sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Wird gesendet…
              </>
            ) : (
              "Checkliste sichern"
            )}
          </Button>
        </div>
        <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
          <Checkbox
            checked={dsgvo}
            onCheckedChange={(v) => setDsgvo(v === true)}
            className="mt-0.5"
          />
          <span>
            Ich akzeptiere die{" "}
            <a href="/datenschutz" target="_blank" className="underline hover:text-foreground">
              Datenschutzerklärung
            </a>{" "}
            und bin mit dem Versand des Newsletters einverstanden.
          </span>
        </label>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </form>
    </div>
  );
};

export default BlogNewsletterWidget;
