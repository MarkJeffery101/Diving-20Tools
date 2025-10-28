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

  // Initialize selected depth from URL or use first available depth
  useEffect(() => {
    if (depthNum) {
      setSelectedDepth(depthNum);
    } else if (availableDepths && availableDepths.length > 0) {
      setSelectedDepth(availableDepths[0]);
    }
  }, [depthNum, availableDepths]);

  // Load CSV data when selected depth changes
  useEffect(() => {
    const loadData = async () => {
      if (code && selectedDepth && headerConfig) {
        setIsLoading(true);
        const data = await parseTableCSV(code, selectedDepth);
        setTableData(data);
        setIsLoading(false);
      }
    };

    loadData();
  }, [code, selectedDepth, headerConfig]);

  // Handle depth selection and URL update
  const handleDepthChange = (depth: number) => {
    setSelectedDepth(depth);
    navigate(`/tables/${id}?depth=${depth}`, { replace: false });
  };

  // Calculate total colspan for the table
  const totalColSpan = headerConfig ?
    headerConfig.columns.reduce((sum, col) => sum + (col.sub ? col.sub.length : 1), 0)
    : 0;

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
        {/* Header with Back Button */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/tables")}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-200 transition-colors text-gray-700 flex-shrink-0"
            title="Back to Tables"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {headerConfig.title}
            </h1>
          </div>
        </div>

        {/* Depth Selector */}
        {availableDepths && availableDepths.length > 0 && (
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Select Depth</p>
            <div className="flex flex-wrap gap-2">
              {availableDepths.map((depth) => (
                <button
                  key={depth}
                  onClick={() => handleDepthChange(depth)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all border-2 ${
                    selectedDepth === depth
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  {depth}m
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto shadow-sm hover:shadow-md transition-shadow mb-8">
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
