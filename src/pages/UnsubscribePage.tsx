import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import PageHead from "@/components/seo/PageHead";

const UnsubscribePage = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error" | "invalid" | "already">("idle");
  const [email, setEmail] = useState<string | null>(null);

  const handleUnsubscribe = async () => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    setStatus("loading");
    try {
      const { data, error } = await supabase.functions.invoke("handle-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.status === "already_unsubscribed") {
        setEmail(data.email);
        setStatus("already");
        return;
      }
      setEmail(data?.email ?? null);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <PageHead
        title="Abmelden — altersvorsorge-rechner.com"
        description="Melde dich von unserem Newsletter ab."
        path="/unsubscribe"
        robots="noindex,nofollow"
      />
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 shadow-sm text-center">
          {status === "done" ? (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h1 className="text-xl font-bold">Erfolgreich abgemeldet</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {email ? (
                  <>Die E-Mail-Adresse <strong>{email}</strong> wurde aus unserem Verteiler entfernt. Du erhältst keine weiteren E-Mails von uns.</>
                ) : (
                  <>Du wurdest erfolgreich abgemeldet und erhältst keine weiteren E-Mails von uns.</>
                )}
              </p>
              <Link to="/" className="inline-block mt-4 text-sm text-primary hover:underline">
                Zurück zur Startseite →
              </Link>
            </div>
          ) : status === "already" ? (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h1 className="text-xl font-bold">Bereits abgemeldet</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {email ? (
                  <>Die E-Mail-Adresse <strong>{email}</strong> ist bereits abgemeldet.</>
                ) : (
                  <>Diese E-Mail-Adresse ist bereits abgemeldet.</>
                )}
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
