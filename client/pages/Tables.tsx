import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";

interface DiveTable {
  id: string;
  name: string;
  type: "No Stops Air" | "Standard Air" | "SurD O2" | "Backup Air" | "Nitrox" | "EAD" | "Wet/Dry Bell" | "Treatment";
  description: string;
  category: string;
  code?: string;
}

const diveTablesData: DiveTable[] = [
  // NO-STOP AIR DIVING TABLES
  {
    id: "nd15",
    name: "Air Diving, No-Stop Limits in Minutes",
    type: "No Stops Air",
    category: "No-Stop Air Diving Tables",
    code: "ND15",
    description:
      "No-decompression stop time limits for air diving at various depths and bottom times",
  },
  {
    id: "lnd15",
    name: "Air Diving, Long No-Stop Limits in Minutes",
    type: "No Stops Air",
    category: "No-Stop Air Diving Tables",
    code: "LND15",
    description:
      "Extended no-decompression stop limits for longer air diving operations",
  },

  // STANDARD AIR TABLES
  {
    id: "sil15",
    name: "Standard Air Repetitive Interval 12 Hours",
    type: "Standard Air",
    category: "Standard Air Tables",
    code: "SIL15",
    description: "Air diving tables with 12-hour repetitive diving intervals",
  },
  {
    id: "h2sil15",
    name: "Standard Air Repetitive Interval 2 Hours",
    type: "Standard Air",
    category: "Standard Air Tables",
    code: "H2SIL15",
    description: "Air diving tables with 2-hour repetitive diving intervals",
  },
  {
    id: "h4sil15",
    name: "Standard Air Repetitive Interval 4 Hours",
    type: "Standard Air",
    category: "Standard Air Tables",
    code: "H4SIL15",
    description: "Air diving tables with 4-hour repetitive diving intervals",
  },

  // SURFACE/OX TABLES
  {
    id: "sox15",
    name: "Surface Decompression with Oxygen Repetitive Interval 12 Hours",
    type: "SurD O2",
    category: "Surface/OX Tables",
    code: "SOX15",
    description:
      "Surface decompression using oxygen with 12-hour repetitive diving intervals",
  },
  {
    id: "hsox15",
    name: "Surface Decompression with Oxygen Repetitive Interval 4 Hours",
    type: "SurD O2",
    category: "Surface/OX Tables",
    code: "HSOX15",
    description:
      "Surface decompression using oxygen with 4-hour repetitive diving intervals",
  },

  // BACKUP AIR TABLES
  {
    id: "sab15",
    name: "Backup Air Repetitive Interval 12 Hours",
    type: "Backup Air",
    category: "Backup Air Tables",
    code: "SAB15",
    description: "Backup air diving tables with 12-hour repetitive intervals",
  },
  {
    id: "hsab15",
    name: "Backup Air Repetitive Interval 4 Hours",
    type: "Backup Air",
    category: "Backup Air Tables",
    code: "HSAB15",
    description: "Backup air diving tables with 4-hour repetitive intervals",
  },

  // NITROX NO-STOP TABLES
  {
    id: "ndnia15",
    name: "Nitrox 40/60 Diving, No-Stop Limits in Minutes",
    type: "Nitrox",
    category: "Nitrox Tables",
    code: "NDNIA15",
    description:
      "No-decompression stop limits for Nitrox 40/60 (40% O2 / 60% N2)",
  },
  {
    id: "ndnib15",
    name: "Nitrox 35/65 Diving, No-Stop Limits in Minutes",
    type: "Nitrox",
    category: "Nitrox Tables",
    code: "NDNIB15",
    description:
      "No-decompression stop limits for Nitrox 35/65 (35% O2 / 65% N2)",
  },

  // NITROX REPETITIVE TABLES
  {
    id: "nia15",
    name: "Nitrox 40/60 Repetitive Interval 12 Hours",
    type: "Nitrox",
    category: "Nitrox Tables",
    code: "NIA15",
    description: "Nitrox 40/60 diving tables with 12-hour repetitive intervals",
  },
  {
    id: "nia2-3",
    name: "Nitrox 40/60 Repetitive Interval 2 Hours (2-3 minutes)",
    type: "Nitrox",
    category: "Nitrox Tables",
    code: "NIA 2-3",
    description: "Nitrox 40/60 diving tables with 2-hour repetitive intervals",
  },
  {
    id: "nia2-6",
    name: "Nitrox 40/60 Repetitive Interval 2 Hours (2-6 minutes)",
    type: "Nitrox",
    category: "Nitrox Tables",
    code: "NIA 2-6",
    description: "Nitrox 40/60 diving tables with 2-hour repetitive intervals",
  },
  {
    id: "h2nia15",
    name: "Nitrox 40/60 Repetitive Interval 2 Hours",
    type: "Nitrox",
    category: "Nitrox Tables",
    code: "H2NIA15",
    description: "Nitrox 40/60 diving tables with 2-hour repetitive intervals",
  },
  {
    id: "nib15",
    name: "Nitrox 35/65 Repetitive Interval 12 Hours",
    type: "Nitrox",
    category: "Nitrox Tables",
    code: "NIB15",
    description: "Nitrox 35/65 diving tables with 12-hour repetitive intervals",
  },
  {
    id: "h2nib15",
    name: "Nitrox 35/65 Repetitive Interval 2 Hours",
    type: "Nitrox",
    category: "Nitrox Tables",
    code: "H2NIB15",
    description: "Nitrox 35/65 diving tables with 2-hour repetitive intervals",
  },
  {
    id: "h4nib15",
    name: "Nitrox 35/65 Repetitive Interval 4 Hours",
    type: "Nitrox",
    category: "Nitrox Tables",
    code: "H4NIB15",
    description: "Nitrox 35/65 diving tables with 4-hour repetitive intervals",
  },

  // NITROX EAD TABLES
  {
    id: "ead-40",
    name: "Nitrox 40% O2 / 60% N2 - Equivalent Air Depth",
    type: "EAD",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 40% oxygen mixture",
  },
  {
    id: "ead-39",
    name: "Nitrox 39% O2 / 61% N2 - Equivalent Air Depth",
    type: "EAD",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 39% oxygen mixture",
  },
  {
    id: "ead-38",
    name: "Nitrox 38% O2 / 62% N2 - Equivalent Air Depth",
    type: "EAD",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 38% oxygen mixture",
  },
  {
    id: "ead-37",
    name: "Nitrox 37% O2 / 63% N2 - Equivalent Air Depth",
    type: "EAD",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 37% oxygen mixture",
  },
  {
    id: "ead-36",
    name: "Nitrox 36% O2 / 64% N2 - Equivalent Air Depth",
    type: "EAD",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 36% oxygen mixture",
  },
  {
    id: "ead-35",
    name: "Nitrox 35% O2 / 65% N2 - Equivalent Air Depth",
    type: "EAD",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 35% oxygen mixture",
  },
  {
    id: "ead-34",
    name: "Nitrox 34% O2 / 66% N2 - Equivalent Air Depth",
    type: "EAD",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 34% oxygen mixture",
  },
  {
    id: "ead-33",
    name: "Nitrox 33% O2 / 67% N2 - Equivalent Air Depth",
    type: "EAD",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 33% oxygen mixture",
  },
  {
    id: "ead-32",
    name: "Nitrox 32% O2 / 68% N2 - Equivalent Air Depth",
    type: "EAD",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 32% oxygen mixture",
  },
  {
    id: "ead-31",
    name: "Nitrox 31% O2 / 69% N2 - Equivalent Air Depth",
    type: "EAD",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 31% oxygen mixture",
  },
  {
    id: "ead-30",
    name: "Nitrox 30% O2 / 70% N2 - Equivalent Air Depth",
    type: "EAD",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 30% oxygen mixture",
  },

  // OTU/ESOT TABLES
  {
    id: "sox15-esot",
    name: "Surface Decompression with Oxygen (ESOT)",
    type: "SurD O2",
    category: "OTU/ESOT Tables",
    code: "SOX15",
    description: "Surface decompression tables using oxygen",
  },
  {
    id: "nia15-esot",
    name: "Nitrox 40/60 (ESOT)",
    type: "Nitrox",
    category: "OTU/ESOT Tables",
    code: "NIA15",
    description: "Nitrox 40/60 diving tables from ESOT documentation",
  },
  {
    id: "nib15-esot",
    name: "Nitrox 35/75 (ESOT)",
    type: "Nitrox",
    category: "OTU/ESOT Tables",
    code: "NIB15",
    description: "Nitrox 35/75 diving tables from ESOT documentation",
  },
  {
    id: "box15",
    name: "ESOT Dry or Wet Bell Tables",
    type: "Wet/Dry Bell",
    category: "OTU/ESOT Tables",
    code: "BOX15",
    description: "Decompression tables for dry or wet bell diving operations",
  },

  // WET OR DRY BELL AIR/OXYGEN TABLES
  {
    id: "box15-bell",
    name: "Wet or Dry Bell Air/Oxygen Tables",
    type: "Wet/Dry Bell",
    category: "Wet or Dry Bell Air/Oxygen Tables",
    code: "BOX15",
    description: "Air and oxygen decompression schedules for bell diving",
  },

  // TREATMENT TABLES
  {
    id: "comex-cx12",
    name: "COMEX Treatment Table CX 12",
    type: "Treatment",
    category: "Treatment Tables",
    description: "COMEX hyperbaric treatment table CX 12 for decompression sickness",
  },
  {
    id: "usn-table5",
    name: "US Navy Oxygen Treatment Table 5",
    type: "Treatment",
    category: "Treatment Tables",
    description: "US Navy standard oxygen recompression treatment table 5",
  },
  {
    id: "usn-table6",
    name: "US Navy Oxygen Treatment Table 6",
    type: "Treatment",
    category: "Treatment Tables",
    description: "US Navy standard oxygen recompression treatment table 6",
  },
  {
    id: "comex-cx30",
    name: "COMEX Treatment Table CX 30",
    type: "Treatment",
    category: "Treatment Tables",
    description: "COMEX hyperbaric treatment table CX 30 for severe cases",
  },
  {
    id: "air-treat-1a",
    name: "Air Treatment Table 1A",
    type: "Treatment",
    category: "Treatment Tables",
    description: "Air-based hyperbaric treatment table 1A",
  },
  {
    id: "air-treat-2a",
    name: "Air Treatment Table 2A",
    type: "Treatment",
    category: "Treatment Tables",
    description: "Air-based hyperbaric treatment table 2A",
  },
  {
    id: "air-treat-3",
    name: "Air Treatment Table 3",
    type: "Treatment",
    category: "Treatment Tables",
    description: "Air-based hyperbaric treatment table 3",
  },
  {
    id: "air-treat-4",
    name: "Air Treatment Table 4",
    type: "Treatment",
    category: "Treatment Tables",
    description: "Air-based hyperbaric treatment table 4",
  },
];

