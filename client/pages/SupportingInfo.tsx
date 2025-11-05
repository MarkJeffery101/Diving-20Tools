import Navigation from "@/components/Navigation";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BookOpen, ChevronDown, X, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function SupportingInfo() {
  const location = useLocation();
  const returnState = location.state as { modalId?: string } | null;
  const [openModalId, setOpenModalId] = useState<string | null>(returnState?.modalId || null);

  useEffect(() => {
    if (returnState?.modalId) {
      setOpenModalId(returnState.modalId);
    }
  }, [returnState?.modalId]);

  const renderTextWithTableLinks = (text: string) => {
    const tableCodes = ["SOX15", "NIA15", "NIB15", "BOX15", "SIL15", "SAB15", "BAB15", "H4SOX", "H2NIA15", "H2NIB15", "BOX15"];
    const regex = new RegExp(`(${tableCodes.join("|")})`, "g");
    const parts = text.split(regex);

    return parts.map((part, idx) => {
      if (tableCodes.includes(part)) {
        return (
          <Link
            key={idx}
            to="/tables"
            state={{ from: "supporting-info", modalId: openModalId }}
            className="text-blue-600 hover:text-blue-800 underline font-semibold"
          >
            {part}
          </Link>
        );
      }
      return part;
    });
  };

  const sections = [
    {
      id: "ppo2",
      title: "Safe and Maximum Limits",
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
          subtitle: "Commercial Offshore Limits",
          items: [
            "Maximum pO2: 1.6 bar (operational limit)",
            "Recommended: ≤ 1.5 bar (safety margin)",
            "Minimum Functional: 0.16 bar (hypoxia threshold)",
            "IMCA guidance: Max 1.4 bar regardless of time",
          ],
        },
        {
          subtitle: "Nitrox Dive Examples",
          items: [
            "NIA15 (40/60) @ 30m: pO2 = 1.40 bar ✓",
            "NIA15 (40/60) @ 35m: pO2 = 1.56 bar (approach max)",
            "NIB15 (35/65) @ 40m: pO2 = 1.54 bar ✓",
            "Air 21% @ 100m: pO2 = 2.1 bar ✗ (exceeds)",
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
            "Calculates equivalent depth for nitrogen narcosis on air",
            "Formula: EAD = (Depth + 10) × ((1 - O2%) / 0.79) - 10",
            "Used for decompression table selection with nitrox",
            "Enables accurate depth-based table indexing for nitrox mixes",
          ],
        },
        {
          subtitle: "Commercial Offshore Application",
          items: [
            "NIA15 (40/60): Reduced nitrogen narcosis vs air",
            "NIB15 (35/65): Further reduced narcosis risk",
            "Table selection: Use EAD instead of actual depth",
            "Example: Dive 30m on NIA15 (40%) = EAD ~21m for decompression",
            "Allows safe diving at greater depths with reduced narcosis",
          ],
        },
        {
          subtitle: "Narcosis Risk Management",
          items: [
            "30-40m on air: Mild narcosis (common recreational max)",
            "100m+ on air: Severe narcosis (requires mixed gas)",
            "Nitrox extends safe operational depth envelope",
            "Always reference EAD when selecting decompression table",
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
          subtitle: "Commercial Offshore Standards",
          items: [
            "Repetitive diving not standard N-Sea practice; allowed only in emergencies",
            "Actual repeat interval must be longer than table's interval (e.g., 5h since prior dive ⇒ use 4h table)",
            "≤ 8 hours under pressure per 24-hour period (dive + decompression)",
            "Longer intervals (≥12h) recommended between repetitive dives",
          ],
        },
        {
          subtitle: "Table Selection with Residual Nitrogen",
          items: [
            "Actual maximum depth must be less than table depth (e.g., 30m ⇒ select 33m table)",
            "Actual dive time must be less than table time (e.g., 35 min ⇒ choose 40 min in table)",
            "Use appropriate repetitive interval table for residual nitrogen management",
            "Do not exceed table maximum depth or time; exceeding requires O₂ Treatment Table 5",
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
    {
      id: "tableSelectionConsiderations",
      title: "Table Selection Considerations",
      icon: "📊",
      subsections: [
        {
          subtitle: "General Principles",
          items: [
            "SIL15: in-water decompression (wet bell or chamber) with flexible repetitive options (H*SIL15); suitable for multiple short dives",
            "If decompression > 30 min: prefer oxygen-supported staged tables — BOX15 (bell O₂) or SOX15/H4SOX (surface O₂) — when bell/chamber available",
            "BAB15 / SAB15 / H4SAB15 are backup only if the oxygen system fails",
          ],
        },
        {
          subtitle: "Effects of Sea State",
          items: [
            "Significant waves (≈ ±0.5 m; ~1 m crest-to-trough) destabilise shallow 3 m stops",
            "If in-water stops are unsafe, consider SOX15: diver in chamber under pressure within 3 minutes of surfacing (delays markedly ↑ DCS risk)",
            "BOX15 with a bell tolerates larger sea states due to final O₂ stop at 6 m; do not use BOX15 without a bell",
          ],
        },
        {
          subtitle: "Nitrox Use",
          items: [
            "NIA15 (40/60) and NIB15 (35/65) may be used subject to allowable pO₂",
            "Max pO₂ 1.6 bar; recommended ≤ 1.5 bar. Other mixes on request",
          ],
        },
        {
          subtitle: "Repetitive Interval, Depth & Time",
          items: [
            "Repetitive diving is not standard N-Sea practice; only allowed in emergencies",
            "Actual repeat interval must be longer than the table's interval (e.g., 5 h since prior dive ⇒ use 4-h table)",
            "Actual max depth must be less than table depth (e.g., 30 m ⇒ select 33 m table)",
            "Actual dive time must be less than table time (e.g., 35 min ⇒ choose 40 min in table)",
          ],
        },
        {
          subtitle: "Ascent Speed",
          items: [
            "Max ascent speed 10 m/min; ascent time is not counted as stop time (if exceeded, add excess to stop time)",
            "Ascent to first stop must be ≥ 5 m/min (if slower, add excess to bottom time)",
            "Between stops deeper than 6 m: transit ≤ 1 min. At ≤ 6 m: ascent speed is less critical",
          ],
        },
        {
          subtitle: "Diving Conditions & Choice of Tables",
          items: [
            "North Sea: limit in-water stop time to ~30 min (solid black line in SIL15)",
            "Maintain shallow-stop pressure variation within ±0.5 msw (~0.05 bar)",
            "Low temperature ⇒ hot-water suits; strong currents may restrict operations",
            "Supervisor decides suitability; perform LMRA per asset and conditions",
          ],
        },
      ],
    },
    {
      id: "oxygenToxicity",
      title: "Oxygen Toxicity",
      icon: "☠️",
      subsections: [
        {
          subtitle: "Acute (CNS) Toxicity Overview",
          items: [
            "Limit oxygen partial pressure (pO₂) to 1.5 bar to prevent convulsions",
            "Convulsions can occur at pressures as low as 1.5 bar",
            "NOAA produced limits for pO₂ and duration with minimal risk",
            "IMCA advises maximum pO₂ of 1.4 bar for nitrox diving regardless of time (IMCA D048, 2012)",
          ],
        },
        {
          subtitle: "Long-Term Toxicity (OTU)",
          items: [
            "Oxygen Toxicity Units (OTU) predict long-term oxygen toxicity symptoms",
            "1 OTU = 1 UPTD (Unit Pulmonary Toxic Dose)",
            "Daily dose should not exceed 450 OTU (except emergencies)",
            "OTU is included in DCD tables; calculator available in Tools",
            "After 48-hour no-dive period, OTU count restarts at zero",
          ],
        },
        {
          subtitle: "ESOT (DMAC 35) Limits",
          items: [
            "ESOT should replace UPTD as exposure measure for pulmonary oxygen toxicity",
            "Single dive: keep ESOT < 660",
            "Multi-day: 660 (2 days), 500 (5 days), 420 (10 days)",
            "Two days off diving should be planned after multi-day hyperoxic exposures",
            "Air in-water decompression dives are not expected to cause toxicity",
          ],
        },
        {
          subtitle: "OTU and ESOT in DCD/NDC Tables",
          items: [
            "DCD/NDC tables include SOX15, NIA15, NIB15, and BOX15 with oxygen",
            "OTU and ESOT values provided for each depth/time combination",
            "ESOT declines with time; recovery ESOT (recESOT) must be added to next dive",
            "OTU simply sums (no intra-day decay)",
            "Use OTU/ESOT Calculator in Tools for computation",
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

            {/* Flying After Diving Card */}
            <div className="bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => setOpenModalId("flyingAfterDiving")}
                className="w-full p-3 flex items-start justify-between hover:bg-blue-50 transition-colors text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">✈️</span>
                    <h2 className="text-sm font-bold text-foreground">
                      Flying After Diving
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
                      Overview
                    </h3>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Standard DCD/NDC 2015 tables. TUP tables are in 2024 TUP Manual; general rules apply to both.
                    </p>
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
                      Overview
                    </h3>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Emergency evacuation procedures for divers under pressure. AED (accelerated decompression) at 1 msw/min is preferred over HRU. Perform risk assessment before diving.
                    </p>
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
              ) : openModalId === "tableSelectionConsiderations" ? (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h3 className="text-sm font-bold text-foreground mb-2">
                      Overview
                    </h3>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Select tables based on dive conditions, expected stop time, equipment, and available gases (SIL15, SOX15, BOX15, NIA15, NIB15, etc.).
                    </p>
                  </div>

                  <div className="space-y-3">
                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        General Principles
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li><strong>SIL15</strong>: in-water decompression (wet bell or chamber) with flexible repetitive options (H*SIL15); suitable for multiple short dives.</li>
                        <li>If decompression &gt; <strong>30 min</strong>: prefer oxygen-supported staged tables — <strong>BOX15</strong> (bell O₂) or <strong>SOX15/H4SOX</strong> (surface O₂) — when bell/chamber available.</li>
                        <li><strong>BAB15 / SAB15 / H4SAB15</strong> are <em>backup only</em> if the oxygen system fails.</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Effects of Sea State
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>Significant waves (≈ ±0.5 m; ~1 m crest-to-trough) destabilise shallow 3 m stops.</li>
                        <li>If in-water stops are unsafe, consider <strong>SOX15</strong>: diver in chamber under pressure within <strong>3 minutes</strong> of surfacing (delays markedly ↑ DCS risk).</li>
                        <li><strong>BOX15</strong> with a bell tolerates larger sea states due to final O₂ stop at 6 m; <em>do not use BOX15 without a bell</em>.</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Nitrox Use
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li><strong>NIA15 (40/60)</strong> and <strong>NIB15 (35/65)</strong> may be used subject to allowable pO₂.</li>
                        <li>Max pO₂ <strong>1.6 bar</strong>; recommended ≤ <strong>1.5 bar</strong>. Other mixes on request.</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Repetitive Interval, Depth & Time
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>Repetitive diving is not standard N-Sea practice; only allowed in emergencies.</li>
                        <li>Actual repeat interval must be <strong>longer</strong> than the table's interval (e.g., 5 h since prior dive ⇒ use 4-h table).</li>
                        <li>Actual max depth must be <strong>less</strong> than table depth (e.g., 30 m ⇒ select 33 m table).</li>
                        <li>Actual dive time must be <strong>less</strong> than table time (e.g., 35 min ⇒ choose 40 min in table).</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Ascent Speed
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>Max ascent speed <strong>10 m/min</strong>; ascent time is not counted as stop time (if exceeded, add excess to stop time).</li>
                        <li>Ascent to first stop must be <strong>≥ 5 m/min</strong> (if slower, add excess to bottom time).</li>
                        <li>Between stops deeper than 6 m: transit ≤ 1 min. At ≤ 6 m: ascent speed is less critical.</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Diving Conditions & Choice of Tables
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>North Sea: limit in-water stop time to ~30 min (solid black line in SIL15).</li>
                        <li>Maintain shallow-stop pressure variation within <strong>±0.5 msw (~0.05 bar)</strong>.</li>
                        <li>Low temperature ⇒ hot-water suits; strong currents may restrict operations.</li>
                        <li>Supervisor decides suitability; perform LMRA per asset and conditions.</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Sea-State Matrix
                      </summary>
                      <div className="mt-3">
                        <table className="w-full text-[10px] border border-border rounded-lg overflow-hidden">
                          <thead className="bg-blue-50">
                            <tr>
                              <th className="p-2 text-left border-b border-border">Wave Height (m)</th>
                              <th className="p-2 border-b border-border">In-water 3m stop</th>
                              <th className="p-2 border-b border-border">In-water 6m stop</th>
                              <th className="p-2 border-b border-border">SurD (9m)</th>
                              <th className="p-2 border-b border-border">In-water no-stop</th>
                              <th className="p-2 border-b border-border">TUP</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border">
                              <td className="p-2 text-left font-semibold">1.0</td>
                              <td className="p-2"><span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-[9px] font-bold">Allowed</span></td>
                              <td className="p-2"><span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-[9px] font-bold">Allowed</span></td>
                              <td className="p-2"><span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-[9px] font-bold">Allowed</span></td>
                              <td className="p-2"><span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-[9px] font-bold">Allowed</span></td>
                              <td className="p-2"><span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-[9px] font-bold">Allowed</span></td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-2 text-left font-semibold">2.0</td>
                              <td className="p-2"><span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-[9px] font-bold">Prohibited</span></td>
                              <td className="p-2"><span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-[9px] font-bold">Allowed</span></td>
                              <td className="p-2"><span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-[9px] font-bold">Allowed</span></td>
                              <td className="p-2"><span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-[9px] font-bold">Allowed</span></td>
                              <td className="p-2"><span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-[9px] font-bold">Allowed</span></td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-2 text-left font-semibold">2.5</td>
                              <td className="p-2"><span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-[9px] font-bold">Prohibited</span></td>
                              <td className="p-2"><span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-[9px] font-bold">Prohibited</span></td>
                              <td className="p-2"><span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-[9px] font-bold">Allowed</span></td>
                              <td className="p-2"><span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-[9px] font-bold">Allowed</span></td>
                              <td className="p-2"><span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-[9px] font-bold">Allowed</span></td>
                            </tr>
                            <tr>
                              <td className="p-2 text-left font-semibold">3.0</td>
                              <td className="p-2"><span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-[9px] font-bold">Prohibited</span></td>
                              <td className="p-2"><span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-[9px] font-bold">Prohibited</span></td>
                              <td className="p-2"><span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-[9px] font-bold">Prohibited</span></td>
                              <td className="p-2"><span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-[9px] font-bold">Assess</span></td>
                              <td className="p-2"><span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-[9px] font-bold">Allowed</span></td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="text-[9px] text-muted-foreground mt-2">
                          • Assess swell/wave height where divers <em>enter/exit</em> the water and perform decompression.<br />
                          • Consider vessel positioning to provide lee at the decompression/transfer point.<br />
                          • The supervisor is the sole authority to start a dive.<br />
                          • Asset-specific limits apply; perform risk assessment and LMRA for each dive and asset.
                        </p>
                      </div>
                    </details>

                    <div className="bg-blue-100 border border-blue-300 rounded-lg p-2 mt-3 text-[10px] text-foreground">
                      <strong>Reminder:</strong> SOX15 transfers must place the diver in the chamber under pressure within <strong>3 minutes</strong> of surfacing.
                    </div>
                  </div>
                </>
              ) : openModalId === "oxygenToxicity" ? (
                <>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <h3 className="text-sm font-bold text-foreground mb-2">
                      Overview
                    </h3>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Acute CNS toxicity (convulsions) and long-term pulmonary toxicity managed via pO₂ limits, OTU, and ESOT exposure guidance.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <details className="bg-white border border-border rounded-lg p-3 open:bg-purple-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Acute (CNS) Toxicity — Overview
                      </summary>
                      <p className="text-[10px] text-muted-foreground leading-relaxed mt-3">
                        Acute CNS toxicity causes convulsions and can be fatal underwater. Limit pO₂ to <strong>1.5 bar</strong> traditionally, but convulsions occur at this level. <strong>NOAA</strong> provides pO₂/time limits; <strong>IMCA</strong> advises maximum <strong>1.4 bar</strong> regardless of time (IMCA D048, 2012).
                      </p>
                      <div className="mt-3">
                        <table className="w-full text-[10px] border border-border rounded-lg overflow-hidden">
                          <thead className="bg-purple-100">
                            <tr>
                              <th className="px-2 py-1 border-b border-border">pO₂ (atm)</th>
                              <th className="px-2 py-1 border-b border-border">Max Single Exposure (min)</th>
                              <th className="px-2 py-1 border-b border-border">Max per 24 h (min)</th>
                            </tr>
                          </thead>
                          <tbody className="text-[9px]">
                            <tr className="border-b border-border"><td className="px-2 py-1">1.6</td><td className="px-2 py-1 text-center">45</td><td className="px-2 py-1 text-center">150</td></tr>
                            <tr className="border-b border-border bg-purple-50"><td className="px-2 py-1">1.55</td><td className="px-2 py-1 text-center">83</td><td className="px-2 py-1 text-center">165</td></tr>
                            <tr className="border-b border-border"><td className="px-2 py-1">1.5</td><td className="px-2 py-1 text-center">120</td><td className="px-2 py-1 text-center">180</td></tr>
                            <tr className="border-b border-border bg-purple-50"><td className="px-2 py-1">1.45</td><td className="px-2 py-1 text-center">135</td><td className="px-2 py-1 text-center">180</td></tr>
                            <tr className="border-b border-border"><td className="px-2 py-1">1.4</td><td className="px-2 py-1 text-center">150</td><td className="px-2 py-1 text-center">180</td></tr>
                            <tr className="border-b border-border bg-purple-50"><td className="px-2 py-1">1.35</td><td className="px-2 py-1 text-center">165</td><td className="px-2 py-1 text-center">195</td></tr>
                            <tr className="border-b border-border"><td className="px-2 py-1">1.3</td><td className="px-2 py-1 text-center">180</td><td className="px-2 py-1 text-center">210</td></tr>
                            <tr className="border-b border-border bg-purple-50"><td className="px-2 py-1">1.25</td><td className="px-2 py-1 text-center">195</td><td className="px-2 py-1 text-center">225</td></tr>
                            <tr className="border-b border-border"><td className="px-2 py-1">1.2</td><td className="px-2 py-1 text-center">210</td><td className="px-2 py-1 text-center">240</td></tr>
                            <tr className="border-b border-border bg-purple-50"><td className="px-2 py-1">1.1</td><td className="px-2 py-1 text-center">240</td><td className="px-2 py-1 text-center">270</td></tr>
                            <tr className="border-b border-border"><td className="px-2 py-1">1.0</td><td className="px-2 py-1 text-center">300</td><td className="px-2 py-1 text-center">300</td></tr>
                            <tr className="border-b border-border bg-purple-50"><td className="px-2 py-1">0.9</td><td className="px-2 py-1 text-center">360</td><td className="px-2 py-1 text-center">360</td></tr>
                            <tr className="border-b border-border"><td className="px-2 py-1">0.8</td><td className="px-2 py-1 text-center">450</td><td className="px-2 py-1 text-center">450</td></tr>
                            <tr className="border-b border-border bg-purple-50"><td className="px-2 py-1">0.7</td><td className="px-2 py-1 text-center">570</td><td className="px-2 py-1 text-center">570</td></tr>
                            <tr><td className="px-2 py-1">0.6</td><td className="px-2 py-1 text-center">720</td><td className="px-2 py-1 text-center">720</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="bg-purple-100 border border-purple-300 rounded-lg p-2 mt-2 text-[10px] text-foreground">
                        CNS oxygen "hits" may resolve in dry settings but can be fatal underwater. Treat IMCA and NOAA limits as hard operational controls.
                      </div>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-purple-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Long-Term Oxygen Toxicity — OTU (UPTD)
                      </summary>
                      <p className="text-[10px] text-muted-foreground leading-relaxed mt-3">
                        <strong>Oxygen Toxicity Units (OTU)</strong> predict long-term toxicity risk, accumulated during dive and decompression. <strong>1 OTU = 1 UPTD</strong> (Unit Pulmonary Toxic Dose). DCD tables incorporate OTU; a separate table covers <strong>100% O₂ up to 18 m</strong> for non-standard procedures. <em>Use OTU/ESOT calculator in Tools.</em>
                      </p>
                      <div className="mt-3">
                        <table className="w-full text-[10px] border border-border rounded-lg overflow-hidden">
                          <thead className="bg-purple-100">
                            <tr>
                              <th className="px-2 py-1 border-b border-border">Depth (m)</th>
                              <th className="px-2 py-1 border-b border-border">OTU / 10 min</th>
                              <th className="px-2 py-1 border-b border-border">OTU / 20 min</th>
                            </tr>
                          </thead>
                          <tbody className="text-[9px]">
                            <tr className="border-b border-border"><td className="px-2 py-1">18</td><td className="px-2 py-1 text-center">35.7</td><td className="px-2 py-1 text-center">71.3</td></tr>
                            <tr className="border-b border-border bg-purple-50"><td className="px-2 py-1">15</td><td className="px-2 py-1 text-center">31.7</td><td className="px-2 py-1 text-center">63.5</td></tr>
                            <tr className="border-b border-border"><td className="px-2 py-1">13.5</td><td className="px-2 py-1 text-center">29.8</td><td className="px-2 py-1 text-center">59.5</td></tr>
                            <tr className="border-b border-border bg-purple-50"><td className="px-2 py-1">12</td><td className="px-2 py-1 text-center">27.7</td><td className="px-2 py-1 text-center">55.5</td></tr>
                            <tr className="border-b border-border"><td className="px-2 py-1">9</td><td className="px-2 py-1 text-center">23.6</td><td className="px-2 py-1 text-center">47.2</td></tr>
                            <tr className="border-b border-border bg-purple-50"><td className="px-2 py-1">6</td><td className="px-2 py-1 text-center">19.3</td><td className="px-2 py-1 text-center">38.6</td></tr>
                            <tr className="border-b border-border"><td className="px-2 py-1">4.5</td><td className="px-2 py-1 text-center">17.1</td><td className="px-2 py-1 text-center">34.1</td></tr>
                            <tr className="border-b border-border bg-purple-50"><td className="px-2 py-1">3</td><td className="px-2 py-1 text-center">14.8</td><td className="px-2 py-1 text-center">29.6</td></tr>
                            <tr><td className="px-2 py-1">0</td><td className="px-2 py-1 text-center">10.0</td><td className="px-2 py-1 text-center">20.0</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>A precise registration of OTU is imperative to avoid exceeding limits; the preceding <strong>two weeks</strong> are most relevant. Prior "oxygen history" should be on record but is not directly relevant.</li>
                        <li>If an OTU limit is exceeded: observe an absolute <strong>no-diving period of ≥ 48 hours</strong>. After each 48-hour no-dive period the OTU count restarts at zero.</li>
                        <li>If chronic oxygen-toxicity symptoms are suspected: impose a diving ban and consult a qualified diving medical advisor.</li>
                      </ul>
                      <div className="bg-purple-100 border border-purple-300 rounded-lg p-2 mt-3 text-[10px] text-foreground">
                        <strong>Oxygen Limits �� OTU</strong><br />
                        • Daily dose should not exceed <strong>450 OTU</strong> (except emergencies).<br />
                        • For 7-day schedules: week 1 ≤ <strong>2500 OTU</strong>; weeks 2–3 ≤ <strong>2100 OTU</strong>; then 48 h no diving.<br />
                        • For &gt;3 weeks continuous (7 d/wk): ≤ <strong>2100 OTU/week</strong>.<br />
                        • If limits are exceeded, contact a diving doctor for advice on the required no-dive period.
                      </div>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-purple-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        ESOT (DMAC 35) — Guidance & Limits
                      </summary>
                      <p className="text-[10px] text-muted-foreground leading-relaxed mt-3">
                        IMCA/DMAC recommend <strong>ESOT &lt; 660</strong> for single dives. Multi-day limits: <strong>660</strong> (2 days), <strong>500</strong> (5 days), <strong>420</strong> (10 days). Plan <strong>two days off</strong> after multi-day exposures. Air in-water decompression allowed during "off" days. Relax limits only with physician-reviewed risk assessment.
                      </p>
                      <div className="mt-3">
                        <table className="w-full text-[10px] border border-border rounded-lg overflow-hidden">
                          <thead className="bg-purple-100">
                            <tr>
                              <th className="px-2 py-1 border-b border-border">Daily max ESOT</th>
                              <th className="px-2 py-1 border-b border-border">Max successive days</th>
                              <th className="px-2 py-1 border-b border-border">Min surface interval (h)</th>
                            </tr>
                          </thead>
                          <tbody className="text-[9px]">
                            <tr className="border-b border-border"><td className="px-2 py-1">&gt; 660</td><td className="px-2 py-1 text-center">0</td><td className="px-2 py-1 text-center">24</td></tr>
                            <tr className="border-b border-border bg-purple-50"><td className="px-2 py-1">501 – 660</td><td className="px-2 py-1 text-center">2</td><td className="px-2 py-1 text-center">12</td></tr>
                            <tr className="border-b border-border"><td className="px-2 py-1">420 – 500</td><td className="px-2 py-1 text-center">5</td><td className="px-2 py-1 text-center">12</td></tr>
                            <tr className="bg-purple-50"><td className="px-2 py-1">&lt; 420</td><td className="px-2 py-1 text-center">10</td><td className="px-2 py-1 text-center">12</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-purple-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        OTU and ESOT in DCD/NDC Tables
                      </summary>
                      <p className="text-[10px] text-muted-foreground leading-relaxed mt-3">
                        DCD/NDC tables (<Link to="/tables" state={{ from: "supporting-info", modalId: openModalId }} className="text-blue-600 hover:text-blue-800 underline">SOX15</Link>, <Link to="/tables" state={{ from: "supporting-info", modalId: openModalId }} className="text-blue-600 hover:text-blue-800 underline">NIA15</Link>, <Link to="/tables" state={{ from: "supporting-info", modalId: openModalId }} className="text-blue-600 hover:text-blue-800 underline">NIB15</Link>, <Link to="/tables" state={{ from: "supporting-info", modalId: openModalId }} className="text-blue-600 hover:text-blue-800 underline">BOX15</Link>) include OTU values. DMAC 35 recommends ESOT as alternative. <strong>OTU and ESOT tables</strong> allow comparison. For 12-h surface intervals, OTU and ESOT shown per depth/time. ESOT decays; add recovery ESOT (recESOT) to next dive. OTU accumulates (no decay). Use Tools calculator for totals.
                      </p>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>Reference: OTU-ESOT Calculator Tool — <em>BMS-OP-0600-PR-000 OTU-ESOT Calculator Tool</em></li>
                        <li>Reference: OTU-ESOT Engineering Instruction Video — <em>N-Sea N Drive Folder Training Videos</em></li>
                        <li>It remains to be seen which method is best; DMAC 35 is guidance, not law.</li>
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
                          t × pO₂²��²⁸⁵
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
              ) : openModalId === "flyingAfterDiving" ? (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h3 className="text-sm font-bold text-foreground mb-2">
                      Overview
                    </h3>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Flying increases DCS risk, especially if symptoms are present. The intervals below are <strong>minimums</strong>; longer intervals are recommended, particularly for flights with stops/landings. If any DCS signs exist, flying greatly increases risk of serious neurological complications.
                    </p>
                  </div>

                  <div className="space-y-3 mt-4">
                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Standby Period
                      </summary>
                      <ul className="text-muted-foreground text-[10px] mt-3 space-y-2 ml-6 list-disc">
                        <li>After a routine dive with decompression: remain in the immediate vicinity of the chamber for <strong>1 hour</strong> after the last stop.</li>
                        <li>After a dive on standard air tables below the thick line ("backup"): remain for <strong>≥ 2 hours</strong>.</li>
                        <li>After a compromised dive (decompression errors) or emergency procedures: remain for <strong>≥ 4 hours</strong>, unless the diving medical officer decides otherwise.</li>
                        <li>In all cases: remain within <strong>2 hours travel</strong> of a chamber for <strong>12 hours</strong> after a dive.</li>
                      </ul>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Flight Restrictions — General
                      </summary>
                      <p className="text-[10px] text-muted-foreground leading-relaxed mt-3">
                        Flying increases DCS risk, especially if symptoms are present. The intervals below are <strong>minimums</strong>; longer intervals are recommended, particularly for flights with stops/landings. Shorter intervals only after consultation with a diving medical advisor. If any DCS signs exist, flying greatly increases risk of serious neurological complications.
                      </p>
                    </details>

                    <details className="bg-white border border-border rounded-lg p-3 open:bg-blue-50">
                      <summary className="font-bold text-sm cursor-pointer text-foreground flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" />
                        Minimum Time Between Diving and Flying (Table)
                      </summary>
                      <div className="mt-3 overflow-x-auto">
                        <table className="w-full text-[10px] border border-border rounded-lg overflow-hidden">
                          <thead className="bg-blue-50">
                            <tr>
                              <th className="p-2 text-left border-b border-border font-bold">Dive</th>
                              <th className="p-2 border-b border-border font-bold">&lt; 600 m (2,000 ft)<br /><span className="font-normal text-[9px]">Controlled flight plan</span></th>
                              <th className="p-2 border-b border-border font-bold">&lt; 2,600 m (8,000 ft)<br /><span className="font-normal text-[9px]">All other flights</span></th>
                            </tr>
                          </thead>
                          <tbody className="text-[9px]">
                            <tr className="border-b border-border">
                              <td className="p-2 text-left font-semibold">
                                <strong>No-stop dives</strong><br />
                                <span className="font-normal text-[8px] text-muted-foreground">Total time under pressure &lt; 60 min in last 12 h</span>
                              </td>
                              <td className="p-2 text-center">2 h</td>
                              <td className="p-2 text-center">8 h* (24 h)</td>
                            </tr>
                            <tr className="border-b border-border bg-blue-50">
                              <td className="p-2 text-left font-semibold">
                                <strong>Other dives</strong> on air, nitrox, heliox and mixed-gas bounce dives<br />
                                <span className="font-normal text-[8px] text-muted-foreground">&lt; 4 h under pressure</span>
                              </td>
                              <td className="p-2 text-center">12 h</td>
                              <td className="p-2 text-center">24 h</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-2 text-left font-semibold">
                                <strong>Saturation dives</strong> (heliox/air/nitrox/trimix)<br />
                                <span className="font-normal text-[8px] text-muted-foreground">&gt; 4 h under pressure</span>
                              </td>
                              <td className="p-2 text-center">24 h</td>
                              <td className="p-2 text-center">48 h</td>
                            </tr>
                            <tr className="border-b border-border bg-blue-50">
                              <td className="p-2 text-left font-semibold">
                                <strong>After decompression sickness</strong><br />
                                <span className="font-normal text-[8px] text-muted-foreground">Immediate &amp; total disappearance after first recompression</span>
                              </td>
                              <td className="p-2 text-center">24 h</td>
                              <td className="p-2 text-center">48 h</td>
                            </tr>
                            <tr>
                              <td className="p-2 text-left font-semibold">
                                <strong>After decompression sickness</strong><br />
                                <span className="font-normal text-[8px] text-muted-foreground">Remaining symptoms / no immediate response</span>
                              </td>
                              <td colSpan={2} className="p-2">Fly only after consultation with a diving medical officer. General recommendation: delay flying as long as possible.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[9px] text-muted-foreground mt-2">
                        * <strong>18 h</strong> applies to short flights only. For long flights (e.g., intercontinental), extend to <strong>24 h</strong>.
                      </p>
                    </details>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                      <p className="text-[10px] font-semibold text-yellow-900 mb-1">⚠️ Important Reminder</p>
                      <p className="text-[10px] text-yellow-900">
                        These intervals are minimum guidelines only. Longer delays are strongly recommended, especially for long or high-altitude flights. Always consult a diving medicine professional if you have any symptoms or concerns.
                      </p>
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
                      <ul className="space-y-2 text-xs text-muted-foreground list-disc ml-6">
                        {sub.items.map((item, itemIdx) => (
                          <li key={itemIdx}>{renderTextWithTableLinks(item)}</li>
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
          </div>
        </div>
      </section>
    </div>
  );
}
