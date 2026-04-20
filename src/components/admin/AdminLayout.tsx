import { Link, useNavigate } from "react-router-dom";
import { LogOut, Newspaper } from "lucide-react";
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
          <Link to="/admin/newsletter" className="flex items-center gap-2 font-semibold">
            <Newspaper className="w-4 h-4 text-primary" />
            <span className="text-sm">Admin · Newsletter</span>
          </Link>
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
