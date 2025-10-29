export interface TableRow {
  diveTime: number;
  tillFirstStop: number;
  stopDepths: (number | null)[];
  stopDepthsBlue?: boolean[]; // Track which columns need blue background (for oxygen)
  totalDecoTime: number;
  totalOTU: number;
  totalESOT: number;
  marker?: number; // 2 for bold border, 3 for red background
}

export interface ParsedTableData {
  dvis5Value: number | null;
  rows: TableRow[];
  blueColumns?: boolean[]; // Track which stop depth columns should be blue
}

async function parseSox15CSV(
  depth: number
): Promise<ParsedTableData> {
  try {
    const csvPath = `/data/tables/SOX15.csv`;
    const response = await fetch(csvPath);
    if (!response.ok) {
      console.error(`Failed to fetch CSV for SOX15`);
      return { dvis5Value: null, rows: [], blueColumns: [] };
    }

    const csvText = await response.text();
    const lines = csvText.trim().split('\n');

    if (lines.length < 2) {
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
    console.error('Error parsing SOX15 CSV:', error);
    return { dvis5Value: null, rows: [], blueColumns: [] };
  }
}

export async function parseTableCSV(
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
