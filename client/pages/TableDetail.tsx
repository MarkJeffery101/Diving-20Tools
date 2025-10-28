import Navigation from "@/components/Navigation";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getTableHeader, getAvailableDepths } from "@/lib/tableHeaders";
import { parseTableCSV, type ParsedTableData } from "@/lib/csvParser";
import { useState, useEffect } from "react";

export default function TableDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tableData, setTableData] = useState<ParsedTableData>({ dvis5Value: null, rows: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDepth, setSelectedDepth] = useState<number | null>(null);

  // Extract table code from id (e.g., "sil15" -> code: "SIL15")
  const code = id?.toUpperCase() || "";
  const queryDepth = searchParams.get("depth");
  const depthNum = queryDepth ? parseInt(queryDepth) : null;
  const headerConfig = getTableHeader(code);
  const availableDepths = getAvailableDepths(code);

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
                    <p className="text-xl sm:text-2xl font-bold text-blue-900">{tableData.dvis5Value !== null ? tableData.dvis5Value : '-'} min</p>
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
          <table className="w-full text-xs sm:text-sm" style={{ tableLayout: 'auto' }}>
            <thead className="sticky top-0 z-10 bg-gradient-to-b from-blue-700 to-blue-600 text-white shadow-md">
              <tr className="border-b border-gray-300">
                {headerConfig.columns.map((column, idx) => {
                  const hasNoSub = !column.sub || column.sub.length === 0;
                  return (
                    <th
                      key={idx}
                      className={`px-2 sm:px-3 py-2 sm:py-3 font-bold text-center ${hasNoSub ? 'bg-blue-800' : ''}`}
                      colSpan={column.sub ? column.sub.length : 1}
                      rowSpan={hasNoSub ? 2 : 1}
                      style={hasNoSub ? {
                        minWidth: idx === 0 || idx === 1 ? '70px' : idx >= headerConfig.columns.length - 3 ? '60px' : 'auto',
                        wordWrap: 'break-word',
                        whiteSpace: 'normal',
                        lineHeight: '1.1',
                        fontSize: '0.75rem'
                      } : { minWidth: '40px', fontSize: '0.7rem' }}
                    >
                      {column.label.split('\n').map((line, lineIdx) => (
                        <div key={lineIdx} className="leading-snug">{line}</div>
                      ))}
                    </th>
                  );
                })}
              </tr>

              {/* Sub-header row if needed */}
              {headerConfig.columns.some((col) => col.sub) && (
                <tr className="border-b-2 border-gray-300">
                  {headerConfig.columns.map((column, idx) => (
                    column.sub && column.sub.length > 0 ? (
                      column.sub.map((subCol, subIdx) => (
                        <th
                          key={`${idx}-${subIdx}`}
                          className="px-1 sm:px-2 py-1 sm:py-2 text-xs font-semibold border-r border-blue-500 last:border-r-0 text-center"
                          style={{ minWidth: '35px', wordWrap: 'break-word', whiteSpace: 'normal', lineHeight: '1.1' }}
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
                <tr className="border-b border-gray-200">
                  <td colSpan={totalColSpan} className="px-3 sm:px-4 py-8 text-center text-gray-500 italic text-sm">
                    Loading table data...
                  </td>
                </tr>
              ) : tableData.rows.length === 0 ? (
                <tr className="border-b border-gray-200">
                  <td colSpan={totalColSpan} className="px-3 sm:px-4 py-8 text-center text-gray-500 italic text-sm">
                    No data available for this depth
                  </td>
                </tr>
              ) : (
                tableData.rows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className={`border-b transition-colors duration-150 cursor-pointer ${
                      row.marker === 3
                        ? 'bg-red-50 hover:bg-red-100'
                        : rowIdx % 2 === 0
                          ? 'bg-white hover:bg-blue-50'
                          : 'bg-gray-50 hover:bg-blue-50'
                    }`}
                    style={{
                      borderBottom: row.marker === 2 ? '3px solid #1f2937' : '1px solid #e5e7eb',
                    }}
                  >
                    <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-center font-medium text-gray-900">{row.diveTime}</td>
                    <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-center text-gray-700">{row.tillFirstStop}</td>
                    {row.stopDepths.map((depth, depthIdx) => (
                      <td key={depthIdx} className="px-1 sm:px-2 py-1.5 sm:py-2 text-center text-gray-600">
                        {depth !== null ? <span className="font-medium">{depth}</span> : <span className="text-gray-400">—</span>}
                      </td>
                    ))}
                    <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-center font-medium text-gray-900">{row.totalDecoTime}</td>
                    <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-center text-gray-700">{row.totalOTU}</td>
                    <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-center text-gray-700">{row.totalESOT}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Table Information</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-3 sm:p-4 bg-white rounded border border-slate-200 hover:border-blue-300 transition-colors">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Code</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{code}</p>
            </div>
            {depth && (
              <div className="p-3 sm:p-4 bg-white rounded border border-slate-200 hover:border-blue-300 transition-colors">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Depth</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{depth}m</p>
              </div>
            )}
            <div className="p-3 sm:p-4 bg-white rounded border border-slate-200 hover:border-blue-300 transition-colors">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Main Columns</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{headerConfig.columns.length}</p>
            </div>
            {headerConfig.columns.some((col) => col.sub) && (
              <div className="p-3 sm:p-4 bg-white rounded border border-slate-200 hover:border-blue-300 transition-colors">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Sub-columns</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{
                  headerConfig.columns
                    .filter((col) => col.sub)
                    .reduce((total, col) => total + (col.sub?.length || 0), 0)
                }</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
