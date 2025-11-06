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
      description: "Flowcharts and decision trees for rapid emergency response",
      iconId: "icon-emergency",
      href: "/emergency-flowcharts",
      color: "bg-red-50 border-red-200 text-red-700",
      accentColor: "bg-red-100",
    },
    {
      title: "Nitrox & Special Mixes",
      description: "SOX15, SAB15, and NIA/NIB nitrox tables with oxygen limits",
      iconId: "icon-nitrox",
      href: "/tables",
      color: "bg-amber-50 border-amber-200 text-amber-700",
      accentColor: "bg-amber-100",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <Navigation />

      {/* Top Header Band */}
      <div className="flex-shrink-0 bg-gradient-to-r from-ocean-900 to-ocean-800 text-white px-4 sm:px-8 md:px-6 py-1 sm:py-2 md:py-0.5 lg:py-0.5 border-b border-ocean-700">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-3 lg:gap-2 h-16 sm:h-32 md:h-16 lg:h-14">
            {/* Logo */}
            <div className="flex-shrink-0 h-full flex items-center md:max-w-[45px] lg:max-w-[50px]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2Fda50c80fe0dc4a209294b70ea30291e0?format=webp&width=300"
                alt="DFS Logo"
                className="h-full w-auto object-contain"
              />
            </div>

            {/* Text */}
            <div className="flex-grow">
              <h1 className="text-2xl sm:text-5xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                DivePlan
              </h1>
              <p className="text-xs sm:text-xl md:text-xs lg:text-sm text-ocean-200">
                Professional Dive Planning Reference
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Content - Cards Grid */}
      <div className="flex-grow overflow-y-auto px-2 sm:px-4 md:px-2 lg:px-2 py-1 sm:py-4 md:py-1 lg:py-1">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-2 max-w-full mx-auto">
            {features.map((feature) => (
              <Link
                key={feature.href + feature.title}
                to={feature.href}
                className={`group relative overflow-hidden rounded-lg border-2 p-2 sm:p-3 md:p-2 lg:p-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${feature.color}`}
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`mb-1 sm:mb-3 md:mb-2 lg:mb-2 inline-flex p-1.5 sm:p-2 md:p-2 lg:p-2 rounded-lg ${feature.accentColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <SvgIcon
                      id={feature.iconId}
                      className="h-3 w-3 sm:h-5 sm:w-5 md:h-4 md:w-4 lg:h-4 lg:w-4"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xs sm:text-base md:text-sm lg:text-sm font-bold mb-1 group-hover:text-opacity-90 transition-opacity">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-xs md:text-xs lg:text-xs opacity-85 group-hover:opacity-100 leading-tight transition-opacity">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Benefits Bar */}
      <div className="flex-shrink-0 bg-ocean-950 text-white px-3 sm:px-6 md:px-4 py-1 sm:py-6 md:py-1 lg:py-1 border-t border-ocean-800 lg:h-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-2 sm:gap-6">
            <div className="flex flex-col sm:flex-row sm:items-start items-center gap-0.5 sm:gap-2 lg:gap-1">
              <div className="w-5 h-5 sm:w-8 sm:h-8 lg:w-5 lg:h-5 bg-ocean-500 rounded-lg flex items-center justify-center flex-shrink-0 text-xs sm:text-sm lg:text-xs font-bold">
                ✓
              </div>
              <div className="min-w-0 text-center sm:text-left">
                <h3 className="text-xs sm:text-sm lg:text-xs font-bold">
                  Complete Reference
                </h3>
                <p className="hidden sm:block text-xs lg:hidden text-ocean-300 leading-tight">
                  All tables and limits in one platform
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start items-center gap-0.5 sm:gap-2 lg:gap-1">
              <div className="w-5 h-5 sm:w-8 sm:h-8 lg:w-5 lg:h-5 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-xs sm:text-sm lg:text-xs font-bold">
                ✓
              </div>
              <div className="min-w-0 text-center sm:text-left">
                <h3 className="text-xs sm:text-sm lg:text-xs font-bold">
                  Seamless Navigation
                </h3>
                <p className="hidden sm:block text-xs lg:hidden text-ocean-300 leading-tight">
                  Smart links between tools
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start items-center gap-0.5 sm:gap-2 lg:gap-1">
              <div className="w-5 h-5 sm:w-8 sm:h-8 lg:w-5 lg:h-5 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 text-xs sm:text-sm lg:text-xs font-bold">
                ✓
              </div>
              <div className="min-w-0 text-center sm:text-left">
                <h3 className="text-xs sm:text-sm lg:text-xs font-bold">
                  Decision Support
                </h3>
                <p className="hidden sm:block text-xs lg:hidden text-ocean-300 leading-tight">
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
