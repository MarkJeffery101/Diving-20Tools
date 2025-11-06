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
    <div className="min-h-screen bg-gradient-to-b from-ocean-950 via-ocean-900 to-white">
      <Navigation />

      {/* Compact Hero Section */}
      <section className="relative py-3 sm:py-4 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-ocean-900 to-ocean-800">
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Logo */}
            <div className="flex justify-center mb-1.5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2Fda50c80fe0dc4a209294b70ea30291e0?format=webp&width=300"
                alt="DFS Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 leading-tight">
              DivePlan
            </h1>

            {/* Tagline */}
            <p className="text-xs sm:text-sm text-ocean-200">
              Professional Dive Planning Reference
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid Section - Main Navigation */}
      <section className="relative py-8 sm:py-10 md:py-12 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          {/* Section header */}
          <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Dive Planning Tools
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Access decompression tables, emergency procedures, and decision support
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {features.map((feature) => (
              <Link
                key={feature.href + feature.title}
                to={feature.href}
                className={`group relative overflow-hidden rounded-lg border-2 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer ${feature.color}`}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${feature.accentColor}`}></div>

                <div className="relative z-10">
                  {/* Icon with enhanced styling */}
                  <div className={`mb-3 inline-flex p-3 rounded-lg ${feature.accentColor} group-hover:scale-110 transition-transform duration-300`}>
                    <SvgIcon id={feature.iconId} className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-opacity-90 transition-opacity">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-85 group-hover:opacity-100 leading-snug transition-opacity">
                    {feature.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                    <span>Access</span>
                    <span>→</span>
                  </div>
                </div>

                {/* Border accent on hover */}
                <div className="absolute inset-0 border-2 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" style={{ borderColor: "currentColor" }}></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits Section - Enhanced */}
      <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 bg-gradient-to-r from-ocean-950 via-ocean-900 to-ocean-950 text-white relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-ocean-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
              Why DivePlan
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="group">
                <div className="w-12 h-12 bg-gradient-to-br from-ocean-400 to-ocean-500 rounded-lg flex items-center justify-center font-bold text-lg mb-3 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  ✓
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2">
                  Complete Reference
                </h3>
                <p className="text-xs sm:text-sm text-ocean-200 leading-snug">
                  All decompression tables and limits in one platform
                </p>
              </div>

              <div className="group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-lg mb-3 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  ✓
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2">
                  Seamless Navigation
                </h3>
                <p className="text-xs sm:text-sm text-ocean-200 leading-snug">
                  Smart links between tables and procedures
                </p>
              </div>

              <div className="group">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-lg mb-3 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  ✓
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2">
                  Decision Support
                </h3>
                <p className="text-xs sm:text-sm text-ocean-200 leading-snug">
                  Interactive tools for complex scenarios
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
