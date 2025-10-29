import Navigation from "@/components/Navigation";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Level2Item {
  name: string;
  code?: string;
  depths?: number[];
}

interface Level1Item {
  name: string;
  tag: string;
  children: Level2Item[];
}

const tablesData: Level1Item[] = [
  {
    name: "No-Stop Limits for Air Diving",
    tag: "No Stops Air",
    children: [
      {
        name: "Air diving, no-stop limits in minutes",
        code: "ND15",
      },
      {
        name: "No-Stop Limits for Air Diving Extended",
        code: "LND15",
      },
    ],
  },
  {
    name: "Standard Air Tables",
    tag: "Standard Air",
    children: [
      {
        name: "Repetitive Interval 12 Hours",
        code: "SIL15",
        depths: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
      },
      {
        name: "Repetitive Interval 2 Hours",
        code: "H2SIL15",
        depths: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
      },
      {
        name: "Repetitive Interval 4 Hours",
        code: "H4SIL15",
        depths: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
      },
    ],
  },
  {
    name: "Surface/OX Tables",
    tag: "SurD O2",
    children: [
      {
        name: "Repetitive Interval 12 Hours",
        code: "SOX15",
        depths: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
      },
      {
        name: "Repetitive Interval 4 Hours",
        code: "HSOX15",
        depths: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
      },
    ],
  },
  {
    name: "Backup Air Tables",
    tag: "Backup Air",
    children: [
      {
        name: "Backup Air – Repetitive Interval 12 Hours",
        code: "SAB15",
        depths: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
      },
      {
        name: "Backup Air – Repetitive Interval 4 Hours",
        code: "HSAB15",
        depths: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
      },
    ],
  },
  {
    name: "Nitrox Decompression Tables",
    tag: "Nitrox",
    children: [
      {
        name: "Nitrox 40/60 Repetitive Interval 12 Hours",
        code: "NIA15",
        depths: [18, 21, 24, 27],
      },
      {
        name: "Nitrox 40/60 Repetitive Interval 2 Hours (2-3)",
        code: "NIA2_3",
        depths: [21, 23, 25, 27],
      },
      {
        name: "Nitrox 40/60 Repetitive Interval 2 Hours (2-6)",
        code: "NIA2_6",
        depths: [21, 23, 25, 27],
      },
      {
        name: "Nitrox 40/60 Repetitive Interval 2 Hours",
        code: "H2NIA15",
        depths: [18, 21, 24, 27],
      },
      {
        name: "Nitrox 40/60 Repetitive Interval 4 Hours",
        code: "H4NIA15",
        depths: [18, 21, 24, 27],
      },
      {
        name: "Nitrox 35/65 Repetitive Interval 12 Hours",
        code: "NIB15",
        depths: [18, 21, 24, 27, 30, 33],
      },
      {
        name: "Nitrox 35/65 Repetitive Interval 2 Hours",
        code: "H2NIB15",
        depths: [18, 21, 24, 27, 30, 33],
      },
      {
        name: "Nitrox 35/65 Repetitive Interval 4 Hours",
        code: "H4NIB15",
        depths: [18, 21, 24, 27, 30, 33],
      },
    ],
  },
  {
    name: "Nitrox Equivalent Air Depth Tables",
    tag: "EAD",
    children: [
      { name: "NITROX 40% O2 / 60% N2", code: "EAD40" },
      { name: "NITROX 39% O2 / 61% N2", code: "EAD39" },
      { name: "NITROX 38% O2 / 62% N2", code: "EAD38" },
      { name: "NITROX 37% O2 / 63% N2", code: "EAD37" },
      { name: "NITROX 36% O2 / 64% N2", code: "EAD36" },
      { name: "NITROX 35% O2 / 65% N2", code: "EAD35" },
      { name: "NITROX 34% O2 / 66% N2", code: "EAD34" },
      { name: "NITROX 33% O2 / 67% N2", code: "EAD33" },
      { name: "NITROX 32% O2 / 68% N2", code: "EAD32" },
      { name: "NITROX 31% O2 / 69% N2", code: "EAD31" },
      { name: "NITROX 30% O2 / 70% N2", code: "EAD30" },
    ],
  },
  {
    name: "Wet or Dry Bell Air/Oxygen Tables",
    tag: "Wet/Dry Bell",
    children: [
      {
        name: "BOX15",
        code: "BOX15",
        depths: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
      },
    ],
  },
  {
    name: "Treatment Tables DCS & AGE",
    tag: "Treatment",
    children: [
      { name: "COMEX Table CX 12", code: "CX12" },
      { name: "COMEX Table CX 30", code: "CX30" },
      { name: "US Navy Oxygen Treatment Table 5", code: "USN-T5" },
      { name: "US Navy Oxygen Treatment Table 6", code: "USN-T6" },
      { name: "Air Treatment Table 1A", code: "AIR-T1A" },
      { name: "Air Treatment Table 2A", code: "AIR-T2A" },
      { name: "Air Treatment Table 3", code: "AIR-T3" },
    ],
  },
];

type ViewLevel = "level1" | "level2" | "level3";

interface BreadcrumbItem {
  label: string;
  level: ViewLevel;
  level1Index?: number;
  level2Index?: number;
}

