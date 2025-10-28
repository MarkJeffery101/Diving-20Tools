import Navigation from "@/components/Navigation";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getTableHeader } from "@/lib/tableHeaders";
import { parseTableCSV, type ParsedTableData } from "@/lib/csvParser";
import { useState, useEffect } from "react";

export default function TableDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<ParsedTableData>({ dvis5Value: null, rows: [] });
  const [isLoading, setIsLoading] = useState(true);

  // Extract table code and depth from id (e.g., "sil15-12" -> code: "SIL15", depth: "12")
  const parseTableId = (tableId: string) => {
    const parts = tableId?.split("-") || [];
    const depth = parts[parts.length - 1];
    const code = parts.slice(0, -1).join("-").toUpperCase();

    return { code, depth };
  };

  const { code, depth } = parseTableId(id || "");
  const depthNum = parseInt(depth);
  const headerConfig = getTableHeader(code);

  // Calculate total colspan for the table
  const totalColSpan = headerConfig ?
    headerConfig.columns.reduce((sum, col) => sum + (col.sub ? col.sub.length : 1), 0)
    : 0;

  // Load CSV data when component mounts or code/depth changes
  useEffect(() => {
    const loadData = async () => {
      if (code && depthNum && headerConfig) {
        setIsLoading(true);
        const data = await parseTableCSV(code, depthNum);
        setTableData(data);
        setIsLoading(false);
      }
    };

    loadData();
  }, [code, depthNum, headerConfig]);

  // Tables that require Dvis 5 time information
  const tablesWithDvis5 = ['SIL15', 'H2SIL15', 'H4SIL15', 'SOX15', 'HSOX15', 'NIA15', 'H2NIA15', 'H4NIA15', 'NIB15', 'H2NIB15', 'H4NIB15', 'BOX15'];
  const showDvis5 = tablesWithDvis5.includes(code);

  // Tables that require Equivalent Air Depth and Maximum PO2 information
  const tablesWithNitroxInfo = ['NIA15', 'NIA 2-3', 'NIA 2-6', 'H2NIA15', 'H4NIA15', 'NIB15', 'H2NIB15', 'H4NIB15'];
  const showNitroxInfo = tablesWithNitroxInfo.includes(code);

  if (!headerConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <p className="text-center text-lg text-muted-foreground">
            Table not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Navigation />

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/tables")}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6 font-medium text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tables
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {headerConfig.title}
          </h1>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Left: Depth Info */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-5 border border-blue-200">
              <div className="space-y-3">
                {depth && (
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wide">Maximum Diving Depth</p>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-900">{depth}m</p>
                  </div>
                )}
                {showDvis5 && (
                  <div className="pt-2 border-t border-blue-200">
                    <p className="text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wide">Dvis 5 Time Limit</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-900">{tableData.dvis5Value !== null ? tableData.dvis5Value : '-'} sec</p>
                  </div>
                )}
              </div>
            </div>

            {/* Center: Nitrox Info */}
            {showNitroxInfo && (
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 sm:p-5 border border-amber-200">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-amber-700 uppercase tracking-wide">Equivalent Air Depth</p>
                    <p className="text-xl sm:text-2xl font-bold text-amber-900">— m/sw</p>
                  </div>
                  <div className="pt-2 border-t border-amber-200">
                    <p className="text-xs sm:text-sm font-semibold text-amber-700 uppercase tracking-wide">Maximum PO₂</p>
                    <p className="text-xl sm:text-2xl font-bold text-amber-900">—</p>
                  </div>
                </div>
              </div>
            )}

            {/* Right: Safety Info */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 sm:p-5 border border-green-200">
              <p className="text-xs sm:text-sm font-semibold text-green-700 uppercase tracking-wide mb-2">Safety Guidelines</p>
              <ul className="space-y-2 text-xs sm:text-sm text-green-900">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-green-600 mt-0.5">•</span>
                  <span>Stop time starts after arrival at the stop</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-green-600 mt-0.5">•</span>
                  <span>Maximum ascent speed is 10 m/min</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto shadow-sm hover:shadow-md transition-shadow">
          <table className="w-full text-sm" style={{ tableLayout: 'auto' }}>
            <thead>
              <tr className="border-b border-border bg-ocean-50">
                {headerConfig.columns.map((column, idx) => {
                  const hasNoSub = !column.sub || column.sub.length === 0;
                  return (
                    <th
                      key={idx}
                      className={`px-4 py-3 font-bold text-foreground ${hasNoSub ? 'bg-ocean-25 text-center' : 'text-center'}`}
                      colSpan={column.sub ? column.sub.length : 1}
                      rowSpan={hasNoSub ? 2 : 1}
                      style={hasNoSub ? {
                        minWidth: idx === 0 || idx === 1 ? '80px' : idx >= headerConfig.columns.length - 3 ? '70px' : 'auto',
                        wordWrap: 'break-word',
                        whiteSpace: 'normal',
                        lineHeight: '1.2'
                      } : { minWidth: '50px' }}
                    >
                      {column.label.split('\n').map((line, lineIdx) => (
                        <div key={lineIdx}>{line}</div>
                      ))}
                    </th>
                  );
                })}
              </tr>

              {/* Sub-header row if needed */}
              {headerConfig.columns.some((col) => col.sub) && (
                <tr className="border-b-2 border-border bg-ocean-25">
                  {headerConfig.columns.map((column, idx) => (
                    column.sub && column.sub.length > 0 ? (
                      column.sub.map((subCol, subIdx) => (
                        <th
                          key={`${idx}-${subIdx}`}
                          className="px-2 py-2 text-xs font-semibold text-foreground border-r border-border last:border-r-0 text-center"
                          style={{ minWidth: '45px', wordWrap: 'break-word', whiteSpace: 'normal', lineHeight: '1.2' }}
                        >
                          {subCol}
                        </th>
                      ))
                    ) : null
                  ))}
                </tr>
              )}
            </thead>

            {/* Data rows */}
            <tbody>
              {isLoading ? (
                <tr className="border-b border-border hover:bg-ocean-50">
                  <td colSpan={totalColSpan} className="px-4 py-8 text-center text-muted-foreground italic">
                    Loading table data...
                  </td>
                </tr>
              ) : tableData.rows.length === 0 ? (
                <tr className="border-b border-border hover:bg-ocean-50">
                  <td colSpan={totalColSpan} className="px-4 py-8 text-center text-muted-foreground italic">
                    No data available for this depth
                  </td>
                </tr>
              ) : (
                tableData.rows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="hover:bg-ocean-50"
                    style={{
                      backgroundColor: row.marker === 3 ? '#FFE8E8' : undefined,
                      borderBottom: row.marker === 2 ? '3px solid #000' : '1px solid var(--border)',
                    }}
                  >
                    <td className="px-4 py-2 text-center">{row.diveTime}</td>
                    <td className="px-4 py-2 text-center">{row.tillFirstStop}</td>
                    {row.stopDepths.map((depth, depthIdx) => (
                      <td key={depthIdx} className="px-2 py-2 text-center">
                        {depth !== null ? depth : '-'}
                      </td>
                    ))}
                    <td className="px-4 py-2 text-center">{row.totalDecoTime}</td>
                    <td className="px-4 py-2 text-center">{row.totalOTU}</td>
                    <td className="px-4 py-2 text-center">{row.totalESOT}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="font-bold text-blue-900 mb-3">Table Information</h2>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <span className="font-semibold">Code:</span> {code}</li>
            {depth && <li>• <span className="font-semibold">Depth:</span> {depth}m</li>}
            <li>• <span className="font-semibold">Columns:</span> {headerConfig.columns.length}</li>
            {headerConfig.columns.some((col) => col.sub) && (
              <li>• <span className="font-semibold">Sub-columns:</span> {
                headerConfig.columns
                  .filter((col) => col.sub)
                  .reduce((total, col) => total + (col.sub?.length || 0), 0)
              }</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
