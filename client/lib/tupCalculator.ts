import { DecompressionRecord, EXPECTED_HEADERS } from './tupTypes';

export const IMCA_TUP_LIMITS: { [key: number]: number } = {
  9: 240, 12: 240, 15: 240, 18: 240, 19: 240, 20: 240, 21: 240, 22: 240,
  23: 180, 24: 180, 25: 180, 26: 180, 27: 180, 28: 180, 29: 180, 30: 180,
  31: 180, 32: 180, 33: 180, 36: 180, 39: 180, 42: 180, 45: 180, 48: 180, 51: 180
};

export const LISTED_IMCA_DEPTHS = Object.keys(IMCA_TUP_LIMITS).map(Number).sort((a, b) => a - b);

const PO2_THRESHOLDS = { green_max: 1.39, amber_min: 1.40, amber_max: 1.49 };

type DecompressionStop = {
  column: keyof DecompressionRecord;
  depth: number;
  o2: number;
};

export const DECOMPRESSION_STOPS: DecompressionStop[] = [
  { column: '24 Air', depth: 24, o2: 21 },
  { column: '21 Air', depth: 21, o2: 21 },
  { column: '18 Air', depth: 18, o2: 21 },
  { column: '15 Air TUP', depth: 15, o2: 21 },
  { column: '15Oxygen', depth: 15, o2: 100 },
  { column: '12 Air', depth: 12, o2: 21 },
  { column: '12Oxygen', depth: 12, o2: 100 },
  { column: '9 Air', depth: 9, o2: 21 },
  { column: '9Oxygen', depth: 9, o2: 100 },
  { column: '6 Air', depth: 6, o2: 21 },
  { column: '6Oxygen', depth: 6, o2: 100 },
  { column: '3 Air', depth: 3, o2: 21 },
  { column: '3Oxygen', depth: 3, o2: 100 },
];

export const round = (x: number, dp: number): number => {
  const f = Math.pow(10, dp);
  return Math.round((x + Number.EPSILON) * f) / f;
};

export const getPO2BgClass = (val: number): string => {
  if (val <= PO2_THRESHOLDS.green_max) return 'bg-ok-bg';
  if (val >= PO2_THRESHOLDS.amber_min && val <= PO2_THRESHOLDS.amber_max) return 'bg-warn-bg';
  return 'bg-bad-bg';
};

export const nextIMCADeeper = (d: number): number | null => {
  for (const depth of LISTED_IMCA_DEPTHS) {
    if (d <= depth) return depth;
  }
  return null;
};

export const nextDATADeeper = (d: number, dataDepths: number[]): number | null => {
  for (const depth of dataDepths) {
    if (d <= depth + 1e-9) {
      return depth;
    }
  }
  return null;
};

export function calculateExposure(depth: number, o2Percent: number, time: number): { otu: number; esot: number } {
  if (time <= 0 || depth < 0 || o2Percent <= 0) {
    return { otu: 0, esot: 0 };
  }

  const pO2 = (o2Percent / 100) * (depth / 10 + 1);
  const otuFactor = pO2 > 0.5 ? Math.pow((pO2 - 0.5) / 0.5, 0.833) : 0;
  const otu = time * otuFactor;
  const esot = time * Math.pow(pO2, 2.285);

  return { otu, esot };
}

export function parseCSV(text: string): string[][] {
  if (!text) return [];
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQ = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const n = text[i + 1];
    if (inQ) {
      if (c === '"' && n === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQ = false;
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQ = true;
      } else if (c === ',') {
        row.push(field);
        field = '';
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && n === '\n') i++;
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else {
        field += c;
      }
    }
  }
  if (field !== '' || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter(r => r.length && r.some(v => String(v).trim() !== ''));
}

export function toRecords(rows: string[][]): DecompressionRecord[] {
  if (rows.length === 0) return [];
  const headers = rows[0].map(h => (h || '').trim());
  const records: DecompressionRecord[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const record: DecompressionRecord = {};

    EXPECTED_HEADERS.forEach((header, idx) => {
      const val = row[idx] ? (row[idx] || '').trim() : '';
      if (header === 'Depth(m/sw)' || header === 'BottomTime Min' || header === 'Time till(1st stop Min)' ||
          header === 'Total DecoTime Min' || header === 'TotalOTU' || header === 'TotalESOT') {
        record[header] = val === '' ? 0 : parseFloat(val);
      } else {
        record[header] = val;
      }
    });

    const lastVal = row[row.length - 1]?.trim() || '';
    record._flag = lastVal === '1' ? 1 : lastVal === '2' ? 2 : lastVal === '3' ? 3 : null;
    record._snapped = false;

    records.push(record);
  }

  return records;
}

export function filterByDepth(depth: number, records: DecompressionRecord[], dataDepths: number[]): { usedDepth: number; snapped: boolean; records: DecompressionRecord[] } {
  const nextDeeper = nextDATADeeper(depth, dataDepths);
  if (nextDeeper === null) {
    return { usedDepth: depth, snapped: false, records: [] };
  }

  const filtered = records.filter(r => Math.abs(r['Depth(m/sw)'] - nextDeeper) < 1e-6);
  const snapped = Math.abs(nextDeeper - depth) > 0.01;

  return { usedDepth: nextDeeper, snapped, records: filtered };
}
