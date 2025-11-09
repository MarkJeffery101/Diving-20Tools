import { useTupCalculator } from "@/lib/useTupCalculator";
import { DECOMPRESSION_STOPS } from "@/lib/tupCalculator";
import Navigation from "@/components/Navigation";
import { Info } from "lucide-react";

export default function TUP() {
  const {
    inputs, setInputs,
    outputs,
    filteredRecords,
    statusMessage,
    selfTestResult,
    selectedRowIndex, setSelectedRowIndex
  } = useTupCalculator();

  const handleInputChange = (field: 'maxDepth' | 'o2' | 'diveTime', value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-page-bg text-text-dark">
      <Navigation />

      <section className="py-6 px-4 bg-card-bg border-b border-border">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold mb-1">
            Air - Oxygen decompression tables for TUP diving on Air
          </h1>
          <p className="text-sm text-text-muted mb-3">
            Repetitive interval is 16 Hours
          </p>
          <div className="grid grid-cols-3 gap-4 text-xs text-text-muted mb-4">
            <div>
              <p className="font-semibold">Pressure in msw</p>
              <p>Stop time starts after arrival at the stop</p>
            </div>
            <div>
              <p className="font-semibold">Time in minutes and tenths of minutes</p>
            </div>
            <div>
              <p className="font-semibold">Ascent speed is 10 msw/min</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-page-bg">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Inputs */}
            <div className="bg-card-bg border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4 text-text-dark">Inputs</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-sm font-semibold text-text-dark flex items-center">
                    Maximum Dive Depth
                    <button className="ml-2 inline-block w-4 h-4 text-text-muted" title="Actual depth in meters">
                      <Info className="w-4 h-4" />
                    </button>
                  </label>
                  <input
                    type="number"
                    value={inputs.maxDepth}
                    onChange={(e) => handleInputChange('maxDepth', e.target.value)}
                    className="w-24 px-2 py-1 bg-page-bg border border-border rounded text-text-dark text-sm text-right focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="text-sm font-semibold text-text-dark flex items-center">
                    Nitrox O2%
                    <button className="ml-2 inline-block w-4 h-4 text-text-muted" title="Oxygen percentage in mix">
                      <Info className="w-4 h-4" />
                    </button>
                  </label>
                  <input
                    type="number"
                    value={inputs.o2}
                    onChange={(e) => handleInputChange('o2', e.target.value)}
                    className="w-24 px-2 py-1 bg-page-bg border border-border rounded text-text-dark text-sm text-right focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="text-sm font-semibold text-text-dark flex items-center">
                    Dive Time
                    <button className="ml-2 inline-block w-4 h-4 text-text-muted" title="Planned dive time in minutes">
                      <Info className="w-4 h-4" />
                    </button>
                  </label>
                  <input
                    type="number"
                    value={inputs.diveTime}
                    onChange={(e) => handleInputChange('diveTime', e.target.value)}
                    className="w-24 px-2 py-1 bg-page-bg border border-border rounded text-text-dark text-sm text-right focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            </div>

            {/* Outputs */}
            <div className="bg-card-bg border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4 text-text-dark">Outputs</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs text-text-muted font-semibold flex items-center">
                    EAD Calculated, safety margin added, closest table below
                    <button className="ml-2 inline-block w-3 h-3" title="Equivalent Air Depth">
                      <Info className="w-3 h-3" />
                    </button>
                  </label>
                  <div className="text-lg font-bold text-text-dark text-right min-w-max">{outputs.bellDepth || '—'}</div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs text-text-muted font-semibold flex items-center">
                    PO2 at Diving Depth
                    <button className="ml-2 inline-block w-3 h-3" title="Partial pressure of oxygen at depth">
                      <Info className="w-3 h-3" />
                    </button>
                  </label>
                  <div className={`text-lg font-bold px-2 py-1 rounded text-right min-w-max ${outputs.po2BgClass}`}>
                    {outputs.po2 || '—'}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs text-text-muted font-semibold flex items-center">
                    IMCA TUP Max Bottom Time
                    <button className="ml-2 inline-block w-3 h-3" title="Maximum safe bottom time">
                      <Info className="w-3 h-3" />
                    </button>
                  </label>
                  <div className="text-sm font-bold text-text-dark text-right min-w-max">{outputs.dmac || '—'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Exposure Sections */}
          {selectedRowIndex !== null && (
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-card-bg border border-border rounded-lg p-6">
                <h3 className="font-bold text-text-dark mb-3">Bellman's Exposure</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-muted">ESOT</span>
                    <span className="font-bold">{outputs.bellmanEsot || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">OTU</span>
                    <span className="font-bold">{outputs.bellmanOtu || '—'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card-bg border border-border rounded-lg p-6">
                <h3 className="font-bold text-text-dark mb-3">Diver's Exposure</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-muted">ESOT</span>
                    <span className="font-bold">{outputs.diversEsot || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">OTU</span>
                    <span className="font-bold">{outputs.diversOtu || '—'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status Bar */}
          <div className="mb-6 p-3 bg-card-bg border border-border rounded text-xs text-text-muted">
            {statusMessage}
            {selfTestResult.passed && <span className="ml-2 text-ok-bg">��� {selfTestResult.message}</span>}
            {!selfTestResult.passed && <span className="ml-2 text-bad-bg">✗ {selfTestResult.message}</span>}
          </div>

          {/* Decompression Table */}
          {filteredRecords.length > 0 && (
            <div className="bg-card-bg border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-400 border-b border-border sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Depth msw</th>
                      <th className="px-3 py-2 text-center font-semibold">Bottom Time Min</th>
                      <th className="px-3 py-2 text-center font-semibold">Time till 1st Stop Min</th>
                      {DECOMPRESSION_STOPS.map(stop => {
                        const isOxygen = stop.column.includes('Oxygen');
                        const headerClass = isOxygen ? 'bg-blue-300' : '';
                        return (
                          <th key={stop.column} className={`px-2 py-2 text-center font-semibold text-[11px] whitespace-nowrap ${headerClass}`}>
                            {stop.column === '15 Air TUP' ? '15 Air' : stop.column}
                          </th>
                        );
                      })}
                      <th className="px-3 py-2 text-center font-semibold">Total Deco Time Min</th>
                      <th className="px-3 py-2 text-center font-semibold">Total OTU</th>
                      <th className="px-3 py-2 text-center font-semibold">Total ESOT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record, idx) => {
                      const flagColor = record._flag === 1 ? 'bg-green-100' : record._flag === 2 ? 'bg-pink-100' : record._flag === 3 ? 'bg-red-100' : '';
                      const boldBorder = record._flag === 2 ? 'border-b-4 border-red-600' : 'border-b border-border';
                      const isSelected = idx === selectedRowIndex;
                      return (
                        <tr
                          key={idx}
                          onClick={() => setSelectedRowIndex(idx)}
                          className={`${boldBorder} cursor-pointer hover:bg-gray-800 transition-colors ${flagColor} ${isSelected ? 'ring-2 ring-accent' : ''}`}
                        >
                          <td className="px-3 py-2 font-semibold">{record['Depth(m/sw)']}</td>
                          <td className="px-3 py-2 text-center">{record['BottomTime Min']}</td>
                          <td className="px-3 py-2 text-center">{record['Time till(1st stop Min)']}</td>
                          {DECOMPRESSION_STOPS.map(stop => (
                            <td key={stop.column} className="px-2 py-2 text-center">
                              {record[stop.column] ? String(record[stop.column]) : ''}
                            </td>
                          ))}
                          <td className="px-3 py-2 text-center font-semibold">{record['Total DecoTime Min']}</td>
                          <td className="px-3 py-2 text-center font-semibold">{record['TotalOTU']}</td>
                          <td className="px-3 py-2 text-center font-semibold">{record['TotalESOT']}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 bg-gray-800 border-t border-border text-xs text-text-muted">
                <p>
                  <span className="inline-block w-4 h-4 bg-flag-green mr-2 rounded"></span>Green (pO2 ≤ 1.39) |
                  <span className="inline-block w-4 h-4 bg-flag-pink mr-2 ml-2 rounded"></span>Amber (1.40-1.49) |
                  <span className="inline-block w-4 h-4 bg-flag-red mr-2 ml-2 rounded"></span>Red (pO2 ≥ 1.50)
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
