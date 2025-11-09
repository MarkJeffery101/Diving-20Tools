export interface DiveInputs {
  maxDepth: string | number;
  o2: string | number;
  diveTime: string | number;
}

export interface DiveOutputs {
  bellDepth: string | number;
  po2: string | number;
  dmac: string | number;
  po2BgClass: string;
  bellmanEsot: string | number;
  diversEsot: string | number;
  bellmanOtu: string | number;
  diversOtu: string | number;
  tableDepth: string | number;
}

export interface DecompressionRecord {
  [key: string]: any;
  'Depth(m/sw)': number;
  'BottomTime Min': number;
  'Time till(1st stop Min)': number;
  'Total DecoTime Min': number;
  'TotalOTU': number;
  'TotalESOT': number;
  _flag?: number | null;
  _snapped?: boolean;
}

export interface SelfTestResult {
  passed: boolean;
  message: string;
}

export const EXPECTED_HEADERS = [
  'Depth(m/sw)',
  'BottomTime Min',
  'Time till(1st stop Min)',
  '24 Air',
  '21 Air',
  '18 Air',
  '15 Air TUP',
  '15Oxygen',
  '12 Air',
  '12Oxygen',
  '9 Air',
  '9Oxygen',
  '6 Air',
  '6Oxygen',
  '3 Air',
  '3Oxygen',
  'Total DecoTime Min',
  'TotalOTU',
  'TotalESOT',
];
