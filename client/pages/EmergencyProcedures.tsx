import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function EmergencyProcedures() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const emergencies = [
    {
      id: "decompression-sickness",
      title: "Decompression Sickness",
      severity: "Critical",
      symptoms: [
        "Joint and muscle pain",
        "Fatigue and weakness",
        "Itching or rash",
        "Numbness or tingling",
        "Paralysis",
      ],
      immediateActions: [
        "Stop the dive and surface safely",
        "Administer oxygen if available (100% O2)",
        "Keep diver warm and at rest",
        "Contact emergency medical services immediately",
      ],
      treatment: "Hyperbaric oxygen therapy (recompression)",
      prevention: [
        "Follow proper decompression schedules",
        "Ascend slowly (10m/min)",
        "Include mandatory safety stops",
        "Monitor bottom time and depth",
      ],
    },
    {
      id: "nitrogen-narcosis",
      title: "Nitrogen Narcosis",
      severity: "High",
      symptoms: [
        "Euphoria or giddiness",
        "Impaired judgment",
        "Delayed response times",
        "Loss of coordination",
        "Difficulty performing tasks",
      ],
      immediateActions: [
        "Ascend to shallower depth immediately",
        "Maintain control and avoid panic",
        "Signal buddy to assist if needed",
        "Breathe deeply and calmly",
      ],
      treatment: "Ascent to shallower depth resolves symptoms",
      prevention: [
        "Stay within recommended depth limits",
        "Avoid rapid descents",
        "Use nitrox or mixed gas for deeper dives",
        "Maintain physical fitness",
      ],
    },
    {
      id: "oxygen-toxicity",
      title: "Oxygen Toxicity (CNS)",
      severity: "Critical",
      symptoms: [
        "Vision symptoms (tunnel vision)",
        "Tinnitus (ringing in ears)",
        "Nausea",
        "Dizziness",
        "Convulsions or seizures",
      ],
      immediateActions: [
        "Descend immediately to reduce PPO2",
        "Switch to lower oxygen gas mixture",
        "Abort dive and return to surface",
        "Administer oxygen at surface if needed",
      ],
      treatment: "Oxygen toxicity usually resolves at surface",
      prevention: [
        "Monitor PPO2 limits (max 1.4 bar)",
        "Know maximum operating depth",
        "Avoid exceeding bottom time limits",
        "Review table MOD carefully",
      ],
    },
    {
      id: "shallow-water-blackout",
      title: "Shallow Water Blackout",
      severity: "Critical",
      symptoms: [
        "Sudden loss of consciousness",
        "No warning signs (silent killer)",
        "Can occur during ascent",
      ],
      immediateActions: [
        "Immediate rescue from water",
        "Begin CPR if needed",
        "Provide oxygen",
        "Emergency medical services immediately",
      ],
      treatment: "CPR, oxygen, emergency medical care",
      prevention: [
        "Never hyperventilate before breath-hold",
        "Always dive with buddy system",
        "Understand oxygen depletion",
        "Follow proper ascent procedures",
      ],
    },
  ];

  const toggleExpanded = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      {/* Page Header */}
      <section className="py-4 px-4 bg-white border-b border-border">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Emergency Procedures
          </h1>
          <p className="text-xs text-muted-foreground">
            Identify and respond to diving emergencies
          </p>
        </div>
      </section>

      {/* Emergency Cards Grid */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
            {emergencies.map((emergency) => (
              <div
                key={emergency.id}
                className="bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <button
                  onClick={() => toggleExpanded(emergency.id)}
                  className="w-full p-3 flex items-start justify-between hover:bg-ocean-50 transition-colors text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                      <h2 className="text-sm font-bold text-foreground">
                        {emergency.title}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded ${
                          emergency.severity === "Critical"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {emergency.severity}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform flex-shrink-0 ${
                      expanded === emergency.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expanded Content */}
                {expanded === emergency.id && (
                  <div className="border-t border-border p-3 space-y-3 text-xs">
                    {/* Symptoms */}
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Symptoms</h3>
                      <ul className="space-y-1">
                        {emergency.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex gap-2 text-foreground">
                            <span className="text-red-600 font-bold flex-shrink-0">•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Immediate Actions */}
                    <div className="bg-orange-50 border border-orange-200 rounded p-2">
                      <h3 className="font-bold text-orange-900 mb-1">Immediate Actions</h3>
                      <ul className="space-y-1">
                        {emergency.immediateActions.map((action, idx) => (
                          <li key={idx} className="flex gap-2 text-orange-900">
                            <span className="font-bold flex-shrink-0">→</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Treatment */}
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Treatment</h3>
                      <p className="text-foreground">{emergency.treatment}</p>
                    </div>

                    {/* Prevention */}
                    <div className="bg-blue-50 border border-blue-200 rounded p-2">
                      <h3 className="font-bold text-blue-900 mb-1">Prevention</h3>
                      <ul className="space-y-1">
                        {emergency.prevention.map((item, idx) => (
                          <li key={idx} className="flex gap-2 text-blue-900">
                            <span className="font-bold flex-shrink-0">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-6 px-4 bg-white border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-sm font-bold text-foreground mb-3">General Safety</h2>
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            <div>
              <h3 className="font-bold text-foreground mb-2">Before Every Dive</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>✓ Review dive plan and all tables</li>
                <li>✓ Check equipment thoroughly</li>
                <li>✓ Brief buddy on signals and plan</li>
                <li>✓ Know maximum depth and time</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">During the Dive</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>✓ Stay close to buddy</li>
                <li>✓ Monitor depth, time, air</li>
                <li>✓ Ascend at proper rate (10m/min)</li>
                <li>✓ Complete all decompression</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <h2 className="text-sm font-bold text-foreground mb-3">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <Link
              to="/treatment-protocols"
              className="p-3 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary text-sm mb-1">
                Treatment Protocols
              </h3>
              <p className="text-xs text-muted-foreground">
                Medical protocols for treating injuries
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
