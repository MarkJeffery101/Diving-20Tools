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
      icon: "⚗���",
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
      title: "TABLES: General use and Specific Recommendations",
      icon: "📚",
      subsections: [
        {
          subtitle: "Factors to Consider",
          items: [
            "Dive depth and planned bottom time",
            "Gas mix (air vs nitrox)",
            "Decompression requirements",
            "Personal experience level",
            "Environmental conditions",
          ],
        },
        {
          subtitle: "Table Types",
          items: [
            "Air tables: Standard no-decompression and decompression schedules",
            "Nitrox tables: Adjusted for oxygen partial pressure",
            "Commercial tables: Extended depth and time protocols",
            "TUP tables: Technical diving profiles",
          ],
        },
        {
          subtitle: "Selection Process",
          items: [
            "Identify your maximum planned depth",
            "Estimate bottom time with safety margin",
            "Choose appropriate table system",
            "Cross-reference with gas available",
            "Verify decompression stop requirements",
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
    {
      id: "evacuationSurfaceDeco",
      title: "Evacuation: Surface Deco Based Diving",
      icon: "🚤",
      subsections: [
        {
          subtitle: "Overview",
          items: [
            "Emergency evacuation procedures for divers under pressure",
            "Accelerated decompression at 1 msw/minute",
            "Oxygen mandatory during transfer",
            "Risk assessment required before diving",
          ],
        },
        {
          subtitle: "Evacuation Criteria",
          items: [
            "Platform emergency or loss of chamber capability",
            "Uncontrollable fire or mechanical hazard",
            "Medical emergency requiring immediate evacuation",
            "Dive time within IMCA D014 guidelines",
          ],
        },
        {
          subtitle: "AED Protocol",
          items: [
            "Linear ascent rate: 1 meter per minute",
            "Helicopter altitude: ≤ 1000 feet if possible",
            "Oxygen breathing mandatory during transfer",
            "Maintain hydration: ~1 liter per hour",
            "Recompression facility coordination essential",
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
            Guidance
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
              {openModalId === "regulations" ? (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h3 className="text-sm font-bold text-foreground mb-2">
                      Overview & Applicability
                    </h3>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Standard tables (DCD/NDC 2015). TUP tables are in the 2024 TUP Manual; general rules still apply and tables may be combined.
                    </p>
                    <div className="bg-white border border-blue-300 rounded-lg p-2 mt-2 text-[10px] text-muted-foreground">
                      These points include additional guidance from the company diving physician adopted by N-Sea.
                    </div>
                  </div>

                  <div className="space-y-3">
                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Core Rules
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>DCS can occur even within no-decompression limits; manage uncertainty conservatively.</li>
                        <li>Do not exceed table maximum depth or time; if exceeded, use O₂ Treatment Table 5.</li>
                        <li>For planning, use the second-to-last time entry as the maximum dive time.</li>
                        <li>≤ 8 h in any 24 h under pressure (dive + decompression); exceptions need contractor + supervising MO approval.</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Repetitive & Combined Dives
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>Use the correct repeat-interval table for repetitive dives.</li>
                        <li>If interval &lt; 2 h, a combined dive may be used (not permitted for SurD).</li>
                        <li>For combined dives: make the first dive deepest; add times and decompress using the deepest depth on 12-h interval tables.</li>
                        <li>No combined diving after any emergency procedure; if an emergency occurs on dive 2, apply the emergency rules using the deepest depth.</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        After Dives & Intervals
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>After a normal dive: further dives ≤ 6 m permitted.</li>
                        <li>After an emergency procedure: no diving for 12 h.</li>
                        <li>After routine in-water decompression: ≤ 6 m dives allowed without a surface interval.</li>
                        <li>Recommend 12-h repeat interval after repetitive dives; as good practice, limit to ≤ 2 repetitive dives.</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Switching Table Systems & Stop Control
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>If previous diving used other table systems (Norwegian, DCIEM, US Navy), wait ≥ 16 h before using DCD tables.</li>
                        <li>Hold stop depth steady; typical tolerance ±0.5 m.</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Oxygen Use During Decompression
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>O₂ during decompression is safer than air alone, especially when air-only decompression &gt; 30 min; consider when selecting a table.</li>
                      </ul>
                    </details>
                  </div>
                </>
              ) : openModalId === "evacuationSurfaceDeco" ? (
                <>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h3 className="text-sm font-bold text-foreground mb-2">
                      Purpose & Context
                    </h3>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      If abandonment occurs, divers may need evacuation while still under pressure. AED + omitted-decompression treatment is usually preferred; HRU is rarely available and may carry higher risk.
                    </p>
                    <div className="bg-white border border-red-300 rounded-lg p-2 mt-2 text-[10px] text-muted-foreground">
                      Perform a formal risk assessment covering threats (fire, mechanical damage, loss of platform) that could compromise safe decompression.
                    </div>
                  </div>

                  <div className="space-y-3">
                    <details className="bg-white border border-border rounded-lg p-3 open:bg-red-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Risk Assessment Criteria
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>Compare risk of continuing (in-water or in-chamber) vs accelerated decompression.</li>
                        <li>Consider table used, planned depth, bottom time, and actual emergency context.</li>
                        <li>If AED is not feasible, do not dive or provide an alternative, risk-assessed and physician-approved evacuation plan.</li>
                        <li>For SIL15, SOX15, NIA15, NIB15, BOX15, AED may be safer than HRU when:
                          <ul className="mt-2 ml-4 space-y-1">
                            <li>Dive time within IMCA D014 (above bold line) and evac+recompression ≤ 3 h (preferably) and not more than 6 h from surfacing; or</li>
                            <li>Dive time exceeds IMCA D014 (below bold line) and evac+recompression ≤ 3 h.</li>
                          </ul>
                        </li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-red-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        When to Begin AED
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>Begin only when chamber/occupant safety cannot be guaranteed, or when evacuation cannot be delayed and transport will be available immediately after AED.</li>
                        <li>Otherwise continue normal decompression until time constraints force acceleration.</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-red-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        AED Profile & Rate
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>Conduct AED linearly at <strong>1 msw per minute</strong>.</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-red-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Helicopter Evacuation
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>Target altitude ≤ 1000 ft where possible.</li>
                        <li>Document that oxygen use and delivery method are accepted by the emergency response organisation.</li>
                        <li>Post-dive flight restrictions in DCD tables do not apply in emergency evacuation.</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-red-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Oxygen Use
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>O₂ or high-pO₂ gas before and during AED is recommended but must not delay the start.</li>
                        <li>If a fire hazard exists near the chamber, proceed without O₂/high-pO₂ gas.</li>
                        <li>O₂ breathing during transfer to the next recompression facility is mandatory (via semi-closed O₂ rebreathers).</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-red-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Hydration
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>Maintain hydration; aim ~1 L/hour oral intake during evacuation.</li>
                        <li>Keep water or oral rehydration solution available for the full expected endurance.</li>
                      </ul>
                    </details>
                  </div>
                </>
              ) : openModalId === "otuEsot" ? (
                <>
                  {/* Overview Section - Moved to Top */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h3 className="text-sm font-bold text-foreground mb-2">
                      Overview
                    </h3>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      High inspired oxygen (↑pO₂) can cause CNS toxicity and lung injury. Two measures assess these risks: OTU (UPTD), which tracks total oxygen dose for systemic effects, and ESOT, which estimates exposure time at a reference pO₂ and accounts for recovery between exposures to better gauge lung injury. Using both OTU and ESOT together offers a more complete assessment of oxygen exposure than either alone.
                    </p>
                  </div>

                  {/* Two Column Section */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* OTU Card */}
                <div className="bg-white border border-border rounded-lg p-3">
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    UPTD / OTU
                  </h3>
                  <p className="text-[10px] text-muted-foreground mb-2 leading-relaxed">
                    Origin in pulmonary dose modelling; OTU broadened
                    interpretation to include potential <em>systemic</em>{" "}
                    manifestations.
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
                    ESOT
                  </h3>
                  <p className="text-[10px] text-muted-foreground mb-2 leading-relaxed">
                    Represents exposure as "equivalent minutes of 100% O₂ at the
                    surface," enabling dose + recovery modelling for pulmonary
                    risk.
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
