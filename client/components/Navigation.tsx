import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Waves,
  Home,
  Grid3x3,
  Layers,
  AlertCircle,
  Activity,
  HelpCircle,
  Calculator,
  Share2,
} from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Home", href: "/", icon: Home },
    { label: "Tables", href: "/tables", icon: Grid3x3 },
    { label: "Table Selection", href: "/table-selection", icon: Layers },
    { label: "Tools", href: "/tools", icon: Calculator },
    {
      label: "Emergency Procedures",
      href: "/emergency-procedures",
      icon: AlertCircle,
    },
    {
      label: "Treatment Protocols",
      href: "/treatment-protocols",
      icon: Activity,
    },
    { label: "Supporting Info", href: "/supporting-info", icon: HelpCircle },
    { label: "Share", href: "/share", icon: Share2 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1 sm:gap-2 font-bold text-sm sm:text-lg text-primary"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2F75b15b416bb74faa95dd3e0818707c94?format=webp&width=100"
              alt="DivePlan Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="hidden sm:inline">DivePlan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2 border-t border-border pt-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
