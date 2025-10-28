import Navigation from "@/components/Navigation";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, Info } from "lucide-react";

export default function TableDetail() {
  const { id } = useParams();

  const tableData: Record<
    string,
    {
      name: string;
      type: string;
      description: string;
      depths: string[];
      times: string[];
      notes: string[];
      relatedTables: Array<{ id: string; name: string }>;
      safetyInfo: string;
    }
  > = {
    "nmdc-1": {
      name: "NMDC Table 1 - No-Decompression Stop Limits",
      type: "Commercial",
      description:
        "This table provides no-decompression stop time limits for various depths and gas mixtures. It specifies the maximum bottom time for which a diver can ascend directly to the surface without requiring mandatory decompression stops.",
      depths: [
        "10m",
        "15m",
        "20m",
        "25m",
        "30m",
        "40m",
        "50m",
        "60m",
      ],
      times: [
        "Unlimited",
        "90 min",
        "45 min",
        "30 min",
        "20 min",
        "12 min",
        "8 min",
        "5 min",
      ],
      notes: [
        "Table assumes air at standard pressure",
        "Times are based on no-stop nitrogen loading limits",
        "Always ascend at proper rate (10m/min)",
        "Include safety stop even when not required",
        "Conservative approach recommended for commercial diving",
      ],
      relatedTables: [
        { id: "nmdc-2", name: "NMDC Table 2 - Air Decompression" },
        { id: "nmdc-4", name: "NMDC Table 4 - Surface Intervals" },
      ],
      safetyInfo:
        "Always follow current commercial diving regulations. These limits assume properly trained commercial divers using approved equipment and procedures.",
    },
    "nmdc-2": {
      name: "NMDC Table 2 - Air Decompression Schedules",
      type: "Commercial",
      description:
        "Required decompression stop times and depths when exceeding no-stop limits. This table provides the necessary decompression profiles to safely eliminate nitrogen from the body.",
      depths: ["50m", "60m", "70m", "80m"],
      times: [
        "5 min @ 9m, 3 min @ 6m, 2 min @ 3m",
        "8 min @ 9m, 5 min @ 6m, 3 min @ 3m",
        "12 min @ 9m, 8 min @ 6m, 4 min @ 3m",
        "18 min @ 9m, 12 min @ 6m, 6 min @ 3m",
      ],
      notes: [
        "Ascent rate must be 10m per minute between stops",
        "Add safety stop time when required",
        "Use current guidelines for oxygen exposure",
        "Longer bottom times require longer decompression",
      ],
      relatedTables: [
        { id: "nmdc-1", name: "NMDC Table 1 - No-Stop Limits" },
        { id: "nmdc-5", name: "NMDC Table 5 - Oxygen Decompression" },
      ],
      safetyInfo:
        "Always follow the most conservative decompression schedule. When in doubt, add extra decompression time.",
    },
    "air-1": {
      name: "Air Table 1 - Recreational No-Stop Limits",
      type: "Air",
      description:
        "Maximum no-decompression bottom times for recreational air diving. Recreational limits are more conservative than commercial limits.",
      depths: [
        "10m",
        "15m",
        "20m",
        "25m",
        "30m",
        "35m",
        "40m",
      ],
      times: [
        "Unlimited",
        "75 min",
        "35 min",
        "20 min",
        "12 min",
        "8 min",
        "5 min",
      ],
      notes: [
        "Recreational limit at 40m maximum depth",
        "More conservative than commercial limits",
        "Always include safety stops",
        "Plan dive with conservative bottom times",
      ],
      relatedTables: [
        { id: "air-2", name: "Air Table 2 - Recreational Decompression" },
      ],
      safetyInfo:
        "Recreational diving limits prioritize diver safety. Always plan within these limits and maintain proper training certification.",
    },
    "nitrox-1": {
      name: "Nitrox 32% No-Stop Limits (EAD)",
      type: "Nitrox",
      description:
        "No-decompression stop times for Nitrox 32%, adjusted for equivalent air depth. Extended bottom times possible compared to air at the same depth.",
      depths: ["15m", "20m", "25m", "30m", "35m", "40m"],
      times: [
        "Unlimited",
        "110 min",
        "65 min",
        "40 min",
        "25 min",
        "15 min",
      ],
      notes: [
        "EAD calculations already applied in depth column",
        "Maximum PPO2 = 1.4 bar",
        "Maximum operating depth approximately 42m",
        "Extended bottom times vs air at same depth",
      ],
      relatedTables: [
        { id: "nitrox-2", name: "Nitrox 32% Decompression Schedules" },
        { id: "nitrox-4", name: "Nitrox MOD Calculator" },
      ],
      safetyInfo:
        "Oxygen toxicity risk increases with deeper dives. Always stay within MOD limits. Proper nitrox training required.",
    },
  };

  const currentTable =
    tableData[id as string] ||
    tableData["nmdc-1"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/tables"
          className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-8 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tables
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-ocean-100 text-ocean-700 text-sm font-semibold rounded-full mb-4">
            {currentTable.type}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {currentTable.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            {currentTable.description}
          </p>
        </div>

        {/* Safety Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-8 flex gap-4">
          <AlertCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-blue-900 mb-1">Safety Notice</h3>
            <p className="text-blue-800 text-sm">{currentTable.safetyInfo}</p>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-lg border border-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Dive Limits Table
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="px-4 py-3 text-left font-bold text-foreground">
                    Depth
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-foreground">
                    Bottom Time / Decompression Requirements
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTable.depths.map((depth, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-ocean-50">
                    <td className="px-4 py-3 font-semibold text-primary">
                      {depth}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {currentTable.times[idx]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-white rounded-lg border border-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Info className="h-6 w-6 text-primary" />
            Important Notes & Guidelines
          </h2>

          <ul className="space-y-3">
            {currentTable.notes.map((note, idx) => (
              <li key={idx} className="flex gap-3 text-foreground">
                <span className="text-primary font-bold flex-shrink-0">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Tables */}
        <div className="bg-white rounded-lg border border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Related Tables
          </h2>

          <p className="text-muted-foreground mb-4">
            These tables are often used together with this one:
          </p>

          <div className="space-y-3">
            {currentTable.relatedTables.map((table) => (
              <Link
                key={table.id}
                to={`/tables/${table.id}`}
                className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-ocean-50 transition-all"
              >
                <span className="font-bold text-primary hover:underline">
                  {table.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          <Link
            to="/emergency-procedures"
            className="p-4 rounded-lg border border-border hover:border-red-500 hover:bg-red-50 transition-all group text-center"
          >
            <div className="font-bold text-foreground group-hover:text-red-700">
              Emergency Procedures
            </div>
            <div className="text-sm text-muted-foreground group-hover:text-red-600">
              Related emergency protocols
            </div>
          </Link>

          <Link
            to="/treatment-protocols"
            className="p-4 rounded-lg border border-border hover:border-green-500 hover:bg-green-50 transition-all group text-center"
          >
            <div className="font-bold text-foreground group-hover:text-green-700">
              Treatment Protocols
            </div>
            <div className="text-sm text-muted-foreground group-hover:text-green-600">
              Related treatment information
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
