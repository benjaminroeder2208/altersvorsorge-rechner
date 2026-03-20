import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

const UnsubscribePage = () => {
  const [params] = useSearchParams();
  const email = params.get("email");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error" | "invalid">("idle");

  const handleUnsubscribe = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("invalid");
      return;
    }

    setStatus("loading");
    try {
      const { error } = await supabase.from("suppressed_emails").insert({
        email,
        reason: "unsubscribe",
      });
      // unique constraint or already exists is fine
      if (error && !error.message.includes("duplicate")) throw error;
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Abmelden — altersvorsorge-rechner.com</title>
      </Helmet>
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 shadow-sm text-center">
          {status === "done" ? (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h1 className="text-xl font-bold">Erfolgreich abgemeldet</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Die E-Mail-Adresse <strong>{email}</strong> wurde aus unserem Verteiler entfernt. Du erhältst keine weiteren E-Mails von uns.
              </p>
              <Link to="/" className="inline-block mt-4 text-sm text-primary hover:underline">
                Zurück zur Startseite →
              </Link>
            </div>
          ) : status === "error" ? (
            <div className="space-y-4">
              <XCircle className="w-12 h-12 text-destructive mx-auto" />
              <h1 className="text-xl font-bold">Fehler</h1>
              <p className="text-sm text-muted-foreground">
                Die Abmeldung konnte nicht durchgeführt werden. Bitte versuche es später erneut.
              </p>
            </div>
          ) : status === "invalid" ? (
            <div className="space-y-4">
              <XCircle className="w-12 h-12 text-destructive mx-auto" />
              <h1 className="text-xl font-bold">Ungültiger Link</h1>
              <p className="text-sm text-muted-foreground">
                Dieser Abmelde-Link ist ungültig. Bitte prüfe den Link in deiner E-Mail.
              </p>
            </div>
          ) : status === "loading" ? (
            <div className="space-y-4 py-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">Wird abgemeldet...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-xl font-bold">E-Mail-Abmeldung</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Möchtest du dich wirklich von unseren E-Mails abmelden?
              </p>
              {email && (
                <p className="text-sm font-medium">{email}</p>
              )}
              <button
                onClick={handleUnsubscribe}
                className="w-full mt-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg py-3 px-4 text-sm font-semibold transition-colors"
              >
                Ja, abmelden
              </button>
              <Link to="/" className="block mt-2 text-sm text-muted-foreground hover:underline">
                Abbrechen
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UnsubscribePage;
