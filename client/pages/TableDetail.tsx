import Navigation from "@/components/Navigation";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getTableHeader } from "@/lib/tableHeaders";
import { useState } from "react";

export default function TableDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Extract table code and depth from id (e.g., "sil15-12" -> code: "SIL15", depth: "12")
  const parseTableId = (tableId: string) => {
    const parts = tableId?.split("-") || [];
    const depth = parts[parts.length - 1];
    const code = parts.slice(0, -1).join("-").toUpperCase();

    return { code, depth };
  };

  const { code, depth } = parseTableId(id || "");
  const headerConfig = getTableHeader(code);

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
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-ocean-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/tables")}
          className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-8 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tables
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {headerConfig.title}
          </h1>
          <div className="flex justify-between items-start gap-8">
            <div>
              {depth && (
                <p className="text-lg text-primary font-semibold mb-2">
                  Maximum Diving Depth: {depth}m
                </p>
              )}
              {showDvis5 && (
                <p className="text-lg text-primary font-semibold">
                  Dvis 5 time =
                </p>
              )}
            </div>
            <div className="text-sm text-foreground space-y-1">
              <p>Stop time starts after arrival at the stop.</p>
              <p>Maximum ascent speed is 10 metres per minute</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-border overflow-x-auto">
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

            {/* Data rows (placeholder - will be populated with CSV data) */}
            <tbody>
              <tr className="border-b border-border hover:bg-ocean-50">
                <td colSpan={headerConfig.columns.length} className="px-4 py-8 text-center text-muted-foreground italic">
                  Table data loading...
                </td>
              </tr>
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
