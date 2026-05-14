import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Newspaper, Users, Mail, Search, Activity, Settings, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `shrink-0 px-2.5 py-1 rounded-md transition-colors ${
    isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
  }`;

const AdminLayout = ({ children, title }: Props) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
          <Link to="/admin/newsletter" className="flex items-center gap-2 font-semibold shrink-0">
            <Newspaper className="w-4 h-4 text-primary" />
            <span className="text-sm">Admin</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="shrink-0">
            <LogOut className="w-4 h-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Abmelden</span>
          </Button>
        </div>
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 pb-2 -mt-1">
          <nav className="flex items-center gap-1 text-sm overflow-x-auto scrollbar-none -mx-1 px-1">
            <NavLink to="/admin/newsletter" className={navLinkClass}>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Newspaper className="w-3.5 h-3.5" /> Newsletter
              </span>
            </NavLink>
            <NavLink to="/admin/subscribers" className={navLinkClass}>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Mail className="w-3.5 h-3.5" /> Empfänger
              </span>
            </NavLink>
            <NavLink to="/admin/leads" className={navLinkClass}>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Users className="w-3.5 h-3.5" /> Leads
              </span>
            </NavLink>
            <NavLink to="/admin/seo" end className={navLinkClass}>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Search className="w-3.5 h-3.5" /> SEO
              </span>
            </NavLink>
            <NavLink to="/admin/seo/settings" className={navLinkClass}>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Settings className="w-3.5 h-3.5" /> SEO-Einstellungen
              </span>
            </NavLink>
            <NavLink to="/admin/competitors" className={navLinkClass}>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Trophy className="w-3.5 h-3.5" /> Wettbewerb
              </span>
            </NavLink>
            <NavLink to="/admin/keywords" className={navLinkClass}>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Target className="w-3.5 h-3.5" /> Keywords
              </span>
            </NavLink>
            <NavLink to="/internal/analytics-test" className={navLinkClass} target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Activity className="w-3.5 h-3.5" /> Analytics-Test
              </span>
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 container max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {title && <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{title}</h1>}
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
