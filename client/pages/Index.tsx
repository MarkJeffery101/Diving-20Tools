import { Link } from "react-router-dom";
import SvgIcon from "@/components/SvgIcon";
import { Menu, X, Home, Grid3x3, Layers, BookOpen, Calculator, HelpCircle, Share2 } from "lucide-react";
import { useState } from "react";

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Tables", href: "/tables", icon: Grid3x3 },
    { label: "Table Selection", href: "/table-selection", icon: Layers },
    { label: "Table Use", href: "/table-use", icon: BookOpen },
    { label: "Tools", href: "/tools", icon: Calculator },
    { label: "Supporting Info", href: "/supporting-info", icon: HelpCircle },
    { label: "Share", href: "/share", icon: Share2 },
  ];

  const features = [
    {
      title: "Dive Tables",
      description:
        "Commercial, air, and nitrox tables with depth, time, and decompression schedules",
      iconId: "icon-dive-tables",
      href: "/tables",
      color: "bg-ocean-50 border-ocean-200 text-ocean-700",
      accentColor: "bg-ocean-100",
    },
    {
      title: "Table Selection Logic",
      description:
        "Interactive decision tree to find the right table for your dive",
      iconId: "icon-selection-logic",
      href: "/table-selection",
      color: "bg-blue-50 border-blue-200 text-blue-700",
      accentColor: "bg-blue-100",
    },
    {
      title: "Safety Limits & Guidance",
      description:
        "Oxygen toxicity, nitrogen narcosis, and critical planning considerations",
      iconId: "icon-safety-limits",
      href: "/supporting-info",
      color: "bg-green-50 border-green-200 text-green-700",
      accentColor: "bg-green-100",
    },
    {
      title: "Treatment Protocols",
      description:
        "DCS & AGE treatment tables with step schedules and oxygen protocols",
      iconId: "icon-treatment",
      href: "/supporting-info",
      color: "bg-purple-50 border-purple-200 text-purple-700",
      accentColor: "bg-purple-100",
    },
    {
      title: "Emergency Procedures",
      description:
        "Flowcharts and decision trees for rapid emergency response",
      iconId: "icon-emergency",
      href: "/emergency-flowcharts",
      color: "bg-red-50 border-red-200 text-red-700",
      accentColor: "bg-red-100",
    },
    {
      title: "Nitrox & Special Mixes",
      description:
        "SOX15, SAB15, and NIA/NIB nitrox tables with oxygen limits",
      iconId: "icon-nitrox",
      href: "/tables",
      color: "bg-amber-50 border-amber-200 text-amber-700",
      accentColor: "bg-amber-100",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Top Header Band - Extended to top with Navigation integrated */}
      <div className="flex-shrink-0 bg-gradient-to-r from-ocean-900 to-ocean-800 text-white border-b border-ocean-700">
        {/* Navigation Bar */}
        <div className="px-6 py-3 border-b border-ocean-700">
          <div className="container mx-auto">
            <div className="flex items-center justify-end gap-6">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center gap-2 text-sm font-medium text-ocean-100 hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden lg:inline">{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-ocean-700 rounded-lg transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <div className="md:hidden mt-4 space-y-2 border-t border-ocean-700 pt-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-ocean-100 hover:bg-ocean-700 rounded-lg transition-colors"
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
        </div>

        {/* Hero Content */}
        <div className="px-8 py-3">
          <div className="container mx-auto">
            <div className="flex items-center gap-8 h-36">
              {/* Logo */}
              <div className="flex-shrink-0 h-full flex items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2Fda50c80fe0dc4a209294b70ea30291e0?format=webp&width=300"
                  alt="DFS Logo"
                  className="h-full w-auto object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex-grow">
                <h1 className="text-5xl font-bold text-white leading-tight">
                  DivePlan
                </h1>
                <p className="text-xl text-ocean-200">
                  Professional Dive Planning Reference
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Content - Cards Grid */}
      <div className="flex-grow overflow-y-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => (
              <Link
                key={feature.href + feature.title}
                to={feature.href}
                className={`group relative overflow-hidden rounded-lg border-2 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${feature.color}`}
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`mb-4 inline-flex p-3 rounded-lg ${feature.accentColor} group-hover:scale-110 transition-transform duration-300`}>
                    <SvgIcon id={feature.iconId} className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-opacity-90 transition-opacity">
                    {feature.title}
                  </h3>
                  <p className="text-sm opacity-85 group-hover:opacity-100 leading-relaxed transition-opacity">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Benefits Bar */}
      <div className="flex-shrink-0 bg-ocean-950 text-white px-4 sm:px-6 py-8 border-t border-ocean-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-ocean-500 rounded-lg flex items-center justify-center flex-shrink-0 text-lg font-bold">
                ✓
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold">
                  Complete Reference
                </h3>
                <p className="text-sm text-ocean-300 leading-relaxed">
                  All tables and limits in one platform
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-lg font-bold">
                ✓
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold">
                  Seamless Navigation
                </h3>
                <p className="text-sm text-ocean-300 leading-relaxed">
                  Smart links between tools
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 text-lg font-bold">
                ✓
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold">
                  Decision Support
                </h3>
                <p className="text-sm text-ocean-300 leading-relaxed">
                  Tools for complex scenarios
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
