export interface TableRow {
  diveTime: number;
  tillFirstStop: number;
  stopDepths: (number | null)[];
  stopDepthsBlue?: boolean[]; // Track which columns need blue background (for oxygen)
  totalDecoTime: number;
  totalOTU: number;
  totalESOT: number;
  marker?: number; // 2 for bold border, 3 for red background
  repetIntervals?: Array<{otu: number | null, esot: number | null}>; // For OTU/ESOT tables
  o2Percent?: number | null; // Oxygen percentage for gas mix
}

export interface ParsedTableData {
  dvis5Value: number | null;
  rows: TableRow[];
  blueColumns?: boolean[]; // Track which stop depth columns should be blue
  eadValue?: number | null; // Equivalent Air Depth for this depth
  po2Value?: number | null; // Maximum PO2 for this depth
  o2Percent?: number | null; // Oxygen percentage for gas mix (OTU/ESOT tables)
}

// Proper CSV parser that handles quoted fields with commas
function parseCSVLine(line: string): string[] {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Comma outside quotes - field separator
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  // Add the last field
  result.push(current.trim());
  return result;
}

async function parseSox15CSV(
  tableCode: string,
  depth: number
): Promise<ParsedTableData> {
  try {
    const csvPath = `/data/tables/${tableCode}.csv`;
    const response = await fetch(csvPath);
    if (!response.ok) {
      console.error(`Failed to fetch CSV for ${tableCode}`);
      return { dvis5Value: null, rows: [], blueColumns: [] };
    }

    const csvText = await response.text();
    const lines = csvText.trim().split('\n');

    if (lines.length < 2) {
      console.error(`No data found in CSV for ${tableCode}`);
      return { dvis5Value: null, rows: [], blueColumns: [] };
    }

    let dvis5Value: number | null = null;
    const rows: TableRow[] = [];

    // Blue columns for oxygen: indices 5, 7, 9, 11 in the stopDepths array
    // These correspond to: 12 oxygen (col 13), 9 oxygen (col 15), 6 oxygen (col 17), 3 oxygen (col 19)
    const blueColumns = [false, false, false, false, false, false, false, false, false, false, false, false];
    blueColumns[5] = true;  // 12 oxygen
    blueColumns[7] = true;  // 9 oxygen
    blueColumns[9] = true;  // 6 oxygen
    blueColumns[11] = true; // 3 oxygen

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());

      // Skip rows with insufficient columns
      if (values.length < 24) continue;

      // Column 5 (0-based) is Depth (msw)
      const rowDepth = parseInt(values[5]);
      if (isNaN(rowDepth) || rowDepth !== depth) continue;

      // Extract DVIS 5 value from column 3 (0-based) on first matching row
      if (dvis5Value === null) {
        const dvis5 = parseInt(values[3]);
        if (!isNaN(dvis5)) {
          dvis5Value = dvis5;
        }
      }

      // Column 6: Dive Time
      const diveTime = parseInt(values[6]);
      if (isNaN(diveTime)) continue;

      // Column 7: till 1st stop
      const tillFirstStop = parseFloat(values[7]) || 0;

      // Columns 8-19: Stop depths (12 columns)
      const stopDepths: (number | null)[] = [];
      for (let j = 0; j < 12; j++) {
        const val = values[8 + j];
        if (val === '' || val === undefined) {
          stopDepths.push(null);
        } else {
          const num = parseInt(val);
          stopDepths.push(isNaN(num) ? null : num);
        }
      }

      // Column 20: Total deco time
      const totalDecoTime = parseInt(values[20]) || 0;

      // Column 21: Total OTU
      const totalOTU = parseInt(values[21]) || 0;

      // Column 22: Total ESOT
      const totalESOT = parseInt(values[22]) || 0;

      // Column 23: Marker
      let marker: number | undefined;
      if (values.length > 23) {
        const markerValue = values[23].trim();
        if (markerValue === '2' || markerValue === '3') {
          marker = parseInt(markerValue);
        }
      }

      rows.push({
        diveTime,
        tillFirstStop,
        stopDepths,
        stopDepthsBlue: blueColumns,
        totalDecoTime,
        totalOTU,
        totalESOT,
        marker,
      });
    }

    return { dvis5Value, rows, blueColumns };
  } catch (error) {
    console.error(`Error parsing ${tableCode} CSV:`, error);
    return { dvis5Value: null, rows: [], blueColumns: [] };
  }
}

