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
          {depth && (
            <p className="text-lg text-primary font-semibold">
              Depth: {depth}m
            </p>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-ocean-50">
                {headerConfig.columns.map((column, idx) => {
                  const hasNoSub = !column.sub || column.sub.length === 0;
                  return (
                    <th
                      key={idx}
                      className={`px-4 py-3 text-left font-bold text-foreground ${hasNoSub ? 'bg-ocean-25' : ''}`}
                      colSpan={column.sub ? column.sub.length : 1}
                      rowSpan={hasNoSub ? 2 : 1}
                      style={hasNoSub ? { maxWidth: '80px', wordWrap: 'break-word', whiteSpace: 'normal' } : {}}
                    >
                      {column.label}
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
                          className="px-4 py-2 text-xs font-semibold text-foreground border-r border-border last:border-r-0"
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
