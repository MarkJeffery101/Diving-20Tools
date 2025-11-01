import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Pill, ChevronDown, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function TreatmentProtocols() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const protocols = [
    {
      id: "dcs",
      title: "Decompression Sickness (DCS)",
      category: "Diving Illness",
      treatment: ["100% oxygen at surface", "Hyperbaric oxygen recompression", "IV hydration", "Follow-up care"],
      prevention: "Strict adherence to decompression schedules, slow ascent rates, conservative planning",
    },
    {
      id: "age",
      title: "Arterial Gas Embolism (AGE)",
      category: "Diving Injury",
      treatment: ["100% oxygen immediately", "Emergency recompression chamber", "CPR if needed", "IV hydration"],
      prevention: "Never hold breath during ascent, maintain proper ascent rate, equalize continuously",
    },
    {
      id: "hypothermia",
      title: "Hypothermia",
      category: "Environmental",
      treatment: ["Remove from cold environment", "Remove wet clothing", "Wrap in warm blankets", "Monitor vitals", "Avoid rough handling"],
      prevention: "Appropriate thermal protection, pre-dive planning, monitor dive duration",
    },
    {
      id: "oxygen-tox",
      title: "Oxygen Toxicity",
      category: "Gas Toxicity",
      treatment: ["Descend to reduce PPO2", "Switch to lower oxygen mix", "Return to surface with stops", "Medical evaluation"],
      prevention: "Monitor PPO2, respect maximum operating depths, follow time limits",
    },
    {
      id: "nitrogen-narc",
      title: "Nitrogen Narcosis",
      category: "Physiological",
      treatment: ["Ascend to shallower depth", "Maintain control", "Monitor depth", "Complete decompression"],
      prevention: "Respect depth limits, use nitrox for deep dives, maintain fitness",
    },
    {
      id: "squeeze",
      title: "Barotrauma (Squeeze)",
      category: "Pressure Injury",
      treatment: ["Stop diving immediately", "Warm compresses for ear/sinus", "Medical evaluation", "Hospital for lung"],
      prevention: "Equalize pressure early and frequently, never force, ascend properly",
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
            Treatment Protocols
          </h1>
          <p className="text-xs text-muted-foreground">
            Medical protocols for diving-related injuries and illnesses
          </p>
        </div>
      </section>

      {/* Protocol Cards Grid */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {protocols.map((protocol) => (
              <div
                key={protocol.id}
                className="bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <button
                  onClick={() => toggleExpanded(protocol.id)}
                  className="w-full p-3 flex items-start justify-between hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Pill className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <h2 className="text-sm font-bold text-foreground">
                        {protocol.title}
                      </h2>
                    </div>
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-700">
                      {protocol.category}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform flex-shrink-0 ${
                      expandedId === protocol.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expanded Content */}
                {expandedId === protocol.id && (
                  <div className="border-t border-border p-3 space-y-2 text-xs">
                    {/* Treatment */}
                    <div className="bg-green-50 border border-green-200 rounded p-2">
                      <h3 className="font-bold text-green-900 mb-1">Treatment</h3>
                      <ol className="space-y-1">
                        {protocol.treatment.map((step, idx) => (
                          <li key={idx} className="flex gap-2 text-green-900">
                            <span className="font-bold flex-shrink-0">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Prevention */}
                    <div className="bg-orange-50 border border-orange-200 rounded p-2">
                      <h3 className="font-bold text-orange-900 mb-1">Prevention</h3>
                      <p className="text-orange-800">{protocol.prevention}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-6 px-4 bg-white border-t border-border">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-3 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900 mb-1 text-sm">Critical Notice</h3>
              <p className="text-red-800 text-xs">
                These protocols are for reference and training. In actual emergencies, follow guidance from certified medical professionals and emergency services.
              </p>
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
              to="/emergency-procedures"
              className="p-3 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary text-sm mb-1">
                Emergency Procedures
              </h3>
              <p className="text-xs text-muted-foreground">
                Immediate response protocols
              </p>
            </Link>
            <Link
              to="/tables"
              className="p-3 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary text-sm mb-1">
                Dive Tables
              </h3>
              <p className="text-xs text-muted-foreground">
                Reference decompression schedules
              </p>
            </Link>
            <Link
              to="/supporting-info"
              className="p-3 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary text-sm mb-1">
                Supporting Info
              </h3>
              <p className="text-xs text-muted-foreground">
                Safety limits and guidance
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
