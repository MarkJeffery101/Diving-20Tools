import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { BookOpen, ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function SupportingInfo() {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const sections = [
    {
      id: "limits",
      title: "Safe and Maximum Limits",
      icon: "📏",
      subsections: [
        {
          subtitle: "Recreational",
          items: [
            "Max Depth: 40m",
            "10m/min ascent",
            "3-5m safety stops",
            "1hr minimum surface interval",
          ],
        },
        {
          subtitle: "Commercial",
          items: [
            "Max Depth: 100m+",
            "Mandatory decompression",
            "Daily oxygen limits",
            "Certified training required",
          ],
        },
        {
          subtitle: "Nitrox",
          items: [
            "MOD by PPO2 limit",
            "Nitrox 32%: ~42m",
            "Shorter decompression",
            "Reduced narcosis vs air",
          ],
        },
      ],
    },
    {
      id: "ppo2",
      title: "Partial Pressure of Oxygen (PPO2)",
      icon: "⚗️",
      subsections: [
        {
          subtitle: "What is PPO2?",
          items: [
            "PPO2 = O2% × Absolute Pressure",
            "Determines toxicity risk",
            "Measured in bar (ATA)",
          ],
        },
        {
          subtitle: "Safe Limits",
          items: [
            "Recreational Max: 1.4 bar",
            "Commercial Max: 1.6 bar",
            "Min Functional: 0.16 bar",
            "Warning: 1.5-1.6 bar",
          ],
        },
        {
          subtitle: "Examples",
          items: [
            "Air 21% @ 30m: 0.84 bar ✓",
            "Air 21% @ 60m: 1.68 bar ✗",
            "Nitrox 32% @ 40m: 1.44 bar ✓",
          ],
        },
      ],
    },
    {
      id: "ead",
      title: "Equivalent Air Depth (EAD)",
      icon: "🎯",
      subsections: [
        {
          subtitle: "What is EAD?",
          items: [
            "Accounts for reduced nitrogen",
            "Formula: (depth × N2%) / 0.79 - depth",
            "Shows equivalent air decompression depth",
          ],
        },
        {
          subtitle: "Nitrogen Narcosis",
          items: [
            "0-9m: No narcosis",
            "18-35m: Mild (caution)",
            "55-75m: Severe",
            "75m+: Extreme (not recommended)",
          ],
        },
        {
          subtitle: "Benefits",
          items: [
            "Less narcosis than air",
            "Extended bottom times",
            "Reduced decompression",
          ],
        },
      ],
    },
    {
      id: "surface-intervals",
      title: "Surface Intervals & Repetitive Diving",
      icon: "⏱️",
      subsections: [
        {
          subtitle: "Requirements",
          items: [
            "Minimum 1 hour between dives",
            "2-6 hours preferred for deep dives",
            "Allows nitrogen elimination",
          ],
        },
        {
          subtitle: "Residual Nitrogen",
          items: [
            "Nitrogen remaining after dive",
            "Conservative planning recommended",
            "Stay within table limits",
          ],
        },
        {
          subtitle: "Multi-Dive Rules",
          items: [
            "Max 4 dives per day",
            "Shallower dives later in day",
            "Rest day recommended after multiple days",
          ],
        },
      ],
    },
    {
      id: "regulations",
      title: "Safety Rules & Regulations",
      icon: "📋",
      subsections: [
        {
          subtitle: "Equipment",
          items: [
            "Serviced and maintained",
            "Backup air source",
            "Depth gauge & timer",
            "Thermal protection",
            "Signaling devices",
          ],
        },
        {
          subtitle: "Mandatory Procedures",
          items: [
            "Dive plan briefing",
            "Buddy system",
            "Controlled entry/exit",
            "Safety stops (3-5m)",
            "10m/min ascent rate",
          ],
        },
        {
          subtitle: "Certification",
          items: [
            "Appropriate cert required",
            "Training for gas type",
            "CPR & first aid recommended",
          ],
        },
      ],
    },
    {
      id: "corrections",
      title: "Altitude & Environmental Corrections",
      icon: "🌍",
      subsections: [
        {
          subtitle: "Altitude",
          items: [
            "Pressure decreases with elevation",
            "Sea level: 1.013 bar",
            "2,400m: ~0.78 bar",
            "Use altitude-adjusted tables",
          ],
        },
        {
          subtitle: "Water Type",
          items: [
            "Saltwater: Standard",
            "Freshwater: Slightly less dense",
            "Brackish: Variable",
            "Affects buoyancy",
          ],
        },
        {
          subtitle: "Temperature",
          items: [
            "Cold: Increases nitrogen absorption",
            "Thermal protection essential",
            "Warm: Standard application",
          ],
        },
      ],
    },
    {
      id: "decompression",
      title: "Decompression Theory Basics",
      icon: "💨",
      subsections: [
        {
          subtitle: "How It Works",
          items: [
            "Pressure forces gas into tissues",
            "Ascent allows nitrogen elimination",
            "Decompression stops prevent DCS",
            "Controlled ascent is critical",
          ],
        },
        {
          subtitle: "Tissue Types",
          items: [
            "Fast tissues: Brain, blood",
            "Slow tissues: Bones, fat",
            "Longer dives: Slower tissues saturate",
            "Requirements increase with depth",
          ],
        },
        {
          subtitle: "No-Decompression Limits",
          items: [
            "Maximum time before stops required",
            "Depends on depth & gas",
            "Conservative approach recommended",
          ],
        },
      ],
    },
  ];

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
                <button
                  onClick={() => setOpenModalId(section.id)}
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
                  <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </button>
              </div>
            ))}

            {/* OTU/ESOT Overview Card */}
            <div className="bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => setOpenModalId("otuEsot")}
                className="w-full p-3 flex items-start justify-between hover:bg-blue-50 transition-colors text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">⚡</span>
                    <h2 className="text-sm font-bold text-foreground">
                      Oxygen Exposure Indices
                    </h2>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Overlay for All Cards */}
      {openModalId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-center justify-center p-4"
          onClick={() => setOpenModalId(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-border p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold text-foreground">
                {openModalId === "otuEsot"
                  ? "Oxygen Exposure Indices Overview"
                  : sections.find((s) => s.id === openModalId)?.title}
              </h2>
              <button
                onClick={() => setOpenModalId(null)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-4 bg-gradient-to-br from-gray-50 to-white">
              {openModalId === "otuEsot" ? (
                <>
                  {/* Overview Section - Moved to Top */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h3 className="text-sm font-bold text-foreground mb-2">
                      Overview
                    </h3>
                    <p className="text-[10px] text-muted-foreground leading-relaxed mb-2">
                      Elevated oxygen partial pressure (↑pO₂) is routinely encountered in nitrox diving, surface decompression with oxygen (SurDO₂), wet bell operations, and Transfer-Under-Pressure (TUP). While beneficial for decompression efficiency, elevated pO₂ carries risks of acute CNS oxygen toxicity and long-term cumulative toxicity affecting the lungs and potentially other systems.
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      To manage exposure, several indices have been developed. Historically, diving practice relied upon UPTD/OTU for cumulative oxygen-dose tracking. In recent years, DMAC-35 has recommended ESOT (Equivalent Surface Oxygen Time) as a better indicator of pulmonary oxygen toxicity, particularly because it accounts for recovery between exposures. <strong>Use UPTD/OTU and ESOT as complementary tools, each with distinct operational strengths and weaknesses.</strong>
                    </p>
                  </div>

                  {/* Recommended Limits & Caveats */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <h3 className="text-sm font-bold text-foreground mb-2">
                      Recommended Exposure Limits
                    </h3>
                    <div className="space-y-2 text-[10px] text-muted-foreground">
                      <div>
                        <span className="font-semibold text-foreground">OTU-based Management:</span>
                        <p className="mt-1">Daily dose limit ≈ <strong>~450 OTU</strong></p>
                      </div>
                      <div className="border-t border-amber-200 pt-2">
                        <span className="font-semibold text-foreground">ESOT-based Management (DMAC-35):</span>
                        <p className="mt-1 font-mono">ESOT = time × pO₂<sup>2.285</sup></p>
                      </div>
                      <div className="border-t border-amber-200 pt-2 space-y-1">
                        <p className="font-semibold text-foreground">Important Caveats:</p>
                        <ul className="space-y-1 ml-4 list-disc">
                          <li>Large variability in individual susceptibility</li>
                          <li>Mathematical indices <strong>cannot replace clinical judgement</strong></li>
                          <li>These are guidance tools, not absolute safety limits</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Two Column Section */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* OTU Card */}
                <div className="bg-white border border-border rounded-lg p-3">
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    UPTD / OTU
                  </h3>
                  <p className="text-[10px] text-muted-foreground mb-2 leading-relaxed">
                    <span className="font-semibold">Systemic Focus:</span> UPTD evolved into OTU when operational experience suggested that oxygen exposure influences <em>more than the lungs alone</em>. OTU tracks total oxygen dose and recognizes systemic symptoms including fatigue, headache, and musculoskeletal discomfort that may not correlate with lung-function changes.
                  </p>

                  <details className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-2">
                    <summary className="font-bold text-[11px] cursor-pointer text-foreground">
                      Strengths
                    </summary>
                    <ul className="text-muted-foreground text-[10px] mt-2 space-y-1 ml-4 list-disc">
                      <li>Long operational history and proven field effectiveness</li>
                      <li>Quantifies cumulative oxygen exposure over multi-day operations</li>
                      <li>Conservative approach; maintains awareness of <strong>systemic effects</strong> beyond lungs (fatigue, headache, myalgia)</li>
                      <li>Simple to apply and understand</li>
                      <li>Best for tracking multi-week cumulative burden</li>
                    </ul>
                  </details>

                  <details className="bg-red-50 border border-red-200 rounded-lg p-2">
                    <summary className="font-bold text-[11px] cursor-pointer text-foreground">
                      Weaknesses
                    </summary>
                    <ul className="text-muted-foreground text-[10px] mt-2 space-y-1 ml-4 list-disc">
                      <li>No validated recovery/decay model; exposure only accumulates</li>
                      <li>Limited accuracy for short exposures</li>
                      <li>Poor correlation with segmented exposures</li>
                      <li>Less precise pulmonary toxicity prediction than ESOT</li>
                    </ul>
                  </details>
                </div>

                {/* ESOT Card */}
                <div className="bg-white border border-border rounded-lg p-3">
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    ESOT (Equivalent Surface Oxygen Time)
                  </h3>
                  <p className="text-[10px] text-muted-foreground mb-2 leading-relaxed">
                    <span className="font-semibold">Pulmonary Focus:</span> DMAC-35 recommended. Represents exposure as "equivalent minutes of 100% O₂ at the surface," enabling dose + recovery modelling for <em>pulmonary</em> risk. Derived from Arieli-type modelling and best predicts lung injury, especially for varying pO₂ segments and repetitive exposures.
                  </p>

                  <details className="bg-green-50 border border-green-200 rounded-lg p-2 mb-2">
                    <summary className="font-bold text-[11px] cursor-pointer text-foreground">
                      Strengths
                    </summary>
                    <ul className="text-muted-foreground text-[10px] mt-2 space-y-1 ml-4 list-disc">
                      <li>Best model of <strong>pulmonary</strong> dose + recovery</li>
                      <li>Improved prediction for pulmonary oxygen toxicity</li>
                      <li>Handles varying pO₂ segments and multi-segment dives</li>
                      <li>Models recovery between exposures (decay function)</li>
                      <li>Excellent for daily/short-term and repetitive dive planning</li>
                      <li>Accounts for physiological recovery during surface intervals</li>
                    </ul>
                  </details>

                  <details className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                    <summary className="font-bold text-[11px] cursor-pointer text-foreground">
                      Weaknesses
                    </summary>
                    <ul className="text-muted-foreground text-[10px] mt-2 space-y-1 ml-4 list-disc">
                      <li>Focuses on pulmonary injury; <strong>systemic effects are not represented</strong></li>
                      <li>Does not capture fatigue, headache, or musculoskeletal discomfort</li>
                      <li>Requires calculation support for practical use</li>
                    </ul>
                  </details>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="bg-white border border-border rounded-lg overflow-hidden">
                <h3 className="text-sm font-bold text-foreground p-3 border-b border-border bg-gray-50">
                  Comparison Table
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-border">
                        <th className="p-2 text-left font-bold text-foreground">
                          Category
                        </th>
                        <th className="p-2 text-left font-bold text-foreground">
                          UPTD / OTU
                        </th>
                        <th className="p-2 text-left font-bold text-foreground">
                          ESOT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border hover:bg-gray-50">
                        <td className="p-2 font-semibold text-foreground">
                          Origin
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Pulmonary VC-loss studies; expanded to systemic interpretation
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Derived from Arieli K; DMAC-35 recommended
                        </td>
                      </tr>
                      <tr className="border-b border-border hover:bg-gray-50">
                        <td className="p-2 font-semibold text-foreground">
                          Physiological Target
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Pulmonary + <em>systemic</em> operational interpretation
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Pulmonary only
                        </td>
                      </tr>
                      <tr className="border-b border-border hover:bg-gray-50">
                        <td className="p-2 font-semibold text-foreground">
                          Systemic Symptoms
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Recognized (fatigue, headache, myalgia/arthralgia)
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Not represented
                        </td>
                      </tr>
                      <tr className="border-b border-border hover:bg-gray-50">
                        <td className="p-2 font-semibold text-foreground">
                          Calculation
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Dose from pO₂ + time
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px] font-mono">
                          t × pO₂²·²⁸⁵
                        </td>
                      </tr>
                      <tr className="border-b border-border hover:bg-gray-50">
                        <td className="p-2 font-semibold text-foreground">
                          Recovery Model
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          None
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Yes (exponential decay)
                        </td>
                      </tr>
                      <tr className="border-b border-border hover:bg-gray-50">
                        <td className="p-2 font-semibold text-foreground">
                          Multi-Segment pO₂
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Limited handling
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Strong handling
                        </td>
                      </tr>
                      <tr className="border-b border-border hover:bg-gray-50">
                        <td className="p-2 font-semibold text-foreground">
                          Time Horizon
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Multi-week cumulative
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Daily/short-term/repetitive
                        </td>
                      </tr>
                      <tr className="border-b border-border hover:bg-gray-50">
                        <td className="p-2 font-semibold text-foreground">
                          Best Use
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Long-term systemic burden tracking
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Pulmonary dose & recovery planning
                        </td>
                      </tr>
                      <tr className="border-b border-border hover:bg-gray-50">
                        <td className="p-2 font-semibold text-foreground">
                          Strengths
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Conservative; systemic awareness; simple
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          Accurate pulmonary dose; decay; segment-friendly
                        </td>
                      </tr>
                      <tr className="border-b border-border hover:bg-gray-50">
                        <td className="p-2 font-semibold text-foreground">
                          Weaknesses
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          No decay; poor pulmonary correlation
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px]">
                          No systemic dimension; requires tools
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-2 font-semibold text-foreground">
                          Simplified View
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px] italic">
                          "Whole-body stress thermometer"
                        </td>
                        <td className="p-2 text-muted-foreground text-[9px] italic">
                          "Lung-stress calculator"
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

                </>
              ) : (
                <>
                  {sections.find((s) => s.id === openModalId)?.subsections.map((sub, idx) => (
                    <div key={idx}>
                      <h3 className="text-sm font-bold text-foreground mb-2">
                        {sub.subtitle}
                      </h3>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {sub.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex gap-2">
                            <span className="text-primary font-bold flex-shrink-0">▶</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Reference Cards */}
      <section className="py-6 px-4 bg-white border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-sm font-bold text-foreground mb-3">
            Quick Reference
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <h3 className="font-bold text-foreground text-xs mb-2">
                Safe Checklist
              </h3>
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
                <div>
                  <span className="font-bold">Abs Pressure:</span> 1 + (d/10)
                </div>
                <div>
                  <span className="font-bold">PPO2:</span> O2% × AP
                </div>
                <div>
                  <span className="font-bold">EAD:</span> (d × N2%) / 0.79 - d
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-green-50">
              <h3 className="font-bold text-green-900 text-xs mb-2">
                DCS Help
              </h3>
              <ul className="space-y-1 text-[10px] text-green-900">
                <li>
                  <span className="font-bold">DAN:</span>
                  <br />
                  +1-919-684-9111
                </li>
                <li>
                  <span className="font-bold">Emergency:</span>
                  <br />
                  911
                </li>
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
          <h2 className="text-sm font-bold text-foreground mb-3">
            Related Resources
          </h2>
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