export default function Tables() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<ViewLevel>("level1");
  const [selectedLevel1Index, setSelectedLevel1Index] = useState<number | null>(
    null
  );
  const [selectedLevel2Index, setSelectedLevel2Index] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "All Tables", level: "level1" },
    ];

    if (
      currentView === "level2" ||
      currentView === "level3" ||
      selectedLevel1Index !== null
    ) {
      const level1 = tablesData[selectedLevel1Index!];
      breadcrumbs.push({
        label: level1.name,
        level: "level2",
        level1Index: selectedLevel1Index!,
      });
    }

    if (
      (currentView === "level3" || selectedLevel2Index !== null) &&
      selectedLevel1Index !== null
    ) {
      const level2 = tablesData[selectedLevel1Index].children[selectedLevel2Index!];
      breadcrumbs.push({
        label: level2.name,
        level: "level3",
        level1Index: selectedLevel1Index,
        level2Index: selectedLevel2Index!,
      });
    }

    return breadcrumbs;
  };

  const handleBreadcrumbClick = (breadcrumb: BreadcrumbItem) => {
    setCurrentView(breadcrumb.level);
    if (breadcrumb.level === "level1") {
      setSelectedLevel1Index(null);
      setSelectedLevel2Index(null);
    } else if (breadcrumb.level === "level2") {
      setSelectedLevel1Index(breadcrumb.level1Index!);
      setSelectedLevel2Index(null);
    }
  };

  const handleLevel1Click = (index: number) => {
    setSelectedLevel1Index(index);
    setCurrentView("level2");
    setSelectedLevel2Index(null);
  };

  const handleLevel2Click = (index: number) => {
    const level2Item = tablesData[selectedLevel1Index!].children[index];
    setSelectedLevel2Index(index);

    if (!level2Item.depths || level2Item.depths.length === 0) {
      // No depths, navigate to table directly using code
      if (level2Item.code) {
        navigate(`/tables/${level2Item.code.toLowerCase()}`);
      }
    } else {
      setCurrentView("level3");
    }
  };

  const handleDepthClick = (depth: number) => {
    const level2Item = tablesData[selectedLevel1Index!].children[selectedLevel2Index!];
    const code = level2Item.code?.toLowerCase() || "";
    navigate(`/tables/${code}?depth=${depth}`);
  };

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      "No Stops Air": "bg-blue-100 text-blue-700",
      "Standard Air": "bg-cyan-100 text-cyan-700",
      "SurD O2": "bg-orange-100 text-orange-700",
      "Backup Air": "bg-yellow-100 text-yellow-700",
      Nitrox: "bg-green-100 text-green-700",
      EAD: "bg-emerald-100 text-emerald-700",
      "Wet/Dry Bell": "bg-indigo-100 text-indigo-700",
      Treatment: "bg-red-100 text-red-700",
    };
    return colors[tag] || "bg-gray-100 text-gray-700";
  };

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
            Browse all dive tables organized by type and category. Navigate
            through table groups, select specific decompression schedules, and
            view depth-specific tables.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="py-4 px-4 bg-white border-b border-border sticky top-16 z-40">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            {getBreadcrumbs().map((breadcrumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <button
                  onClick={() => handleBreadcrumbClick(breadcrumb)}
                  className="text-primary hover:underline font-medium text-sm"
                >
                  {breadcrumb.label}
                </button>
                {idx < getBreadcrumbs().length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Level 1: All Table Groups */}
          {currentView === "level1" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tablesData.map((level1, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLevel1Click(idx)}
                    className="group p-6 rounded-lg border-2 border-border hover:border-primary hover:shadow-lg transition-all text-left bg-white"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getTagColor(level1.tag)}`}
                      >
                        {level1.tag}
                      </span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {level1.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {level1.children.length} table
                      {level1.children.length !== 1 ? "s" : ""}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Level 2: Tables within a Group */}
          {currentView === "level2" && selectedLevel1Index !== null && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {tablesData[selectedLevel1Index].children.map((level2, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLevel2Click(idx)}
                    className="group p-6 rounded-lg border-2 border-border hover:border-primary hover:shadow-lg transition-all text-left bg-white"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getTagColor(tablesData[selectedLevel1Index].tag)}`}
                      >
                        {tablesData[selectedLevel1Index].tag}
                      </span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {level2.name}
                    </h3>
                    {level2.code && (
                      <div className="text-xs font-mono font-bold text-primary mt-2">
                        Code: {level2.code}
                      </div>
                    )}
                    {level2.depths && level2.depths.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {level2.depths.length} depth variant
                        {level2.depths.length !== 1 ? "s" : ""}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Level 3: Depth Variants */}
          {currentView === "level3" &&
            selectedLevel1Index !== null &&
            selectedLevel2Index !== null && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-border p-6 mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {tablesData[selectedLevel1Index].children[selectedLevel2Index]
                      .name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Code:{" "}
                    <span className="font-mono font-bold">
                      {
                        tablesData[selectedLevel1Index].children[
                          selectedLevel2Index
                        ].code
                      }
                    </span>
                  </p>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  {tablesData[selectedLevel1Index].children[
                    selectedLevel2Index
                  ].depths?.map((depth, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDepthClick(depth)}
                      className="p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-ocean-50 transition-all text-center bg-white font-semibold text-foreground hover:text-primary cursor-pointer"
                    >
                      {depth}m
                    </button>
                  ))}
                </div>
              </div>
            )}
        </div>
      </section>
    </div>
  );
}