async function parseBox15CSV(
  tableCode: string,
  depth: number
): Promise<ParsedTableData> {
  try {
    const csvPath = `/data/tables/${tableCode}.csv`;
    const response = await fetch(csvPath);
    if (!response.ok) {
      console.error(`Failed to fetch CSV for ${tableCode}`);
      return { dvis5Value: null, rows: [], blueColumns: [] };
    }

    const csvText = await response.text();
    const lines = csvText.trim().split('\n');

    if (lines.length < 2) {
      console.error(`No data found in CSV for ${tableCode}`);
      return { dvis5Value: null, rows: [], blueColumns: [] };
    }

    let dvis5Value: number | null = null;
    const rows: TableRow[] = [];

    // Blue columns for oxygen: indices 5, 7, 9, 11 in the stopDepths array
    // These correspond to oxygen columns
    const blueColumns = [false, false, false, false, false, true, false, true, false, true, false, true];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = parseCSVLine(line);

      // Skip rows with insufficient columns
      if (values.length < 23) continue;

      // Column 5 (0-based) is Depth (msw)
      const rowDepth = parseInt(values[5]);
      if (isNaN(rowDepth) || rowDepth !== depth) continue;

      // Extract DVIS 5 value from column 3 (0-based) on first matching row
      if (dvis5Value === null) {
        const dvis5 = parseInt(values[3]);
        if (!isNaN(dvis5)) {
          dvis5Value = dvis5;
        }
      }

      // Column 6: Dive Time
      const diveTime = parseInt(values[6]);
      if (isNaN(diveTime)) continue;

      // Column 7: till 1st stop
      const tillFirstStop = parseFloat(values[7]) || 0;

      // Columns 8-19: Stop depths (12 columns)
      const stopDepths: (number | null)[] = [];
      for (let j = 0; j < 12; j++) {
        const val = values[8 + j];
        if (val === '' || val === undefined) {
          stopDepths.push(null);
        } else {
          const num = parseInt(val);
          stopDepths.push(isNaN(num) ? null : num);
        }
      }

      // Column 20: Total deco time
      const totalDecoTime = parseInt(values[20]) || 0;

      // Column 21: Total OTU
      const totalOTU = parseInt(values[21]) || 0;

      // Column 22: Total ESOT
      const totalESOT = parseInt(values[22]) || 0;

      // Column 23: Marker (optional)
      let marker: number | undefined;
      if (values.length > 23) {
        const markerValue = values[23].trim();
        if (markerValue === '2' || markerValue === '3') {
          marker = parseInt(markerValue);
        }
      }

      rows.push({
        diveTime,
        tillFirstStop,
        stopDepths,
        stopDepthsBlue: blueColumns,
        totalDecoTime,
        totalOTU,
        totalESOT,
        marker,
      });
    }

    return { dvis5Value, rows, blueColumns };
  } catch (error) {
    console.error(`Error parsing ${tableCode} CSV:`, error);
    return { dvis5Value: null, rows: [], blueColumns: [] };
  }
}

async function parseSab15CSV(
  tableCode: string,
  depth: number
): Promise<ParsedTableData> {
  try {
    const csvPath = `/data/tables/${tableCode}.csv`;
    const response = await fetch(csvPath);
    if (!response.ok) {
      console.error(`Failed to fetch CSV for ${tableCode}`);
      return { dvis5Value: null, rows: [] };
    }

    const csvText = await response.text();
    const lines = csvText.trim().split('\n');

    if (lines.length < 2) {
      console.error(`No data found in CSV for ${tableCode}`);
      return { dvis5Value: null, rows: [] };
    }

    const rows: TableRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());

      // Skip rows with insufficient columns
      if (values.length < 24) continue;

      // Column 7 (0-based) is Depth (msw)
      const rowDepth = parseInt(values[7]);
      if (isNaN(rowDepth) || rowDepth !== depth) continue;

      // Column 8: Dive Time
      const diveTime = parseInt(values[8]);
      if (isNaN(diveTime)) continue;

      // Column 9: till 1st stop
      const tillFirstStop = parseFloat(values[9]) || 0;

      // Columns 10-20: Stop depths (11 columns)
      const stopDepths: (number | null)[] = [];
      for (let j = 0; j < 11; j++) {
        const val = values[10 + j];
        if (val === '' || val === undefined) {
          stopDepths.push(null);
        } else {
          const num = parseInt(val);
          stopDepths.push(isNaN(num) ? null : num);
        }
      }

      // Column 21: Total deco time
      const totalDecoTime = parseInt(values[21]) || 0;

      // Column 22: Total OTU
      const totalOTU = parseInt(values[22]) || 0;

      // Column 23: Total ESOT
      const totalESOT = parseInt(values[23]) || 0;

      // Column 24: Marker (optional)
      let marker: number | undefined;
      if (values.length > 24) {
        const markerValue = values[24].trim();
        if (markerValue === '2' || markerValue === '3') {
          marker = parseInt(markerValue);
        }
      }

      rows.push({
        diveTime,
        tillFirstStop,
        stopDepths,
        totalDecoTime,
        totalOTU,
        totalESOT,
        marker,
      });
    }

    return { dvis5Value: null, rows };
  } catch (error) {
    console.error(`Error parsing ${tableCode} CSV:`, error);
    return { dvis5Value: null, rows: [] };
  }
}

