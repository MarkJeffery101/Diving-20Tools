export interface TableRow {
  diveTime: number;
  tillFirstStop: number;
  stopDepths: (number | null)[];
  totalDecoTime: number;
  totalOTU: number;
  totalESOT: number;
  marker?: number; // 2 for bold border, 3 for red background
}

export interface ParsedTableData {
  dvis5Value: number | null;
  rows: TableRow[];
}

export async function parseTableCSV(
  tableCode: string,
  depth: number
): Promise<ParsedTableData> {
  try {
    const response = await fetch(`/data/tables/${tableCode}.csv`);
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
    const otuIndex = headers.findIndex(h => h === 'total otu' || h === 'otu');
    const esotIndex = headers.findIndex(h => h === 'total esot' || h === 'esot');

    // Find where the stop depths start (after till 1st stop)
    const stopDepthStartIndex = tillStopIndex + 1;
    const stopDepthEndIndex = decoTimeIndex;
    const numStopDepths = stopDepthEndIndex - stopDepthStartIndex;

    const dvis5Index = headers.findIndex(h => h.includes('dvis'));

    let dvis5Value: number | null = null;
    const rows: TableRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());

      // Check if this row's depth matches our target depth
      const rowDepth = parseInt(values[depthIndex]);
      if (isNaN(rowDepth) || rowDepth !== depth) continue;

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

      // Check for marker (last column or near last)
      let marker: number | undefined;
      const lastValue = values[values.length - 1];
      if (lastValue === '2' || lastValue === '3') {
        marker = parseInt(lastValue);
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
