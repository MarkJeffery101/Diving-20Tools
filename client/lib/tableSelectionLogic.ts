import { getAvailableDepths } from "@/lib/tableHeaders";

export interface RecommendationResult {
  tableCode: string;
  tableTitle: string;
  recommendedDepth: number;
  description: string;
  warnings?: string[];
}

export interface DiveProfile {
  technique: string; // "no-stop" | "in-water" | "surface-oxygen" | "nitrox"
  gasType?: string; // "air" | "nitrox-nia" | "nitrox-nib" (optional for no-stop)
  plannedDepth: number;
  bottomTime: number;
  seaStateRisk?: boolean;
  bellAvailable?: boolean;
}

// Decision tree mapping
const techniqueToTables: Record<string, Record<string, string[]>> = {
  "no-stop": {
    air: ["SIL15", "H2SIL15", "H4SIL15", "ND15"],
    default: ["SIL15", "H2SIL15", "H4SIL15", "ND15"],
  },
  "in-water": {
    air: ["SIL15", "H2SIL15", "H4SIL15", "BOX15", "SAB15"],
    "nitrox-nia": ["NIA15", "H2NIA15", "H4NIA15"],
    "nitrox-nib": ["NIB15", "H2NIB15", "H4NIB15"],
    default: ["SIL15", "H2SIL15", "H4SIL15", "BOX15", "SAB15"],
  },
  "surface-oxygen": {
    air: ["SOX15", "HSOX15", "BOX15", "SAB15"],
    "nitrox-nia": ["NIA15", "H2NIA15", "H4NIA15"],
    "nitrox-nib": ["NIB15", "H2NIB15", "H4NIB15"],
    default: ["SOX15", "HSOX15", "BOX15"],
  },
  nitrox: {
    "nitrox-nia": ["NIA15", "H2NIA15", "H4NIA15"],
    "nitrox-nib": ["NIB15", "H2NIB15", "H4NIB15"],
    default: ["NIA15", "H2NIA15", "H4NIA15", "NIB15", "H2NIB15", "H4NIB15"],
  },
};

// Table descriptions
const tableDescriptions: Record<string, string> = {
  SIL15: "Standard Air, Repetitive Interval 12 Hours - In-water decompression",
  H2SIL15: "Standard Air, Repetitive Interval 2 Hours - In-water decompression",
  H4SIL15: "Standard Air, Repetitive Interval 4 Hours - In-water decompression",
  SOX15: "Surface Decompression with Oxygen, 12-hour interval - Requires chamber",
  HSOX15: "Surface Decompression with Oxygen, 4-hour interval - Requires chamber",
  SAB15: "Backup Air Table, 12-hour interval - For oxygen system failure only",
  HSAB15: "Backup Air Table, 4-hour interval - For oxygen system failure only",
  BOX15: "Bell Air/Oxygen Table, 12-hour interval - Requires diving bell",
  NIA15: "Nitrox 40/60, Repetitive Interval 12 Hours - In-water decompression",
  H2NIA15: "Nitrox 40/60, Repetitive Interval 2 Hours - In-water decompression",
  H4NIA15: "Nitrox 40/60, Repetitive Interval 4 Hours - In-water decompression",
  NIB15: "Nitrox 35/65, Repetitive Interval 12 Hours - In-water decompression",
  H2NIB15: "Nitrox 35/65, Repetitive Interval 2 Hours - In-water decompression",
  H4NIB15: "Nitrox 35/65, Repetitive Interval 4 Hours - In-water decompression",
  ND15: "No-Stop Limits Table - Simple air depth/time lookup",
};

/**
 * Find the next available depth in a table that is >= requested depth
 */
function findNextAvailableDepth(
  tableCode: string,
  requestedDepth: number,
): number | null {
  const availableDepths = getAvailableDepths(tableCode);
  if (!availableDepths || availableDepths.length === 0) {
    return null;
  }

  // Find the smallest depth that is >= requested depth
  const nextDepth = availableDepths.find((d) => d >= requestedDepth);
  return nextDepth || availableDepths[availableDepths.length - 1]; // Return deepest if none match
}

/**
 * Get recommended table based on dive profile
 */