async function parseNiaNibCSV(
  tableCode: string,
  depth: number
): Promise<ParsedTableData> {
  try {
    const csvPath = `/data/tables/${tableCode}.csv`;
    const response = await fetch(csvPath);
    if (!response.ok) {
      console.error(`Failed to fetch CSV for ${tableCode}`);
      return { dvis5Value: null, rows: [] };
    }

    const csvText = await response.text();
    const lines = csvText.trim().split('\n');

    if (lines.length < 2) {
      console.error(`No data found in CSV for ${tableCode}`);
      return { dvis5Value: null, rows: [] };
    }

    const rows: TableRow[] = [];
    let dvis5Value: number | null = null;
    let eadValue: number | null = null;
    let po2Value: number | null = null;
    let isFirstRowAtDepth = true;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());

      // Skip rows with insufficient columns (NIA/NIB need at least 22 columns)
      if (values.length < 22) continue;

      // Column 7 (0-based) is Depth (msw)
      const rowDepth = parseInt(values[7]);
      if (isNaN(rowDepth) || rowDepth !== depth) continue;

      // Extract values only on first row of this depth
      if (isFirstRowAtDepth) {
        // Column 3: DVIS 5 Time Limit
        const dvis = values[3].trim();
        if (dvis) {
          dvis5Value = parseInt(dvis);
        }
        // Column 5: EAD m/sw
        const ead = values[5].trim();
        if (ead) {
          eadValue = parseFloat(ead);
        }
        // Column 6: PO2 Bar
        const po2 = values[6].trim();
        if (po2) {
          po2Value = parseFloat(po2);
        }
        isFirstRowAtDepth = false;
      }

      // Column 8: Dive Time
      const diveTime = parseInt(values[8]);
      if (isNaN(diveTime)) continue;

      // Column 9: till 1st stop
      const tillFirstStop = parseFloat(values[9]) || 0;

      // Columns 10-17: Stop depths (8 columns for NIA/NIB: 24, 21, 18, 15, 12, 9, 6, 3)
      const stopDepths: (number | null)[] = [];
      for (let j = 0; j < 8; j++) {
        const val = values[10 + j];
        if (val === '' || val === undefined) {
          stopDepths.push(null);
        } else {
          const num = parseInt(val);
          stopDepths.push(isNaN(num) ? null : num);
        }
      }

      // Column 18: Total deco time
      const totalDecoTime = parseInt(values[18]) || 0;

      // Column 19: Total OTU
      const totalOTU = parseInt(values[19]) || 0;

      // Column 20: Total ESOT
      const totalESOT = parseInt(values[20]) || 0;

      // Column 21: Marker (3 for red background)
      let marker: number | undefined;
      if (values.length > 21) {
        const markerValue = values[21].trim();
        if (markerValue === '3') {
          marker = 3;
        }
      }

      rows.push({
        diveTime,
        tillFirstStop,
        stopDepths,
        totalDecoTime,
        totalOTU,
        totalESOT,
        marker,
      });
    }

    return { dvis5Value, rows, eadValue, po2Value };
  } catch (error) {
    console.error(`Error parsing ${tableCode} CSV:`, error);
    return { dvis5Value: null, rows: [] };
  }
}

