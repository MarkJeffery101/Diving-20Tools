import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      <section className="py-32 px-4">
        <div className="container mx-auto text-center max-w-lg">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
            <p className="text-2xl font-semibold text-foreground mb-2">
              Page Not Found
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              The page you're looking for doesn't exist or hasn't been created
              yet.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-border p-8 mb-8">
            <p className="text-foreground mb-6">
              Use the navigation menu to explore the available sections of
              DivePlan:
            </p>

            <ul className="text-left space-y-2 mb-6 text-sm">
              <li>
                <Link to="/" className="text-primary hover:underline font-medium">
                  → Home
                </Link>
              </li>
              <li>
                <Link to="/tables" className="text-primary hover:underline font-medium">
                  → Dive Tables
                </Link>
              </li>
              <li>
                <Link
                  to="/table-selection"
                  className="text-primary hover:underline font-medium"
                >
                  → Table Selection Tool
                </Link>
              </li>
              <li>
                <Link
                  to="/supporting-info"
                  className="text-primary hover:underline font-medium"
                >
                  → Supporting Information
                </Link>
              </li>
            </ul>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            <Home className="h-5 w-5" />
            Return to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