export function getTableRecommendation(
  profile: DiveProfile,
): RecommendationResult {
  const warnings: string[] = [];

  // Get candidate tables based on technique and gas type
  const candidateTables =
    techniqueToTables[profile.technique]?.[profile.gasType || "default"] ||
    techniqueToTables[profile.technique]?.default ||
    ["SIL15"];

  // Calculate EAD if nitrox dive
  let depthForTableSelection = profile.plannedDepth;
  let eadDepth: number | undefined;
  let o2Percentage: number | undefined;

  if (
    profile.gasType === "nitrox-nia" ||
    profile.gasType === "nitrox-nib"
  ) {
    o2Percentage = getO2PercentageForNitroxType(profile.gasType);
    eadDepth = calculateEAD(profile.plannedDepth, o2Percentage);
    depthForTableSelection = eadDepth;

    warnings.push(
      `Diving depth: ${profile.plannedDepth}m | O₂: ${o2Percentage}% | EAD: ${eadDepth}m`,
    );
  }

  // Filter and score tables based on profile
  let selectedTable = candidateTables[0];
  let selectedDepth: number | null = null;

  // Try to find a table with matching depth
  for (const table of candidateTables) {
    const depth = findNextAvailableDepth(table, depthForTableSelection);
    if (depth) {
      selectedTable = table;
      selectedDepth = depth;

      if (depth > depthForTableSelection) {
        if (eadDepth) {
          warnings.push(
            `EAD ${depthForTableSelection}m not available in ${table}. Using ${depth}m instead.`,
          );
        } else {
          warnings.push(
            `Requested depth ${depthForTableSelection}m not available in ${table}. Using ${depth}m instead.`,
          );
        }
      }
      break;
    }
  }

  // Fallback if no depth found
  if (!selectedDepth) {
    selectedDepth = 30;
    warnings.push(
      "Could not find suitable depth in recommended tables. Using 30m as default.",
    );
  }

  // Add special warnings based on conditions
  if (
    profile.seaStateRisk &&
    (selectedTable === "SIL15" || selectedTable.startsWith("BOX"))
  ) {
    warnings.push(
      "Wave height >0.5m detected. Consider SOX15 for safer surface operations.",
    );
  }

  if (profile.technique === "surface-oxygen" && !profile.bellAvailable) {
    if (selectedTable === "BOX15") {
      warnings.push("BOX15 requires a diving bell. Switching to SOX15.");
      selectedTable = "SOX15";
    }
  }

  // Special handling for nitrox depth limits
  if (
    selectedTable.includes("NIA") ||
    selectedTable.includes("NIB")
  ) {
    if (selectedDepth > 30) {
      warnings.push(
        "Nitrox depth exceeds recommended operational limit of 30m. Consider deeper air tables instead.",
      );
    }
  }

  return {
    tableCode: selectedTable,
    tableTitle: tableDescriptions[selectedTable] || selectedTable,
    recommendedDepth: selectedDepth,
    description: tableDescriptions[selectedTable] || selectedTable,
    actualDiveDepth: profile.plannedDepth,
    eadDepth: eadDepth,
    o2Percentage: o2Percentage,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Get all available tables for a technique
 */
export function getTablesForTechnique(technique: string): string[] {
  return Object.values(techniqueToTables[technique] || {}).flat();
}

/**
 * Get all available gas types for a technique
 */
export function getGasTypesForTechnique(technique: string): string[] {
  const gasTypes = Object.keys(techniqueToTables[technique] || {});
  return gasTypes.filter((g) => g !== "default");
}

/**
 * Validate a dive profile
 */
export function validateDiveProfile(profile: DiveProfile): string[] {
  const errors: string[] = [];

  if (profile.plannedDepth < 0 || profile.plannedDepth > 100) {
    errors.push("Depth must be between 0 and 100 meters");
  }

  if (profile.bottomTime < 0 || profile.bottomTime > 600) {
    errors.push("Bottom time must be between 0 and 600 minutes");
  }

  if (!["no-stop", "in-water", "surface-oxygen", "nitrox"].includes(profile.technique)) {
    errors.push("Invalid dive technique");
  }

  return errors;
}
