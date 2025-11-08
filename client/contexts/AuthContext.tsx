import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  isOffline: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== "undefined" && !navigator.onLine
  );

  useEffect(() => {
    // Listen for online/offline changes
    const handleOnline = () => {
      console.log("[Auth] App is online");
      setIsOffline(false);
    };

    const handleOffline = () => {
      console.log("[Auth] App is offline");
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    // Initialize Supabase auth
    const initSupabaseAuth = async () => {
      try {
        if (!supabase) {
          console.warn("[Auth] Supabase client not initialized");
          setIsLoading(false);
          return;
        }

        // If offline, try to restore from localStorage
        if (!navigator.onLine) {
          console.log("[Auth] Offline mode - restoring session from cache");
          try {
            const cachedSession = localStorage.getItem(
              "supabase.auth.token"
            );
            if (cachedSession) {
              const { session } = JSON.parse(cachedSession);
              if (session?.user) {
                setUser(session.user);
                console.log("[Auth] Restored cached session for:", session.user.email);
              }
            }
          } catch (err) {
            console.warn("[Auth] Failed to restore cached session:", err);
          }
          setIsLoading(false);
          return;
        }

        // Get existing session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setUser(session.user);
          console.log("[Auth] Session retrieved from Supabase");
        }

        // Listen for auth state changes
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            if (session?.user) {
              setUser(session.user);
              setError(null);
              console.log("[Auth] Auth state changed - user authenticated");
            } else {
              setUser(null);
              console.log("[Auth] Auth state changed - user logged out");
            }
          }
        );

        return () => {
          subscription?.unsubscribe();
        };
      } catch (err) {
        console.error("Failed to initialize Supabase Auth:", err);

        // If offline, don't set error - allow offline mode
        if (!navigator.onLine) {
          console.log("[Auth] Network error in offline mode - continuing in offline mode");
        } else {
          setError("Failed to initialize authentication");
        }
      } finally {
        setIsLoading(false);
      }
    };

    initSupabaseAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        throw signInError;
      }

      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      setUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed";
      setError(message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
