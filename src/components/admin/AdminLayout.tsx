import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Newspaper, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout = ({ children, title }: Props) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="container max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/newsletter" className="flex items-center gap-2 font-semibold">
              <Newspaper className="w-4 h-4 text-primary" />
              <span className="text-sm">Admin</span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <NavLink
                to="/admin/newsletter"
                className={({ isActive }) =>
                  `px-2.5 py-1 rounded-md transition-colors ${
                    isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                <span className="inline-flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5" /> Newsletter
                </span>
              </NavLink>
              <NavLink
                to="/admin/subscribers"
                className={({ isActive }) =>
                  `px-2.5 py-1 rounded-md transition-colors ${
                    isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Empfänger
                </span>
              </NavLink>
              <NavLink
                to="/admin/leads"
                className={({ isActive }) =>
                  `px-2.5 py-1 rounded-md transition-colors ${
                    isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Leads
                </span>
              </NavLink>
            </nav>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1.5" /> Abmelden
          </Button>
        </div>
      </header>
      <main className="flex-1 container max-w-6xl mx-auto px-6 py-8">
        {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