async function parseOtuEsotCSV(
  tableCode: string,
  depth: number
): Promise<ParsedTableData> {
  try {
    const csvPath = `/data/tables/ESOT_TABLES.csv`;
    const response = await fetch(csvPath);
    if (!response.ok) {
      console.error(`Failed to fetch CSV for ${tableCode}`);
      return { dvis5Value: null, rows: [] };
    }

    const csvText = await response.text();
    const lines = csvText.trim().split('\n');

    if (lines.length < 2) {
      console.error(`No data found in CSV for ${tableCode}`);
      return { dvis5Value: null, rows: [] };
    }

    const rows: TableRow[] = [];
    let codeToMatch = '';
    let o2Percent: number | null = null;
    let isFirstRowAtDepth = true;

    // Map table codes to CSV codes
    if (tableCode === 'SOX15_OTU') {
      codeToMatch = 'sox15';
    } else if (tableCode === 'NIA15_OTU') {
      codeToMatch = 'nia15';
    } else if (tableCode === 'NIB15_OTU') {
      codeToMatch = 'nib15';
    } else if (tableCode === 'BOX15_OTU') {
      codeToMatch = 'box15';
    }

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());

      // Skip if insufficient columns
      if (values.length < 5) continue;

      // Column 1: Code
      const csvCode = values[1];
      if (csvCode !== codeToMatch) continue;

      // Column 3: Depth
      const rowDepth = parseInt(values[3]);
      if (isNaN(rowDepth) || rowDepth !== depth) continue;

      // Extract O2% only on first row of this depth
      if (isFirstRowAtDepth) {
        // Column 2: O2 %
        const o2Value = values[2];
        if (o2Value) {
          o2Percent = parseFloat(o2Value);
        }
        isFirstRowAtDepth = false;
      }

      // Column 4: Dive Time
      const diveTime = parseInt(values[4]);
      if (isNaN(diveTime)) continue;

      // Parse repet intervals based on table code
      const repetIntervals: Array<{otu: number | null, esot: number | null}> = [];
      let marker: number | undefined;

      if (tableCode === 'SOX15_OTU') {
        // SOX15: Only Columns 7-8 (4h), 9-10 (12h) - skip 5-6 (2h)
        repetIntervals.push(
          {
            otu: values[7] ? parseInt(values[7]) : null,
            esot: values[8] ? parseFloat(values[8]) : null,
          },
          {
            otu: values[9] ? parseInt(values[9]) : null,
            esot: values[10] ? parseFloat(values[10]) : null,
          }
        );
        // Check for marker in column 11
        if (values.length > 11 && values[11] === '3') {
          marker = 3;
        }
      } else if (tableCode === 'NIA15_OTU') {
        // NIA15: Columns 5-6 (2h), 7-8 (4h), 9-10 (12h)
        repetIntervals.push(
          {
            otu: values[5] ? parseInt(values[5]) : null,
            esot: values[6] ? parseFloat(values[6]) : null,
          },
          {
            otu: values[7] ? parseInt(values[7]) : null,
            esot: values[8] ? parseFloat(values[8]) : null,
          },
          {
            otu: values[9] ? parseInt(values[9]) : null,
            esot: values[10] ? parseFloat(values[10]) : null,
          }
        );
        // Check for marker in column 11
        if (values.length > 11 && values[11] === '3') {
          marker = 3;
        }
      } else if (tableCode === 'NIB15_OTU') {
        // NIB15: Columns 5-6 (2h), 7-8 (4h), 9-10 (12h)
        repetIntervals.push(
          {
            otu: values[5] ? parseInt(values[5]) : null,
            esot: values[6] ? parseFloat(values[6]) : null,
          },
          {
            otu: values[7] ? parseInt(values[7]) : null,
            esot: values[8] ? parseFloat(values[8]) : null,
          },
          {
            otu: values[9] ? parseInt(values[9]) : null,
            esot: values[10] ? parseFloat(values[10]) : null,
          }
        );
        // Check for marker in column 11
        if (values.length > 11 && values[11] === '3') {
          marker = 3;
        }
      } else if (tableCode === 'BOX15_OTU') {
        // BOX15: Columns 5-6 (OTU, ESOT)
        repetIntervals.push(
          {
            otu: values[5] ? parseInt(values[5]) : null,
            esot: values[6] ? parseFloat(values[6]) : null,
          }
        );
        // Check for marker in column 7
        if (values.length > 7 && values[7] === '3') {
          marker = 3;
        }
      }

      rows.push({
        diveTime,
        tillFirstStop: 0,
        stopDepths: [],
        totalDecoTime: 0,
        totalOTU: 0,
        totalESOT: 0,
        repetIntervals,
        marker,
        o2Percent,
      });
    }

    return { dvis5Value: null, rows, o2Percent };
  } catch (error) {
    console.error(`Error parsing ${tableCode} CSV:`, error);
    return { dvis5Value: null, rows: [] };
  }
}

