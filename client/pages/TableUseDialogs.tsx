import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface ProcedureData {
  title: string;
  icon?: React.ReactNode;
  badgeColor: string;
  badgeText: string;
  warning: boolean;
  warningText?: string;
  content: (
    | string
    | { type: "title" | "item" | "list" | "section"; text: string }
  )[];
}

interface TreatmentTableType {
  id: string;
  code: string;
  name: string;
  useFor: string;
  keyParameters: string[];
  schedule: Array<{
    depth: string;
    time: string;
    gas?: string;
    total: string;
    otuOrOther?: string;
  }>;
  headerBgColor: string;
  scheduleColumns: string[];
}

export const ProcedureDialog = React.memo(
  ({
    procedure,
    label,
    tableId,
  }: {
    procedure: ProcedureData;
    label: string;
    tableId: string;
  }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="xs"
          className="h-7 px-3 text-xs justify-center"
        >
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-xl">{procedure.title}</DialogTitle>
            <Badge className={`${procedure.badgeColor} text-white shrink-0`}>
              {procedure.badgeText}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {procedure.warning && (
            <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-orange-800 font-medium">
                  {procedure.warningText}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {procedure.content.map((item, idx) => {
              if (typeof item === "string") {
                return (
                  <p key={idx} className="text-sm text-gray-700">
                    {item}
                  </p>
                );
              }

              if (item.type === "title") {
                return (
                  <div key={idx} className="flex gap-3 items-start text-sm">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 pt-0.5">{item.text}</p>
                  </div>
                );
              }

              if (item.type === "section") {
                return (
                  <p
                    key={idx}
                    className="text-sm font-bold text-orange-600 mt-4 mb-2"
                  >
                    {item.text}
                  </p>
                );
              }

              return (
                <p key={idx} className="text-sm text-gray-700 ml-4">
                  • {item.text}
                </p>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
);

ProcedureDialog.displayName = "ProcedureDialog";

export const TreatmentTableDialog = React.memo(
  ({ table }: { table: TreatmentTableType }) => (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-3 rounded border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-left h-full">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-semibold text-sm text-gray-900">
                {table.name}
              </h4>
              <Badge className="text-xs font-mono h-6 flex-shrink-0">
                {table.code}
              </Badge>
            </div>
            <p className="text-xs text-gray-600">{table.useFor}</p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-xl">{table.name}</DialogTitle>
            <Badge className="text-xs font-mono h-6">{table.code}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-2">
              Use For:
            </h4>
            <p className="text-sm text-gray-700">{table.useFor}</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-2">
              Key Parameters:
            </h4>
            <ul className="text-xs text-gray-700 space-y-1">
              {table.keyParameters.map((param, idx) => (
                <li key={idx} className="text-gray-700">
                  {param}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-2">
              Schedule:
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-gray-300">
                <thead className={`${table.headerBgColor} text-gray-900`}>
                  <tr>
                    {table.scheduleColumns.map((col, idx) => (
                      <th key={idx} className="px-2 py-1 text-center border">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {table.schedule.map((row, idx) => {
                    let bgClass = "bg-white hover:bg-gray-50";
                    if (
                      row.gas &&
                      (row.gas.toLowerCase() === "oxygen" ||
                        row.gas === "O₂" ||
                        row.gas === "O2")
                    ) {
                      bgClass = "bg-sky-100 hover:bg-sky-200";
                    } else if (row.gas === "50/50") {
                      bgClass = "bg-purple-100 hover:bg-purple-200";
                    } else if (idx % 2 !== 0) {
                      bgClass = "bg-gray-50 hover:bg-gray-100";
                    }
                    return (
                      <tr key={idx} className={bgClass}>
                        <td className="px-2 py-1 text-center border">
                          {row.depth}
                        </td>
                        <td className="px-2 py-1 text-center border">
                          {row.time}
                        </td>
                        {row.gas && (
                          <td className="px-2 py-1 text-center border">
                            {row.gas}
                          </td>
                        )}
                        <td className="px-2 py-1 text-center border">
                          {row.total}
                        </td>
                        {row.otuOrOther && (
                          <td className="px-2 py-1 text-center border">
                            {row.otuOrOther}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
);

TreatmentTableDialog.displayName = "TreatmentTableDialog";
