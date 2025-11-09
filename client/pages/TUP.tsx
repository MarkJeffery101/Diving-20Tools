import { useTupCalculator } from "@/lib/useTupCalculator";
import { DECOMPRESSION_STOPS } from "@/lib/tupCalculator";
import Navigation from "@/components/Navigation";
import { Info } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export default function TUP() {
  const {
    inputs,
    setInputs,
    outputs,
    filteredRecords,
    statusMessage,
    selfTestResult,
    selectedRowIndex,
    setSelectedRowIndex,
    matchingMessage,
    setMatchingMessage,
  } = useTupCalculator();

  const [o2InputMessage, setO2InputMessage] = useState<string>("");

  const validO2Values = [21, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

  const handleInputChange = (
    field: "maxDepth" | "o2" | "diveTime",
    value: string,
  ) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleO2Blur = () => {
    if (inputs.o2 === "") {
      setO2InputMessage("");
      return;
    }

    const num = parseInt(inputs.o2);
    if (isNaN(num) || !validO2Values.includes(num)) {
      setO2InputMessage("ONLT 21 AND 30 - 40 MAY BE USED");
    } else {
      setO2InputMessage("");
    }
  };

  const handleO2ArrowKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();

    const currentVal = inputs.o2 ? parseInt(inputs.o2) : null;
    let newValue: number | null = null;

    if (e.key === "ArrowUp") {
      if (currentVal === null || currentVal < 21) {
        newValue = 21;
      } else if (currentVal === 21) {
        newValue = 30;
      } else if (currentVal < 40) {
        newValue = currentVal + 1;
      } else {
        newValue = 40;
      }
    } else if (e.key === "ArrowDown") {
      if (currentVal === null || currentVal > 40) {
        newValue = 40;
      } else if (currentVal === 30) {
        newValue = 21;
      } else if (currentVal > 21 && currentVal <= 40) {
        newValue = currentVal - 1;
      } else {
        newValue = 21;
      }
    }

    if (newValue !== null && validO2Values.includes(newValue)) {
      setInputs((prev) => ({ ...prev, o2: newValue!.toString() }));
      setO2InputMessage("");
    }
  };

  const handleRowClick = (idx: number) => {
    setSelectedRowIndex(idx);
    const record = filteredRecords[idx];
    if (!record) return;

    const recordTime = Number(record["BottomTime Min"]);
    setInputs((prev) => ({ ...prev, diveTime: recordTime.toString() }));
    setMatchingMessage(`Selected table row: ${recordTime} min bottom time`);
  };

  return (
    <div className="min-h-screen bg-page-bg text-text-dark">
      <Navigation />

      <section className="py-2 md:py-3 px-4 bg-card-bg border-b border-border">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-0.5">
            Air - Oxygen decompression tables for TUP diving on Air
          </h1>
          <p className="text-xs md:text-sm text-text-muted mb-2">
            Repetitive interval is 16 Hours
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs text-text-muted mb-2">
            <div>
              <p className="font-semibold">
                Pressure in msw&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Time in minutes
              </p>
            </div>
            <div>
              <p className="font-semibold">
                Ascent speed is 10 msw/min&nbsp; &nbsp; &nbsp; &nbsp; Stop time starts at arrival at the stop
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-3 md:py-4 px-4 bg-page-bg">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
            {/* Inputs */}
            <div className="bg-card-bg border border-border rounded-lg p-2 md:p-3">
              <h2 className="text-base md:text-lg font-bold mb-1.5 text-text-dark">
                Inputs
              </h2>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs md:text-sm font-semibold text-text-dark flex items-center min-w-0">
                    Maximum Diving Depth (m/sw)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-2 inline-block w-4 h-4 text-text-muted flex-shrink-0">
                          <Info className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Actual depth in meters</TooltipContent>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    value={inputs.maxDepth}
                    onChange={(e) =>
                      handleInputChange("maxDepth", e.target.value)
                    }
                    className="w-20 md:w-24 px-2 py-1 bg-page-bg border border-border rounded text-text-dark text-sm text-right focus:outline-none focus:ring-2 focus:ring-accent flex-shrink-0"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-xs md:text-sm font-semibold text-text-dark flex items-center min-w-0">
                    Nitrox O2 (%)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-2 inline-block w-4 h-4 text-text-muted flex-shrink-0">
                          <Info className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Oxygen percentage in mix</TooltipContent>
                    </Tooltip>
                  </label>
                    <input
                      type="number"
                      value={inputs.o2}
                      onChange={(e) => handleInputChange("o2", e.target.value)}
                      onKeyDown={handleO2ArrowKey}
                      onBlur={handleO2Blur}
                      className="w-20 md:w-24 px-2 py-1 bg-page-bg border border-border rounded text-text-dark text-sm text-right focus:outline-none focus:ring-2 focus:ring-accent flex-shrink-0"
                    />
                  </div>
                  {o2InputMessage && (
                    <div className="mt-1 text-xs text-red-600 text-right">
                      {o2InputMessage}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs md:text-sm font-semibold text-text-dark flex items-center min-w-0">
                    Dive Time (min)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-2 inline-block w-4 h-4 text-text-muted flex-shrink-0">
                          <Info className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Planned dive time in minutes</TooltipContent>
                    </Tooltip>
                  </label>
                  <input
                    type="number"
                    value={inputs.diveTime}
                    onChange={(e) =>
                      handleInputChange("diveTime", e.target.value)
                    }
                    className="w-20 md:w-24 px-2 py-1 bg-page-bg border border-border rounded text-text-dark text-sm text-right focus:outline-none focus:ring-2 focus:ring-accent flex-shrink-0"
                  />
                </div>
              </div>
            </div>

            {/* Outputs */}
            <div className="bg-card-bg border border-border rounded-lg p-2 md:p-3">
              <h2 className="text-base md:text-lg font-bold mb-1.5 text-text-dark">
                Outputs
              </h2>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs text-text-muted font-semibold flex items-center min-w-0">
                    EAD Calculated, Safety Margin Added (m/sw)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-2 inline-block w-3 h-3 flex-shrink-0">
                          <Info className="w-3 h-3" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>EAD + safety Factor</TooltipContent>
                    </Tooltip>
                  </label>
                  <div className="text-base md:text-lg font-bold text-text-dark text-right flex-shrink-0">
                    {outputs.bellDepth || "—"}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs text-text-muted font-semibold flex items-center min-w-0">
                    PO2 at Diving Depth (bar/abs)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-2 inline-block w-3 h-3 flex-shrink-0">
                          <Info className="w-3 h-3" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Partial pressure of oxygen at depth</TooltipContent>
                    </Tooltip>
                  </label>
                  <div
                    className={`text-base md:text-lg font-bold px-2 py-1 rounded text-right flex-shrink-0 ${outputs.po2BgClass}`}
                  >
                    {outputs.po2 || "—"}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs text-text-muted font-semibold flex items-center min-w-0">
                    IMCA TUP Max Bottom Time (min)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-2 inline-block w-3 h-3 flex-shrink-0">
                          <Info className="w-3 h-3" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Maximum safe bottom time</TooltipContent>
                    </Tooltip>
                  </label>
                  <div className="text-sm font-bold text-text-dark text-right whitespace-nowrap flex-shrink-0">
                    {outputs.dmac || "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exposure Sections */}
          {selectedRowIndex !== null && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
              <div className="bg-card-bg border border-border rounded-lg p-2 md:p-3 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-2">
                  <h3 className="font-bold text-text-dark mb-2 md:mb-0">
                    Bellman's Exposure
                  </h3>
                  <div className="flex gap-4 md:gap-6">
                    <div className="flex gap-2">
                      <span className="text-text-muted text-xs">ESOT</span>
                      <span className="font-bold text-sm">
                        {outputs.bellmanEsot || "—"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-text-muted text-xs">OTU</span>
                      <span className="font-bold text-sm">
                        {outputs.bellmanOtu || "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-2">
                  <h3 className="font-bold text-text-dark mb-2 md:mb-0">
                    Diver's Exposure
                  </h3>
                  <div className="flex gap-4 md:gap-6">
                    <div className="flex gap-2">
                      <span className="text-text-muted text-xs">ESOT</span>
                      <span className="font-bold text-sm">
                        {outputs.diversEsot || "—"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-text-muted text-xs">OTU</span>
                      <span className="font-bold text-sm">
                        {outputs.diversOtu || "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-card-bg border border-border rounded-lg p-2 md:p-3 cursor-help">
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <h3 className="font-bold text-text-dark">Table to Use</h3>
                      <div className="text-xl md:text-2xl font-bold text-text-dark">
                        {outputs.tableDepth || "—"} msw
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-xs">
                  <div className="space-y-2 text-xs">
                    <p><strong>Table Selection:</strong> The decompression table depth is determined by the safety EAD. If EAD falls between table depths, the next deeper table is selected.</p>
                    <p><strong>Time Selection:</strong> If dive time falls between table times, the yellow highlighted row shows the next longer time increment available in the table.</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          )}

          {/* Table Info / Matching Messages */}
          {matchingMessage ? (
            <div className="mb-3 p-2 md:p-3 bg-blue-50 border border-blue-300 rounded text-sm text-blue-900">
              <p><strong>Table Match:</strong> {matchingMessage}</p>
            </div>
          ) : (
            <div className="mb-3 p-2 md:p-3 bg-card-bg border border-border rounded text-xs text-text-muted space-y-1.5">
              <p>
                <strong>Table Selection:</strong> The decompression table depth is determined by the safety EAD. If EAD falls between table depths, the next deeper table is selected.
              </p>
              <p>
                <strong>Time Selection:</strong> If dive time falls between table times, the yellow highlighted row shows the next longer time increment available in the table.
              </p>
            </div>
          )}

          {/* Decompression Table */}
          {filteredRecords.length > 0 && (
            <div className="bg-card-bg border border-border rounded-lg overflow-hidden -mx-4 md:mx-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                  <thead className="bg-gray-400 border-b border-border sticky top-0">
                    <tr>
                      <th className="px-1 md:px-3 py-1 md:py-2 text-left font-semibold text-[9px] md:text-xs">
                        Depth
                      </th>
                      <th className="px-1 md:px-3 py-1 md:py-2 text-center font-semibold text-[9px] md:text-xs">
                        Bottom
                      </th>
                      <th className="px-0.5 md:px-3 py-1 md:py-2 text-center font-semibold text-[8px] md:text-xs">
                        1st Stop
                      </th>
                      {DECOMPRESSION_STOPS.map((stop) => {
                        const isOxygen = stop.column.includes("Oxygen");
                        const headerClass = isOxygen ? "bg-blue-300" : "";
                        return (
                          <th
                            key={stop.column}
                            className={`px-0.5 md:px-2 py-1 md:py-2 text-center font-semibold text-[7px] md:text-[11px] whitespace-nowrap ${headerClass}`}
                          >
                            {stop.column === "15 Air TUP"
                              ? "15A"
                              : stop.column.replace(/\s+/g, "").substring(0, 4)}
                          </th>
                        );
                      })}
                      <th className="px-1 md:px-3 py-1 md:py-2 text-center font-semibold text-[9px] md:text-xs">
                        <span className="md:hidden">Deco</span>
                        <span className="hidden md:inline">Total Deco</span>
                      </th>
                      <th className="px-0.5 md:px-3 py-1 md:py-2 text-center font-semibold text-[9px] md:text-xs hidden">
                        OTU
                      </th>
                      <th className="px-0.5 md:px-3 py-1 md:py-2 text-center font-semibold text-[9px] md:text-xs hidden">
                        ESOT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record, idx) => {
                      const diveTime = Number(inputs.diveTime);
                      const recordTime = Number(record["BottomTime Min"]);
                      const flagColor =
                        record._flag === 1
                          ? "bg-green-100"
                          : record._flag === 2
                            ? "bg-pink-100"
                            : record._flag === 3
                              ? "bg-red-100"
                              : "";
                      const boldBorder =
                        record._flag === 2
                          ? "border-b-4 border-red-600"
                          : "border-b border-border";
                      const isSelected = idx === selectedRowIndex;
                      const isMatchingRow = diveTime > 0 && recordTime >= diveTime && (idx === 0 || Number(filteredRecords[idx - 1]["BottomTime Min"]) < diveTime);
                      return (
                        <tr
                          key={idx}
                          onClick={() => handleRowClick(idx)}
                          className={`${boldBorder} cursor-pointer hover:bg-gray-800 transition-colors ${flagColor} ${isMatchingRow ? "bg-yellow-100" : ""} ${isSelected ? "ring-2 ring-accent" : ""}`}
                        >
                          <td className="px-1 md:px-3 py-1 md:py-2 font-semibold text-[8px] md:text-xs">
                            {record["Depth(m/sw)"]}
                          </td>
                          <td className="px-1 md:px-3 py-1 md:py-2 text-center text-[8px] md:text-xs">
                            {record["BottomTime Min"]}
                          </td>
                          <td className="px-0.5 md:px-3 py-1 md:py-2 text-center text-[7px] md:text-xs">
                            {record["Time till(1st stop Min)"]}
                          </td>
                          {DECOMPRESSION_STOPS.map((stop) => (
                            <td
                              key={stop.column}
                              className="px-0.5 md:px-2 py-1 md:py-2 text-center text-[7px] md:text-xs"
                            >
                              {record[stop.column]
                                ? String(record[stop.column])
                                : ""}
                            </td>
                          ))}
                          <td className="px-1 md:px-3 py-1 md:py-2 text-center font-semibold text-[8px] md:text-xs">
                            {record["Total DecoTime Min"]}
                          </td>
                          <td className="px-0.5 md:px-3 py-1 md:py-2 text-center font-semibold text-[8px] md:text-xs hidden">
                            {record["TotalOTU"]}
                          </td>
                          <td className="px-0.5 md:px-3 py-1 md:py-2 text-center font-semibold text-[8px] md:text-xs hidden">
                            {record["TotalESOT"]}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-2 md:px-4 py-1 md:py-3 bg-gray-800 border-t border-border text-[10px] md:text-xs text-text-muted">
                <p>
                  <span className="inline-block w-3 h-3 md:w-4 md:h-4 bg-flag-green mr-1 md:mr-2 rounded"></span>
                  <span className="text-[8px] md:text-xs">
                    Green (pO2 ≤ 1.39)
                  </span>
                  <span className="mx-1">|</span>
                  <span className="inline-block w-3 h-3 md:w-4 md:h-4 bg-flag-pink mr-1 md:mr-2 rounded"></span>
                  <span className="text-[8px] md:text-xs">
                    Amber (1.40-1.49)
                  </span>
                  <span className="mx-1">|</span>
                  <span className="inline-block w-3 h-3 md:w-4 md:h-4 bg-flag-red mr-1 md:mr-2 rounded"></span>
                  <span className="text-[8px] md:text-xs">
                    Red (pO2 ≥ 1.50)
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
