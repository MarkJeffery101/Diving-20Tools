import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login, signup, error } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError("Please enter both email and password");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err) {
      setLocalError(
        err instanceof Error ? err.message : "Authentication failed",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const displayError = localError || error;

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

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isSignup ? "Create Account" : "Sign In"}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {isSignup
              ? "Create a new account to get started"
              : "Sign in to access DivePlan"}
          </p>

          {/* Error Message */}
          {displayError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{displayError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={isLoading}
                className="w-full"
              />
            </div>

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
              {isSignup && (
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 6 characters
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-semibold py-2 h-10"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isSignup ? "Creating..." : "Signing in..."}
                </>
              ) : isSignup ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Toggle Sign Up / Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignup ? "Already have an account?" : "Need an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setLocalError(null);
                }}
                className="ml-1 font-medium text-ocean-600 hover:text-ocean-700"
                disabled={isLoading}
              >
                {isSignup ? "Sign in" : "Create one"}
              </button>
            </p>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Demo:</strong> Use any email and password (min 6
              characters) to create a test account.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-ocean-200 text-xs mt-8">
          © 2024 DivePlan. All rights reserved.
        </p>
      </div>
    </div>
  );
}
