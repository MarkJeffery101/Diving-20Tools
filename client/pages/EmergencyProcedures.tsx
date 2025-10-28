import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function EmergencyProcedures() {
  const [expanded, setExpanded] = useState<string | null>("decompression-sickness");

  const emergencies = [
    {
      id: "decompression-sickness",
      title: "Decompression Sickness (The Bends)",
      severity: "Critical",
      symptoms: [
        "Joint and muscle pain",
        "Fatigue and weakness",
        "Itching or rash (creeping eruption)",
        "Numbness or tingling",
        "Paralysis",
        "Confusion or altered mental state",
      ],
      immediateActions: [
        "Stop the dive and surface safely",
        "Administer oxygen if available (100% O2 recommended)",
        "Keep diver warm and at rest",
        "Provide fluids if conscious",
        "Contact emergency medical services immediately",
      ],
      treatment: "Hyperbaric oxygen therapy (recompression)",
      prevention: [
        "Follow proper decompression schedules",
        "Ascend slowly (10m/min)",
        "Include mandatory safety stops",
        "Monitor bottom time and depth carefully",
        "Stay within no-decompression limits when possible",
      ],
      relatedTables: ["NMDC Table 1", "NMDC Table 2", "Air Table 1"],
    },
    {
      id: "nitrogen-narcosis",
      title: "Nitrogen Narcosis (Rapture of the Deep)",
      severity: "High",
      symptoms: [
        "Euphoria or giddiness",
        "Impaired judgment",
        "Delayed response times",
        "Loss of coordination",
        "Difficulty performing tasks",
        "Anxiety or panic",
      ],
      immediateActions: [
        "Ascend to shallower depth immediately",
        "Maintain control and avoid panic",
        "Signal buddy to assist if needed",
        "Breathe deeply and calmly",
        "Monitor depth carefully",
      ],
      treatment: "Ascent to shallower depth resolves symptoms",
      prevention: [
        "Stay within recommended depth limits",
        "Avoid rapid descents",
        "Use nitrox or mixed gas for deeper dives",
        "Maintain physical fitness",
        "Avoid alcohol or drugs before diving",
      ],
      relatedTables: ["Air Table 3", "Nitrox 32% Table 1"],
    },
    {
      id: "oxygen-toxicity",
      title: "Oxygen Toxicity (CNS Toxicity)",
      severity: "Critical",
      symptoms: [
        "Vision symptoms (tunnel vision, blurred vision)",
        "Tinnitus (ringing in ears)",
        "Nausea",
        "Dizziness",
        "Convulsions or seizures",
        "Loss of consciousness",
      ],
      immediateActions: [
        "Descend immediately to reduce PPO2",
        "Switch to lower oxygen gas mixture if available",
        "Abort dive and return to surface carefully",
        "Administer oxygen at surface if needed",
        "Contact medical services",
      ],
      treatment: "Oxygen toxicity usually resolves at surface",
      prevention: [
        "Monitor PPO2 limits (typically 1.4 bar maximum)",
        "Know maximum operating depth for your gas",
        "Avoid exceeding bottom time limits",
        "Use nitrox appropriately for your depth",
        "Review table MOD (Maximum Operating Depth)",
      ],
      relatedTables: ["Nitrox MOD Calculator", "Nitrox 32% Table 1"],
    },
    {
      id: "shallow-water-blackout",
      title: "Shallow Water Blackout (Hypoxia)",
      severity: "Critical",
      symptoms: [
        "Sudden loss of consciousness",
        "No warning signs (silent killer)",
        "Can occur during ascent",
        "May happen in pools during apnea training",
      ],
      immediateActions: [
        "Immediate rescue from water",
        "Begin CPR if needed",
        "Provide oxygen",
        "Emergency medical services immediately",
      ],
      treatment: "CPR, oxygen, emergency medical care",
      prevention: [
        "Never hyperventilate before breath-hold activities",
        "Always dive with buddy system",
        "Understand oxygen depletion physiology",
        "Follow proper ascent procedures",
        "Never exceed breath-hold limits",
      ],
      relatedTables: [],
    },
  ];

  const toggleExpanded = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      <section className="py-12 px-4 bg-white border-b border-border">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Emergency Procedures & Logic Trees
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Comprehensive guide to identifying and responding to diving
            emergencies. Each protocol includes immediate actions, treatment
            options, and prevention strategies.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4">
            {emergencies.map((emergency) => (
              <div
                key={emergency.id}
                className="bg-white rounded-lg border border-border overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => toggleExpanded(emergency.id)}
                  className="w-full p-6 flex items-start justify-between hover:bg-ocean-50 transition-colors text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <h2 className="text-xl font-bold text-foreground">
                        {emergency.title}
                      </h2>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          emergency.severity === "Critical"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {emergency.severity}
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    className={`h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 ${
                      expanded === emergency.id ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {/* Expanded Content */}
                {expanded === emergency.id && (
                  <div className="border-t border-border p-6 space-y-6">
                    {/* Symptoms */}
                    <div>
                      <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold">
                          1
                        </span>
                        Recognize Symptoms
                      </h3>
                      <ul className="space-y-2">
                        {emergency.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex gap-3 text-foreground">
                            <span className="text-red-600 font-bold">•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Immediate Actions */}
                    <div>
                      <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        Immediate Actions
                      </h3>
                      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                        <ul className="space-y-2">
                          {emergency.immediateActions.map((action, idx) => (
                            <li key={idx} className="flex gap-3 text-orange-900">
                              <span className="font-bold">→</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Treatment */}
                    <div>
                      <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                          3
                        </span>
                        Treatment
                      </h3>
                      <p className="bg-green-50 border-l-4 border-green-500 p-4 rounded text-green-900">
                        {emergency.treatment}
                      </p>
                    </div>

                    {/* Prevention */}
                    <div>
                      <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                          4
                        </span>
                        Prevention
                      </h3>
                      <ul className="space-y-2">
                        {emergency.prevention.map((item, idx) => (
                          <li key={idx} className="flex gap-3 text-foreground">
                            <span className="text-blue-600 font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Related Tables */}
                    {emergency.relatedTables.length > 0 && (
                      <div className="pt-4 border-t border-border">
                        <h3 className="font-bold text-foreground mb-3">
                          Related Dive Tables
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {emergency.relatedTables.map((table) => (
                            <Link
                              key={table}
                              to="/tables"
                              className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                            >
                              {table}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Safety Section */}
      <section className="py-12 px-4 bg-white border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            General Safety & Prevention
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">Before Every Dive</h3>
              <ul className="space-y-2">
                <li className="flex gap-2 text-foreground">
                  <span className="text-primary font-bold">✓</span>
                  <span>Review dive plan and all tables</span>
                </li>
                <li className="flex gap-2 text-foreground">
                  <span className="text-primary font-bold">✓</span>
                  <span>Check equipment thoroughly</span>
                </li>
                <li className="flex gap-2 text-foreground">
                  <span className="text-primary font-bold">✓</span>
                  <span>Brief buddy on signals and plan</span>
                </li>
                <li className="flex gap-2 text-foreground">
                  <span className="text-primary font-bold">✓</span>
                  <span>Know maximum depth and time limits</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-4">During the Dive</h3>
              <ul className="space-y-2">
                <li className="flex gap-2 text-foreground">
                  <span className="text-primary font-bold">✓</span>
                  <span>Stay close to buddy at all times</span>
                </li>
                <li className="flex gap-2 text-foreground">
                  <span className="text-primary font-bold">✓</span>
                  <span>Monitor depth, time, and air supply</span>
                </li>
                <li className="flex gap-2 text-foreground">
                  <span className="text-primary font-bold">✓</span>
                  <span>Ascend at proper rate (10m/min)</span>
                </li>
                <li className="flex gap-2 text-foreground">
                  <span className="text-primary font-bold">✓</span>
                  <span>Complete all mandatory decompression</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Related Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/treatment-protocols"
              className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary mb-2">
                Treatment Protocols
              </h3>
              <p className="text-sm text-muted-foreground">
                Medical protocols for treating dive-related injuries and
                conditions.
              </p>
            </Link>

            <Link
              to="/tables"
              className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary mb-2">
                Dive Tables
              </h3>
              <p className="text-sm text-muted-foreground">
                Reference all dive tables for planning and decompression
                schedules.
              </p>
            </Link>

            <Link
              to="/supporting-info"
              className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary mb-2">
                Supporting Info
              </h3>
              <p className="text-sm text-muted-foreground">
                Safety limits, rules, and guidance documentation.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
