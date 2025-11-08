import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react";

export default function InviteAccept() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenReady, setTokenReady] = useState(false);

  useEffect(() => {
    // Check if we have an invite/signup token from Supabase
    const hash = window.location.hash;
    const search = window.location.search;

    // Supabase sends tokens in the hash with type=signup
    const hasSignupToken =
      hash.includes("access_token") ||
      search.includes("access_token") ||
      hash.includes("type=signup") ||
      search.includes("type=signup");

    if (!hasSignupToken) {
      // No token, redirect to login
      navigate("/login", { replace: true });
    } else {
      setTokenReady(true);
      setIsLoading(false);
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields");
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

      // Supabase will automatically capture the token from the URL hash
      // We just need to call updateUser to set the password
      const { data, error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        // If update fails, it might be a new user signup flow
        // Try to get the session which may be created from the token
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          // User is already logged in via the token
          // Just need to set password
          setError(
            "Session established. You can now log in with your password."
          );
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
          return;
        }

        throw updateError;
      }

      // Clear the hash to remove the token
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

      // Redirect to home - user should be logged in
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to set password";
      setError(message);
      console.error("Password update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ocean-900 to-ocean-800 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!tokenReady) {
    return null; // Will redirect
  }

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
            Create Your Password
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Set a password to complete your DivePlan account setup
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
