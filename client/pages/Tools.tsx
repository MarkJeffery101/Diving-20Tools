import { useState } from "react";
import { Plus, Trash2, RotateCcw, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { EAD_DATA, type EADRow } from "../lib/eadData";

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
    value: string,
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

  const getSafetyColor = (po2: number): string => {
    if (po2 > 1.5) return "bg-red-50 border-red-200";
    if (po2 > 1.4) return "bg-yellow-50 border-yellow-200";
    return "bg-green-50 border-green-200";
  };

  const getSafetyText = (po2: number): string => {
    if (po2 > 1.5) return "text-red-700";
    if (po2 > 1.4) return "text-yellow-700";
    return "text-green-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-4">
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-2 font-medium text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Calculator Tools
          </h1>
          <p className="text-sm text-gray-600">
            Professional diving calculation tools for planning and analysis
          </p>
        </div>

        {/* OTU/ESOT Calculator Card */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Segments OTU / ESOT
            </h2>
            <p className="text-xs text-gray-600">
              Calculate Oxygen Toxicity Units (OTU) and Equivalent Single Oxygen
              Exposure Time (ESOT) for dive segments
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="px-2 py-2 text-left text-xs font-semibold">
                    Depth (m)
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-semibold">
                    O2 in Gas (%)
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-semibold">
                    Exposure Time (min)
                  </th>
                  <th className="px-2 py-2 text-center text-xs font-semibold">
                    pO2 (ATA)
                  </th>
                  <th className="px-2 py-2 text-center text-xs font-semibold">
                    OTU
                  </th>
                  <th className="px-2 py-2 text-center text-xs font-semibold">
                    ESOT (min)
                  </th>
                  <th className="px-2 py-2 text-center text-xs font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {otuRows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-b text-sm ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={row.depth_m}
                        onChange={(e) =>
                          handleOtuInputChange(
                            row.id,
                            "depth_m",
                            e.target.value,
                          )
                        }
                        placeholder="0"
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={row.o2_percent}
                        onChange={(e) =>
                          handleOtuInputChange(
                            row.id,
                            "o2_percent",
                            e.target.value,
                          )
                        }
                        placeholder="0"
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={row.time_min}
                        onChange={(e) =>
                          handleOtuInputChange(
                            row.id,
                            "time_min",
                            e.target.value,
                          )
                        }
                        placeholder="0"
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-2 py-2 text-center text-gray-700 font-medium text-xs">
                      {row.pO2_ATA !== undefined ? row.pO2_ATA.toFixed(3) : "—"}
                    </td>
                    <td className="px-2 py-2 text-center text-gray-700 font-medium text-xs">
                      {row.otu !== undefined ? row.otu.toFixed(1) : "—"}
                    </td>
                    <td className="px-2 py-2 text-center text-gray-700 font-medium text-xs">
                      {row.esot !== undefined ? row.esot.toFixed(1) : "—"}
                    </td>
                    <td className="px-2 py-2 text-center">
                      {otuRows.length > 1 && (
                        <button
                          onClick={() => handleOtuDeleteRow(row.id)}
                          className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete row"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">
                Total OTU
              </p>
              <p className="text-2xl font-bold text-blue-900">
                {totalOTU.toFixed(1)}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">
                Total ESOT (min)
              </p>
              <p className="text-2xl font-bold text-green-900">
                {totalESOT.toFixed(1)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {otuRows.length < 10 && (
              <button
                onClick={() => {
                  const newId =
                    Math.max(...otuRows.map((r) => parseInt(r.id)), 0) + 1;
                  setOtuRows([
                    ...otuRows,
                    {
                      id: newId.toString(),
                      depth_m: "",
                      o2_percent: "",
                      time_min: "",
                    },
                  ]);
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="h-3 w-3" />
                Add Row
              </button>
            )}
            <button
              onClick={handleOtuReset}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-semibold text-amber-900 text-sm mb-2">
              Instructions
            </h3>
            <ul className="space-y-1 text-xs text-amber-900">
              <li>
                • <strong>Depth:</strong> Enter the depth of the dive segment in
                meters
              </li>
              <li>
                • <strong>O2 in Gas:</strong> Enter the oxygen percentage of the
                gas mix
              </li>
              <li>
                • <strong>Exposure Time:</strong> Enter the time spent at this
                depth in minutes
              </li>
              <li>
                • <strong>pO2:</strong> Calculated partial pressure of oxygen in
                ATA (atmospheres absolute)
              </li>
              <li>
                • <strong>OTU:</strong> Calculated oxygen toxicity units for the
                segment
              </li>
              <li>
                • <strong>ESOT:</strong> Calculated equivalent single oxygen
                exposure time in minutes
              </li>
            </ul>
          </div>
        </div>

        {/* EAD Calculator Card */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Equivalent Air Depth (EAD)
            </h2>
            <p className="text-xs text-gray-600">
              Look up Equivalent Air Depth values for nitrox gas mixtures at
              varying depths. This helps you determine the decompression
              requirements as if you were diving air at a shallower depth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Depth (m)
              </label>
              <input
                type="number"
                value={eadDepth}
                onChange={(e) => setEadDepth(e.target.value)}
                placeholder="e.g., 30"
                min="10"
                max="50"
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                O2 in Gas (%)
              </label>
              <input
                type="number"
                value={eadO2}
                onChange={(e) => setEadO2(e.target.value)}
                placeholder="e.g., 32"
                min="30"
                max="40"
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={handleEadLookup}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Search className="h-3 w-3" />
              Look Up
            </button>
            <button
              onClick={handleEadReset}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              <RotateCcw className="h-3 w-3" />
              Clear
            </button>
          </div>

          {eadResult ? (
            <div
              className={`p-3 rounded-lg border-2 ${getSafetyColor(eadResult.po2)}`}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Depth (m)</p>
                  <p className="text-xl font-bold text-gray-900">
                    {eadResult.depth}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">O2 in Gas (%)</p>
                  <p className="text-xl font-bold text-gray-900">
                    {eadResult.o2}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">pO2 (ATA)</p>
                  <p
                    className={`text-xl font-bold ${getSafetyText(eadResult.po2)}`}
                  >
                    {eadResult.po2.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">EAD (m)</p>
                  <p className="text-xl font-bold text-gray-900">
                    {eadResult.eadCalc.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">EAD Safe (m)</p>
                  <p className="text-xl font-bold text-gray-900">
                    {eadResult.eadSafe !== null
                      ? eadResult.eadSafe.toFixed(1)
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">
                    Air Table To Use (m)
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {eadResult.airTable}
                  </p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-white rounded border">
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Dive Notes
                </h4>
                <p className="text-xs text-gray-700 mb-1">{eadResult.h2}</p>
                <p className="text-xs text-gray-700 mb-0.5">
                  <strong>{eadResult.h3}</strong>
                </p>
                <p className="text-xs text-gray-700">{eadResult.h4}</p>
              </div>
            </div>
          ) : eadDepth || eadO2 ? (
            <div className="p-3 rounded-lg border-2 border-red-200 bg-red-50">
              <p className="text-red-700 font-medium text-xs">
                No matching data found. Please check your depth and O2% inputs.
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-lg border-2 border-gray-200 bg-gray-50">
              <p className="text-gray-600 text-xs">
                Enter a depth and O2% to look up EAD data.
              </p>
            </div>
          )}

          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-semibold text-amber-900 text-sm mb-2">
              Instructions
            </h3>
            <ul className="space-y-1 text-xs text-amber-900">
              <li>
                • <strong>Depth:</strong> Enter the planned dive depth in meters
                (10–50 m)
              </li>
              <li>
                • <strong>O2 in Gas:</strong> Enter the oxygen percentage of
                your nitrox mix (30–40%)
              </li>
              <li>
                • <strong>pO2:</strong> Calculated partial pressure of oxygen at
                the given depth
              </li>
              <li>
                • <strong>EAD:</strong> The equivalent depth if you were
                breathing air instead of your nitrox mix
              </li>
              <li>
                • <strong>EAD Safe:</strong> A conservative EAD value for safer
                dive planning
              </li>
              <li>
                • <strong>Air Table To Use:</strong> The decompression table to
                reference from
              </li>
              <li>
                • <strong>Color Code:</strong> Green (pO2 ≤1.4 ATA - safe),
                Yellow (1.4–1.5 ATA - caution), Red (&gt;1.5 ATA - high risk)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
