import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";

interface DiveTable {
  id: string;
  name: string;
  type: "commercial" | "air" | "nitrox";
  maxDepth: number;
  description: string;
  category: string;
}

const diveTablesData: DiveTable[] = [
  {
    id: "nmdc-1",
    name: "NMDC Table 1",
    type: "commercial",
    maxDepth: 50,
    category: "No-Stop Limits",
    description:
      "No-decompression stop limits for various depths and bottom times",
  },
  {
    id: "nmdc-2",
    name: "NMDC Table 2",
    type: "commercial",
    maxDepth: 50,
    category: "Air Decompression",
    description:
      "Required decompression stop times and depths for air dives",
  },
  {
    id: "nmdc-3",
    name: "NMDC Table 3",
    type: "commercial",
    maxDepth: 100,
    category: "Deep Air Decompression",
    description:
      "Extended decompression schedules for deeper air dives up to 100 meters",
  },
  {
    id: "nmdc-4",
    name: "NMDC Table 4",
    type: "commercial",
    maxDepth: 50,
    category: "Surface Intervals",
    description: "Required surface intervals between consecutive dives",
  },
  {
    id: "nmdc-5",
    name: "NMDC Table 5",
    type: "commercial",
    maxDepth: 130,
    category: "Oxygen Decompression",
    description:
      "Decompression schedules using pure oxygen at shallow depths",
  },
  {
    id: "air-1",
    name: "Air Table 1",
    type: "air",
    maxDepth: 40,
    category: "Recreational No-Stop",
    description: "No-decompression limits for recreational air diving",
  },
  {
    id: "air-2",
    name: "Air Table 2",
    type: "air",
    maxDepth: 40,
    category: "Recreational Decompression",
    description:
      "Decompression stops required for recreational air dives exceeding no-stop times",
  },
  {
    id: "air-3",
    name: "Air Table 3",
    type: "air",
    maxDepth: 60,
    category: "Extended Limits",
    description:
      "Extended no-stop limits for recreational dives to moderate depths",
  },
  {
    id: "nitrox-1",
    name: "Nitrox 32% Table 1",
    type: "nitrox",
    maxDepth: 40,
    category: "No-Stop Limits",
    description:
      "No-decompression stop limits for Nitrox 32% (EAD adjusted)",
  },
  {
    id: "nitrox-2",
    name: "Nitrox 32% Table 2",
    type: "nitrox",
    maxDepth: 40,
    category: "Decompression Schedules",
    description:
      "Required decompression stops for Nitrox 32% dives with extended bottom times",
  },
  {
    id: "nitrox-3",
    name: "Nitrox 40% Table 1",
    type: "nitrox",
    maxDepth: 30,
    category: "No-Stop Limits",
    description:
      "No-decompression stop limits for Nitrox 40% (EAD adjusted)",
  },
  {
    id: "nitrox-4",
    name: "Nitrox MOD Calculator",
    type: "nitrox",
    maxDepth: 60,
    category: "Safety Reference",
    description:
      "Quick reference for Maximum Operating Depth based on PPO2 limits",
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
