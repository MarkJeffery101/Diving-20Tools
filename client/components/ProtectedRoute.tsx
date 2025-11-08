import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  // Skip authentication on development environments
  const isDevelopment =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.includes("fly.dev") ||
      window.location.hostname.includes("localhost"));

  // Check if user has a Supabase invite/signup token in the URL
  // Supabase sends tokens in the hash with type=signup
  const hasSupabaseToken =
    typeof window !== "undefined" &&
    (window.location.hash.includes("access_token") ||
      window.location.search.includes("access_token"));

  if (hasSupabaseToken) {
    return <Navigate to="/invite" replace />;
  }

  if (!isDevelopment && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-ocean-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isDevelopment && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
