import { useState } from "react";
import { Plus, Trash2, RotateCcw, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { EAD_DATA, type EADRow } from "../lib/eadData";
import Navigation from "@/components/Navigation";

interface CalculatorRow {
  id: string;
  depth_m: string;
  o2_percent: string;
  time_min?: string;
  pO2_ATA?: number;
  otu?: number;
  esot?: number;
}

export default function Tools() {
  const [otuRows, setOtuRows] = useState<CalculatorRow[]>([
    { id: "1", depth_m: "", o2_percent: "", time_min: "" },
  ]);

  const [eadDepth, setEadDepth] = useState<string>("");
  const [eadO2, setEadO2] = useState<string>("");
  const [eadResult, setEadResult] = useState<EADRow | null>(null);

  const calculateOtuRow = (row: CalculatorRow): CalculatorRow => {
    const depth = parseFloat(row.depth_m);
    const o2 = parseFloat(row.o2_percent);
    const time = parseFloat(row.time_min || "");

    if (isNaN(depth) || isNaN(o2) || isNaN(time)) {
      return row;
    }

    const pO2 = (o2 / 100) * (depth / 10 + 1);
    const otuExponent = Math.pow((pO2 - 0.5) / 0.5, 0.833);
    const otu = time * otuExponent;
    const esot = time * Math.pow(pO2, 2.285);

    return {
      ...row,
      pO2_ATA: parseFloat(pO2.toFixed(3)),
      otu: parseFloat(otu.toFixed(1)),
      esot: parseFloat(esot.toFixed(1)),
    };
  };

  const handleOtuInputChange = (
    id: string,
    field: keyof Omit<CalculatorRow, "id" | "pO2_ATA" | "otu" | "esot">,
    value: string
  ) => {
    const updatedRows = otuRows.map((row) => {
      if (row.id === id) {
        const updated = { ...row, [field]: value };
        return calculateOtuRow(updated);
      }
      return row;
    });

    setOtuRows(updatedRows);

    const lastRow = updatedRows[updatedRows.length - 1];
    if (
      lastRow.depth_m &&
      lastRow.o2_percent &&
      lastRow.time_min &&
      updatedRows.length < 10 &&
      lastRow.otu !== undefined
    ) {
      const newId = Math.max(...updatedRows.map((r) => parseInt(r.id)), 0) + 1;
      setOtuRows([
        ...updatedRows,
        { id: newId.toString(), depth_m: "", o2_percent: "", time_min: "" },
      ]);
    }
  };

  const handleOtuDeleteRow = (id: string) => {
    if (otuRows.length > 1) {
      setOtuRows(otuRows.filter((row) => row.id !== id));
    }
  };

  const handleOtuReset = () => {
    setOtuRows([{ id: "1", depth_m: "", o2_percent: "", time_min: "" }]);
  };

  const handleEadLookup = () => {
    const depth = parseInt(eadDepth);
    const o2 = parseInt(eadO2);

    if (isNaN(depth) || isNaN(o2)) {
      setEadResult(null);
      return;
    }

    const result = EAD_DATA.find((row) => row.depth === depth && row.o2 === o2);
    setEadResult(result || null);
  };

  const handleEadReset = () => {
    setEadDepth("");
    setEadO2("");
    setEadResult(null);
  };

  const totalOTU = otuRows.reduce((sum, row) => sum + (row.otu || 0), 0);
  const totalESOT = otuRows.reduce((sum, row) => sum + (row.esot || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      {/* Page Header */}
      <section className="py-4 px-4 bg-white border-b border-border">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Diving Calculator Tools
          </h1>
          <p className="text-xs text-gray-600">
            Quick calculators for dive planning and safety
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
            {/* OTU/ESOT Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3">
              <h2 className="text-sm font-bold text-gray-900 mb-2">
                Segments OTU / ESOT
              </h2>
              
              {/* Input Row */}
              <div className="mb-2 space-y-1">
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  <div>
                    <label className="text-gray-700 font-semibold block text-[10px] mb-0.5">Depth (m)</label>
                    <input
                      type="number"
                      value={otuRows[0]?.depth_m || ""}
                      onChange={(e) =>
                        handleOtuInputChange("1", "depth_m", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      maxLength={4}
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-semibold block text-[10px] mb-0.5">O2 (%)</label>
                    <input
                      type="number"
                      value={otuRows[0]?.o2_percent || ""}
                      onChange={(e) =>
                        handleOtuInputChange("1", "o2_percent", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      maxLength={4}
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-semibold block text-[10px] mb-0.5">Time (min)</label>
                    <input
                      type="number"
                      value={otuRows[0]?.time_min || ""}
                      onChange={(e) =>
                        handleOtuInputChange("1", "time_min", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-blue-50 p-2 rounded mb-2 grid grid-cols-3 gap-1">
                <div className="text-center">
                  <p className="text-[9px] text-blue-700 font-semibold">pO2</p>
                  <p className="text-xs font-bold text-blue-900">
                    {otuRows[0]?.pO2_ATA !== undefined ? otuRows[0].pO2_ATA.toFixed(2) : "—"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-blue-700 font-semibold">OTU</p>
                  <p className="text-xs font-bold text-blue-900">
                    {otuRows[0]?.otu !== undefined ? otuRows[0].otu.toFixed(1) : "—"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-blue-700 font-semibold">ESOT</p>
                  <p className="text-xs font-bold text-blue-900">
                    {otuRows[0]?.esot !== undefined ? otuRows[0].esot.toFixed(1) : "—"}
                  </p>
                </div>
              </div>

              {/* Totals */}
              {otuRows.length > 1 && (
                <div className="bg-green-50 p-2 rounded mb-2 grid grid-cols-2 gap-1">
                  <div className="text-center">
                    <p className="text-[9px] text-green-700 font-semibold">Total OTU</p>
                    <p className="text-xs font-bold text-green-900">{totalOTU.toFixed(1)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] text-green-700 font-semibold">Total ESOT</p>
                    <p className="text-xs font-bold text-green-900">{totalESOT.toFixed(1)}</p>
                  </div>
                </div>
              )}

              {/* Additional Rows */}
              {otuRows.slice(1).map((row, idx) => (
                <div key={row.id} className="mb-2 pb-2 border-t border-gray-200 pt-2">
                  <div className="grid grid-cols-3 gap-1.5 text-xs mb-1">
                    <div>
                      <input
                        type="number"
                        value={row.depth_m}
                        onChange={(e) =>
                          handleOtuInputChange(row.id, "depth_m", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={row.o2_percent}
                        onChange={(e) =>
                          handleOtuInputChange(row.id, "o2_percent", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        value={row.time_min}
                        onChange={(e) =>
                          handleOtuInputChange(row.id, "time_min", e.target.value)
                        }
                        placeholder="0"
                        className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      {otuRows.length > 1 && (
                        <button
                          onClick={() => handleOtuDeleteRow(row.id)}
                          className="px-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-1 rounded grid grid-cols-3 gap-1">
                    <div className="text-center text-[9px]">
                      <p className="text-blue-900 font-bold">{row.pO2_ATA?.toFixed(2) || "—"}</p>
                    </div>
                    <div className="text-center text-[9px]">
                      <p className="text-blue-900 font-bold">{row.otu?.toFixed(1) || "—"}</p>
                    </div>
                    <div className="text-center text-[9px]">
                      <p className="text-blue-900 font-bold">{row.esot?.toFixed(1) || "—"}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Buttons */}
              <div className="flex gap-1">
                {otuRows.length < 10 && (
                  <button
                    onClick={() => {
                      const newId = Math.max(
                        ...otuRows.map((r) => parseInt(r.id)),
                        0
                      ) + 1;
                      setOtuRows([
                        ...otuRows,
                        { id: newId.toString(), depth_m: "", o2_percent: "", time_min: "" },
                      ]);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-2.5 w-2.5" />
                    Add
                  </button>
                )}
                <button
                  onClick={handleOtuReset}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 text-xs bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
                >
                  <RotateCcw className="h-2.5 w-2.5" />
                  Reset
                </button>
              </div>
            </div>

            {/* EAD Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3">
              <h2 className="text-sm font-bold text-gray-900 mb-2">
                Equivalent Air Depth
              </h2>

              {/* Inputs */}
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                <div>
                  <label className="text-gray-700 font-semibold block text-[10px] mb-0.5">Depth (m)</label>
                  <input
                    type="number"
                    value={eadDepth}
                    onChange={(e) => setEadDepth(e.target.value)}
                    placeholder="30"
                    min="10"
                    max="50"
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-semibold block text-[10px] mb-0.5">O2 (%)</label>
                  <input
                    type="number"
                    value={eadO2}
                    onChange={(e) => setEadO2(e.target.value)}
                    placeholder="32"
                    min="30"
                    max="40"
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-1 mb-2">
                <button
                  onClick={handleEadLookup}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Search className="h-2.5 w-2.5" />
                  Lookup
                </button>
                <button
                  onClick={handleEadReset}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 text-xs bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
                >
                  <RotateCcw className="h-2.5 w-2.5" />
                  Clear
                </button>
              </div>

              {/* Results */}
              {eadResult ? (
                <div className="bg-green-50 p-2 rounded space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-gray-600">EAD:</span>
                    <span className="font-bold text-gray-900">{eadResult.eadCalc.toFixed(1)}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">pO2:</span>
                    <span className="font-bold text-gray-900">{eadResult.po2.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Table:</span>
                    <span className="font-bold text-gray-900">{eadResult.airTable}m</span>
                  </div>
                </div>
              ) : eadDepth || eadO2 ? (
                <div className="bg-red-50 p-2 rounded text-[10px] text-red-700">
                  No data found
                </div>
              ) : (
                <div className="bg-gray-50 p-2 rounded text-[10px] text-gray-600">
                  Enter values to look up
                </div>
              )}
            </div>

            {/* Placeholder Cards for Future Tools */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md border border-gray-300 border-dashed p-3 flex items-center justify-center">
                <p className="text-xs text-gray-500 text-center">Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-6 px-4 bg-white border-t border-border">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Instructions</h2>
          <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">OTU / ESOT Segments</h3>
              <ul className="space-y-1 text-[11px]">
                <li>• Enter depth in meters</li>
                <li>• Enter O₂ percentage of gas mix</li>
                <li>• Enter time at that depth in minutes</li>
                <li>• Results update automatically</li>
                <li>• Add rows for multi-segment dives</li>
                <li>• Totals show at bottom</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Equivalent Air Depth (EAD)</h3>
              <ul className="space-y-1 text-[11px]">
                <li>• Enter planned dive depth (10-50m)</li>
                <li>• Enter nitrox O₂ percentage (30-40%)</li>
                <li>• Click Lookup to see EAD values</li>
                <li>• EAD helps determine decompression schedule</li>
                <li>• pO₂ shows oxygen toxicity risk</li>
                <li>• Table shows which air table to use</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
