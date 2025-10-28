import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Pill, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function TreatmentProtocols() {
  const [expandedId, setExpandedId] = useState<string>("dcs");

  const protocols = [
    {
      id: "dcs",
      title: "Decompression Sickness (DCS) Treatment",
      category: "Diving Illness",
      overview:
        "DCS occurs when nitrogen bubbles form in tissues during rapid decompression. Immediate hyperbaric oxygen treatment is critical.",
      decisionTree: [
        {
          step: 1,
          question: "Has the diver been rescued and is oxygen available?",
          yes: "Administer 100% oxygen immediately, continue breathing oxygen",
          no: "Arrange oxygen delivery ASAP - this is critical for survival",
        },
        {
          step: 2,
          question: "Has emergency medical service been contacted?",
          yes: "Provide exact symptoms and dive profile information",
          no: "Contact immediately - describe symptoms and request urgent response",
        },
        {
          step: 3,
          question:
            "Does the diver show Type I (pain, skin) or Type II (neurological) symptoms?",
          yes: "Type II symptoms are more severe - this requires immediate recompression",
          no: "Type I may still require treatment depending on severity",
        },
      ],
      treatment: [
        "100% oxygen at surface until emergency arrival",
        "Hyperbaric oxygen recompression chamber treatment",
        "IV hydration and observation",
        "Possible multiple treatment sessions",
        "Follow-up care with diving medicine specialist",
      ],
      table: "NMDC Table 6 - Recompression Treatment Tables",
      prevention:
        "Strict adherence to decompression schedules, slow ascent rates, and conservative dive planning",
    },
    {
      id: "aco",
      title: "Arterial Gas Embolism (AGE)",
      category: "Diving Injury",
      overview:
        "Air enters arterial circulation, causing bubble obstruction. This is a medical emergency requiring immediate treatment.",
      decisionTree: [
        {
          step: 1,
          question: "Are there neurological symptoms (confusion, paralysis, stroke-like)?",
          yes: "This is likely AGE - this is a life-threatening emergency",
          no: "Consider other causes but AGE must be ruled out",
        },
        {
          step: 2,
          question: "Did symptoms occur during or immediately after ascent?",
          yes: "Strongly suggests AGE - requires immediate recompression",
          no: "Still investigate further",
        },
      ],
      treatment: [
        "100% oxygen immediately",
        "Emergency recompression in hyperbaric chamber",
        "CPR if needed",
        "IV hydration",
        "Possible medications for cerebral edema",
        "Extended hospital monitoring",
      ],
      table: "NMDC Table 6A - AGE Emergency Treatment",
      prevention:
        "Never hold breath during ascent, maintain proper ascent rate, and equalize pressure continuously",
    },
    {
      id: "hypothermia",
      title: "Hypothermia Treatment",
      category: "Environmental",
      overview:
        "Core body temperature drops below safe levels. Gradual rewarming is essential - avoid rapid heating which can cause afterdrop.",
      decisionTree: [
        {
          step: 1,
          question: "What is the diver's core body temperature (if known)?",
          yes: "Below 32°C: Severe hypothermia requiring specialist care",
          no: "Keep diver warm, monitor carefully",
        },
        {
          step: 2,
          question: "Is the diver conscious and responsive?",
          yes: "Mild warming, warm liquids if conscious",
          no: "Handle very carefully - may appear dead but could recover",
        },
      ],
      treatment: [
        "Remove from cold environment",
        "Remove wet clothing carefully",
        "Wrap in warm blankets (passive rewarming for mild cases)",
        "Warm drinks if fully conscious",
        "Monitor vital signs",
        "Active core rewarming for severe cases (hospital care)",
        "Avoid rough handling or sudden movements",
      ],
      table: "Temperature Monitoring Chart",
      prevention:
        "Appropriate thermal protection, pre-dive planning for water temperature, monitoring dive duration in cold water",
    },
    {
      id: "oxygen-tox",
      title: "Oxygen Toxicity Treatment",
      category: "Gas Toxicity",
      overview:
        "Excessive oxygen exposure causes CNS toxicity. Most cases resolve with descent and oxygen level reduction.",
      decisionTree: [
        {
          step: 1,
          question: "Is the diver still underwater and experiencing symptoms?",
          yes: "Descend to deeper depth to reduce PPO2, switch to lower oxygen mix if available",
          no: "Ensure surface safety, monitor for delayed symptoms",
        },
        {
          step: 2,
          question: "Did a seizure occur underwater?",
          yes: "This is extremely dangerous - rescue procedures essential",
          no: "Monitor for further symptoms",
        },
      ],
      treatment: [
        "Descend to reduce PPO2 (usually resolves at depth)",
        "Switch to lower oxygen breathing mixture",
        "Return to surface carefully with decompression stops",
        "Oxygen at surface (lower PPO2 than caused the problem)",
        "Medical evaluation for complications",
      ],
      table: "PPO2 Limits Chart - Oxygen Toxicity Risk Zones",
      prevention:
        "Monitor PPO2, respect maximum operating depths for each gas mix, follow table time limits with oxygen",
    },
    {
      id: "nitrogen-narc",
      title: "Nitrogen Narcosis Treatment",
      category: "Physiological Response",
      overview:
        "Impaired judgment and coordination at depth. Not life-threatening if managed, but can lead to dangerous decisions.",
      decisionTree: [
        {
          step: 1,
          question:
            "Are symptoms evident (poor coordination, impaired judgment)?",
          yes: "Ascend to shallower depth - symptoms resolve",
          no: "Continue monitoring as nitrogen narcosis increases with depth",
        },
        {
          step: 2,
          question: "Can the diver safely ascend or must buddy assist?",
          yes: "Begin controlled ascent with buddy support",
          no: "Buddy assists - slow, controlled ascent",
        },
      ],
      treatment: [
        "Ascend to shallower depth (immediately resolves symptoms)",
        "Maintain control during ascent",
        "Monitor depth carefully",
        "Don't exceed recommended depths",
        "Complete any required decompression stops",
        "Return to surface",
      ],
      table: "Nitrogen Narcosis Severity Depth Chart",
      prevention:
        "Respect recommended depth limits, use nitrox or mixed gas for deep dives, maintain good physical conditioning",
    },
    {
      id: "squeeze",
      title: "Barotrauma (Squeeze) Treatment",
      category: "Pressure Injury",
      overview:
        "Pressure damage to air-filled spaces (ears, sinuses, lungs). Prevention through equalization is key.",
      decisionTree: [
        {
          step: 1,
          question: "What body area is affected (ears, sinuses, lungs)?",
          yes: "Ear/sinus squeeze: Medical evaluation for eardrum perforation or fluid",
          no: "Lung squeeze: Chest pain, breathing difficulty - serious emergency",
        },
        {
          step: 2,
          question: "Is there chest pain or breathing difficulty?",
          yes: "Pulmonary barotrauma - EMERGENCY - hospital immediately",
          no: "Likely ear or sinus squeeze - medical evaluation needed",
        },
      ],
      treatment: [
        "Stop diving immediately",
        "Ear/sinus squeeze: Warm compresses, pain management, decongestants",
        "Medical evaluation for eardrum or sinus complications",
        "Lung squeeze: Immediate hospitalization, chest X-rays, oxygen",
        "Avoid pressure changes until healed",
        "May require ENT specialist",
      ],
      table: "Barotrauma Pressure Limits Chart",
      prevention:
        "Equalize pressure early and frequently, never force equalization, ascend properly if unable to equalize",
    },
  ];

  const selectedProtocol = protocols.find((p) => p.id === expandedId) || protocols[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      <section className="py-12 px-4 bg-white border-b border-border">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Treatment Protocols & Decision Trees
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Medical treatment protocols for diving-related injuries and
            illnesses, including decision trees for identifying the correct
            treatment approach.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-3 gap-8">
          {/* Protocol List */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="p-4 bg-primary text-primary-foreground font-bold">
                Treatment Protocols
              </div>

              <div className="divide-y divide-border">
                {protocols.map((protocol) => (
                  <button
                    key={protocol.id}
                    onClick={() => setExpandedId(protocol.id)}
                    className={`w-full text-left p-4 hover:bg-ocean-50 transition-colors ${
                      expandedId === protocol.id
                        ? "bg-ocean-100 border-l-4 border-primary"
                        : ""
                    }`}
                  >
                    <div className="font-semibold text-foreground">
                      {protocol.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {protocol.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Protocol Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-border p-8">
              <div className="flex items-start gap-4 mb-6">
                <Pill className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {selectedProtocol.title}
                  </h2>
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                    {selectedProtocol.category}
                  </span>
                </div>
              </div>

              <p className="text-foreground mb-6 leading-relaxed">
                {selectedProtocol.overview}
              </p>

              {/* Decision Tree */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                    ❓
                  </span>
                  Decision Tree
                </h3>

                <div className="space-y-4">
                  {selectedProtocol.decisionTree.map((node, idx) => (
                    <div key={idx} className="bg-white rounded p-4 border border-blue-200">
                      <div className="font-semibold text-blue-900 mb-2">
                        Step {node.step}: {node.question}
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <span className="text-xs font-semibold text-green-700">
                            YES →
                          </span>
                          <p className="text-sm text-green-900">{node.yes}</p>
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-semibold text-orange-700">
                            NO →
                          </span>
                          <p className="text-sm text-orange-900">{node.no}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Steps */}
              <div className="mb-6">
                <h3 className="font-bold text-foreground mb-3">
                  Treatment Protocol Steps
                </h3>
                <ol className="space-y-2">
                  {selectedProtocol.treatment.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-foreground p-2 bg-green-50 rounded border border-green-200"
                    >
                      <span className="font-bold text-green-700 flex-shrink-0">
                        {idx + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Related Table */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-purple-900 mb-2">
                  Related Dive Table
                </h3>
                <Link
                  to="/tables"
                  className="text-purple-700 hover:underline font-medium"
                >
                  {selectedProtocol.table} →
                </Link>
              </div>

              {/* Prevention */}
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <h3 className="font-bold text-orange-900 mb-2">Prevention</h3>
                <p className="text-orange-800 text-sm">
                  {selectedProtocol.prevention}
                </p>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 flex gap-4">
              <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-900 mb-2">Critical Notice</h3>
                <p className="text-red-800 text-sm">
                  These protocols are provided for reference and training
                  purposes. In actual medical emergencies, follow guidance from
                  certified medical professionals and emergency services. Always
                  prioritize immediate professional medical attention when
                  diving injuries are suspected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-12 px-4 bg-white border-t border-border mt-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Related Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/emergency-procedures"
              className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <h3 className="font-bold text-foreground group-hover:text-primary mb-2">
                Emergency Procedures
              </h3>
              <p className="text-sm text-muted-foreground">
                Immediate response protocols for identifying and handling
                emergencies.
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
                Safety limits, medical guidelines, and reference information.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
