import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Loader2, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ConfirmPage = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<"loading" | "confirmed" | "already" | "expired" | "error">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    supabase.functions
      .invoke("confirm-email", { body: { token } })
      .then(({ data, error }) => {
        if (error) {
          setStatus("error");
          return;
        }
        if (data?.status === "confirmed") setStatus("confirmed");
        else if (data?.status === "already_confirmed") setStatus("already");
        else if (data?.error === "token_expired") setStatus("expired");
        else setStatus("error");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>E-Mail bestätigen — altersvorsorge-rechner.com</title>
      </Helmet>
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 shadow-sm text-center">
          {status === "loading" && (
            <div className="space-y-4 py-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">E-Mail wird bestätigt...</p>
            </div>
          )}

          {status === "confirmed" && (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h1 className="text-xl font-bold">E-Mail bestätigt!</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Deine Auswertung wird gleich an deine E-Mail-Adresse gesendet.
              </p>
              <Link to="/" className="inline-block mt-4 text-sm text-primary hover:underline">
                Zurück zur Startseite →
              </Link>
            </div>
          )}

          {status === "already" && (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto" />
              <h1 className="text-xl font-bold">Bereits bestätigt</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dieser Link wurde bereits verwendet. Deine Auswertung wurde bereits versendet.
              </p>
              <Link to="/" className="inline-block mt-4 text-sm text-primary hover:underline">
                Zurück zur Startseite →
              </Link>
            </div>
          )}

          {status === "expired" && (
            <div className="space-y-4">
              <Clock className="w-12 h-12 text-amber-500 mx-auto" />
              <h1 className="text-xl font-bold">Link abgelaufen</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dieser Bestätigungslink ist abgelaufen. Bitte trage deine E-Mail erneut auf der Startseite ein.
              </p>
              <Link to="/" className="inline-block mt-4 text-sm text-primary hover:underline">
                Zur Startseite →
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <XCircle className="w-12 h-12 text-destructive mx-auto" />
              <h1 className="text-xl font-bold">Ungültiger Link</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dieser Link ist ungültig oder wurde bereits verwendet.
              </p>
              <Link to="/" className="inline-block mt-4 text-sm text-primary hover:underline">
                Zurück zur Startseite →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmPage;
