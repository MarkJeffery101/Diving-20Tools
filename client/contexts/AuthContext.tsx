import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Netlify Identity
    const initNetlifyIdentity = async () => {
      try {
        // Check if netlifyIdentity is available
        if (typeof window !== "undefined" && (window as any).netlifyIdentity) {
          const netlifyIdentity = (window as any).netlifyIdentity;

          // Get current user
          const currentUser = netlifyIdentity.currentUser();
          if (currentUser) {
            setUser(currentUser);
          }

          // Listen for authentication changes
          netlifyIdentity.on("login", (user: any) => {
            setUser(user);
            setError(null);
          });

          netlifyIdentity.on("logout", () => {
            setUser(null);
          });

          netlifyIdentity.on("error", (err: any) => {
            setError(err.message || "Authentication error");
          });
        }
      } catch (err) {
        console.error("Failed to initialize Netlify Identity:", err);
        setError("Failed to initialize authentication");
      } finally {
        setIsLoading(false);
      }
    };

    initNetlifyIdentity();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const netlifyIdentity = (window as any).netlifyIdentity;
      if (!netlifyIdentity) {
        throw new Error("Authentication service not available");
      }
      await netlifyIdentity.login(email, password);
      const currentUser = netlifyIdentity.currentUser();
      setUser(currentUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setError(null);
      const netlifyIdentity = (window as any).netlifyIdentity;
      if (!netlifyIdentity) {
        throw new Error("Authentication service not available");
      }
      await netlifyIdentity.signup(email, password);
      const currentUser = netlifyIdentity.currentUser();
      setUser(currentUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed";
      setError(message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      const netlifyIdentity = (window as any).netlifyIdentity;
      if (!netlifyIdentity) {
        throw new Error("Authentication service not available");
      }
      await netlifyIdentity.logout();
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
        signup,
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
