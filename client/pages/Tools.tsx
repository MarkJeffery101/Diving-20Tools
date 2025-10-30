import { useState } from "react";
import { Plus, Trash2, RotateCcw, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { EAD_DATA } from "../lib/eadData";

interface CalculatorRow {
  id: string;
  depth_m: string;
  o2_percent: string;
  time_min?: string;
  pO2_ATA?: number;
  otu?: number;
  esot?: number;
}

interface EADCalculatorRow {
  id: string;
  depth_m: string;
  o2_percent: string;
  pO2_ATA?: number;
  eadCalc?: number;
  eadSafe?: number | null;
  safetyColor?: "green" | "yellow" | "red";
}

export default function Tools() {
  const [otuRows, setOtuRows] = useState<CalculatorRow[]>([
    { id: "1", depth_m: "", o2_percent: "", time_min: "" },
  ]);

  const [eadRows, setEadRows] = useState<EADCalculatorRow[]>([
    { id: "1", depth_m: "", o2_percent: "" },
  ]);

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

  const calculateEadRow = (row: EADCalculatorRow): EADCalculatorRow => {
    const depth = parseFloat(row.depth_m);
    const o2 = parseFloat(row.o2_percent);

    if (isNaN(depth) || isNaN(o2)) {
      return row;
    }

    const pO2 = (o2 / 100) * (depth / 10 + 1);
    let safetyColor: "green" | "yellow" | "red" = "green";
    if (pO2 > 1.5) {
      safetyColor = "red";
    } else if (pO2 > 1.4) {
      safetyColor = "yellow";
    }

    const matchedData = EAD_DATA.find(
      (row) => row.depth === depth && row.o2 === o2
    );

    return {
      ...row,
      pO2_ATA: parseFloat(pO2.toFixed(3)),
      eadCalc: matchedData?.eadCalc,
      eadSafe: matchedData?.eadSafe,
      safetyColor,
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

  const handleEadInputChange = (
    id: string,
    field: keyof Omit<EADCalculatorRow, "id" | "pO2_ATA" | "eadCalc" | "eadSafe" | "safetyColor">,
    value: string
  ) => {
    const updatedRows = eadRows.map((row) => {
      if (row.id === id) {
        const updated = { ...row, [field]: value };
        return calculateEadRow(updated);
      }
      return row;
    });

    setEadRows(updatedRows);

    const lastRow = updatedRows[updatedRows.length - 1];
    if (
      lastRow.depth_m &&
      lastRow.o2_percent &&
      updatedRows.length < 10 &&
      lastRow.eadCalc !== undefined
    ) {
      const newId = Math.max(...updatedRows.map((r) => parseInt(r.id)), 0) + 1;
      setEadRows([
        ...updatedRows,
        { id: newId.toString(), depth_m: "", o2_percent: "" },
      ]);
    }
  };

  const handleOtuDeleteRow = (id: string) => {
    if (otuRows.length > 1) {
      setOtuRows(otuRows.filter((row) => row.id !== id));
    }
  };

  const handleEadDeleteRow = (id: string) => {
    if (eadRows.length > 1) {
      setEadRows(eadRows.filter((row) => row.id !== id));
    }
  };

  const handleOtuReset = () => {
    setOtuRows([{ id: "1", depth_m: "", o2_percent: "", time_min: "" }]);
  };

  const handleEadReset = () => {
    setEadRows([{ id: "1", depth_m: "", o2_percent: "" }]);
  };

  const totalOTU = otuRows.reduce((sum, row) => sum + (row.otu || 0), 0);
  const totalESOT = otuRows.reduce((sum, row) => sum + (row.esot || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Calculator Tools
          </h1>
          <p className="text-gray-600">
            Professional diving calculation tools for planning and analysis
          </p>
        </div>

        {/* OTU/ESOT Calculator Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Segments OTU / ESOT
            </h2>
            <p className="text-gray-600">
              Calculate Oxygen Toxicity Units (OTU) and Equivalent Single Oxygen
              Exposure Time (ESOT) for dive segments
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Depth (m)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    O2 in Gas (%)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Exposure Time (min)
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    pO2 (ATA)
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    OTU
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    ESOT (min)
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {otuRows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={row.depth_m}
                        onChange={(e) =>
                          handleOtuInputChange(row.id, "depth_m", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={row.o2_percent}
                        onChange={(e) =>
                          handleOtuInputChange(row.id, "o2_percent", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={row.time_min}
                        onChange={(e) =>
                          handleOtuInputChange(row.id, "time_min", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700 font-medium">
                      {row.pO2_ATA !== undefined ? row.pO2_ATA.toFixed(3) : "—"}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700 font-medium">
                      {row.otu !== undefined ? row.otu.toFixed(1) : "—"}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700 font-medium">
                      {row.esot !== undefined ? row.esot.toFixed(1) : "—"}
                    </td>
                    <td className="px-4 py-3 text-center">
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

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-2">
                Total OTU
              </p>
              <p className="text-3xl font-bold text-blue-900">
                {totalOTU.toFixed(1)}
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <p className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-2">
                Total ESOT (min)
              </p>
              <p className="text-3xl font-bold text-green-900">
                {totalESOT.toFixed(1)}
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Row
              </button>
            )}
            <button
              onClick={handleOtuReset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>

          <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-semibold text-amber-900 mb-3">Instructions</h3>
            <ul className="space-y-2 text-sm text-amber-900">
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
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Equivalent Air Depth (EAD)
            </h2>
            <p className="text-gray-600">
              Calculate the Equivalent Air Depth (EAD) for nitrox gas mixtures
              at varying depths. This helps you determine the decompression
              requirements as if you were diving air at a shallower depth.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Depth (m)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    O2 in Gas (%)
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    pO2 (ATA)
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    EAD (m)
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    EAD Safe (m)
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {eadRows.map((row, index) => {
                  const safetyColor = row.safetyColor || "green";
                  const colorClass =
                    safetyColor === "red"
                      ? "bg-red-50"
                      : safetyColor === "yellow"
                        ? "bg-yellow-50"
                        : "bg-green-50";

                  return (
                    <tr
                      key={row.id}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={row.depth_m}
                          onChange={(e) =>
                            handleEadInputChange(row.id, "depth_m", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={row.o2_percent}
                          onChange={(e) =>
                            handleEadInputChange(row.id, "o2_percent", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className={`px-4 py-3 text-center text-gray-700 font-medium ${colorClass}`}>
                        {row.pO2_ATA !== undefined ? row.pO2_ATA.toFixed(3) : "—"}
                      </td>
                      <td className={`px-4 py-3 text-center text-gray-700 font-medium ${colorClass}`}>
                        {row.eadCalc !== undefined ? row.eadCalc.toFixed(1) : "—"}
                      </td>
                      <td className={`px-4 py-3 text-center text-gray-700 font-medium ${colorClass}`}>
                        {row.eadSafe !== undefined && row.eadSafe !== null
                          ? row.eadSafe.toFixed(1)
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {eadRows.length > 1 && (
                          <button
                            onClick={() => handleEadDeleteRow(row.id)}
                            className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete row"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex gap-4">
            {eadRows.length < 10 && (
              <button
                onClick={() => {
                  const newId = Math.max(
                    ...eadRows.map((r) => parseInt(r.id)),
                    0
                  ) + 1;
                  setEadRows([
                    ...eadRows,
                    { id: newId.toString(), depth_m: "", o2_percent: "" },
                  ]);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Row
              </button>
            )}
            <button
              onClick={handleEadReset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>

          <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-semibold text-amber-900 mb-3">Instructions</h3>
            <ul className="space-y-2 text-sm text-amber-900">
              <li>
                • <strong>Depth:</strong> Enter the planned dive depth in meters
              </li>
              <li>
                • <strong>O2 in Gas:</strong> Enter the oxygen percentage of your
                nitrox mix
              </li>
              <li>
                • <strong>pO2:</strong> Calculated partial pressure of oxygen at
                the given depth
              </li>
              <li>
                • <strong>EAD:</strong> The equivalent depth if you were breathing
                air instead of your nitrox mix
              </li>
              <li>
                • <strong>EAD Safe:</strong> A conservative EAD value for dive
                planning safety
              </li>
              <li>
                • <strong>Color Code:</strong> Green (pO2 ≤1.4 ATA - safe), Yellow
                (1.4-1.5 ATA - caution), Red (&gt;1.5 ATA - high risk)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
