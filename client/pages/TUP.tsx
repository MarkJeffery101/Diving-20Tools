import { useState, useMemo } from "react";
import { Search, RotateCcw } from "lucide-react";
import Navigation from "@/components/Navigation";

interface TUPTableRow {
  depth: number;
  bottomTime: number;
  timeToFirstStop: number;
  totalDecoTime: number;
  totalOTU: number;
  totalESOT: number;
}

const TUP_DATA: TUPTableRow[] = [
  { depth: 9, bottomTime: 400, timeToFirstStop: 0.9, totalDecoTime: 0.9, totalOTU: 0, totalESOT: 49 },
  { depth: 9, bottomTime: 420, timeToFirstStop: 0.6, totalDecoTime: 10.9, totalOTU: 15, totalESOT: 69 },
  { depth: 9, bottomTime: 440, timeToFirstStop: 0.6, totalDecoTime: 15.9, totalOTU: 22, totalESOT: 81 },
  { depth: 12, bottomTime: 100, timeToFirstStop: 1.2, totalDecoTime: 1.2, totalOTU: 0, totalESOT: 17 },
  { depth: 12, bottomTime: 140, timeToFirstStop: 0.9, totalDecoTime: 11.2, totalOTU: 15, totalESOT: 42 },
  { depth: 12, bottomTime: 180, timeToFirstStop: 0.9, totalDecoTime: 16.2, totalOTU: 22, totalESOT: 58 },
  { depth: 12, bottomTime: 240, timeToFirstStop: 0.9, totalDecoTime: 21.2, totalOTU: 30, totalESOT: 78 },
  { depth: 12, bottomTime: 280, timeToFirstStop: 0.9, totalDecoTime: 21.2, totalOTU: 30, totalESOT: 78 },
  { depth: 12, bottomTime: 300, timeToFirstStop: 0.9, totalDecoTime: 26.2, totalOTU: 37, totalESOT: 97 },
  { depth: 15, bottomTime: 53, timeToFirstStop: 1.5, totalDecoTime: 1.5, totalOTU: 4, totalESOT: 12 },
  { depth: 15, bottomTime: 80, timeToFirstStop: 1.2, totalDecoTime: 16.5, totalOTU: 30, totalESOT: 46 },
  { depth: 15, bottomTime: 100, timeToFirstStop: 1.2, totalDecoTime: 21.5, totalOTU: 39, totalESOT: 60 },
  { depth: 15, bottomTime: 140, timeToFirstStop: 0.9, totalDecoTime: 26.5, totalOTU: 54, totalESOT: 89 },
  { depth: 15, bottomTime: 160, timeToFirstStop: 0.9, totalDecoTime: 31.5, totalOTU: 63, totalESOT: 103 },
  { depth: 15, bottomTime: 180, timeToFirstStop: 0.9, totalDecoTime: 36.5, totalOTU: 72, totalESOT: 116 },
  { depth: 30, bottomTime: 9, timeToFirstStop: 3, totalDecoTime: 3, totalOTU: 7, totalESOT: 6 },
  { depth: 30, bottomTime: 15, timeToFirstStop: 2.4, totalDecoTime: 8, totalOTU: 22, totalESOT: 25 },
  { depth: 30, bottomTime: 30, timeToFirstStop: 2.1, totalDecoTime: 23, totalOTU: 60, totalESOT: 75 },
  { depth: 30, bottomTime: 45, timeToFirstStop: 1.8, totalDecoTime: 38, totalOTU: 105, totalESOT: 165 },
  { depth: 30, bottomTime: 60, timeToFirstStop: 1.8, totalDecoTime: 48, totalOTU: 131, totalESOT: 193 },
  { depth: 30, bottomTime: 75, timeToFirstStop: 1.8, totalDecoTime: 58, totalOTU: 161, totalESOT: 232 },
  { depth: 45, bottomTime: 15, timeToFirstStop: 3, totalDecoTime: 29.5, totalOTU: 82, totalESOT: 166 },
  { depth: 45, bottomTime: 30, timeToFirstStop: 2.7, totalDecoTime: 55.5, totalOTU: 143, totalESOT: 260 },
  { depth: 45, bottomTime: 45, timeToFirstStop: 2.7, totalDecoTime: 72.5, totalOTU: 185, totalESOT: 308 },
  { depth: 45, bottomTime: 60, timeToFirstStop: 2.4, totalDecoTime: 101.5, totalOTU: 239, totalESOT: 378 },
  { depth: 51, bottomTime: 15, timeToFirstStop: 3.3, totalDecoTime: 36.1, totalOTU: 97, totalESOT: 194 },
  { depth: 51, bottomTime: 30, timeToFirstStop: 3, totalDecoTime: 64.1, totalOTU: 159, totalESOT: 273 },
];

function calculateEAD(depth: number, o2Percent: number): number {
  const fractionN2 = (100 - o2Percent) / 100;
  const ead = (depth + 10) * (fractionN2 / 0.79) - 10;
  return Math.round(ead * 10) / 10;
}

function calculatePO2(depth: number, o2Percent: number): number {
  const pO2 = (o2Percent / 100) * (depth / 10 + 1);
  return Math.round(pO2 * 100) / 100;
}

function getPO2Color(po2: number): string {
  if (po2 > 1.5) return "bg-red-50 border-red-300";
  if (po2 > 1.4) return "bg-yellow-50 border-yellow-300";
  return "bg-green-50 border-green-300";
}

function getRowColor(po2: number): string {
  if (po2 > 1.5) return "bg-red-50";
  if (po2 > 1.4) return "bg-yellow-50";
  return "bg-green-50";
}

export default function TUP() {
  const [depth, setDepth] = useState<number>(30);
  const [o2Percent, setO2Percent] = useState<number>(32);
  const [diveTime, setDiveTime] = useState<number>(30);
  const [result, setResult] = useState<TUPTableRow | null>(null);

  const ead = useMemo(() => calculateEAD(depth, o2Percent), [depth, o2Percent]);
  const po2 = useMemo(() => calculatePO2(depth, o2Percent), [depth, o2Percent]);

  const handleCalculate = () => {
    const matchedRow = TUP_DATA.find(
      (row) => row.depth === depth && Math.abs(row.bottomTime - diveTime) <= 10
    ) || TUP_DATA.find((row) => row.depth === depth);

    if (matchedRow) {
      setResult(matchedRow);
    }
  };

  const handleReset = () => {
    setDepth(30);
    setO2Percent(32);
    setDiveTime(30);
    setResult(null);
  };

  const otuDiver = result ? result.totalOTU : 0;
  const esotDiver = result ? result.totalESOT : 0;
  const otuBellman = result ? Math.round(result.totalOTU * 0.7) : 0;
  const esotBellman = result ? Math.round(result.totalESOT * 0.7) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      <section className="py-4 px-4 bg-white border-b border-border">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Transfer Under Pressure (TUP)
          </h1>
          <p className="text-xs text-gray-600">
            Autonomous diving calculator for bell diving operations
          </p>
        </div>
      </section>

      <section className="py-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Dive Parameters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Depth (meters)
                </label>
                <input
                  type="number"
                  min="9"
                  max="51"
                  value={depth}
                  onChange={(e) => setDepth(parseInt(e.target.value) || 30)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  O2 in Mix (%)
                </label>
                <input
                  type="number"
                  min="21"
                  max="100"
                  value={o2Percent}
                  onChange={(e) => setO2Percent(parseInt(e.target.value) || 32)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dive Time (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="600"
                  value={diveTime}
                  onChange={(e) => setDiveTime(parseInt(e.target.value) || 30)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCalculate}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Search className="h-4 w-4" />
                Calculate
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>

          <div className={`rounded-lg shadow-md border p-4 mb-6 ${getPO2Color(po2)}`}>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Dive Results</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-600 font-semibold mb-1">EAD</p>
                <p className="text-2xl font-bold text-gray-900">{ead}m</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 font-semibold mb-1">pO2 Max</p>
                <p className="text-2xl font-bold text-gray-900">{po2}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  Max Bottom Time
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {result?.bottomTime || "—"} min
                </p>
              </div>
            </div>
          </div>

          {result && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg shadow-md border border-blue-200 p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Diver</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total OTU:</span>
                      <span className="font-bold text-gray-900">
                        {otuDiver}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total ESOT:</span>
                      <span className="font-bold text-gray-900">
                        {esotDiver}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg shadow-md border border-green-200 p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">
                    Bellman
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total OTU:</span>
                      <span className="font-bold text-gray-900">
                        {otuBellman}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total ESOT:</span>
                      <span className="font-bold text-gray-900">
                        {esotBellman}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-100 border-b border-gray-300">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-gray-900">
                          Depth
                        </th>
                        <th className="px-3 py-2 text-center font-semibold text-gray-900">
                          Bottom Time
                        </th>
                        <th className="px-3 py-2 text-center font-semibold text-gray-900">
                          Time to 1st Stop
                        </th>
                        <th className="px-3 py-2 text-center font-semibold text-gray-900">
                          Total Deco
                        </th>
                        <th className="px-3 py-2 text-center font-semibold text-gray-900">
                          OTU
                        </th>
                        <th className="px-3 py-2 text-center font-semibold text-gray-900">
                          ESOT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={`border-b border-gray-200 ${getRowColor(po2)}`}>
                        <td className="px-3 py-2 font-semibold text-gray-900">
                          {result.depth}m
                        </td>
                        <td className="px-3 py-2 text-center text-gray-700">
                          {result.bottomTime} min
                        </td>
                        <td className="px-3 py-2 text-center text-gray-700">
                          {result.timeToFirstStop} min
                        </td>
                        <td className="px-3 py-2 text-center font-semibold text-gray-900">
                          {result.totalDecoTime} min
                        </td>
                        <td className="px-3 py-2 text-center font-semibold text-gray-900">
                          {result.totalOTU}
                        </td>
                        <td className="px-3 py-2 text-center font-semibold text-gray-900">
                          {result.totalESOT}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 px-4 py-2 text-xs text-gray-600 border-t border-gray-200">
                  <p>
                    Color coding: <span className="text-green-700 font-semibold">Green</span> (pO2 ≤ 1.4) |{" "}
                    <span className="text-yellow-700 font-semibold">
                      Yellow
                    </span>{" "}
                    (1.4 &lt; pO2 ≤ 1.5) | <span className="text-red-700 font-semibold">Red</span> (pO2 &gt; 1.5)
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
