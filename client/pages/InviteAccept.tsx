import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react";

export default function InviteAccept() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Completely hide everything related to Netlify Identity
    const style = document.createElement("style");
    style.innerHTML = `
      #netlify-identity-widget {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        width: 0 !important;
        position: absolute !important;
        left: -9999px !important;
      }
      iframe[src*="identity.netlify"] {
        display: none !important;
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);

    // Check if we have an invite token
    const hash = window.location.hash;
    const search = window.location.search;
    const hasToken =
      hash.includes("invite_token") || search.includes("invite_token");

    if (!hasToken) {
      navigate("/login", { replace: true });
    }

    return () => {
      document.head.removeChild(style);
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password || !confirmPassword) {
      setError("Please enter both password fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      // Get the invite token
      let token = null;
      const hash = window.location.hash;
      if (hash) {
        const hashParams = new URLSearchParams(hash.substring(1));
        token = hashParams.get("invite_token");
      }
      if (!token) {
        const search = window.location.search;
        const queryParams = new URLSearchParams(search);
        token = queryParams.get("invite_token");
      }

      if (!token) {
        throw new Error("No invite token found");
      }

      const netlifyIdentity = (window as any).netlifyIdentity;
      if (!netlifyIdentity || !netlifyIdentity.gotrue) {
        throw new Error("Authentication service not available");
      }

      // Accept the invite
      await netlifyIdentity.gotrue.acceptInvite(token, password, true);

      // Set a flag to tell the auth context we're coming from an invite
      localStorage.setItem("inviteProcessing", "true");

      // Clear the hash to remove the invite token
      window.history.replaceState({}, document.title, window.location.pathname);

      // Redirect to login page - full reload
      setTimeout(() => {
        window.location.href = "/login";
      }, 100);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to set up account";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-900 to-ocean-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2Fda50c80fe0dc4a209294b70ea30291e0?format=webp&width=300"
            alt="DivePlan Logo"
            className="h-16 w-auto object-contain mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-white mb-2">DivePlan</h1>
          <p className="text-ocean-200">Professional Dive Planning Reference</p>
        </div>

        {/* Setup Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Access is Being Set Up
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Create a password to activate your DivePlan account
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-semibold py-2 h-10"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Setting up...
                </>
              ) : (
                "Create Password"
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-ocean-200 text-xs mt-8">
          © 2024 DivePlan. All rights reserved.
        </p>
      </div>
    </div>
  );
}
