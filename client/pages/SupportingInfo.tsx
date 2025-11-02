import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { BookOpen, ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function SupportingInfo() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [otuEsotModalOpen, setOtuEsotModalOpen] = useState(false);
  const [otuEsotExpanded, setOtuEsotExpanded] = useState<string | null>(null);

  const sections = [
    {
      id: "limits",
      title: "Safe and Maximum Limits",
      icon: "📏",
      subsections: [
        { subtitle: "Recreational", items: ["Max Depth: 40m", "10m/min ascent", "3-5m safety stops", "1hr minimum surface interval"] },
        { subtitle: "Commercial", items: ["Max Depth: 100m+", "Mandatory decompression", "Daily oxygen limits", "Certified training required"] },
        { subtitle: "Nitrox", items: ["MOD by PPO2 limit", "Nitrox 32%: ~42m", "Shorter decompression", "Reduced narcosis vs air"] },
      ],
    },
    {
      id: "ppo2",
      title: "Partial Pressure of Oxygen (PPO2)",
      icon: "⚗️",
      subsections: [
        { subtitle: "What is PPO2?", items: ["PPO2 = O2% × Absolute Pressure", "Determines toxicity risk", "Measured in bar (ATA)"] },
        { subtitle: "Safe Limits", items: ["Recreational Max: 1.4 bar", "Commercial Max: 1.6 bar", "Min Functional: 0.16 bar", "Warning: 1.5-1.6 bar"] },
        { subtitle: "Examples", items: ["Air 21% @ 30m: 0.84 bar ✓", "Air 21% @ 60m: 1.68 bar ✗", "Nitrox 32% @ 40m: 1.44 bar ✓"] },
      ],
    },
    {
      id: "ead",
      title: "Equivalent Air Depth (EAD)",
      icon: "🎯",
      subsections: [
        { subtitle: "What is EAD?", items: ["Accounts for reduced nitrogen", "Formula: (depth × N2%) / 0.79 - depth", "Shows equivalent air decompression depth"] },
        { subtitle: "Nitrogen Narcosis", items: ["0-9m: No narcosis", "18-35m: Mild (caution)", "55-75m: Severe", "75m+: Extreme (not recommended)"] },
        { subtitle: "Benefits", items: ["Less narcosis than air", "Extended bottom times", "Reduced decompression"] },
      ],
    },
    {
      id: "surface-intervals",
      title: "Surface Intervals & Repetitive Diving",
      icon: "⏱️",
      subsections: [
        { subtitle: "Requirements", items: ["Minimum 1 hour between dives", "2-6 hours preferred for deep dives", "Allows nitrogen elimination"] },
        { subtitle: "Residual Nitrogen", items: ["Nitrogen remaining after dive", "Conservative planning recommended", "Stay within table limits"] },
        { subtitle: "Multi-Dive Rules", items: ["Max 4 dives per day", "Shallower dives later in day", "Rest day recommended after multiple days"] },
      ],
    },
    {
      id: "regulations",
      title: "Safety Rules & Regulations",
      icon: "📋",
      subsections: [
        { subtitle: "Equipment", items: ["Serviced and maintained", "Backup air source", "Depth gauge & timer", "Thermal protection", "Signaling devices"] },
        { subtitle: "Mandatory Procedures", items: ["Dive plan briefing", "Buddy system", "Controlled entry/exit", "Safety stops (3-5m)", "10m/min ascent rate"] },
        { subtitle: "Certification", items: ["Appropriate cert required", "Training for gas type", "CPR & first aid recommended"] },
      ],
    },
    {
      id: "corrections",
      title: "Altitude & Environmental Corrections",
      icon: "🌍",
      subsections: [
        { subtitle: "Altitude", items: ["Pressure decreases with elevation", "Sea level: 1.013 bar", "2,400m: ~0.78 bar", "Use altitude-adjusted tables"] },
        { subtitle: "Water Type", items: ["Saltwater: Standard", "Freshwater: Slightly less dense", "Brackish: Variable", "Affects buoyancy"] },
        { subtitle: "Temperature", items: ["Cold: Increases nitrogen absorption", "Thermal protection essential", "Warm: Standard application"] },
      ],
    },
    {
      id: "decompression",
      title: "Decompression Theory Basics",
      icon: "💨",
      subsections: [
        { subtitle: "How It Works", items: ["Pressure forces gas into tissues", "Ascent allows nitrogen elimination", "Decompression stops prevent DCS", "Controlled ascent is critical"] },
        { subtitle: "Tissue Types", items: ["Fast tissues: Brain, blood", "Slow tissues: Bones, fat", "Longer dives: Slower tissues saturate", "Requirements increase with depth"] },
        { subtitle: "No-Decompression Limits", items: ["Maximum time before stops required", "Depends on depth & gas", "Conservative approach recommended"] },
      ],
    },
  ];

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      {/* Page Header */}
      <section className="py-4 px-4 bg-white border-b border-border">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Supporting Information
          </h1>
          <p className="text-xs text-muted-foreground">
            Safety limits, regulations, and technical reference
          </p>
        </div>
      </section>

      {/* Information Cards Grid */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <button
                  onClick={() => toggleExpanded(section.id)}
                  className="w-full p-3 flex items-start justify-between hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{section.icon}</span>
                      <h2 className="text-sm font-bold text-foreground">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform flex-shrink-0 ${
                      expandedId === section.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expanded Content */}
                {expandedId === section.id && (
                  <div className="border-t border-border p-3 space-y-2 text-xs">
                    {section.subsections.map((sub, idx) => (
                      <div key={idx} className="pb-2 border-b border-gray-200 last:pb-0 last:border-0">
                        <h3 className="font-bold text-foreground text-[11px] mb-1">{sub.subtitle}</h3>
                        <ul className="space-y-1">
                          {sub.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex gap-2 text-foreground">
                              <span className="text-primary font-bold flex-shrink-0">▶</span>
                              <span className="text-[10px]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Reference Cards */}
      <section className="py-6 px-4 bg-white border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-sm font-bold text-foreground mb-3">Quick Reference</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <h3 className="font-bold text-foreground text-xs mb-2">Safe Checklist</h3>
              <ul className="space-y-1 text-[10px]">
                <li>✓ Buddy assigned</li>
                <li>✓ Equipment tested</li>
                <li>✓ Plan reviewed</li>
                <li>✓ Limits confirmed</li>
                <li>✓ Emergency reviewed</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg border border-border bg-blue-50">
              <h3 className="font-bold text-blue-900 text-xs mb-2">Formulas</h3>
              <div className="space-y-1 text-[9px] font-mono text-blue-900">
                <div><span className="font-bold">Abs Pressure:</span> 1 + (d/10)</div>
                <div><span className="font-bold">PPO2:</span> O2% × AP</div>
                <div><span className="font-bold">EAD:</span> (d × N2%) / 0.79 - d</div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-green-50">
              <h3 className="font-bold text-green-900 text-xs mb-2">DCS Help</h3>
              <ul className="space-y-1 text-[10px] text-green-900">
                <li><span className="font-bold">DAN:</span><br/>+1-919-684-9111</li>
                <li><span className="font-bold">Emergency:</span><br/>911</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg border border-border bg-orange-50">
              <h3 className="font-bold text-orange-900 text-xs mb-2">Avoid</h3>
              <ul className="space-y-1 text-[10px] text-orange-900">
                <li>❌ Exceed depth/time</li>
                <li>❌ Skip safety stops</li>
                <li>❌ Ascend too fast</li>
                <li>❌ Dive alone</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <h2 className="text-sm font-bold text-foreground mb-3">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link
              to="/tables"
              className="p-3 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary text-sm mb-1">
                Dive Tables
              </h3>
              <p className="text-xs text-muted-foreground">
                All decompression tables
              </p>
            </Link>
            <Link
              to="/table-selection"
              className="p-3 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary text-sm mb-1">
                Table Selection
              </h3>
              <p className="text-xs text-muted-foreground">
                Find the right table
              </p>
            </Link>
            <Link
              to="/emergency-procedures"
              className="p-3 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary text-sm mb-1">
                Emergency Procedures
              </h3>
              <p className="text-xs text-muted-foreground">
                Emergency response protocols
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
