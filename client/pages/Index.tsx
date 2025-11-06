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

      {/* Compact Header Section */}
      <section className="relative py-3 sm:py-4 md:py-5 px-2 sm:px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-ocean-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10 px-2 sm:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2Fda50c80fe0dc4a209294b70ea30291e0?format=webp&width=300"
                alt="DFS Logo"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain"
              />
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 leading-tight">
              DivePlan
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-tight">
              Professional Dive Planning Reference
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid Section - Main Navigation */}
      <section className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 bg-white">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature) => (
              <Link
                key={feature.href + feature.title}
                to={feature.href}
                className={`group p-6 sm:p-7 md:p-8 rounded-xl border-2 transition-all hover:shadow-xl hover:-translate-y-2 cursor-pointer ${feature.color}`}
              >
                <div className="mb-4 sm:mb-5">
                  <SvgIcon id={feature.iconId} className="h-8 sm:h-9 md:h-10 w-8 sm:w-9 md:w-10" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base opacity-80 group-hover:opacity-100 leading-relaxed">
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
