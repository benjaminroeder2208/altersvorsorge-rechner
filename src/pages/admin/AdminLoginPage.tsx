import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin/newsletter", { replace: true });
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signErr } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (signErr) {
      setError("Anmeldung fehlgeschlagen. Bitte E-Mail und Passwort prüfen.");
      return;
    }
    navigate("/admin/newsletter", { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>Admin-Login</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-4 h-4 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Admin-Login</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-3" noValidate>
            <div>
              <label htmlFor="admin-email" className="text-sm font-medium block mb-1">
                E-Mail
              </label>
              <Input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="text-sm font-medium block mb-1">
                Passwort
              </label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Anmelden...
                </>
              ) : (
                "Anmelden"
              )}
            </Button>
          </form>
          <p className="text-[11px] text-muted-foreground mt-4 text-center">
            Nur für Admins. <Link to="/" className="underline">Zurück zur Startseite</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