async function parseNia2CSV(
  tableCode: string,
  depth: number
): Promise<ParsedTableData> {
  try {
    const csvPath = `/data/tables/${tableCode}.csv`;
    const response = await fetch(csvPath);
    if (!response.ok) {
      console.error(`Failed to fetch CSV for ${tableCode}`);
      return { dvis5Value: null, rows: [] };
    }

    const csvText = await response.text();
    const lines = csvText.trim().split('\n');

    if (lines.length < 2) {
      console.error(`No data found in CSV for ${tableCode}`);
      return { dvis5Value: null, rows: [] };
    }

    const rows: TableRow[] = [];
    let eadValue: number | null = null;
    let po2Value: number | null = null;
    let isFirstRowAtDepth = true;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());

      // Skip rows with insufficient columns (NIA2 has 18 columns: 0-17)
      if (values.length < 18) continue;

      // Column 4 (0-based) is Depth (msw)
      const rowDepth = parseInt(values[4]);
      if (isNaN(rowDepth) || rowDepth !== depth) continue;

      // Extract values only on first row of this depth
      if (isFirstRowAtDepth) {
        // Column 2: EAD m/sw
        const ead = values[2].trim();
        if (ead) {
          eadValue = parseFloat(ead);
        }
        // Column 3: PO2 Bar
        const po2 = values[3].trim();
        if (po2) {
          po2Value = parseFloat(po2);
        }
        isFirstRowAtDepth = false;
      }

      // Column 5: Dive Time
      const diveTime = parseInt(values[5]);
      if (isNaN(diveTime)) continue;

      // Column 6: Till 1st stop
      const tillFirstStop = parseFloat(values[6]) || 0;

      // Columns 7-13: Stop depths (7 columns for NIA2: Last Stop, *, *, 12, 9, 6, 3)
      const stopDepths: (number | null)[] = [];
      for (let j = 0; j < 7; j++) {
        const val = values[7 + j];
        if (val === '' || val === undefined) {
          stopDepths.push(null);
        } else {
          const num = parseFloat(val);
          stopDepths.push(isNaN(num) ? null : num);
        }
      }

      // Column 14: Total deco time
      const totalDecoTime = parseFloat(values[14]) || 0;

      // Column 15: Total OTU
      const totalOTU = parseInt(values[15]) || 0;

      // Column 16: Total ESOT
      const totalESOT = parseInt(values[16]) || 0;

      // Column 17: Marker (3 for red background)
      let marker: number | undefined;
      const markerValue = values[17].trim();
      if (markerValue === '3') {
        marker = 3;
      }

      rows.push({
        diveTime,
        tillFirstStop,
        stopDepths,
        totalDecoTime,
        totalOTU,
        totalESOT,
        marker,
      });
    }

    return { rows, eadValue, po2Value };
  } catch (error) {
    console.error(`Error parsing ${tableCode} CSV:`, error);
    return { dvis5Value: null, rows: [] };
  }
}

