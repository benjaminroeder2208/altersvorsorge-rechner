import { useState } from "react";
import { FileText, CheckCircle2, AlertCircle, Loader2, MailCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { trackEvent } from "@/lib/analytics";
import type { Inputs, CalculationResult } from "./AltersvorsorgedepotRechner";

const CURRENT_YEAR = new Date().getFullYear();

const NewsletterCard = ({
  inputs,
  result,
}: {
  inputs: Inputs;
  result: CalculationResult;
}) => {
  const [email, setEmail] = useState("");
  const [dsgvoAccepted, setDsgvoAccepted] = useState(false);
  const [dsgvoError, setDsgvoError] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "sending" || status === "sent") return;
    if (!dsgvoAccepted) {
      setDsgvoError(true);
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      let pdfBase64 = "";
      try {
        const { captureChart, generatePDFBase64 } = await import("@/utils/generatePDF");
        const chartImg = await captureChart();
        pdfBase64 = await generatePDFBase64({
          monthly_contribution: inputs.monthlyContribution,
          total_capital: Math.round(result.capitalWithFunding),
          monthly_payout: Math.round(result.monthlyPayout),
          subsidies: Math.round(result.totalSubsidies),
          capital_without: Math.round(result.capitalWithout),
          payout_without: Math.round(result.monthlyPayoutWithout),
          capital_savings: Math.round(result.capitalSavings),
          payout_savings: Math.round(result.monthlyPayoutSavings),
          retirement_age: inputs.retirementAge,
          birth_year: inputs.birthYear,
          chart_image: chartImg,
          return_assumption: inputs.returnRate,
        });
      } catch (pdfErr) {
        console.error("PDF generation failed:", pdfErr);
      }

      const confirmToken = crypto.randomUUID();
      const { error } = await supabase.from("simulation_leads").insert({
        email,
        monthly_contribution: inputs.monthlyContribution,
        birth_year: inputs.birthYear,
        children: inputs.children.length,
        retirement_age: inputs.retirementAge,
        return_assumption: inputs.returnRate * 100,
        calculated_capital: Math.round(result.capitalWithFunding),
        monthly_payout: Math.round(result.monthlyPayout),
        total_subsidies: Math.round(result.totalSubsidies),
        confirmation_token: confirmToken,
        pdf_base64: pdfBase64 || null,
      } as any);
      if (error) throw error;

      const { data: confirmationData, error: confirmationError } = await supabase.functions.invoke(
        "send-confirmation-email",
        {
          body: { email, token: confirmToken },
        },
      );

      if (confirmationError || confirmationData?.error) {
        const msg = confirmationData?.error ?? "Confirmation email failed";
        if (msg === "Rate limit exceeded") {
          throw new Error("rate_limit");
        }
        throw new Error("mail_failed");
      }

      trackEvent("lead_magnet_download", {
        lead_magnet_type: "retirement_calculator_pdf",
        email,
      });
      trackEvent("lead_generated", {
        lead_source: "retirement_calculator",
        monthly_contribution: inputs.monthlyContribution,
        age: CURRENT_YEAR - inputs.birthYear,
        email,
      });

      setStatus("sent");
    } catch (err: any) {
      const code = err?.message ?? "";
      // Duplicate-E-Mail von Postgres: unique_violation (23505)
      const isDuplicate =
        code.includes("duplicate") ||
        err?.code === "23505" ||
        err?.details?.includes("already exists");
      if (code === "rate_limit") {
        setErrorMsg(
          "Zu viele Anfragen in kurzer Zeit. Bitte warte einen Moment und versuche es erneut.",
        );
      } else if (code === "mail_failed") {
        setErrorMsg(
          "Wir konnten dir die Bestätigungsmail nicht zustellen. Bitte prüfe, ob deine E-Mail-Adresse korrekt geschrieben ist.",
        );
      } else if (isDuplicate) {
        setErrorMsg(
          "Für diese E-Mail-Adresse haben wir bereits eine Anfrage erhalten. Bitte schau in dein Postfach (auch Spam) nach der Bestätigungsmail.",
        );
      } else {
        setErrorMsg(
          "Etwas ist schiefgelaufen. Bitte versuche es in einem Moment erneut — wenn das Problem bleibt, schreib uns kurz.",
        );
      }
      setStatus("error");
    }
  };

  const resetToForm = () => {
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <div className="max-w-lg mx-auto mb-20">
      <div className="bg-background border border-border rounded-2xl p-8 shadow-sm">
        {status === "sent" ? (
          /* ── Erfolgsmeldung ───────────────────────── */
          <div
            role="status"
            aria-live="polite"
            className="text-center space-y-4"
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-primary" aria-hidden />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Bestätigungsmail ist unterwegs
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Wir haben eine E-Mail an{" "}
                <span className="font-medium text-foreground break-all">
                  {email}
                </span>{" "}
                geschickt. Bestätige darin den Link — danach erhältst du dein
                PDF direkt im Anschluss.
              </p>
            </div>
            <div className="rounded-xl bg-muted/50 border border-border px-4 py-3 text-left space-y-1.5">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MailCheck className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                <span>Schau auch im Spam- oder Werbung-Ordner nach.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MailCheck className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                <span>Die Mail kann ein bis zwei Minuten brauchen.</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail("");
                setDsgvoAccepted(false);
                setStatus("idle");
              }}
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              Andere E-Mail-Adresse verwenden
            </button>
          </div>
        ) : (
          /* ── Formular ─────────────────────────────── */
          <>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-primary" />
                <h3 className="text-lg font-semibold">
                  Deine persönliche PDF-Auswertung
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto leading-relaxed">
                Gib deine E-Mail ein und erhalte deine persönliche Auswertung
                als PDF — mit deinen Kennzahlen, Kapitalentwicklungs-Chart und
                Vergleich. Kostenlos. Optional: Erhalte auch wöchentliche Tipps
                zur Altersvorsorge.
              </p>
            </div>

            {/* Fehler-Banner — sichtbar, persistent, dismissbar */}
            {status === "error" && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-4 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 flex items-start gap-3 text-left"
              >
                <AlertCircle
                  className="w-4 h-4 text-destructive mt-0.5 shrink-0"
                  aria-hidden
                />
                <div className="flex-1 space-y-2">
                  <p className="text-xs text-destructive leading-relaxed">
                    {errorMsg}
                  </p>
                  <button
                    type="button"
                    onClick={resetToForm}
                    className="text-[11px] font-medium text-destructive underline underline-offset-2 hover:opacity-80"
                  >
                    Erneut versuchen
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Deine E-Mail-Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "sending"}
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-secondary/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "sending" || !dsgvoAccepted}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap inline-flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                      Wird gesendet…
                    </>
                  ) : (
                    "PDF anfordern →"
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>
                  Enthält: Kennzahlen · Chart · Vergleich Depot vs. ETF vs.
                  Sparkonto
                </span>
              </div>
              <div className="flex items-start gap-2 text-left">
                <Checkbox
                  id="dsgvo-newsletter"
                  checked={dsgvoAccepted}
                  onCheckedChange={(v) => {
                    setDsgvoAccepted(!!v);
                    setDsgvoError(false);
                  }}
                  className={`mt-0.5 ${
                    dsgvoError
                      ? "border-destructive ring-1 ring-destructive"
                      : ""
                  }`}
                />
                <label
                  htmlFor="dsgvo-newsletter"
                  className="text-[11px] text-muted-foreground leading-relaxed cursor-pointer"
                >
                  Ich stimme der Verarbeitung meiner E-Mail-Adresse gemäß der{" "}
                  <a
                    href="/datenschutz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground"
                  >
                    Datenschutzerklärung
                  </a>{" "}
                  zu. Die Adresse wird ausschließlich zur Zusendung meiner
                  Auswertung und gelegentlicher Updates verwendet.
                </label>
              </div>
              {dsgvoError && (
                <p className="text-[11px] text-destructive text-left">
                  Bitte stimme der Datenschutzerklärung zu, um fortzufahren.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsletterCard;