export default function Tables() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredTables = diveTablesData.filter((table) => {
    const matchesSearch =
      table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      table.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (table.code?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesType = !selectedType || table.type === selectedType;
    return matchesSearch && matchesType;
  });

  const groupedTables = filteredTables.reduce(
    (acc, table) => {
      if (!acc[table.category]) {
        acc[table.category] = [];
      }
      acc[table.category].push(table);
      return acc;
    },
    {} as Record<string, DiveTable[]>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      {/* Page Header */}
      <section className="py-12 px-4 bg-white border-b border-border">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Dive Tables Index
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse all dive tables organized by type and category. Each table
            includes links to relevant supporting information, emergency
            procedures, and treatment protocols.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-white border-b border-border sticky top-16 z-40">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tables by name or description..."
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <button
                onClick={() => setSelectedType(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  !selectedType
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType("No Stops Air")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedType === "No Stops Air"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                No Stops Air
              </button>
              <button
                onClick={() => setSelectedType("Standard Air")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedType === "Standard Air"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Standard Air
              </button>
              <button
                onClick={() => setSelectedType("SurD O2")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedType === "SurD O2"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                SurD O2
              </button>
              <button
                onClick={() => setSelectedType("Backup Air")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedType === "Backup Air"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Backup Air
              </button>
              <button
                onClick={() => setSelectedType("Nitrox")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedType === "Nitrox"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Nitrox
              </button>
              <button
                onClick={() => setSelectedType("EAD")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedType === "EAD"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                EAD
              </button>
              <button
                onClick={() => setSelectedType("Wet/Dry Bell")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedType === "Wet/Dry Bell"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Wet/Dry Bell
              </button>
              <button
                onClick={() => setSelectedType("Treatment")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedType === "Treatment"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Treatment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tables Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {Object.keys(groupedTables).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No tables found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedTables).map(([category, tables]) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                    {category}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    {tables.map((table) => (
                      <Link
                        key={table.id}
                        to={`/tables/${table.id}`}
                        className="group p-6 bg-white rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span
                              className={`inline-block px-2 py-1 text-xs font-semibold rounded mb-2 ${
                                table.type === "No Stops Air"
                                  ? "bg-blue-100 text-blue-700"
                                  : table.type === "Standard Air"
                                    ? "bg-cyan-100 text-cyan-700"
                                    : table.type === "SurD O2"
                                      ? "bg-orange-100 text-orange-700"
                                      : table.type === "Backup Air"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : table.type === "Nitrox"
                                          ? "bg-green-100 text-green-700"
                                          : table.type === "EAD"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : table.type === "Wet/Dry Bell"
                                              ? "bg-indigo-100 text-indigo-700"
                                              : "bg-red-100 text-red-700"
                              }`}
                            >
                              {table.type}
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {table.name}
                        </h3>

                        {table.code && (
                          <div className="text-xs font-mono font-bold text-primary mb-2">
                            Code: {table.code}
                          </div>
                        )}

                        <p className="text-sm text-muted-foreground mb-4">
                          {table.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-xs font-medium text-muted-foreground">
                            {table.type === "treatment" || table.type === "reference"
                              ? "Reference Table"
                              : "Dive Table"}
                          </span>
                          <span className="text-xs text-primary font-semibold group-hover:underline">
                            View →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Supporting Links Section */}
      <section className="py-12 px-4 bg-white border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Related Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/supporting-info"
              className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <h3 className="font-bold text-foreground mb-2 group-hover:text-primary">
                Supporting Information
              </h3>
              <p className="text-sm text-muted-foreground">
                Learn about limits, PPO2 values, EAD calculations, and safety
                rules.
              </p>
            </Link>

            <Link
              to="/table-selection"
              className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <h3 className="font-bold text-foreground mb-2 group-hover:text-primary">
                Table Selection Tool
              </h3>
              <p className="text-sm text-muted-foreground">
                Use interactive logic trees to find the right table for your
                dive.
              </p>
            </Link>

            <Link
              to="/emergency-procedures"
              className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <h3 className="font-bold text-foreground mb-2 group-hover:text-primary">
                Emergency Procedures
              </h3>
              <p className="text-sm text-muted-foreground">
                Access emergency response protocols and decision trees.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
