import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import {
  BookOpen,
  AlertTriangle,
  Pill,
  TrendingDown,
  Database,
  MapPin,
} from "lucide-react";

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
      title: "Emergency Procedures",
      description:
        "Detailed logic trees and protocols for identifying and responding to diving emergencies with actionable steps.",
      icon: AlertTriangle,
      href: "/emergency-procedures",
      color: "bg-red-50 text-red-700",
      borderColor: "border-red-200",
    },
    {
      title: "Treatment Protocols",
      description:
        "Comprehensive treatment protocols and decision trees for managing diving-related medical conditions.",
      icon: Pill,
      href: "/treatment-protocols",
      color: "bg-green-50 text-green-700",
      borderColor: "border-green-200",
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
      <section className="relative py-12 sm:py-16 md:py-32 px-3 sm:px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-ocean-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10 px-2 sm:px-4">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-ocean-100 text-ocean-700 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 font-medium text-xs sm:text-sm">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Professional Dive Planning System</span>
              <span className="sm:hidden">Dive Planning</span>
            </div>

            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2F4053f12f8ce84360acd2c6b95e9838ee?format=webp&width=800"
              alt="DivePlan App Preview"
              className="max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 rounded-lg shadow-lg border border-gray-200"
            />
            <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              DivePlan: Professional Dive Planning Reference
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              A comprehensive, interlinked dive planning system for commercial,
              air, and nitrox diving. Access decompression tables, emergency
              procedures, treatment protocols, and decision logic trees in one
              integrated platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/tables"
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                Start with Tables
              </Link>
              <Link
                to="/table-selection"
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-primary border-2 border-primary font-semibold rounded-lg hover:bg-ocean-50 transition-colors text-sm sm:text-base"
              >
                Find Your Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-white relative">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Integrated Dive Planning Resources
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              All essential dive planning information, interconnected and
              organized for quick reference
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Link
                  key={section.href}
                  to={section.href}
                  className="group p-4 sm:p-6 md:p-8 rounded-xl border-2 transition-all hover:shadow-lg hover:-translate-y-1"
                  style={{
                    background: section.color,
                    borderColor: section.borderColor,
                  }}
                >
                  <div className="mb-3 sm:mb-4">
                    <IconComponent className="h-8 sm:h-10 w-8 sm:w-10" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:opacity-90">
                    {section.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-80 group-hover:opacity-100">
                    {section.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-gradient-to-br from-ocean-900 to-ocean-800 text-white">
        <div className="container mx-auto px-2 sm:px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
            Why DivePlan?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <div>
              <div className="mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-ocean-500 rounded-lg flex items-center justify-center font-bold text-base sm:text-lg">
                  1
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Complete Information</h3>
              <p className="text-sm sm:text-base text-ocean-100">
                All dive tables, limits, and documentation in one accessible
                place for all diving types.
              </p>
            </div>

            <div>
              <div className="mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-ocean-500 rounded-lg flex items-center justify-center font-bold text-base sm:text-lg">
                  2
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Smart Interlinks</h3>
              <p className="text-sm sm:text-base text-ocean-100">
                Seamlessly navigate between tables, procedures, and protocols
                with contextual cross-references.
              </p>
            </div>

            <div>
              <div className="mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-ocean-500 rounded-lg flex items-center justify-center font-bold text-base sm:text-lg">
                  3
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Decision Support</h3>
              <p className="text-sm sm:text-base text-ocean-100">
                Interactive logic trees help you navigate complex decisions from
                table selection to emergency response.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
