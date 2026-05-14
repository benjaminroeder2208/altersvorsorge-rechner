import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Plus, Loader2, Send, Pencil, CheckCircle2, Clock, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";

interface Edition {
  id: string;
  subject: string;
  status: string;
  scheduled_at: string | null;
  sent_at: string | null;
  recipient_count: number;
  success_count: number;
  failed_count: number;
  created_at: string;
  updated_at: string;
}

const STATUS_LABELS: Record<string, { label: string; tone: string; Icon: typeof Clock }> = {
  draft: { label: "Entwurf", tone: "bg-secondary text-foreground", Icon: FileText },
  scheduled: { label: "Geplant", tone: "bg-amber-100 text-amber-900", Icon: Clock },
  sending: { label: "Wird versendet", tone: "bg-blue-100 text-blue-900", Icon: Loader2 },
  sent: { label: "Versendet", tone: "bg-success/15 text-success", Icon: CheckCircle2 },
  failed: { label: "Fehlgeschlagen", tone: "bg-destructive/10 text-destructive", Icon: AlertCircle },
  cancelled: { label: "Abgebrochen", tone: "bg-muted text-muted-foreground", Icon: AlertCircle },
};

function formatDateTime(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const AdminNewsletterListPage = () => {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [confirmedCount, setConfirmedCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const [{ data: ed }, { count }] = await Promise.all([
        supabase
          .from("newsletter_editions")
          .select(
            "id, subject, status, scheduled_at, sent_at, recipient_count, success_count, failed_count, created_at, updated_at",
          )
          .order("created_at", { ascending: false })
          .limit(100),
        supabase
          .from("newsletter_subscriptions")
          .select("id", { count: "exact", head: true })
          .eq("status", "confirmed")
          .eq("subscribed_to_newsletter", true),
      ]);
      if (!active) return;
      setEditions((ed ?? []) as Edition[]);
      setConfirmedCount(count ?? 0);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Newsletter-Editionen · Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminLayout>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Newsletter-Editionen</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {confirmedCount === null
                ? "Lade Empfängerzahl…"
                : `${confirmedCount.toLocaleString("de-DE")} bestätigte Empfänger insgesamt`}
            </p>
          </div>
          <Button asChild className="self-start sm:self-auto">
            <Link to="/admin/newsletter/new">
              <Plus className="w-4 h-4 mr-1.5" /> Neue Edition
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : editions.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <FileText className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">Noch keine Editionen angelegt.</p>
            <Button asChild>
              <Link to="/admin/newsletter/new">
                <Plus className="w-4 h-4 mr-1.5" /> Erste Edition erstellen
              </Link>
            </Button>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-secondary/50 text-xs uppercase text-muted-foreground tracking-wider">
                <tr>
                  <th className="text-left py-2.5 px-4 font-medium">Betreff</th>
                  <th className="text-left py-2.5 px-4 font-medium">Status</th>
                  <th className="text-left py-2.5 px-4 font-medium">Geplant / Versendet</th>
                  <th className="text-left py-2.5 px-4 font-medium">Stats</th>
                  <th className="text-right py-2.5 px-4 font-medium">Aktion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {editions.map((e) => {
                  const cfg = STATUS_LABELS[e.status] ?? STATUS_LABELS.draft;
                  const Icon = cfg.Icon;
                  return (
                    <tr key={e.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 font-medium max-w-md truncate">{e.subject}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.tone}`}
                        >
                          <Icon
                            className={`w-3 h-3 ${
                              e.status === "sending" ? "animate-spin" : ""
                            }`}
                          />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-muted-foreground">
                        {e.sent_at
                          ? formatDateTime(e.sent_at)
                          : e.scheduled_at
                          ? formatDateTime(e.scheduled_at)
                          : "—"}
                      </td>
                      <td className="py-3 px-4 text-xs text-muted-foreground">
                        {e.status === "sent" || e.status === "failed" ? (
                          <span>
                            {e.success_count}/{e.recipient_count} ok
                            {e.failed_count > 0 && (
                              <span className="text-destructive">
                                {" "}
                                · {e.failed_count} fehlgeschlagen
                              </span>
                            )}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/admin/newsletter/${e.id}`}>
                            {e.status === "draft" || e.status === "scheduled" ? (
                              <>
                                <Pencil className="w-3.5 h-3.5 mr-1" /> Bearbeiten
                              </>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5 mr-1" /> Details
                              </>
                            )}
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default AdminNewsletterListPage;
