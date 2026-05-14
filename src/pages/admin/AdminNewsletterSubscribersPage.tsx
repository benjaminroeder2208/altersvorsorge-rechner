import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Loader2, CheckCircle2, Clock, Mail, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";

interface Subscriber {
  id: string;
  email: string;
  status: string;
  subscribed_to_newsletter: boolean;
  confirmed_at: string | null;
  created_at: string;
  source: string;
  lead_magnet_type: string;
  pdf_base64: string | null;
}

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

const AdminNewsletterSubscribersPage = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .select(
          "id, email, status, subscribed_to_newsletter, confirmed_at, created_at, source, lead_magnet_type, pdf_base64",
        )
        .order("created_at", { ascending: false })
        .limit(500);
      if (!active) return;
      if (error) setError(error.message);
      else setSubscribers((data ?? []) as Subscriber[]);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const confirmedCount = subscribers.filter(
    (s) => s.status === "confirmed" && s.subscribed_to_newsletter,
  ).length;
  const pendingCount = subscribers.filter((s) => s.status === "pending").length;

  return (
    <AdminLayout title="Newsletter-Empfänger">
      <Helmet>
        <title>Admin · Newsletter-Empfänger</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Lade Empfänger…
        </div>
      ) : error ? (
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive text-sm">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground">Gesamt</p>
              <p className="text-2xl font-bold">{subscribers.length}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground">Bestätigt &amp; aktiv</p>
              <p className="text-2xl font-bold text-success">{confirmedCount}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground">Ausstehend</p>
              <p className="text-2xl font-bold text-amber-700">{pendingCount}</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">E-Mail</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Newsletter</th>
                  <th className="px-4 py-3 font-medium">Quelle</th>
                  <th className="px-4 py-3 font-medium">PDF</th>
                  <th className="px-4 py-3 font-medium">Bestätigt</th>
                  <th className="px-4 py-3 font-medium">Eingang</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                      Noch keine Anmeldungen vorhanden.
                    </td>
                  </tr>
                ) : (
                  subscribers.map((s) => (
                    <tr key={s.id} className="border-t border-border">
                      <td className="px-4 py-3 font-mono text-xs">{s.email}</td>
                      <td className="px-4 py-3">
                        {s.status === "confirmed" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/15 text-success text-xs">
                            <CheckCircle2 className="w-3 h-3" /> Bestätigt
                          </span>
                        ) : s.status === "pending" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs">
                            <Clock className="w-3 h-3" /> Ausstehend
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                            {s.status}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {s.subscribed_to_newsletter ? (
                          <span className="inline-flex items-center gap-1 text-success text-xs">
                            <Mail className="w-3 h-3" /> ja
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">nein</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{s.source}</td>
                      <td className="px-4 py-3">
                        {s.pdf_base64 ? (
                          <span className="inline-flex items-center gap-1 text-success text-xs">
                            <FileText className="w-3 h-3" /> ja
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {formatDateTime(s.confirmed_at)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {formatDateTime(s.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminNewsletterSubscribersPage;
