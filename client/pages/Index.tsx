import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SvgIcon from "@/components/SvgIcon";

export default function Index() {
  const features = [
    {
      title: "Dive Tables",
      description:
        "Commercial, air, and nitrox tables with depth, time, and decompression schedules",
      iconId: "icon-dive-tables",
      href: "/tables",
      color: "bg-ocean-50 border-ocean-200 text-ocean-700",
    },
    {
      title: "Table Selection Logic",
      description:
        "Interactive decision tree to find the right table for your dive",
      iconId: "icon-selection-logic",
      href: "/table-selection",
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      title: "Safety Limits & Guidance",
      description:
        "Oxygen toxicity, nitrogen narcosis, and critical planning considerations",
      iconId: "icon-safety-limits",
      href: "/supporting-info",
      color: "bg-green-50 border-green-200 text-green-700",
    },
    {
      title: "Treatment Protocols",
      description:
        "DCS & AGE treatment tables with step schedules and oxygen protocols",
      iconId: "icon-treatment",
      href: "/supporting-info",
      color: "bg-purple-50 border-purple-200 text-purple-700",
    },
    {
      title: "Emergency Procedures",
      description:
        "Flowcharts and decision trees for rapid emergency response",
      iconId: "icon-emergency",
      href: "/emergency-flowcharts",
      color: "bg-red-50 border-red-200 text-red-700",
    },
    {
      title: "Nitrox & Special Mixes",
      description:
        "SOX15, SAB15, and NIA/NIB nitrox tables with oxygen limits",
      iconId: "icon-nitrox",
      href: "/tables",
      color: "bg-amber-50 border-amber-200 text-amber-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-16 px-2 sm:px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-ocean-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10 px-2 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-4 sm:mb-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2Fda50c80fe0dc4a209294b70ea30291e0?format=webp&width=300"
                alt="DFS Logo"
                className="h-20 sm:h-32 md:h-40 w-auto object-contain"
              />
            </div>

            <div className="text-center">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">
                DivePlan
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-ocean-700 font-semibold mb-3 sm:mb-4">
                Professional Dive Planning Reference
              </p>

              <p className="text-xs sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 leading-tight max-w-2xl mx-auto">
                Complete dive planning system for commercial, air, and nitrox diving. Access decompression tables, emergency procedures, treatment protocols, and decision logic in one integrated platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                <Link
                  to="/tables"
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
                >
                  Explore Tables
                </Link>
                <Link
                  to="/table-selection"
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-primary border-2 border-primary font-semibold rounded-lg hover:bg-ocean-50 transition-colors text-sm sm:text-base"
                >
                  Find Your Table
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-8 sm:py-12 md:py-16 px-2 sm:px-4 bg-white">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {features.map((feature) => (
              <Link
                key={feature.href + feature.title}
                to={feature.href}
                className={`group p-4 sm:p-5 md:p-6 rounded-lg border transition-all hover:shadow-lg hover:-translate-y-1 ${feature.color}`}
              >
                <div className="mb-2 sm:mb-3">
                  <SvgIcon id={feature.iconId} className="h-6 sm:h-7 w-6 sm:w-7" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm opacity-80 group-hover:opacity-100 leading-snug">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-6 sm:py-10 md:py-12 px-2 sm:px-4 bg-gradient-to-br from-ocean-900 to-ocean-800 text-white">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div>
              <div className="w-8 h-8 bg-ocean-500 rounded-lg flex items-center justify-center font-bold text-sm mb-2">
                ✓
              </div>
              <h3 className="text-sm sm:text-base font-bold mb-1">
                Complete Reference
              </h3>
              <p className="text-xs sm:text-sm text-ocean-100 leading-snug">
                All tables and limits in one place
              </p>
            </div>

            <div>
              <div className="w-8 h-8 bg-ocean-500 rounded-lg flex items-center justify-center font-bold text-sm mb-2">
                ✓
              </div>
              <h3 className="text-sm sm:text-base font-bold mb-1">
                Seamless Navigation
              </h3>
              <p className="text-xs sm:text-sm text-ocean-100 leading-snug">
                Smart links between tables and procedures
              </p>
            </div>

            <div>
              <div className="w-8 h-8 bg-ocean-500 rounded-lg flex items-center justify-center font-bold text-sm mb-2">
                ✓
              </div>
              <h3 className="text-sm sm:text-base font-bold mb-1">
                Quick Decision Support
              </h3>
              <p className="text-xs sm:text-sm text-ocean-100 leading-snug">
                Interactive tools for complex decisions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
