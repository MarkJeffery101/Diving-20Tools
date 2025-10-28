import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { BookOpen, Info } from "lucide-react";
import { useState } from "react";

export default function SupportingInfo() {
  const [expandedSection, setExpandedSection] = useState("limits");

  const sections = [
    {
      id: "limits",
      title: "Safe and Maximum Limits",
      icon: "📏",
      content: [
        {
          subtitle: "Recreational Diving",
          items: [
            "Maximum Depth: 40m (130 feet)",
            "Maximum Bottom Time: Based on no-decompression limits per table",
            "Maximum Ascent Rate: 10m per minute",
            "Minimum Safety Stop: 3-5 minutes at 3m depth when applicable",
            "Surface Interval Minimum: 1 hour between dives",
          ],
        },
        {
          subtitle: "Commercial Diving",
          items: [
            "Maximum Depth: 100m+ (with specialized training and equipment)",
            "Nitrogen Narcosis Concern: Increases below 30m, severe at 60m+",
            "Mandatory Decompression: Beyond no-stop limits on all dives",
            "Ascent Rate: 10m/min standard, adjustable based on schedule",
            "Oxygen Exposure Limit: Total daily limit and PPO2 limits apply",
          ],
        },
        {
          subtitle: "Nitrox Diving",
          items: [
            "Maximum Operating Depth (MOD): Determined by PPO2 limit and oxygen percentage",
            "Nitrox 32% MOD: Approximately 42m (with 1.4 bar PPO2)",
            "Nitrox 40% MOD: Approximately 30m (with 1.4 bar PPO2)",
            "Nitrogen Narcosis: Reduced compared to air at same depth due to EAD",
            "Decompression Advantage: Shorter decompression times than air",
          ],
        },
      ],
    },
    {
      id: "ppo2",
      title: "Partial Pressure of Oxygen (PPO2) Reference",
      icon: "⚗️",
      content: [
        {
          subtitle: "What is PPO2?",
          items: [
            "PPO2 = Fractional oxygen percentage × absolute pressure in bar",
            "Absolute Pressure = 1 + (depth in meters / 10)",
            "PPO2 determines oxygen toxicity risk at different depths",
          ],
        },
        {
          subtitle: "Safe PPO2 Limits",
          items: [
            "Recreational Maximum: 1.4 bar PPO2",
            "Commercial Maximum: 1.6 bar PPO2 (some guidelines allow up to 1.8)",
            "Minimum Functional: 0.16 bar PPO2 (hypoxia risk below this)",
            "Warning Zone: 1.5-1.6 bar PPO2 (oxygen toxicity risk increasing)",
          ],
        },
        {
          subtitle: "PPO2 Examples",
          items: [
            "Air (21% O2) at 30m: PPO2 = 0.84 bar (safe)",
            "Air (21% O2) at 60m: PPO2 = 1.68 bar (exceeds safe limits)",
            "Nitrox 32% at 40m: PPO2 = 1.44 bar (within safe limits)",
            "Nitrox 40% at 25m: PPO2 = 1.34 bar (within safe limits)",
          ],
        },
      ],
    },
    {
      id: "ead",
      title: "Equivalent Air Depth (EAD) & Nitrogen Narcosis",
      icon: "🎯",
      content: [
        {
          subtitle: "What is EAD?",
          items: [
            "EAD accounts for reduced nitrogen in enriched air at depth",
            "Formula: EAD = (depth × fraction of nitrogen / 0.79) - depth",
            "Tells you the equivalent depth for standard air decompression",
            "Nitrox has less nitrogen, so nitrogen narcosis is reduced",
          ],
        },
        {
          subtitle: "Nitrogen Narcosis Depth Categories",
          items: [
            "0-9m: No narcosis (clear)",
            "9-18m: Minimal narcosis (slight slowness)",
            "18-35m: Mild narcosis (caution recommended)",
            "35-55m: Moderate narcosis (experienced divers only)",
            "55-75m: Severe narcosis (only for very experienced divers)",
            "75m+: Extreme narcosis (generally not recommended)",
          ],
        },
        {
          subtitle: "Nitrox Benefits Example",
          items: [
            "Nitrox 32% at 45m has EAD of ~28m (much less narcosis than air)",
            "Extended bottom times at moderate depths",
            "Reduced decompression requirements",
            "More conservate nitrogen loading",
          ],
        },
      ],
    },
    {
      id: "surface-intervals",
      title: "Surface Intervals & Repetitive Diving",
      icon: "⏱️",
      content: [
        {
          subtitle: "Surface Interval Requirements",
          items: [
            "Minimum 1 hour between dives for most profiles",
            "Longer intervals (2-6 hours) preferred for deeper dives",
            "Surface interval allows nitrogen elimination",
            "Longer intervals = lower residual nitrogen for next dive",
          ],
        },
        {
          subtitle: "Repetitive Dive Planning",
          items: [
            "Residual Nitrogen: Nitrogen remaining in tissues after surface interval",
            "Conservative Approach: Treat each dive slightly deeper/longer than planned",
            "Repetitive Diving Limits: Stay within table limitations",
            "Rock Bottom: Always reserve minimum air for safety",
          ],
        },
        {
          subtitle: "Multi-Dive Guidelines",
          items: [
            "Never exceed 4 dives in a single day",
            "Prefer shallower dives later in the day",
            "Increase surface intervals for consecutive deep dives",
            "Consider rest day after multiple days of diving",
          ],
        },
      ],
    },
    {
      id: "regulations",
      title: "Safety Rules & Regulations",
      icon: "📋",
      content: [
        {
          subtitle: "Equipment Requirements",
          items: [
            "Properly serviced and maintained dive equipment",
            "Backup air source (buddy or redundant supply)",
            "Depth gauge and timing device (dive computer recommended)",
            "Weight and buoyancy control equipment",
            "Adequate thermal protection for water temperature",
            "Emergency signaling devices",
          ],
        },
        {
          subtitle: "Mandatory Procedures",
          items: [
            "Dive plan briefing with all divers before entering water",
            "Buddy system: Never dive alone",
            "Buddy check before each dive (SAFTEYY)",
            "Controlled entry and exit",
            "Continuous monitoring of depth, time, and air supply",
            "10m/minute ascent rate (or slower)",
            "Safety stops when required (3-5 min at 3m depth)",
          ],
        },
        {
          subtitle: "Certification & Training",
          items: [
            "Appropriate certification required for dive profile",
            "Training specific to gas type (air, nitrox, mixed gases)",
            "Specialized training for commercial diving operations",
            "Regular equipment and procedure review",
            "Current CPR and first aid certification recommended",
          ],
        },
      ],
    },
    {
      id: "corrections",
      title: "Altitude, Water Type & Temperature Corrections",
      icon: "🌍",
      content: [
        {
          subtitle: "Altitude Corrections",
          items: [
            "Atmospheric pressure decreases with elevation",
            "Sea level: 1.013 bar",
            "At 2,400m elevation: ~0.78 bar (significantly affects tables)",
            "Use altitude-adjusted tables or corrections for high-altitude diving",
            "Altitude dives have higher decompression requirements",
          ],
        },
        {
          subtitle: "Water Type Considerations",
          items: [
            "Saltwater: Standard density for most tables",
            "Freshwater: Slightly less dense than saltwater",
            "Brackish water: Variable density depending on salt content",
            "Very dense water (high salinity): May affect buoyancy calculations",
          ],
        },
        {
          subtitle: "Water Temperature Effects",
          items: [
            "Cold water increases nitrogen absorption (deeper breathing)",
            "Thermal protection essential: prevents hypothermia and heat loss",
            "Extreme cold: Consider reduced bottom times",
            "Warm water: Standard table application appropriate",
            "Temperature monitoring during dive important",
          ],
        },
      ],
    },
    {
      id: "decompression-theory",
      title: "Decompression Theory Basics",
      icon: "💨",
      content: [
        {
          subtitle: "How Decompression Works",
          items: [
            "At depth: Increased pressure forces gas into tissues (nitrogen loading)",
            "Upon ascent: Pressure decreases, excess nitrogen forms bubbles",
            "Controlled ascent: Allows nitrogen elimination without bubble formation",
            "Decompression stops: Reduce pressure gradually, preventing DCS",
          ],
        },
        {
          subtitle: "Fast Tissue vs Slow Tissue",
          items: [
            "Fast tissues: Absorb/release nitrogen quickly (brain, blood)",
            "Slow tissues: Absorb/release nitrogen slowly (bones, fat)",
            "Longer dives: Slow tissues become saturated",
            "Decompression requirements increase with slower tissue saturation",
          ],
        },
        {
          subtitle: "No-Decompression Limits",
          items: [
            "Maximum time before mandatory stops required",
            "Depends on depth and gas type",
            "Exceeding limit = mandatory decompression",
            "Conservative approach: Stay well under limits",
          ],
        },
      ],
    },
  ];

  const selectedSection =
    sections.find((s) => s.id === expandedSection) || sections[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      <section className="py-12 px-4 bg-white border-b border-border">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Supporting Information & Guidance
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Comprehensive reference material for dive planning including safety
            limits, regulations, technical concepts, and supporting
            calculations.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-3 gap-8">
          {/* Section Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border border-border overflow-hidden sticky top-24">
              <div className="p-4 bg-primary text-primary-foreground font-bold flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Topics
              </div>

              <div className="divide-y divide-border">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setExpandedSection(section.id)}
                    className={`w-full text-left p-4 hover:bg-ocean-50 transition-colors ${
                      expandedSection === section.id
                        ? "bg-ocean-100 border-l-4 border-primary"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{section.icon}</span>
                      <div>
                        <div className="font-semibold text-foreground text-sm">
                          {section.title}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{selectedSection.icon}</span>
                <h2 className="text-3xl font-bold text-foreground">
                  {selectedSection.title}
                </h2>
              </div>

              <div className="space-y-8">
                {selectedSection.content.map((subsection, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border">
                      {subsection.subtitle}
                    </h3>
                    <ul className="space-y-2">
                      {subsection.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex gap-3 text-foreground p-2 hover:bg-ocean-50 rounded transition-colors"
                        >
                          <span className="text-primary font-bold flex-shrink-0">
                            ▶
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference Cards */}
      <section className="py-12 px-4 bg-white border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Quick Reference Cards
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-border">
              <h3 className="font-bold text-lg text-foreground mb-4">
                Safe Diving Checklist
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Buddy assigned and briefed</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Equipment inspected and tested</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Dive plan reviewed with all divers</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Depth and time limits confirmed</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Proper ascent rate and stops planned</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Emergency procedures reviewed</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-lg border border-border bg-blue-50">
              <h3 className="font-bold text-lg text-blue-900 mb-4">
                Common Calculation Formulas
              </h3>
              <div className="space-y-3 text-sm font-mono text-blue-900">
                <div>
                  <div className="font-bold text-blue-700">Absolute Pressure:</div>
                  <div>1 + (depth m / 10) = bar</div>
                </div>
                <div>
                  <div className="font-bold text-blue-700">PPO2:</div>
                  <div>O2% × absolute pressure = bar</div>
                </div>
                <div>
                  <div className="font-bold text-blue-700">EAD:</div>
                  <div>(depth × N2%) / 0.79 - depth = meters</div>
                </div>
                <div>
                  <div className="font-bold text-blue-700">MOD (at 1.4 bar):</div>
                  <div>(1.4 / O2%) - 1) × 10 = meters</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border bg-green-50">
              <h3 className="font-bold text-lg text-green-900 mb-4">
                Emergency Contact Information
              </h3>
              <ul className="space-y-2 text-sm text-green-900">
                <li>
                  <span className="font-bold">DAN (Divers Alert Network):</span>
                  <br />
                  +1-919-684-9111 (USA)
                </li>
                <li>
                  <span className="font-bold">Local Emergency:</span>
                  <br />
                  Call 911 or local emergency services
                </li>
                <li>
                  <span className="font-bold">Nearest Recompression Chamber:</span>
                  <br />
                  Research location before diving
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-lg border border-border bg-orange-50">
              <h3 className="font-bold text-lg text-orange-900 mb-4">
                Common Mistakes to Avoid
              </h3>
              <ul className="space-y-2 text-sm text-orange-900">
                <li>❌ Exceeding depth or time limits</li>
                <li>❌ Skipping safety stops</li>
                <li>❌ Ascending too quickly</li>
                <li>❌ Diving alone without buddy</li>
                <li>❌ Not checking equipment thoroughly</li>
                <li>❌ Ignoring nitrogen narcosis effects</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Related Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/tables"
              className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary mb-2">
                Dive Tables
              </h3>
              <p className="text-sm text-muted-foreground">
                All decompression tables and reference data.
              </p>
            </Link>

            <Link
              to="/table-selection"
              className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary mb-2">
                Table Selection
              </h3>
              <p className="text-sm text-muted-foreground">
                Interactive tool to find the right table.
              </p>
            </Link>

            <Link
              to="/emergency-procedures"
              className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary mb-2">
                Emergency Procedures
              </h3>
              <p className="text-sm text-muted-foreground">
                Emergency response and treatment protocols.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
