import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    let active = true;

    const checkAdmin = async (user: User | null) => {
      if (!user) {
        if (active) setState({ user: null, isAdmin: false, loading: false });
        return;
      }
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (!active) return;
      setState({
        user,
        isAdmin: !error && data === true,
        loading: false,
      });
    };

    // Set up listener BEFORE getSession (per Supabase guidance)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Defer Supabase calls to avoid deadlock inside the callback
      setTimeout(() => checkAdmin(session?.user ?? null), 0);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAdmin(session?.user ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return state;
}
