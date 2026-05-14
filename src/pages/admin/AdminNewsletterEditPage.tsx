import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Loader2, Save, Send, Trash2, AlertCircle, Eye, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { BRAND } from "@/lib/brandColors";

interface Edition {
  id: string;
  subject: string;
  preheader: string | null;
  html_content: string;
  status: string;
  scheduled_at: string | null;
  sent_at: string | null;
  recipient_count: number;
  success_count: number;
  failed_count: number;
}

function toLocalInputValue(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromLocalInputValue(local: string): string | null {
  if (!local) return null;
  return new Date(local).toISOString();
}

const AdminNewsletterEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const navigate = useNavigate();

  const [edition, setEdition] = useState<Edition | null>(null);
  const [subject, setSubject] = useState("");
  const [preheader, setPreheader] = useState("");
  const [htmlContent, setHtmlContent] = useState(
    `<h1 style="font-size:22px;font-weight:bold;color:#1B4FD8;margin:0 0 16px;">Hallo,</h1>\n<p>Willkommen zur dieswöchigen Ausgabe …</p>`,
  );
  const [scheduledLocal, setScheduledLocal] = useState("");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (isNew) return;
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("newsletter_editions")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (!active) return;
      if (error || !data) {
        toast.error("Edition konnte nicht geladen werden.");
        navigate("/admin/newsletter", { replace: true });
        return;
      }
      setEdition(data as Edition);
      setSubject(data.subject);
      setPreheader(data.preheader ?? "");
      setHtmlContent(data.html_content);
      setScheduledLocal(toLocalInputValue(data.scheduled_at));
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [id, isNew, navigate]);

  const isReadOnly = useMemo(
    () => edition !== null && !["draft", "scheduled"].includes(edition.status),
    [edition],
  );

  const handleSave = async (status: "draft" | "scheduled") => {
    if (!subject.trim() || !htmlContent.trim()) {
      toast.error("Betreff und Inhalt dürfen nicht leer sein.");
      return;
    }
    if (status === "scheduled" && !scheduledLocal) {
      toast.error("Bitte einen Versandzeitpunkt wählen.");
      return;
    }
    setSaving(true);
    const payload = {
      subject: subject.trim(),
      preheader: preheader.trim() || null,
      html_content: htmlContent,
      status,
      scheduled_at: status === "scheduled" ? fromLocalInputValue(scheduledLocal) : null,
    };

    if (isNew) {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("newsletter_editions")
        .insert({ ...payload, created_by: userData.user?.id ?? null })
        .select("id")
        .single();
      setSaving(false);
      if (error || !data) {
        toast.error("Speichern fehlgeschlagen: " + (error?.message ?? "unbekannter Fehler"));
        return;
      }
      toast.success(status === "scheduled" ? "Edition geplant." : "Entwurf gespeichert.");
      navigate(`/admin/newsletter/${data.id}`, { replace: true });
    } else {
      const { error } = await supabase
        .from("newsletter_editions")
        .update(payload)
        .eq("id", id!);
      setSaving(false);
      if (error) {
        toast.error("Speichern fehlgeschlagen: " + error.message);
        return;
      }
      toast.success(status === "scheduled" ? "Edition geplant." : "Entwurf gespeichert.");
      setEdition((prev) => (prev ? { ...prev, ...payload } : prev));
    }
  };

  const handleSendNow = async () => {
    if (!subject.trim() || !htmlContent.trim()) {
      toast.error("Betreff und Inhalt dürfen nicht leer sein.");
      return;
    }
    if (
      !window.confirm(
        "Diese Edition wird JETZT an alle bestätigten Newsletter-Empfänger versendet. Fortfahren?",
      )
    ) {
      return;
    }
    setSending(true);

    let editionId = id!;
    // If new, save first as draft so we have an id
    if (isNew) {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("newsletter_editions")
        .insert({
          subject: subject.trim(),
          preheader: preheader.trim() || null,
          html_content: htmlContent,
          status: "draft",
          created_by: userData.user?.id ?? null,
        })
        .select("id")
        .single();
      if (error || !data) {
        setSending(false);
        toast.error("Speichern vor Versand fehlgeschlagen.");
        return;
      }
      editionId = data.id;
    } else {
      // Persist current edits first
      await supabase
        .from("newsletter_editions")
        .update({
          subject: subject.trim(),
          preheader: preheader.trim() || null,
          html_content: htmlContent,
          status: "draft",
          scheduled_at: null,
        })
        .eq("id", editionId);
    }

    const { data: result, error: fnErr } = await supabase.functions.invoke(
      "send-newsletter-edition",
      { body: { edition_id: editionId } },
    );
    setSending(false);

    if (fnErr) {
      toast.error("Versand fehlgeschlagen: " + fnErr.message);
      return;
    }
    const r = result?.results?.[0];
    if (r?.error) {
      toast.error("Versand fehlgeschlagen: " + r.error);
    } else {
      toast.success(
        `Versendet: ${r?.success ?? 0} von ${r?.recipient_count ?? 0} (${r?.skipped ?? 0} übersprungen)`,
      );
      navigate(`/admin/newsletter/${editionId}`, { replace: true });
    }
  };

  const handleSendTest = async () => {
    if (!subject.trim() || !htmlContent.trim()) {
      toast.error("Betreff und Inhalt dürfen nicht leer sein.");
      return;
    }
    const { data: userData } = await supabase.auth.getUser();
    const adminEmail = userData.user?.email;
    if (!adminEmail) {
      toast.error("Keine Admin-E-Mail-Adresse gefunden.");
      return;
    }
    setSendingTest(true);

    // Persist current edits first so the preview reflects what's in the editor.
    let editionId = id!;
    if (isNew) {
      const { data, error } = await supabase
        .from("newsletter_editions")
        .insert({
          subject: subject.trim(),
          preheader: preheader.trim() || null,
          html_content: htmlContent,
          status: "draft",
          created_by: userData.user?.id ?? null,
        })
        .select("id")
        .single();
      if (error || !data) {
        setSendingTest(false);
        toast.error("Speichern vor Test-Versand fehlgeschlagen.");
        return;
      }
      editionId = data.id;
    } else {
      await supabase
        .from("newsletter_editions")
        .update({
          subject: subject.trim(),
          preheader: preheader.trim() || null,
          html_content: htmlContent,
        })
        .eq("id", editionId);
    }

    const { data: result, error: fnErr } = await supabase.functions.invoke(
      "send-newsletter-edition",
      { body: { edition_id: editionId, test: true } },
    );
    setSendingTest(false);

    if (fnErr) {
      toast.error("Test-Versand fehlgeschlagen: " + fnErr.message);
      return;
    }
    if (result?.status === "test_sent") {
      toast.success(`Test-Mail an ${result.recipient} gesendet.`);
      if (isNew) navigate(`/admin/newsletter/${editionId}`, { replace: true });
    } else {
      toast.error("Test-Versand fehlgeschlagen: " + (result?.error ?? "unbekannter Fehler"));
    }
  };

  const handleDelete = async () => {
    if (isNew || !edition) return;
    if (!window.confirm("Diese Edition wirklich löschen?")) return;
    const { error } = await supabase.from("newsletter_editions").delete().eq("id", id!);
    if (error) {
      toast.error("Löschen fehlgeschlagen.");
      return;
    }
    toast.success("Edition gelöscht.");
    navigate("/admin/newsletter", { replace: true });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isNew ? "Neue Edition" : "Edition bearbeiten"} · Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminLayout>
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/newsletter">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Zurück
            </Link>
          </Button>
        </div>

        {isReadOnly && (
          <div className="mb-6 p-4 bg-secondary/60 border border-border rounded-xl flex gap-3">
            <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Nur-Lesen-Modus</p>
              <p className="text-muted-foreground">
                Status: <strong>{edition?.status}</strong>. Bereits versendete oder fehlgeschlagene
                Editionen können nicht mehr verändert werden.
              </p>
              {edition?.status === "sent" && (
                <p className="text-muted-foreground mt-2">
                  {edition.success_count}/{edition.recipient_count} erfolgreich, {edition.failed_count}{" "}
                  fehlgeschlagen.
                </p>
              )}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Betreff *</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="z. B. Neuigkeiten zum Altersvorsorgedepot"
                disabled={isReadOnly || saving || sending}
                maxLength={200}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">
                Preheader{" "}
                <span className="text-xs text-muted-foreground">
                  (Vorschautext im Postfach)
                </span>
              </label>
              <Input
                value={preheader}
                onChange={(e) => setPreheader(e.target.value)}
                placeholder="Optional: kurze Zeile, die im E-Mail-Programm erscheint"
                disabled={isReadOnly || saving || sending}
                maxLength={200}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">
                Inhalt (HTML) *{" "}
                <button
                  type="button"
                  onClick={() => setShowPreview((p) => !p)}
                  className="text-xs text-primary underline ml-2"
                >
                  <Eye className="inline w-3 h-3 mr-1 -mt-0.5" />
                  {showPreview ? "Editor" : "Vorschau"}
                </button>
              </label>
              {showPreview ? (
                <div
                  className="min-h-[400px] p-4 bg-background border border-border rounded-md text-sm prose prose-sm max-w-none"
                  // Admin-only content; also escaped in actual email build
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              ) : (
                <Textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  rows={18}
                  disabled={isReadOnly || saving || sending}
                  className="font-mono text-xs"
                />
              )}
              <p className="text-[11px] text-muted-foreground mt-1">
                Inline-Styles verwenden. Footer mit Impressum/Abmeldelink wird automatisch
                angefügt.
              </p>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">
                Versandzeitpunkt{" "}
                <span className="text-xs text-muted-foreground">(optional, für Planung)</span>
              </label>
              <Input
                type="datetime-local"
                value={scheduledLocal}
                onChange={(e) => setScheduledLocal(e.target.value)}
                disabled={isReadOnly || saving || sending}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-6">
              <h2 className="font-semibold mb-3">Aktionen</h2>
              <div className="space-y-2">
                <Button
                  onClick={handleSendTest}
                  variant="secondary"
                  className="w-full"
                  disabled={saving || sending || sendingTest}
                  title="Sendet eine Vorschau-Mail nur an dich (eingeloggter Admin)"
                >
                  {sendingTest ? (
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4 mr-1.5" />
                  )}
                  Test-Mail an mich senden
                </Button>
                <Button
                  onClick={() => handleSave("draft")}
                  variant="outline"
                  className="w-full"
                  disabled={isReadOnly || saving || sending || sendingTest}
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-1.5" />
                  )}
                  Als Entwurf speichern
                </Button>
                <Button
                  onClick={() => handleSave("scheduled")}
                  variant="outline"
                  className="w-full"
                  disabled={isReadOnly || saving || sending || sendingTest || !scheduledLocal}
                >
                  Versand planen
                </Button>
                <Button
                  onClick={handleSendNow}
                  className="w-full"
                  disabled={isReadOnly || saving || sending || sendingTest}
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-1.5" />
                  )}
                  Jetzt an alle versenden
                </Button>
                {!isNew && !isReadOnly && (
                  <Button
                    onClick={handleDelete}
                    variant="ghost"
                    className="w-full text-destructive hover:text-destructive"
                    disabled={saving || sending || sendingTest}
                  >
                    <Trash2 className="w-4 h-4 mr-1.5" /> Löschen
                  </Button>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
                <strong>Test-Mail</strong> geht nur an deine Admin-Adresse und ändert den Status der
                Edition nicht. <strong>"Jetzt versenden"</strong> geht an alle bestätigten Empfänger
                (max. 1.000 in Phase 1) und überspringt Abgemeldete und Sperrlisten-Adressen.
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminNewsletterEditPage;
