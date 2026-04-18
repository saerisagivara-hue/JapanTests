"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type AuthState = {
  user: User | null;
  loading: boolean;
  subscriptionActive: boolean;
};

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  subscriptionActive: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    subscriptionActive: false,
  });

  useEffect(() => {
    const supabase = createClient();

    async function init() {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: sub } = await supabase
          .from("subscriptions")
          .select("status, current_period_end")
          .eq("user_id", user.id)
          .single();

        const isActive =
          sub?.status === "active" &&
          new Date(sub.current_period_end) > new Date();

        setState({ user, loading: false, subscriptionActive: isActive });
      } else {
        setState({ user: null, loading: false, subscriptionActive: false });
      }
    }

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const { data: sub } = await supabase
            .from("subscriptions")
            .select("status, current_period_end")
            .eq("user_id", session.user.id)
            .single();

          const isActive =
            sub?.status === "active" &&
            new Date(sub.current_period_end) > new Date();

          setState({
            user: session.user,
            loading: false,
            subscriptionActive: isActive,
          });
        } else {
          setState({ user: null, loading: false, subscriptionActive: false });
        }
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext value={state}>{children}</AuthContext>;
}
