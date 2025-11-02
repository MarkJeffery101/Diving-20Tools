export interface ColumnHeader {
  label: string;
  sub?: string[];
}

export interface TableHeaderConfig {
  title: string;
  columns: ColumnHeader[];
}

export const tableHeaderConfigs: Record<string, TableHeaderConfig> = {
  // Standard Air Tables and Nitrox Decompression Tables
  SIL15: {
    title: "SIL15 - Standard Air, Repetitive Interval 12 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: ["24", "21", "18", "15", "12", "9", "6", "3"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },
  H2SIL15: {
    title: "H2SIL15 - Standard Air, Repetitive Interval 2 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: ["24", "21", "18", "15", "12", "9", "6", "3"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },
  H4SIL15: {
    title: "H4SIL15 - Standard Air, Repetitive Interval 4 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: ["24", "21", "18", "15", "12", "9", "6", "3"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },

  // Surface/OX Tables
  SOX15: {
    title: "SOX15 - Surface Decompression with Oxygen, Repetitive Interval 12 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "In Water Stops (metres)",
        sub: ["21 air", "18 air", "15 air", "12 air", "9 air", "12 ox"],
      },
      {
        label: "Stops in Deco Chamber",
        sub: ["9 air", "9 ox", "6 air", "6 ox", "3 air", "3 ox"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },
  HSOX15: {
    title: "HSOX15 - Surface Decompression with Oxygen, Repetitive Interval 4 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "In Water Stops (metres)",
        sub: ["21 air", "18 air", "15 air", "12 air", "9 air", "12 ox"],
      },
      {
        label: "Stops in Deco Chamber",
        sub: ["9 air", "9 ox", "6 air", "6 ox", "3 air", "3 ox"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },

  // Backup Air Tables
  SAB15: {
    title: "SAB15 - Backup Air, Repetitive Interval 12 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "In Water Stops (metres)",
        sub: ["21", "18", "15", "12", "9", "18"],
      },
      {
        label: "Stops in Deco Chamber",
        sub: ["15", "12", "9", "6", "3"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },
  HSAB15: {
    title: "HSAB15 - Backup Air, Repetitive Interval 4 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "In Water Stops (metres)",
        sub: ["21", "18", "15", "12", "9", "18"],
      },
      {
        label: "Stops in Deco Chamber",
        sub: ["15", "12", "9", "6", "3"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },

  // Nitrox Tables (NIA/NIB variations)
  NIA15: {
    title: "NIA15 - Nitrox 40/60, Repetitive Interval 12 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: ["24", "21", "18", "15", "12", "9", "6", "3"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },
  NIA2_3: {
    title: "NIA2_3 - Nitrox 40/60, Repetitive Interval 2 Hours (Last Stop = 3 m/sw)",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: ["Last Stop m/sw", "*", "*", "12", "9", "6", "3"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },
  NIA2_6: {
    title: "NIA2_6 - Nitrox 40/60, Repetitive Interval 2 Hours (Last Stop = 6 m/sw)",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: ["Last Stop m/sw", "*", "*", "12", "9", "6", "3"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },
  H2NIA15: {
    title: "H2NIA15 - Nitrox 40/60, Repetitive Interval 2 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: ["24", "21", "18", "15", "12", "9", "6", "3"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },
  H4NIA15: {
    title: "H4NIA15 - Nitrox 40/60, Repetitive Interval 4 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: ["24", "21", "18", "15", "12", "9", "6", "3"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },
  NIB15: {
    title: "NIB15 - Nitrox 35/65, Repetitive Interval 12 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: ["24", "21", "18", "15", "12", "9", "6", "3"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },
  H2NIB15: {
    title: "H2NIB15 - Nitrox 35/65, Repetitive Interval 2 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: ["24", "21", "18", "15", "12", "9", "6", "3"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },
  H4NIB15: {
    title: "H4NIB15 - Nitrox 35/65, Repetitive Interval 4 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: ["24", "21", "18", "15", "12", "9", "6", "3"],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },

  // OTU & ESOT Repetitive Times - SOX15
  SOX15_OTU: {
    title: "SOX15 - Surface OX Repetitive Times",
    columns: [
      { label: "Dive Time\n(min)" },
      {
        label: "Repet Interval 4h",
        sub: ["OTU", "ESOT"],
      },
      {
        label: "Repet Interval 12h",
        sub: ["OTU", "ESOT"],
      },
    ],
  },

  // OTU & ESOT Repetitive Times - NIA15
  NIA15_OTU: {
    title: "NIA15 - Nitrox 40/60 Repetitive Times",
    columns: [
      { label: "Dive Time\n(min)" },
      {
        label: "Repet Interval 2h",
        sub: ["OTU", "ESOT"],
      },
      {
        label: "Repet Interval 4h",
        sub: ["OTU", "ESOT"],
      },
      {
        label: "Repet Interval 12h",
        sub: ["OTU", "ESOT"],
      },
    ],
  },

  // OTU & ESOT Repetitive Times - NIB15
  NIB15_OTU: {
    title: "NIB15 - Nitrox 35/65 Repetitive Times",
    columns: [
      { label: "Dive Time\n(min)" },
      {
        label: "Repet Interval 2h",
        sub: ["OTU", "ESOT"],
      },
      {
        label: "Repet Interval 4h",
        sub: ["OTU", "ESOT"],
      },
      {
        label: "Repet Interval 12h",
        sub: ["OTU", "ESOT"],
      },
    ],
  },

  // OTU & ESOT Repetitive Times - BOX15
  BOX15_OTU: {
    title: "BOX15 - Bell Air/Oxygen Repetitive Times",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "OTU" },
      { label: "ESOT" },
    ],
  },

  // Wet or Dry Bell Tables
  BOX15: {
    title: "BOX15 - Wet or Dry Bell Air/Oxygen Tables, Repetitive Interval 12 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: [
          "24 air",
          "21 air",
          "18 air",
          "15 air",
          "12 air",
          "9 ox",
          "6 air",
          "6 ox",
          "6 air",
          "6 ox",
          "6 air",
          "6 ox",
        ],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },
  H2BOX15: {
    title: "H2BOX15 - Wet or Dry Bell Air/Oxygen Tables, Repetitive Interval 2 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: [
          "24 air",
          "21 air",
          "18 air",
          "15 air",
          "12 air",
          "9 ox",
          "6 air",
          "6 ox",
          "6 air",
          "6 ox",
          "6 air",
          "6 ox",
        ],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },
  H4BOX15: {
    title: "H4BOX15 - Wet or Dry Bell Air/Oxygen Tables, Repetitive Interval 4 Hours",
    columns: [
      { label: "Dive Time\n(min)" },
      { label: "Till 1st\nStop" },
      {
        label: "Stop Depth (metres)",
        sub: [
          "24 air",
          "21 air",
          "18 air",
          "15 air",
          "12 air",
          "9 ox",
          "6 air",
          "6 ox",
          "6 air",
          "6 ox",
          "6 air",
          "6 ox",
        ],
      },
      { label: "Tot. Deco Time\n(min)" },
      { label: "Tot.\nOTU" },
      { label: "Tot.\nESOT" },
    ],
  },

  // No-Stop Air Tables (simple headers - no sub-columns needed)
  ND15: {
    title: "ND15 - Air Diving, No-Stop Limits",
    columns: [
      { label: "Depth (metres)" },
      { label: "No-Stop Time (minutes)" },
      { label: "Residual Nitrogen Time (min)" },
    ],
  },
  LND15: {
    title: "LND15 - Air Diving, Extended No-Stop Limits",
    columns: [
      { label: "Depth (metres)" },
      { label: "No-Stop Time (minutes)" },
      { label: "Residual Nitrogen Time (min)" },
    ],
  },

  // Treatment Tables
  CX12: {
    title: "COMEX Table CX 12 - Treatment",
    columns: [
      { label: "Phase" },
      { label: "Depth (metres)" },
      { label: "Time (minutes)" },
      { label: "Gas Mix" },
    ],
  },
  CX30: {
    title: "COMEX Table CX 30 - Treatment",
    columns: [
      { label: "Phase" },
      { label: "Depth (metres)" },
      { label: "Time (minutes)" },
      { label: "Gas Mix" },
    ],
  },
  "USN-T5": {
    title: "US Navy Oxygen Treatment Table 5",
    columns: [
      { label: "Phase" },
      { label: "Depth (metres)" },
      { label: "Time (minutes)" },
      { label: "Gas Mix" },
    ],
  },
  "USN-T6": {
    title: "US Navy Oxygen Treatment Table 6",
    columns: [
      { label: "Phase" },
      { label: "Depth (metres)" },
      { label: "Time (minutes)" },
      { label: "Gas Mix" },
    ],
  },
  "AIR-T1A": {
    title: "Air Treatment Table 1A",
    columns: [
      { label: "Phase" },
      { label: "Depth (metres)" },
      { label: "Time (minutes)" },
      { label: "Gas Mix" },
    ],
  },
  "AIR-T2A": {
    title: "Air Treatment Table 2A",
    columns: [
      { label: "Phase" },
      { label: "Depth (metres)" },
      { label: "Time (minutes)" },
      { label: "Gas Mix" },
    ],
  },
  "AIR-T3": {
    title: "Air Treatment Table 3",
    columns: [
      { label: "Phase" },
      { label: "Depth (metres)" },
      { label: "Time (minutes)" },
      { label: "Gas Mix" },
    ],
  },
};

export function getTableHeader(
  tableCode: string
): TableHeaderConfig | undefined {
  return tableHeaderConfigs[tableCode];
}

// Map of table codes to their available depths
const tableDepthMap: Record<string, number[]> = {
  // Standard Air Tables
  SIL15: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
  H2SIL15: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
  H4SIL15: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],

  // Surface/OX Tables
  SOX15: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
  HSOX15: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
  SOX15_OTU: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],

  // Backup Air Tables
  SAB15: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
  HSAB15: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],

  // Nitrox Tables
  NIA15: [18, 21, 24, 27],
  NIA15_OTU: [18, 21, 24, 27],
  NIA2_3: [21, 23, 25, 27],
  NIA2_6: [21, 23, 25, 27],
  H2NIA15: [18, 21, 24, 27],
  H4NIA15: [18, 21, 24, 27],
  NIB15: [18, 21, 24, 27, 30, 33],
  NIB15_OTU: [18, 21, 24, 27, 30, 33],
  H2NIB15: [18, 21, 24, 27, 30, 33],
  H4NIB15: [18, 21, 24, 27, 30, 33],

  // Wet or Dry Bell Tables
  BOX15: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
  H2BOX15: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
  H4BOX15: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
  BOX15_OTU: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51],
};

export function getAvailableDepths(tableCode: string): number[] | undefined {
  return tableDepthMap[tableCode];
}
