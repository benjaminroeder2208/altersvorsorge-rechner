import { useEffect, useState } from "react";
import { Loader2, Save, Search } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ContentPage {
  id: string;
  url_path: string;
  title: string;
  summary: string | null;
  page_type: string | null;
  topics: string[] | null;
  active: boolean;
}

const AdminContentPagesPage = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [edits, setEdits] = useState<Record<string, Partial<ContentPage> & { topicsText?: string }>>({});

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("content_pages")
      .select("id,url_path,title,summary,page_type,topics,active")
      .order("url_path", { ascending: true });
    if (error) {
      toast({ title: "Fehler beim Laden", description: error.message, variant: "destructive" });
    } else {
      setPages((data ?? []) as ContentPage[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const getEdit = (p: ContentPage) => edits[p.id] ?? {};
  const value = <K extends keyof ContentPage>(p: ContentPage, key: K): ContentPage[K] => {
    const e = getEdit(p) as Partial<ContentPage>;
    return (e[key] !== undefined ? e[key] : p[key]) as ContentPage[K];
  };
  const topicsValue = (p: ContentPage) => {
    const e = getEdit(p);
    if (e.topicsText !== undefined) return e.topicsText;
    return (p.topics ?? []).join(", ");
  };

  const patch = (id: string, p: Partial<ContentPage> & { topicsText?: string }) =>
    setEdits((prev) => ({ ...prev, [id]: { ...(prev[id] ?? {}), ...p } }));

  const toggleActive = async (p: ContentPage, next: boolean) => {
    setSavingId(p.id);
    const { error } = await supabase.from("content_pages").update({ active: next }).eq("id", p.id);
    setSavingId(null);
    if (error) {
      toast({ title: "Speichern fehlgeschlagen", description: error.message, variant: "destructive" });
      return;
    }
    setPages((prev) => prev.map((x) => (x.id === p.id ? { ...x, active: next } : x)));
  };

  const save = async (p: ContentPage) => {
    const e = getEdit(p);
    const topics =
      e.topicsText !== undefined
        ? e.topicsText
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : p.topics;
    const payload = {
      title: (e.title ?? p.title) || "",
      summary: e.summary !== undefined ? e.summary : p.summary,
      topics,
    };
    setSavingId(p.id);
    const { error } = await supabase.from("content_pages").update(payload).eq("id", p.id);
    setSavingId(null);
    if (error) {
      toast({ title: "Speichern fehlgeschlagen", description: error.message, variant: "destructive" });
      return;
    }
    setPages((prev) => prev.map((x) => (x.id === p.id ? { ...x, ...payload } as ContentPage : x)));
    setEdits((prev) => {
      const { [p.id]: _, ...rest } = prev;
      return rest;
    });
    toast({ title: "Gespeichert" });
  };

  const filtered = pages.filter((p) => {
    if (!filter.trim()) return true;
    const q = filter.toLowerCase();
    return (
      p.url_path.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      (p.topics ?? []).some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <AdminLayout title="Content-Seiten">
      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Suche nach URL, Titel oder Topic…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-8"
          />
        </div>
        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} / {pages.length}
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => {
            const dirty = Boolean(edits[p.id]);
            return (
              <div key={p.id} className="border border-border rounded-lg p-4 bg-card space-y-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground font-mono break-all">{p.url_path}</div>
                    {p.page_type && (
                      <Badge variant="secondary" className="mt-1 text-[10px]">
                        {p.page_type}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Label htmlFor={`active-${p.id}`} className="text-xs text-muted-foreground">
                      Aktiv
                    </Label>
                    <Switch
                      id={`active-${p.id}`}
                      checked={p.active}
                      onCheckedChange={(v) => toggleActive(p, v)}
                      disabled={savingId === p.id}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <Label className="text-xs">Titel</Label>
                    <Input
                      value={value(p, "title") ?? ""}
                      onChange={(e) => patch(p.id, { title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Zusammenfassung</Label>
                    <Textarea
                      rows={2}
                      value={(value(p, "summary") as string | null) ?? ""}
                      onChange={(e) => patch(p.id, { summary: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Topics (kommagetrennt)</Label>
                    <Input
                      value={topicsValue(p)}
                      onChange={(e) => patch(p.id, { topicsText: e.target.value })}
                      placeholder="bav, etf, rente"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => save(p)}
                    disabled={!dirty || savingId === p.id}
                  >
                    {savingId === p.id ? (
                      <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-1.5" />
                    )}
                    Speichern
                  </Button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-8">Keine Einträge gefunden.</div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminContentPagesPage;
