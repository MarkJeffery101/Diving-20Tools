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

      {/* Premium Hero Section */}
      <section className="relative py-8 sm:py-10 md:py-12 px-4 sm:px-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 right-0 w-96 h-96 bg-ocean-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Logo with enhanced styling */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-ocean-400 to-blue-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2Fda50c80fe0dc4a209294b70ea30291e0?format=webp&width=300"
                  alt="DFS Logo"
                  className="relative h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              DivePlan
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl md:text-2xl text-ocean-100 font-semibold mb-6 sm:mb-8">
              Professional Dive Planning Reference
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-ocean-200 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
              Complete dive planning system for commercial, air, and nitrox diving. Access comprehensive decompression tables, emergency procedures, treatment protocols, and intelligent decision logic in one integrated platform.
            </p>

            {/* CTA indicator */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-ocean-100 px-4 py-2 rounded-full text-sm border border-ocean-300/30">
                <span>↓</span>
                <span>Explore Professional Tools</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section - Main Navigation */}
      <section className="relative py-20 sm:py-24 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          {/* Section header */}
          <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-foreground mb-4">
              Dive Planning Tools
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Access all the resources you need for safe and efficient diving operations
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {features.map((feature) => (
              <Link
                key={feature.href + feature.title}
                to={feature.href}
                className={`group relative overflow-hidden rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer ${feature.color}`}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${feature.accentColor}`}></div>

                <div className="relative z-10">
                  {/* Icon with enhanced styling */}
                  <div className={`mb-6 inline-flex p-4 rounded-xl ${feature.accentColor} group-hover:scale-110 transition-transform duration-300`}>
                    <SvgIcon id={feature.iconId} className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-opacity-90 transition-opacity">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base opacity-85 group-hover:opacity-100 leading-relaxed transition-opacity">
                    {feature.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
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
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-r from-ocean-950 via-ocean-900 to-ocean-950 text-white relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-ocean-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">
              Why DivePlan
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="group">
                <div className="w-14 h-14 bg-gradient-to-br from-ocean-400 to-ocean-500 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  ✓
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">
                  Complete Reference
                </h3>
                <p className="text-sm sm:text-base text-ocean-200 leading-relaxed">
                  All decompression tables and limits in one integrated platform
                </p>
              </div>

              <div className="group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  ✓
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">
                  Seamless Navigation
                </h3>
                <p className="text-sm sm:text-base text-ocean-200 leading-relaxed">
                  Intelligent links between tables, procedures, and decision support tools
                </p>
              </div>

              <div className="group">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  ✓
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">
                  Expert Decision Support
                </h3>
                <p className="text-sm sm:text-base text-ocean-200 leading-relaxed">
                  Interactive tools for navigating complex dive planning scenarios
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
