import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Wifi } from "lucide-react";
import InviteAccept from "@/pages/InviteAccept";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, isOffline } = useAuth();

  // Skip authentication on development environments
  const isDevelopment =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.includes("fly.dev") ||
      window.location.hostname.includes("localhost"));

  // Check if user has a Supabase invite/signup token in the URL
  // Supabase sends tokens in the hash or query string with access_token
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  const search = typeof window !== "undefined" ? window.location.search : "";

  const hasInviteToken =
    hash.includes("access_token") ||
    search.includes("access_token") ||
    hash.includes("type=signup") ||
    search.includes("type=signup");

  // If there's an invite token, show the invite setup page
  if (hasInviteToken) {
    return <InviteAccept />;
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

  // Show offline mode message if offline and authenticated
  if (isOffline && isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-50 bg-yellow-50 border-b border-yellow-200 px-4 py-3">
          <div className="flex items-center gap-2 max-w-7xl mx-auto">
            <Wifi className="h-5 w-5 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              <strong>You're offline.</strong> Viewing cached content. Some features may be limited.
            </p>
          </div>
        </div>
        <div className="pt-4">{children}</div>
      </div>
    );
  }

  if (!isDevelopment && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
