import { Link } from "react-router-dom";
import { BookOpen, TrendingDown, Database, MapPin, AlertCircle, Zap, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Index() {
  const sections = [
    {
      title: "Dive Tables",
      description:
        "Comprehensive index and detailed views of all commercial, air, and nitrox dive tables with depth, time, and decompression information.",
      icon: Database,
      href: "/tables",
      color: "bg-ocean-50 text-ocean-700",
      borderColor: "border-ocean-200",
    },
    {
      title: "Table Selection Logic",
      description:
        "Interactive decision tree to help you select the right table based on documentation criteria and dive parameters.",
      icon: TrendingDown,
      href: "/table-selection",
      color: "bg-blue-50 text-blue-700",
      borderColor: "border-blue-200",
    },
    {
      title: "Supporting Information",
      description:
        "Safe and maximum limits, guidance documentation, rules, and all supporting information for table selection.",
      icon: BookOpen,
      href: "/supporting-info",
      color: "bg-purple-50 text-purple-700",
      borderColor: "border-purple-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-4 sm:py-16 md:py-32 px-2 sm:px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-ocean-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10 px-2 sm:px-4">
          <div className="max-w-4xl mx-auto">
            {/* Logo Section */}
            <div className="flex justify-center mb-2 sm:mb-10 md:mb-12">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2Fda50c80fe0dc4a209294b70ea30291e0?format=webp&width=300"
                alt="DFS Logo"
                className="h-16 sm:h-40 md:h-64 w-auto object-contain"
              />
            </div>

            {/* Text Content - Centered */}
            <div className="text-center mb-3 sm:mb-12 md:mb-14">
              <h1 className="text-lg sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-1 sm:mb-6 leading-tight">
                DivePlan
              </h1>
              <p className="text-xs sm:text-xl md:text-2xl text-ocean-700 font-semibold mb-2 sm:mb-8">
                Professional Dive Planning Reference
              </p>

              <p className="text-[10px] sm:text-base md:text-lg text-muted-foreground mb-3 sm:mb-10 leading-tight max-w-2xl mx-auto">
                A comprehensive, interlinked dive planning system for
                commercial, air, and nitrox diving. Access decompression tables,
                emergency procedures, treatment protocols, and decision logic
                trees in one integrated platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-4 justify-center">
                <Link
                  to="/tables"
                  className="px-4 sm:px-10 py-1.5 sm:py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-[11px] sm:text-base"
                >
                  Start with Tables
                </Link>
                <Link
                  to="/table-selection"
                  className="px-4 sm:px-10 py-1.5 sm:py-3.5 bg-white text-primary border-2 border-primary font-semibold rounded-lg hover:bg-ocean-50 transition-colors text-[11px] sm:text-base"
                >
                  Find Your Table
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-4 sm:py-16 md:py-20 px-2 sm:px-4 bg-white relative">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-3xl mx-auto text-center mb-3 sm:mb-12 md:mb-16">
            <h2 className="text-sm sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-4">
              Integrated Dive Planning Resources
            </h2>
            <p className="text-[10px] sm:text-base md:text-lg text-muted-foreground">
              All essential dive planning information, interconnected and
              organized for quick reference
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Link
                  key={section.href}
                  to={section.href}
                  className="group p-2 sm:p-6 md:p-8 rounded-xl border-2 transition-all hover:shadow-lg hover:-translate-y-1"
                  style={{
                    background: section.color,
                    borderColor: section.borderColor,
                  }}
                >
                  <div className="mb-1 sm:mb-4">
                    <IconComponent className="h-4 sm:h-10 w-4 sm:w-10" />
                  </div>
                  <h3 className="text-[12px] sm:text-xl font-bold mb-0.5 sm:mb-2 group-hover:opacity-90">
                    {section.title}
                  </h3>
                  <p className="text-[9px] sm:text-sm opacity-80 group-hover:opacity-100">
                    {section.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-4 sm:py-16 md:py-20 px-2 sm:px-4 bg-gradient-to-br from-ocean-900 to-ocean-800 text-white">
        <div className="container mx-auto px-2 sm:px-4">
          <h2 className="text-sm sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-12 md:mb-16">
            Why DivePlan?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8 md:gap-12">
            <div>
              <div className="mb-2">
                <div className="w-6 sm:w-12 h-6 sm:h-12 bg-ocean-500 rounded-lg flex items-center justify-center font-bold text-[10px] sm:text-lg">
                  1
                </div>
              </div>
              <h3 className="text-[12px] sm:text-xl font-bold mb-0.5 sm:mb-3">
                Complete Information
              </h3>
              <p className="text-[9px] sm:text-base text-ocean-100">
                All dive tables, limits, and documentation in one accessible
                place for all diving types.
              </p>
            </div>

            <div>
              <div className="mb-2">
                <div className="w-6 sm:w-12 h-6 sm:h-12 bg-ocean-500 rounded-lg flex items-center justify-center font-bold text-[10px] sm:text-lg">
                  2
                </div>
              </div>
              <h3 className="text-[12px] sm:text-xl font-bold mb-0.5 sm:mb-3">
                Smart Interlinks
              </h3>
              <p className="text-[9px] sm:text-base text-ocean-100">
                Seamlessly navigate between tables, procedures, and protocols
                with contextual cross-references.
              </p>
            </div>

            <div>
              <div className="mb-2">
                <div className="w-6 sm:w-12 h-6 sm:h-12 bg-ocean-500 rounded-lg flex items-center justify-center font-bold text-[10px] sm:text-lg">
                  3
                </div>
              </div>
              <h3 className="text-[12px] sm:text-xl font-bold mb-0.5 sm:mb-3">
                Decision Support
              </h3>
              <p className="text-[9px] sm:text-base text-ocean-100">
                Interactive logic trees help you navigate complex decisions from
                table selection to emergency response.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* My Dive Plan Section */}
      <section className="py-4 sm:py-16 md:py-20 px-2 sm:px-4 bg-white">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-3 sm:mb-12 md:mb-16">
              <h2 className="text-sm sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-4">
                Your Dive Planning Toolkit
              </h2>
              <p className="text-[10px] sm:text-base md:text-lg text-muted-foreground">
                Everything you need for safe, informed dive planning
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
              <div className="p-2 sm:p-6 md:p-8 rounded-lg border border-ocean-200 bg-ocean-50 hover:shadow-md transition-shadow">
                <Database className="h-6 sm:h-8 w-6 sm:w-8 text-ocean-700 mb-2 sm:mb-4" />
                <h3 className="text-[12px] sm:text-lg font-bold text-foreground mb-0.5 sm:mb-2">
                  Commercial & Air Tables
                </h3>
                <p className="text-[9px] sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                  SIL15, ND15, and AIR tables with full decompression schedules
                </p>
              </div>

              <div className="p-2 sm:p-6 md:p-8 rounded-lg border border-blue-200 bg-blue-50 hover:shadow-md transition-shadow">
                <Zap className="h-6 sm:h-8 w-6 sm:w-8 text-blue-700 mb-2 sm:mb-4" />
                <h3 className="text-[12px] sm:text-lg font-bold text-foreground mb-0.5 sm:mb-2">
                  Nitrox & Special Mixes
                </h3>
                <p className="text-[9px] sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                  SOX15, SAB15, and NIA/NIB nitrox tables with oxygen limits
                </p>
              </div>

              <div className="p-2 sm:p-6 md:p-8 rounded-lg border border-purple-200 bg-purple-50 hover:shadow-md transition-shadow">
                <Shield className="h-6 sm:h-8 w-6 sm:w-8 text-purple-700 mb-2 sm:mb-4" />
                <h3 className="text-[12px] sm:text-lg font-bold text-foreground mb-0.5 sm:mb-2">
                  Treatment Protocols
                </h3>
                <p className="text-[9px] sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                  DCS & AGE treatment tables with step schedules and oxygen protocols
                </p>
              </div>

              <div className="p-2 sm:p-6 md:p-8 rounded-lg border border-red-200 bg-red-50 hover:shadow-md transition-shadow">
                <AlertCircle className="h-6 sm:h-8 w-6 sm:w-8 text-red-700 mb-2 sm:mb-4" />
                <h3 className="text-[12px] sm:text-lg font-bold text-foreground mb-0.5 sm:mb-2">
                  Emergency Procedures
                </h3>
                <p className="text-[9px] sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                  Emergency flowcharts and decision trees for rapid response
                </p>
              </div>

              <div className="p-2 sm:p-6 md:p-8 rounded-lg border border-amber-200 bg-amber-50 hover:shadow-md transition-shadow">
                <TrendingDown className="h-6 sm:h-8 w-6 sm:w-8 text-amber-700 mb-2 sm:mb-4" />
                <h3 className="text-[12px] sm:text-lg font-bold text-foreground mb-0.5 sm:mb-2">
                  Table Selection Logic
                </h3>
                <p className="text-[9px] sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                  Interactive decision trees to find the right table for your dive
                </p>
              </div>

              <div className="p-2 sm:p-6 md:p-8 rounded-lg border border-green-200 bg-green-50 hover:shadow-md transition-shadow">
                <BookOpen className="h-6 sm:h-8 w-6 sm:w-8 text-green-700 mb-2 sm:mb-4" />
                <h3 className="text-[12px] sm:text-lg font-bold text-foreground mb-0.5 sm:mb-2">
                  Safety Limits & Guidance
                </h3>
                <p className="text-[9px] sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                  Oxygen toxicity limits, nitrogen narcosis, and planning considerations
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-8 md:mt-12 p-3 sm:p-6 md:p-8 bg-gradient-to-r from-ocean-50 to-blue-50 rounded-lg border border-ocean-200">
              <p className="text-[10px] sm:text-base text-muted-foreground text-center">
                <span className="font-semibold text-foreground">Ready to plan your dive?</span> Start exploring by selecting dive tables, table selection logic, or diving guidance to build your dive profile with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
