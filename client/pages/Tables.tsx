import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";

interface DiveTable {
  id: string;
  name: string;
  type: "commercial" | "air" | "nitrox" | "treatment" | "reference";
  description: string;
  category: string;
  code?: string;
}

const diveTablesData: DiveTable[] = [
  // NO-STOP AIR DIVING TABLES
  {
    id: "nd15",
    name: "Air Diving, No-Stop Limits in Minutes",
    type: "air",
    category: "No-Stop Air Diving Tables",
    code: "ND15",
    description:
      "No-decompression stop time limits for air diving at various depths and bottom times",
  },
  {
    id: "lnd15",
    name: "Air Diving, Long No-Stop Limits in Minutes",
    type: "air",
    category: "No-Stop Air Diving Tables",
    code: "LND15",
    description:
      "Extended no-decompression stop limits for longer air diving operations",
  },

  // STANDARD AIR TABLES
  {
    id: "sil15",
    name: "Standard Air Repetitive Interval 12 Hours",
    type: "air",
    category: "Standard Air Tables",
    code: "SIL15",
    description: "Air diving tables with 12-hour repetitive diving intervals",
  },
  {
    id: "h2sil15",
    name: "Standard Air Repetitive Interval 2 Hours",
    type: "air",
    category: "Standard Air Tables",
    code: "H2SIL15",
    description: "Air diving tables with 2-hour repetitive diving intervals",
  },
  {
    id: "h4sil15",
    name: "Standard Air Repetitive Interval 4 Hours",
    type: "air",
    category: "Standard Air Tables",
    code: "H4SIL15",
    description: "Air diving tables with 4-hour repetitive diving intervals",
  },

  // SURFACE/OX TABLES
  {
    id: "sox15",
    name: "Surface Decompression with Oxygen Repetitive Interval 12 Hours",
    type: "commercial",
    category: "Surface/OX Tables",
    code: "SOX15",
    description:
      "Surface decompression using oxygen with 12-hour repetitive diving intervals",
  },
  {
    id: "hsox15",
    name: "Surface Decompression with Oxygen Repetitive Interval 4 Hours",
    type: "commercial",
    category: "Surface/OX Tables",
    code: "HSOX15",
    description:
      "Surface decompression using oxygen with 4-hour repetitive diving intervals",
  },

  // BACKUP AIR TABLES
  {
    id: "sab15",
    name: "Backup Air Repetitive Interval 12 Hours",
    type: "commercial",
    category: "Backup Air Tables",
    code: "SAB15",
    description: "Backup air diving tables with 12-hour repetitive intervals",
  },
  {
    id: "hsab15",
    name: "Backup Air Repetitive Interval 4 Hours",
    type: "commercial",
    category: "Backup Air Tables",
    code: "HSAB15",
    description: "Backup air diving tables with 4-hour repetitive intervals",
  },

  // NITROX NO-STOP TABLES
  {
    id: "ndnia15",
    name: "Nitrox 40/60 Diving, No-Stop Limits in Minutes",
    type: "nitrox",
    category: "Nitrox Tables",
    code: "NDNIA15",
    description:
      "No-decompression stop limits for Nitrox 40/60 (40% O2 / 60% N2)",
  },
  {
    id: "ndnib15",
    name: "Nitrox 35/65 Diving, No-Stop Limits in Minutes",
    type: "nitrox",
    category: "Nitrox Tables",
    code: "NDNIB15",
    description:
      "No-decompression stop limits for Nitrox 35/65 (35% O2 / 65% N2)",
  },

  // NITROX REPETITIVE TABLES
  {
    id: "nia15",
    name: "Nitrox 40/60 Repetitive Interval 12 Hours",
    type: "nitrox",
    category: "Nitrox Tables",
    code: "NIA15",
    description: "Nitrox 40/60 diving tables with 12-hour repetitive intervals",
  },
  {
    id: "nia2-3",
    name: "Nitrox 40/60 Repetitive Interval 2 Hours (2-3 minutes)",
    type: "nitrox",
    category: "Nitrox Tables",
    code: "NIA 2-3",
    description: "Nitrox 40/60 diving tables with 2-hour repetitive intervals",
  },
  {
    id: "nia2-6",
    name: "Nitrox 40/60 Repetitive Interval 2 Hours (2-6 minutes)",
    type: "nitrox",
    category: "Nitrox Tables",
    code: "NIA 2-6",
    description: "Nitrox 40/60 diving tables with 2-hour repetitive intervals",
  },
  {
    id: "h2nia15",
    name: "Nitrox 40/60 Repetitive Interval 2 Hours",
    type: "nitrox",
    category: "Nitrox Tables",
    code: "H2NIA15",
    description: "Nitrox 40/60 diving tables with 2-hour repetitive intervals",
  },
  {
    id: "nib15",
    name: "Nitrox 35/65 Repetitive Interval 12 Hours",
    type: "nitrox",
    category: "Nitrox Tables",
    code: "NIB15",
    description: "Nitrox 35/65 diving tables with 12-hour repetitive intervals",
  },
  {
    id: "h2nib15",
    name: "Nitrox 35/65 Repetitive Interval 2 Hours",
    type: "nitrox",
    category: "Nitrox Tables",
    code: "H2NIB15",
    description: "Nitrox 35/65 diving tables with 2-hour repetitive intervals",
  },
  {
    id: "h4nib15",
    name: "Nitrox 35/65 Repetitive Interval 4 Hours",
    type: "nitrox",
    category: "Nitrox Tables",
    code: "H4NIB15",
    description: "Nitrox 35/65 diving tables with 4-hour repetitive intervals",
  },

  // NITROX EAD TABLES
  {
    id: "ead-40",
    name: "Nitrox 40% O2 / 60% N2 - Equivalent Air Depth",
    type: "nitrox",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 40% oxygen mixture",
  },
  {
    id: "ead-39",
    name: "Nitrox 39% O2 / 61% N2 - Equivalent Air Depth",
    type: "nitrox",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 39% oxygen mixture",
  },
  {
    id: "ead-38",
    name: "Nitrox 38% O2 / 62% N2 - Equivalent Air Depth",
    type: "nitrox",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 38% oxygen mixture",
  },
  {
    id: "ead-37",
    name: "Nitrox 37% O2 / 63% N2 - Equivalent Air Depth",
    type: "nitrox",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 37% oxygen mixture",
  },
  {
    id: "ead-36",
    name: "Nitrox 36% O2 / 64% N2 - Equivalent Air Depth",
    type: "nitrox",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 36% oxygen mixture",
  },
  {
    id: "ead-35",
    name: "Nitrox 35% O2 / 65% N2 - Equivalent Air Depth",
    type: "nitrox",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 35% oxygen mixture",
  },
  {
    id: "ead-34",
    name: "Nitrox 34% O2 / 66% N2 - Equivalent Air Depth",
    type: "nitrox",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 34% oxygen mixture",
  },
  {
    id: "ead-33",
    name: "Nitrox 33% O2 / 67% N2 - Equivalent Air Depth",
    type: "nitrox",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 33% oxygen mixture",
  },
  {
    id: "ead-32",
    name: "Nitrox 32% O2 / 68% N2 - Equivalent Air Depth",
    type: "nitrox",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 32% oxygen mixture",
  },
  {
    id: "ead-31",
    name: "Nitrox 31% O2 / 69% N2 - Equivalent Air Depth",
    type: "nitrox",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 31% oxygen mixture",
  },
  {
    id: "ead-30",
    name: "Nitrox 30% O2 / 70% N2 - Equivalent Air Depth",
    type: "nitrox",
    category: "Nitrox Equivalent Air Depth (EAD) Tables",
    description: "EAD conversion table for Nitrox 30% oxygen mixture",
  },

  // OTU/ESOT TABLES
  {
    id: "sox15-esot",
    name: "Surface Decompression with Oxygen (ESOT)",
    type: "commercial",
    category: "OTU/ESOT Tables",
    code: "SOX15",
    description: "Surface decompression tables using oxygen",
  },
  {
    id: "nia15-esot",
    name: "Nitrox 40/60 (ESOT)",
    type: "nitrox",
    category: "OTU/ESOT Tables",
    code: "NIA15",
    description: "Nitrox 40/60 diving tables from ESOT documentation",
  },
  {
    id: "nib15-esot",
    name: "Nitrox 35/75 (ESOT)",
    type: "nitrox",
    category: "OTU/ESOT Tables",
    code: "NIB15",
    description: "Nitrox 35/75 diving tables from ESOT documentation",
  },
  {
    id: "box15",
    name: "ESOT Dry or Wet Bell Tables",
    type: "commercial",
    category: "OTU/ESOT Tables",
    code: "BOX15",
    description: "Decompression tables for dry or wet bell diving operations",
  },

  // WET OR DRY BELL AIR/OXYGEN TABLES
  {
    id: "box15-bell",
    name: "Wet or Dry Bell Air/Oxygen Tables",
    type: "commercial",
    category: "Wet or Dry Bell Air/Oxygen Tables",
    code: "BOX15",
    description: "Air and oxygen decompression schedules for bell diving",
  },

  // TREATMENT TABLES
  {
    id: "comex-cx12",
    name: "COMEX Treatment Table CX 12",
    type: "treatment",
    category: "Treatment Tables",
    description: "COMEX hyperbaric treatment table CX 12 for decompression sickness",
  },
  {
    id: "usn-table5",
    name: "US Navy Oxygen Treatment Table 5",
    type: "treatment",
    category: "Treatment Tables",
    description: "US Navy standard oxygen recompression treatment table 5",
  },
  {
    id: "usn-table6",
    name: "US Navy Oxygen Treatment Table 6",
    type: "treatment",
    category: "Treatment Tables",
    description: "US Navy standard oxygen recompression treatment table 6",
  },
  {
    id: "comex-cx30",
    name: "COMEX Treatment Table CX 30",
    type: "treatment",
    category: "Treatment Tables",
    description: "COMEX hyperbaric treatment table CX 30 for severe cases",
  },
  {
    id: "air-treat-1a",
    name: "Air Treatment Table 1A",
    type: "treatment",
    category: "Treatment Tables",
    description: "Air-based hyperbaric treatment table 1A",
  },
  {
    id: "air-treat-2a",
    name: "Air Treatment Table 2A",
    type: "treatment",
    category: "Treatment Tables",
    description: "Air-based hyperbaric treatment table 2A",
  },
  {
    id: "air-treat-3",
    name: "Air Treatment Table 3",
    type: "treatment",
    category: "Treatment Tables",
    description: "Air-based hyperbaric treatment table 3",
  },
  {
    id: "air-treat-4",
    name: "Air Treatment Table 4",
    type: "treatment",
    category: "Treatment Tables",
    description: "Air-based hyperbaric treatment table 4",
  },

  // REFERENCE TABLES
  {
    id: "oxygen-limits",
    name: "NOAA Oxygen Exposure Limits",
    type: "reference",
    category: "Reference Tables",
    description:
      "NOAA updated oxygen exposure limits (DMAC 35 from DCD/NDC Addendum 2023)",
  },
  {
    id: "hes-depth",
    name: "HES Depth Table",
    type: "reference",
    category: "Reference Tables",
    description: "Helium-Oxygen-Saturation depth reference table",
  },
  {
    id: "min-flying",
    name: "Minimum Time Between Diving and Flying",
    type: "reference",
    category: "Reference Tables",
    description:
      "Guidelines for minimum surface intervals before flying after diving",
  },
  {
    id: "pneumofathometer",
    name: "Pneumofathometer Depth Correction Factor",
    type: "reference",
    category: "Reference Tables",
    description: "Pressure-to-depth conversion correction factors",
  },
];

export default function Tables() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredTables = diveTablesData.filter((table) => {
    const matchesSearch =
      table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      table.description.toLowerCase().includes(searchTerm.toLowerCase());
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
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !selectedType
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setSelectedType("commercial")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === "commercial"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Commercial
              </button>
              <button
                onClick={() => setSelectedType("air")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === "air"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Air
              </button>
              <button
                onClick={() => setSelectedType("nitrox")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === "nitrox"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Nitrox
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
                                table.type === "commercial"
                                  ? "bg-orange-100 text-orange-700"
                                  : table.type === "air"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-green-100 text-green-700"
                              }`}
                            >
                              {table.type.charAt(0).toUpperCase() +
                                table.type.slice(1)}
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {table.name}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4">
                          {table.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-xs font-medium text-muted-foreground">
                            Max Depth: {table.maxDepth}m
                          </span>
                          <span className="text-xs text-primary font-semibold group-hover:underline">
                            View Table →
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
