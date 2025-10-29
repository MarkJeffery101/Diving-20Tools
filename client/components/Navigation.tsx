import { Link } from "react-router-dom";
import { Menu, X, Waves, Home, Grid3x3, Layers, AlertCircle, Activity, HelpCircle } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Home", href: "/", icon: Home },
    { label: "Tables", href: "/tables", icon: Grid3x3 },
    { label: "Table Selection", href: "/table-selection", icon: Layers },
    { label: "Emergency Procedures", href: "/emergency-procedures", icon: AlertCircle },
    { label: "Treatment Protocols", href: "/treatment-protocols", icon: Activity },
    { label: "Supporting Info", href: "/supporting-info", icon: HelpCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <Waves className="h-6 w-6" />
            <span>DivePlan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2 border-t border-border pt-4">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
