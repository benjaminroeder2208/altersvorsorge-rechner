import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Loader2, CheckCircle2, Clock, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";

interface Lead {
  id: string;
  email: string;
  confirmed: boolean;
  created_at: string;
  monthly_contribution: number;
  pdf_base64: string | null;
}

function formatDateTime(d: string) {
  return new Date(d).toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const AdminLeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("simulation_leads")
        .select("id, email, confirmed, created_at, monthly_contribution, pdf_base64")
        .order("created_at", { ascending: false })
        .limit(500);
      if (!active) return;
      if (error) setError(error.message);
      else setLeads((data ?? []) as Lead[]);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const confirmedCount = leads.filter((l) => l.confirmed).length;

  return (
    <AdminLayout title="PDF-Anfragen (Rechner)">
      <Helmet>
        <title>Admin · Leads</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Lade Leads…
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
              <p className="text-2xl font-bold">{leads.length}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground">Bestätigt</p>
              <p className="text-2xl font-bold text-emerald-700">{confirmedCount}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground">Ausstehend</p>
              <p className="text-2xl font-bold text-amber-700">{leads.length - confirmedCount}</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">E-Mail</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Beitrag/Monat</th>
                  <th className="px-4 py-3 font-medium">PDF</th>
                  <th className="px-4 py-3 font-medium">Eingang</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      Noch keine Anfragen vorhanden.
                    </td>
                  </tr>
                ) : (
                  leads.map((l) => (
                    <tr key={l.id} className="border-t border-border">
                      <td className="px-4 py-3 font-mono text-xs">{l.email}</td>
                      <td className="px-4 py-3">
                        {l.confirmed ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs">
                            <CheckCircle2 className="w-3 h-3" /> Bestätigt
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs">
                            <Clock className="w-3 h-3" /> Ausstehend
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {Number(l.monthly_contribution).toLocaleString("de-DE")} €
                      </td>
                      <td className="px-4 py-3">
                        {l.pdf_base64 ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 text-xs">
                            <FileText className="w-3 h-3" /> ja
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {formatDateTime(l.created_at)}
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

export default AdminLeadsPage;