export async function parseTableCSV(
  tableCode: string,
  depth: number
): Promise<ParsedTableData> {
  // Use specialized parser for OTU/ESOT tables
  const otuEsotCodes = ['SOX15_OTU', 'NIA15_OTU', 'NIB15_OTU', 'BOX15_OTU'];
  if (otuEsotCodes.includes(tableCode)) {
    return parseOtuEsotCSV(tableCode, depth);
  }

  // Use specialized parser for BOX15
  if (tableCode === 'BOX15') {
    return parseBox15CSV(tableCode, depth);
  }

  // Use specialized parser for SOX15 and HSOX15
  if (tableCode === 'SOX15' || tableCode === 'HSOX15') {
    return parseSox15CSV(tableCode, depth);
  }

  // Use specialized parser for SAB15 and HSAB15
  if (tableCode === 'SAB15' || tableCode === 'HSAB15') {
    return parseSab15CSV(tableCode, depth);
  }

  // Use specialized parser for NIA2_3 and NIA2_6
  if (tableCode === 'NIA2_3' || tableCode === 'NIA2_6') {
    return parseNia2CSV(tableCode, depth);
  }

  // Use specialized parser for NIA, H2NIA, H4NIA, NIB, H2NIB, H4NIB
  const niaNibCodes = ['NIA15', 'H2NIA15', 'H4NIA15', 'NIB15', 'H2NIB15', 'H4NIB15'];
  if (niaNibCodes.includes(tableCode)) {
    return parseNiaNibCSV(tableCode, depth);
  }

  try {
    const csvPath = `/data/tables/${tableCode}.csv`;
    const response = await fetch(csvPath);
    if (!response.ok) {
      console.error(`Failed to fetch CSV for ${tableCode}`);
      return { dvis5Value: null, rows: [] };
    }

    const csvText = await response.text();
    const lines = csvText.trim().split('\n');

    if (lines.length < 2) {
      return { dvis5Value: null, rows: [] };
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

    const depthIndex = headers.findIndex(h =>
      h.includes('depth') && !h.includes('deco') && !h.includes('stop depth')
    );
    const diveTimeIndex = headers.findIndex(h =>
      h.includes('dive') && h.includes('time')
    );
    const tillStopIndex = headers.findIndex(h =>
      h.includes('till') || h.includes('1st')
    );
    const decoTimeIndex = headers.findIndex(h =>
      h.includes('deco') && h.includes('time')
    );
    const otuIndex = headers.findIndex(h => h === 'total otu' || h === 'otu' || h.includes('otu'));
    const esotIndex = headers.findIndex(h => h === 'total esot' || h === 'esot' || h.includes('esot'));
    // Marker is typically the column right after ESOT
    const markerIndex = esotIndex + 1;

    // Find where the stop depths start (after till 1st stop)
    const stopDepthStartIndex = tillStopIndex + 1;
    const stopDepthEndIndex = decoTimeIndex;
    const numStopDepths = stopDepthEndIndex - stopDepthStartIndex;

    const dvis5Index = headers.findIndex(h => h.includes('dvis'));

    let dvis5Value: number | null = null;
    const rows: TableRow[] = [];
    let processedCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());

      // Check if this row's depth matches our target depth
      const rowDepth = parseInt(values[depthIndex]);
      if (isNaN(rowDepth) || rowDepth !== depth) {
        if (!isNaN(rowDepth)) {
          processedCount++;
        }
        continue;
      }

      // Extract DVIS 5 value from first matching row
      if (dvis5Value === null && dvis5Index >= 0) {
        const dvis5 = parseInt(values[dvis5Index]);
        if (!isNaN(dvis5)) {
          dvis5Value = dvis5;
        }
      }

      // Skip header rows and empty markers
      const diveTime = parseInt(values[diveTimeIndex]);
      if (isNaN(diveTime)) continue;

      const tillFirstStop = parseFloat(values[tillStopIndex]) || 0;
      const totalDecoTime = parseInt(values[decoTimeIndex]) || 0;
      const totalOTU = parseInt(values[otuIndex]) || 0;
      const totalESOT = parseInt(values[esotIndex]) || 0;

      // Extract stop depths
      const stopDepths: (number | null)[] = [];
      for (let j = 0; j < numStopDepths; j++) {
        const val = values[stopDepthStartIndex + j];
        if (val === '' || val === undefined) {
          stopDepths.push(null);
        } else {
          const num = parseInt(val);
          stopDepths.push(isNaN(num) ? null : num);
        }
      }

      // Check for marker (column right after ESOT)
      let marker: number | undefined;
      if (markerIndex < values.length) {
        const markerValue = values[markerIndex].trim();
        if (markerValue === '2' || markerValue === '3') {
          marker = parseInt(markerValue);
        }
      }

      rows.push({
        diveTime,
        tillFirstStop,
        stopDepths,
        totalDecoTime,
        totalOTU,
        totalESOT,
        marker,
      });
    }

    return { dvis5Value, rows };
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return { dvis5Value: null, rows: [] };
  }
}
