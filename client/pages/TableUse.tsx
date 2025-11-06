import { useMemo } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, Zap, Clock, BookOpen } from "lucide-react";
import {
  EmergencyProcedureAirTable,
  EmergencyProcedure1SOX15,
  EmergencyProcedure2SOX15,
  EmergencyProcedure1NitroxTables,
  EmergencyProcedure2NitroxTables,
} from "@/components/flowcharts/EmergencyFlowcharts";
import { ProcedureDialog, TreatmentTableDialog } from "@/pages/TableUseDialogs";

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

interface TableType {
  id: string;
  name: string;
  description: string;
  codes: string[];
  borderColor: string;
  bgColor: string;
  badgeBgColor: string;
  procedures: {
    normal?: ProcedureData;
    emergency?: ProcedureData;
    crashDive?: ProcedureData;
  };
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
  borderColor: string;
  bgColor: string;
  badgeBgColor: string;
  headerBgColor: string;
  scheduleColumns: string[];
}

export default function TableUse() {
  const navigate = useNavigate();
  const infoCards = useMemo(
    () => [
      {
        id: "critical-time",
        icon: <Clock className="w-5 h-5" />,
        title: "Critical Time Limits",
        points: [
          "Surface to chamber: 3 min",
          "Extended (clearing): 5 min",
          "Ascent speed: 5-10 m/min",
        ],
        color: "bg-red-50 border-red-200",
      },
      {
        id: "oxygen",
        icon: <Zap className="w-5 h-5" />,
        title: "Oxygen Limits",
        points: [
          "Max PO₂: 1.6 bar",
          "IMCA limit: 1.4 bar",
          "Daily OTU: 450 max",
        ],
        color: "bg-amber-50 border-amber-200",
      },
      {
        id: "standby",
        icon: <AlertTriangle className="w-5 h-5" />,
        title: "Standby Periods",
        points: [
          "With O₂: 2 hours",
          "Without O₂: 4 hours",
          "Min repeat: 2-12 hours",
        ],
        color: "bg-cyan-50 border-cyan-200",
      },
    ],
    [],
  );

  const tables = useMemo(
    () => [
      {
        id: "sil15",
        name: "Standard Air Tables",
        description:
          "Standard air decompression tables with 12-hour repetitive interval",
        codes: ["SIL15", "H2SIL15", "H4SIL15"],
        borderColor: "border-blue-400",
        bgColor: "bg-blue-50",
        badgeBgColor: "bg-blue-600",
        procedures: {
          normal: {
            title: "Standard Air Tables - Normal Use",
            badgeColor: "bg-green-600",
            badgeText: "SIL15",
            warning: false,
            content: [
              {
                type: "item",
                text: "Based on a repetitive interval of 12 hours (SIL15)",
              },
              {
                type: "item",
                text: "Repetitive dives possible for intervals of no less than 2 or 4 hours (tables H2SIL15 and H4SIL15)",
              },
              {
                type: "item",
                text: "For dives with an interval of 4 to 12 hours, use the table with the 4-hour interval (H4SIL15)",
              },
              {
                type: "item",
                text: "Recommended: observe at least 12 hours interval following a repetitive dive",
              },
              {
                type: "item",
                text: "More repetitive dives possible in urgent operational circumstances, as long as the part of the table above the bold line is adhered to",
              },
              {
                type: "item",
                text: "Bold lines indicate decompression time on air exceeds 30 minutes (backup for oxygen procedures)",
              },
              {
                type: "item",
                text: "Bold lines may be exceeded in urgent circumstances, but only one repetitive dive recommended after extended decompression",
              },
              {
                type: "item",
                text: "For routine longer dives, use of oxygen is recommended (requires diving bell - use BOX tables)",
              },
              {
                type: "item",
                text: "After decompression dive, repetitive dive possible after not less than 4 hours using H4SOX15",
              },
              {
                type: "item",
                text: "After H4SOX15 repetitive dive, observe interval of not less than 12 hours",
              },
            ],
          },
          emergency: {
            title: "Standard Air Tables - Emergency Procedures",
            badgeColor: "bg-red-600",
            badgeText: "SIL15",
            warning: true,
            warningText:
              "Emergency procedures - follow carefully and consult diving supervisor",
            content: [
              {
                type: "item",
                text: "If in-water decompression needs to continue on surface:",
              },
              {
                type: "item",
                text: "If repeat interval > 4 hours: use surface decompression tables with oxygen (HSOX15 or SOX15)",
              },
              {
                type: "item",
                text: "Possible even when in-water stops don't comply with surface/ox table",
              },
              {
                type: "item",
                text: "Does not constitute emergency procedure when using normal surface decompression",
              },
              {
                type: "item",
                text: "If in-water stops cannot be made or only partly made: surface/ox table may NOT be used",
              },
              {
                type: "item",
                text: "In this case, choose emergency crash dive procedure",
              },
            ],
          },
          crashDive: {
            title: "Standard Air Tables - Crash Dive",
            badgeColor: "bg-red-600",
            badgeText: "SIL15",
            warning: true,
            warningText:
              "CRASH DIVE - Critical emergency procedure - all emergency rules apply",
            content: [
              {
                type: "title",
                text: "1. Use if repeat interval < 4 hours OR total diving time exceeds surface decompression table allowance",
              },
              {
                type: "title",
                text: "2. Ascend to surface at rate < 10 metres per minute (ignore all stops already made)",
              },
              {
                type: "title",
                text: "3. Ensure diver is in chamber within 3 minutes",
              },
              {
                type: "title",
                text: "4. Put under pressure at depth = first in-water stop + 9 metres",
              },
              { type: "title", text: "5. Stay there for 5 minutes" },
              {
                type: "title",
                text: "6. Carry out decompression according to SIL15 for period = actual diving time + 10 minutes",
              },
              {
                type: "title",
                text: "7. If chamber equipped for oxygen: commence oxygen breathing from 12 metre stop in periods of 20 minutes, alternated with 5 minutes on air",
              },
              {
                type: "title",
                text: "8. Crash dive = emergency procedure - all emergency rules apply",
              },
              {
                type: "title",
                text: "9. Observe repeat interval of not less than 12 hours",
              },
              {
                type: "title",
                text: "10. If oxygen used: remain in vicinity of chamber for 2 hours",
              },
              {
                type: "title",
                text: "11. If no oxygen used: remain in vicinity of chamber for 4 hours",
              },
              {
                type: "title",
                text: "12. Risk of decompression sickness increases under these conditions",
              },
            ],
          },
        },
      },
      {
        id: "sox15",
        name: "Surface/Oxygen Tables",
        description:
          "Surface decompression tables with oxygen on and air-only SAB tables for backup",
        codes: ["SOX15", "HSOX15", "SAB15", "HSAB15"],
        borderColor: "border-orange-400",
        bgColor: "bg-orange-50",
        badgeBgColor: "bg-orange-600",
        procedures: {
          normal: {
            title: "Surface/Oxygen Tables - Normal Use",
            badgeColor: "bg-green-600",
            badgeText: "SOX15",
            warning: false,
            content: [
              {
                type: "item",
                text: 'Tables with oxygen ("SOX" code) are for normal use',
              },
              {
                type: "item",
                text: 'Surface decompression tables with air only ("SAB" code) are backup only for oxygen failure',
              },
              {
                type: "item",
                text: "If oxygen fails before planned dive: postpone dive until oxygen is available",
              },
              {
                type: "item",
                text: "Based on repetitive interval of 12 hours",
              },
              {
                type: "item",
                text: "Repetitive dive possible following interval of not less than 4 hours (HSOX15)",
              },
              {
                type: "item",
                text: "After air-only surface decompression: observe at least 12 hours interval",
              },
              {
                type: "item",
                text: "3-minute limit between surface and first chamber stop is CRITICAL",
              },
              {
                type: "item",
                text: "Every surface decompression includes treatment aspect to eliminate nitrogen bubbles",
              },
              {
                type: "item",
                text: "Exceeding 3-minute limit increases treatment aspect and DCS risk",
              },
            ],
          },
          emergency: {
            title: "Surface/Oxygen Tables - Emergency Procedures",
            badgeColor: "bg-red-600",
            badgeText: "SOX15",
            warning: true,
            warningText:
              "Emergency procedures - follow carefully and consult diving supervisor",
            content: [
              {
                type: "section",
                text: "If 3-minute limit exceeded by no more than 2 minutes (max 5 minutes total):",
              },
              { type: "item", text: "- Decompress according to chosen table" },
              {
                type: "item",
                text: "- Extend oxygen breathing at 12m stop by 20 minutes",
              },
              {
                type: "item",
                text: "- Extend oxygen breathing at 9m stop by 10 minutes",
              },
              {
                type: "item",
                text: "- At both stops: alternate 20 min oxygen with 5 min air",
              },
              {
                type: "item",
                text: "- Does NOT constitute emergency (repetitive dive allowed for SOX15)",
              },
              {
                type: "item",
                text: '- Note in logbook as irregularity (use code "SOXOV")',
              },
              {
                type: "item",
                text: "If surface interval > 5 minutes: emergency procedure applies",
              },
              {
                type: "item",
                text: "SOX15 tables allow going to 12m stop for (un)dressing, provided oxygen breathing starts within 5 minutes from surface",
              },
              {
                type: "item",
                text: "Apply table starting from beginning of oxygen breathing",
              },
              { type: "section", text: "OXYGEN FAILURE:" },
              {
                type: "item",
                text: "Change to surface decompression tables using air (SAB15 or HSAB15)",
              },
              {
                type: "item",
                text: "If during decompression: resume at stop where failure occurs",
              },
              {
                type: "item",
                text: 'Time already done on oxygen = "time on air"',
              },
              {
                type: "item",
                text: 'Completed time at failure stop counts as "time on air"',
              },
              {
                type: "item",
                text: "Remainder of stop and all subsequent stops per SAB15/HSAB15",
              },
              {
                type: "item",
                text: "After using air tables: observe repetitive interval of not less than 12 hours",
              },
              {
                type: "item",
                text: "Increased DCS risk - diver must remain near chamber for 4 hours",
              },
              {
                type: "item",
                text: "If oxygen supply restored: commence oxygen from 12m stop (20 min periods alternated with 5 min air)",
              },
              {
                type: "item",
                text: "Calculate OTU accumulated and add to air table OTU - remain within 450 OTU/day limit",
              },
              {
                type: "item",
                text: "If oxygen breathing ≥ 1/3 of decompression time: standby period reduced from 4 to 2 hours",
              },
            ],
          },
        },
      },
      {
        id: "nitrox",
        name: "Nitrox Decompression Tables",
        description:
          "Enriched air tables for reduced decompression time (NIA15: 40/60, NIB15: 35/65)",
        codes: ["NIA15", "NIB15", "H2NIA15", "H4NIA15"],
        borderColor: "border-green-400",
        bgColor: "bg-green-50",
        badgeBgColor: "bg-green-600",
        procedures: {
          normal: {
            title: "Nitrox Decompression Tables - Normal Use",
            badgeColor: "bg-green-600",
            badgeText: "NIA15 / NIB15",
            warning: false,
            content: [
              {
                type: "item",
                text: "NIA15: 40% O₂ / 60% N₂ - max PO₂ ~1.5 bar at 27m",
              },
              {
                type: "item",
                text: "NIB15: 35% O₂ / 65% N₂ - max PO₂ 1.4 bar at 30m (IMCA limit)",
              },
              {
                type: "item",
                text: "Maximum PO₂ limit: 1.6 bar (not to be exceeded)",
              },
              {
                type: "item",
                text: "General limit of 1.5 bar seems safe for professional diving",
              },
              {
                type: "item",
                text: "Oxygen content deviation: max ��1% by volume",
              },
              {
                type: "item",
                text: "Check oxygen content in mixture before use",
              },
              {
                type: "item",
                text: "Based on repetitive interval of 12 hours",
              },
              {
                type: "item",
                text: "Repetitive dive possible after interval of not less than 2 or 4 hours (H2NI or H4NI)",
              },
              {
                type: "item",
                text: "Recommended: observe not less than 12 hours after repetitive dive",
              },
              {
                type: "item",
                text: "More than one repetitive dive possible if OTU limits not exceeded",
              },
              { type: "item", text: "Longer interval = less DCS risk" },
              {
                type: "item",
                text: "After dive with long decompression: only one repetitive dive recommended",
              },
              {
                type: "item",
                text: "Tables provide Equivalent Air Depth (EAD)",
              },
              {
                type: "item",
                text: "No-stop dives: use tables on page D-2 for normal no-stop times (includes OTU per 10 min)",
              },
              {
                type: "item",
                text: "Long no-deco dives: apply EAD of nitrox dive in LND air tables",
              },
              {
                type: "item",
                text: "When exceeding no-deco limits: decompress with nitrox tables (NIA or NIB), or SIL15, SOX15, or BOX15",
              },
              {
                type: "item",
                text: "If using alternate tables: choose table depth deeper than EAD",
              },
              {
                type: "item",
                text: "After nitrox decompression dive: repetitive dive possible using HSOX15 after not less than 4 hours",
              },
              {
                type: "item",
                text: "After such repetitive dive: observe interval of not less than 12 hours",
              },
            ],
          },
          emergency: {
            title: "Nitrox Decompression Tables - Emergency Procedures",
            badgeColor: "bg-red-600",
            badgeText: "NIA15 / NIB15",
            warning: true,
            warningText:
              "Emergency procedures - follow carefully and consult diving supervisor",
            content: [
              { type: "section", text: "Surface decompression required" },
              {
                type: "item",
                text: "If ≥4 h interval → SOX15 or HSOX15 (depth ≥ EAD), even if in-water stops didn't match or weren't required. Not an emergency (normal SOX rules).",
              },
              { type: "section", text: "Crash Dive (nitrox)" },
              { type: "item", text: "Choose SIL depth ≥ EAD." },
              {
                type: "item",
                text: "Ascend ≤10 m/min; ignore remaining stops.",
              },
              {
                type: "item",
                text: "Chamber ≤3 min; pressurize to first stop + 9 m.",
              },
              { type: "item", text: "Hold 5 min." },
              {
                type: "item",
                text: "Decompress on SIL15 using actual time + 10 min.",
              },
              {
                type: "item",
                text: "If available, O₂ at 12 m in 20/5 cycles.",
              },
              { type: "item", text: "Track OTU; stop O₂ if limits near." },
              {
                type: "item",
                text: "Post-Crash: ≥12 h before diving; standby ≥2 h (with O₂) or ≥4 h (without). DCS risk higher.",
              },
            ],
          },
          crashDive: {
            title: "Nitrox Decompression Tables - Crash Dive",
            badgeColor: "bg-red-600",
            badgeText: "NIA15 / NIB15",
            warning: true,
            warningText:
              "CRASH DIVE - Critical emergency procedure - all emergency rules apply",
            content: [
              {
                type: "title",
                text: "1. Select standard air table with diving depth deeper than EAD of nitrox dive",
              },
              {
                type: "title",
                text: "2. Ascend to surface at rate �� 10 metres per minute (ignore all stops already made)",
              },
              {
                type: "title",
                text: "3. Ensure diver is in chamber under pressure within 3 minutes after surfacing",
              },
              {
                type: "title",
                text: "4. Put at depth = first in-water stop + 9 metres",
              },
              { type: "title", text: "5. Stay there for 5 minutes" },
              {
                type: "title",
                text: "6. Carry out decompression according to SIL tables for period = actual diving time + 10 minutes",
              },
              {
                type: "title",
                text: "7. If chamber equipped for oxygen: commence oxygen breathing from 12m stop in periods of 20 minutes, alternated with 5 minutes on air",
              },
              {
                type: "title",
                text: "8. Calculate OTU of extra oxygen periods using OTU table",
              },
              {
                type: "title",
                text: "9. Stop using oxygen when OTU limits about to be exceeded",
              },
              {
                type: "title",
                text: "10. Crash dive = emergency procedure - all emergency rules apply",
              },
              {
                type: "title",
                text: "11. Observe repetitive interval of not less than 12 hours",
              },
              {
                type: "title",
                text: "12. If oxygen used during decompression: remain near chamber for 2 hours",
              },
              {
                type: "title",
                text: "13. If no oxygen used: remain near chamber for 4 hours",
              },
              {
                type: "title",
                text: "14. Risk of decompression sickness increases under these conditions",
              },
            ],
          },
        },
      },
      {
        id: "nd15",
        name: "No-Stop Limits for Air Diving",
        description: "Standard no-decompression limits for air diving",
        codes: ["ND15"],
        borderColor: "border-purple-400",
        bgColor: "bg-purple-50",
        badgeBgColor: "bg-purple-600",
        procedures: {
          normal: {
            title: "No-Stop Limits for Air Diving - Normal Use",
            badgeColor: "bg-green-600",
            badgeText: "ND15",
            warning: false,
            content: [
              {
                type: "item",
                text: "Maximum allowable diving time without staged decompression per depth",
              },
              {
                type: "item",
                text: "Repeat intervals calculated for 2 and 8 hours",
              },
              {
                type: "item",
                text: "If repeat interval > 2 hours but < 8 hours: apply 2-hour repeat interval table",
              },
              {
                type: "item",
                text: "Total time under pressure must not exceed 8 hours in 24-hour period",
              },
              {
                type: "item",
                text: "Recommended: following dive with repeat interval < 8 hours, observe repeat interval ≥ 8 hours",
              },
              { type: "item", text: "Maximum ascent speed: 10 metres/minute" },
              { type: "item", text: "Minimum ascent speed: 5 metres/minute" },
              {
                type: "item",
                text: "If ascent speed < 5 m/min: add difference to diving time",
              },
            ],
          },
          emergency: {
            title: "No-Stop Limits for Air Diving - Emergency Procedures",
            badgeColor: "bg-red-600",
            badgeText: "ND15",
            warning: true,
            warningText:
              "Emergency procedures - follow carefully and consult diving supervisor",
            content: [
              {
                type: "item",
                text: "Ascent speed is CRITICAL for no-stop diving",
              },
              { type: "item", text: "Maximum: 10 m/min" },
              { type: "item", text: "Minimum: 5 m/min" },
              {
                type: "item",
                text: "Slower ascent: add extra time to dive time",
              },
            ],
          },
        },
      },
      {
        id: "lnd15",
        name: "Extended No-Stop Limits",
        description:
          "Extended no-stop times with 12+ hour intervals and no repetitive dives",
        codes: ["LND15"],
        borderColor: "border-purple-400",
        bgColor: "bg-purple-50",
        badgeBgColor: "bg-purple-600",
        procedures: {
          normal: {
            title: "Extended No-Stop Limits - Normal Use",
            badgeColor: "bg-green-600",
            badgeText: "LND15",
            warning: false,
            content: [
              {
                type: "item",
                text: "Longer no-stop times possible with 12+ hour repeat intervals",
              },
              { type: "item", text: "NO repetitive dives allowed" },
              {
                type: "item",
                text: "Repeat interval before and after dive: 12 hours",
              },
              {
                type: "item",
                text: "For harbour/shallow water jobs: no-stop limits between 9-15m at 1m intervals",
              },
              {
                type: "item",
                text: "Estimate table depth from depth reading plus error correction",
              },
              { type: "section", text: "Pneumofathometer corrections:" },
              {
                type: "item",
                text: "- 0-30 msw / 0-100 fsw: +0.3 msw / +1 fsw",
              },
              {
                type: "item",
                text: "- 31-60 msw / 101-200 fsw: +0.6 msw / +2 fsw",
              },
              { type: "item", text: "Maximum ascent speed: 10 metres/minute" },
              { type: "item", text: "Minimum ascent speed: 5 metres/minute" },
              {
                type: "item",
                text: "If ascent speed < 5 m/min: add difference to diving time",
              },
            ],
          },
          emergency: {
            title: "Extended No-Stop Limits - Emergency Procedures",
            badgeColor: "bg-red-600",
            badgeText: "LND15",
            warning: true,
            warningText:
              "Emergency procedures - follow carefully and consult diving supervisor",
            content: [
              { type: "section", text: "EXCEEDING LND15 GUIDANCE:" },
              {
                type: "item",
                text: "Where possible, complete dive and decompression using SIL15 or SOX15 tables",
              },
              {
                type: "item",
                text: "Consider swell and wave conditions for continuance based on foreseen table",
              },
              { type: "section", text: "EXAMPLE - 14msw LND15 (100 min max):" },
              {
                type: "item",
                text: "If using SIL15 as continuance: acceptable swell/wave height max 1 meter",
              },
              {
                type: "item",
                text: "If not acceptable: keep dive time in reserve within 100 min for possible entanglement",
              },
              {
                type: "item",
                text: "In these situations: minimum 10-minute continuance must be included in dive time",
              },
              { type: "section", text: "CONTINUANCE OPTIONS:" },
              {
                type: "item",
                text: "SIL15 possible for all LND15 dives deeper than 11msw",
              },
              {
                type: "item",
                text: "SOX15 possible for all LND15 dives deeper than 10msw (not from daughter craft)",
              },
              { type: "section", text: "SPECIFIC DEPTH OVERRUNS:" },
              {
                type: "item",
                text: "9msw: no in-water stops required until 330 minutes. Give 20 min oxygen at surface",
              },
              {
                type: "item",
                text: "10msw: 10-minute in-water stop required until 300 minutes. Give 20 min oxygen at surface",
              },
              {
                type: "item",
                text: "11msw: 10-minute in-water stop required until 220 minutes. Give 20 min oxygen at surface",
              },
              {
                type: "item",
                text: "Note: Surface oxygen is continuance decompression, NOT treatment",
              },
              { type: "section", text: "EXTREME UNPLANNED EXTENSION:" },
              {
                type: "item",
                text: "If above cannot be accomplished: start US Navy Table 5",
              },
              {
                type: "item",
                text: "Seek advice from onshore medical physician ASAP",
              },
              { type: "item", text: "Report to N-Sea DTA:" },
              {
                type: "item",
                text: "  - Within 5 guidance points: non-conformity",
              },
              { type: "item", text: "  - If Table 5 started: incident" },
            ],
          },
        },
      },
    ],
    [],
  );

  const treatmentTables = useMemo(
    () => [
      {
        id: "cx12",
        code: "CX-12",
        name: "COMEX Table CX 12",
        borderColor: "border-teal-400",
        bgColor: "bg-teal-50",
        badgeBgColor: "bg-teal-600",
        useFor:
          "Mild decompression sickness and air embolism (only on prescription)",
        keyParameters: [
          "• Uses oxygen as primary breathing gas",
          "• Ascent rate: Varies by depth zone",
          "• Moderate total decompression time",
          "• Standard recreational depth profile",
        ],
        schedule: [
          {
            depth: "8",
            time: "4",
            gas: "Oxygen",
            total: "00:04",
            otuOrOther: "7",
          },
          {
            depth: "8-12",
            time: "2",
            gas: "Oxygen",
            total: "00:06",
            otuOrOther: "12",
          },
          {
            depth: "12",
            time: "20",
            gas: "Oxygen",
            total: "00:26",
            otuOrOther: "67",
          },
          {
            depth: "12",
            time: "5",
            gas: "Air",
            total: "00:31",
            otuOrOther: "67",
          },
          {
            depth: "12",
            time: "20",
            gas: "Oxygen",
            total: "00:51",
            otuOrOther: "122",
          },
          {
            depth: "12",
            time: "5",
            gas: "Air",
            total: "00:56",
            otuOrOther: "122",
          },
          {
            depth: "12",
            time: "20",
            gas: "Oxygen",
            total: "01:16",
            otuOrOther: "177",
          },
          {
            depth: "12",
            time: "5",
            gas: "Air",
            total: "01:21",
            otuOrOther: "177",
          },
          {
            depth: "12",
            time: "20",
            gas: "Oxygen",
            total: "01:41",
            otuOrOther: "232",
          },
          {
            depth: "12",
            time: "5",
            gas: "Air",
            total: "01:46",
            otuOrOther: "232",
          },
          {
            depth: "12-0",
            time: "24",
            gas: "Oxygen",
            total: "02:10",
            otuOrOther: "278",
          },
        ],
        headerBgColor: "bg-blue-50",
        scheduleColumns: [
          "Pressure (msw)",
          "Time (min)",
          "Gas",
          "Total (hr:min)",
          "OTU",
        ],
      },
      {
        id: "usnt5",
        code: "USN-5",
        name: "US Navy Oxygen Treatment Table 5",
        useFor:
          "Prevention (omitted decompression with no symptoms) and mild forms of skin-bends",
        keyParameters: [
          "• Descent rate: Rapid descent",
          "• Air breaks recommended between oxygen periods",
          "• Can extend initial depth time if needed",
          "• Total treatment up to 2+ hours at deepest depths",
        ],
        borderColor: "border-red-400",
        bgColor: "bg-red-50",
        badgeBgColor: "bg-red-600",
        schedule: [
          {
            depth: "18",
            time: "20",
            gas: "Oxygen",
            total: "00:20",
            otuOrOther: "71",
          },
          {
            depth: "18",
            time: "5",
            gas: "Air",
            total: "00:25",
            otuOrOther: "73",
          },
          {
            depth: "18",
            time: "20",
            gas: "Oxygen",
            total: "00:45",
            otuOrOther: "144",
          },
          {
            depth: "18-9",
            time: "30",
            gas: "Oxygen",
            total: "01:15",
            otuOrOther: "233",
          },
          {
            depth: "9",
            time: "5",
            gas: "Air",
            total: "01:20",
            otuOrOther: "233",
          },
          {
            depth: "9",
            time: "20",
            gas: "Oxygen",
            total: "01:40",
            otuOrOther: "280",
          },
          {
            depth: "9",
            time: "5",
            gas: "Air",
            total: "01:45",
            otuOrOther: "280",
          },
          {
            depth: "9-0",
            time: "30",
            gas: "Oxygen",
            total: "02:15",
            otuOrOther: "331",
          },
        ],
        headerBgColor: "bg-green-50",
        scheduleColumns: [
          "Pressure (msw)",
          "Time (min)",
          "Gas",
          "Total (hr:min)",
          "OTU",
        ],
      },
      {
        id: "usnt6",
        code: "USN-6",
        name: "US Navy Oxygen Treatment Table 6",
        borderColor: "border-red-400",
        bgColor: "bg-red-50",
        badgeBgColor: "bg-red-600",
        useFor:
          "Type I & II DCS if symptoms don't disappear within 10 min at 18 msw, and air embolism",
        keyParameters: [
          "• Descent rate: 7.5 msw/min",
          "• Ascent rate: Slow and controlled",
          "• Can be lengthened with air breaks",
          "��� Longest treatment table for serious symptoms",
        ],
        schedule: [
          {
            depth: "18",
            time: "20",
            gas: "Oxygen",
            total: "00:20",
            otuOrOther: "71",
          },
          {
            depth: "18",
            time: "5",
            gas: "Air",
            total: "00:25",
            otuOrOther: "73",
          },
          {
            depth: "18",
            time: "20",
            gas: "Oxygen",
            total: "00:45",
            otuOrOther: "144",
          },
          {
            depth: "18",
            time: "5",
            gas: "Air",
            total: "00:50",
            otuOrOther: "145",
          },
          {
            depth: "18",
            time: "20",
            gas: "Oxygen",
            total: "01:10",
            otuOrOther: "216",
          },
          {
            depth: "18",
            time: "5",
            gas: "Air",
            total: "01:15",
            otuOrOther: "218",
          },
          {
            depth: "18-9",
            time: "30",
            gas: "Oxygen",
            total: "01:45",
            otuOrOther: "307",
          },
          {
            depth: "9",
            time: "15",
            gas: "Air",
            total: "02:00",
            otuOrOther: "307",
          },
          {
            depth: "9",
            time: "15",
            gas: "Oxygen",
            total: "03:00",
            otuOrOther: "448",
          },
          {
            depth: "9",
            time: "15",
            gas: "Air",
            total: "03:15",
            otuOrOther: "448",
          },
          {
            depth: "9-0",
            time: "15",
            gas: "Oxygen",
            total: "04:15",
            otuOrOther: "590",
          },
          {
            depth: "9-0",
            time: "30",
            gas: "Oxygen",
            total: "04:45",
            otuOrOther: "641",
          },
        ],
        headerBgColor: "bg-orange-50",
        scheduleColumns: [
          "Pressure (msw)",
          "Time (min)",
          "Gas",
          "Total (hr:min)",
          "OTU",
        ],
      },
      {
        id: "cx30",
        code: "CX-30",
        name: "COMEX Table CX 30",
        borderColor: "border-teal-400",
        bgColor: "bg-teal-50",
        badgeBgColor: "bg-teal-600",
        useFor:
          "Very serious decompression sickness and air embolism (only on prescription)",
        keyParameters: [
          "• Uses 50/50 mix (oxygen/helium or nitrogen)",
          "• Descent rate: 2-3 minutes per depth zone",
          "• Ascent rates vary by depth: 5 min/msw",
          "• Longest and deepest treatment table available",
        ],
        schedule: [
          {
            depth: "30",
            time: "40",
            gas: "50/50",
            total: "00:43",
            otuOrOther: "100",
          },
          {
            depth: "30-24",
            time: "5",
            gas: "Air",
            total: "00:48",
            otuOrOther: "103",
          },
          {
            depth: "30-24",
            time: "25",
            gas: "50/50",
            total: "01:13",
            otuOrOther: "160",
          },
          {
            depth: "24",
            time: "5",
            gas: "Air",
            total: "01:18",
            otuOrOther: "162",
          },
          {
            depth: "24-18",
            time: "25",
            gas: "50/50",
            total: "01:43",
            otuOrOther: "214",
          },
          {
            depth: "24-18",
            time: "5",
            gas: "Air",
            total: "01:48",
            otuOrOther: "216",
          },
          {
            depth: "24-18",
            time: "25",
            gas: "50/50",
            total: "02:13",
            otuOrOther: "262",
          },
          {
            depth: "18",
            time: "5",
            gas: "Air",
            total: "02:18",
            otuOrOther: "263",
          },
          {
            depth: "18",
            time: "25",
            gas: "Oxygen",
            total: "02:43",
            otuOrOther: "352",
          },
          {
            depth: "18",
            time: "5",
            gas: "Air",
            total: "02:48",
            otuOrOther: "353",
          },
          {
            depth: "18",
            time: "25",
            gas: "Oxygen",
            total: "03:13",
            otuOrOther: "442",
          },
          {
            depth: "18-12",
            time: "5",
            gas: "Air",
            total: "03:18",
            otuOrOther: "442",
          },
          {
            depth: "18-12",
            time: "25",
            gas: "Oxygen",
            total: "03:43",
            otuOrOther: "521",
          },
          {
            depth: "12",
            time: "10",
            gas: "Air",
            total: "03:53",
            otuOrOther: "521",
          },
          {
            depth: "12",
            time: "45",
            gas: "Oxygen",
            total: "04:38",
            otuOrOther: "646",
          },
          {
            depth: "12",
            time: "10",
            gas: "Air",
            total: "04:48",
            otuOrOther: "646",
          },
          {
            depth: "12",
            time: "45",
            gas: "Oxygen",
            total: "05:33",
            otuOrOther: "771",
          },
          {
            depth: "12",
            time: "10",
            gas: "Air",
            total: "05:43",
            otuOrOther: "771",
          },
          {
            depth: "12",
            time: "45",
            gas: "Oxygen",
            total: "06:28",
            otuOrOther: "896",
          },
          {
            depth: "12",
            time: "10",
            gas: "Air",
            total: "06:38",
            otuOrOther: "896",
          },
          {
            depth: "12-0",
            time: "24",
            gas: "Oxygen",
            total: "07:02",
            otuOrOther: "942",
          },
        ],
        headerBgColor: "bg-red-50",
        scheduleColumns: [
          "Pressure (msw)",
          "Time (min)",
          "Gas",
          "Total (hr:min)",
          "OTU",
        ],
      },
      {
        id: "airt1a",
        code: "AIR-1A",
        name: "Air Treatment Table 1A",
        borderColor: "border-red-400",
        bgColor: "bg-red-50",
        badgeBgColor: "bg-red-600",
        useFor:
          "Pain only DCS (Type I) if oxygen unavailable and pain disappears at depth >20 msw",
        keyParameters: [
          "• Descent rate: 7.5 msw/min",
          "• Ascent rate: 1 minute between stops",
          "��� Moderate total decompression (6:20 hours)",
          "• Only when oxygen unavailable",
        ],
        schedule: [
          { depth: "30", time: "30", total: "00:30", otuOrOther: "22" },
          { depth: "24", time: "12", total: "00:43", otuOrOther: "28" },
          { depth: "18", time: "30", total: "01:14", otuOrOther: "35" },
          { depth: "15", time: "30", total: "01:45", otuOrOther: "37" },
          { depth: "12", time: "30", total: "02:16", otuOrOther: "37" },
          { depth: "9", time: "60", total: "03:17", otuOrOther: "37" },
          { depth: "6", time: "60", total: "04:18", otuOrOther: "37" },
          { depth: "3", time: "120", total: "06:19", otuOrOther: "37" },
          { depth: "0", time: "1", total: "06:20", otuOrOther: "37" },
        ],
        headerBgColor: "bg-gray-100",
        scheduleColumns: ["Depth (msw)", "Time (min)", "Total (hr:min)", "OTU"],
      },
      {
        id: "airt2a",
        code: "AIR-2A",
        name: "Air Treatment Table 2A",
        borderColor: "border-red-400",
        bgColor: "bg-red-50",
        badgeBgColor: "bg-red-600",
        useFor:
          "Pain only DCS (Type I) if oxygen unavailable and pain disappears at depth >20 msw",
        keyParameters: [
          "• Descent rate: 7.5 msw/min",
          "• Ascent rate: 1 minute between stops",
          "• Deeper starting depth (50 msw) for deep pain",
          "• Longer total decompression (10:59 hours)",
        ],
        schedule: [
          { depth: "50", time: "30", total: "00:30", otuOrOther: "43" },
          { depth: "42", time: "12", total: "00:43", otuOrOther: "56" },
          { depth: "36", time: "12", total: "00:56", otuOrOther: "68" },
          { depth: "30", time: "12", total: "01:09", otuOrOther: "76" },
          { depth: "24", time: "12", total: "01:22", otuOrOther: "82" },
          { depth: "18", time: "30", total: "01:53", otuOrOther: "89" },
          { depth: "15", time: "30", total: "02:24", otuOrOther: "93" },
          { depth: "12", time: "30", total: "02:55", otuOrOther: "93" },
          { depth: "9", time: "120", total: "04:56", otuOrOther: "93" },
          { depth: "6", time: "120", total: "06:57", otuOrOther: "93" },
          { depth: "3", time: "240", total: "10:58", otuOrOther: "93" },
          { depth: "0", time: "1", total: "10:59", otuOrOther: "93" },
        ],
        headerBgColor: "bg-gray-100",
        scheduleColumns: ["Depth (msw)", "Time (min)", "Total (hr:min)", "OTU"],
      },
      {
        id: "airt3",
        code: "AIR-3",
        name: "Air Treatment Table 3",
        borderColor: "border-red-400",
        bgColor: "bg-red-50",
        badgeBgColor: "bg-red-600",
        useFor:
          "Serious symptoms (Type II) if oxygen unavailable and symptoms disappear within 30 min at 50 msw",
        keyParameters: [
          "• Descent rate: As fast as possible",
          "• Ascent rate: 1 minute between stops",
          "• Very long decompression (18:59 hours)",
          "• For serious neurological symptoms only",
        ],
        schedule: [
          { depth: "50", time: "30", total: "00:30", otuOrOther: "43" },
          { depth: "42", time: "12", total: "00:43", otuOrOther: "56" },
          { depth: "36", time: "12", total: "00:56", otuOrOther: "68" },
          { depth: "30", time: "12", total: "01:09", otuOrOther: "76" },
          { depth: "24", time: "12", total: "01:22", otuOrOther: "82" },
          { depth: "18", time: "30", total: "01:53", otuOrOther: "89" },
          { depth: "15", time: "30", total: "02:24", otuOrOther: "93" },
          { depth: "12", time: "30", total: "02:55", otuOrOther: "93" },
          { depth: "9", time: "720", total: "14:56", otuOrOther: "93" },
          { depth: "6", time: "120", total: "16:57", otuOrOther: "93" },
          { depth: "3", time: "120", total: "18:58", otuOrOther: "93" },
          { depth: "0", time: "1", total: "18:59", otuOrOther: "93" },
        ],
        headerBgColor: "bg-gray-100",
        scheduleColumns: ["Depth (msw)", "Time (min)", "Total (hr:min)", "OTU"],
      },
      {
        id: "airt4",
        code: "AIR-4",
        name: "Air Treatment Table 4",
        borderColor: "border-teal-400",
        bgColor: "bg-teal-50",
        badgeBgColor: "bg-teal-600",
        useFor:
          "Extremely serious symptoms (Type II) if oxygen unavailable with extended bottom time",
        keyParameters: [
          "• Descent rate: As fast as possible",
          "• Ascent rate: 1 minute between stops",
          "• Extremely long decompression (47:41 hours)",
          "• For most severe neurological symptoms with extended exposure",
        ],
        schedule: [
          { depth: "50", time: "30-120", total: "02:00", otuOrOther: "43-170" },
          { depth: "42", time: "30", total: "02:31", otuOrOther: "209" },
          { depth: "36", time: "30", total: "03:02", otuOrOther: "239" },
          { depth: "30", time: "30", total: "03:33", otuOrOther: "262" },
          { depth: "24", time: "30", total: "04:04", otuOrOther: "278" },
          { depth: "18", time: "360", total: "10:05", otuOrOther: "363" },
          { depth: "15", time: "360", total: "16:06", otuOrOther: "393" },
          { depth: "12", time: "360", total: "22:07", otuOrOther: "393" },
          { depth: "9", time: "720", total: "34:08", otuOrOther: "393" },
          { depth: "6", time: "390", total: "40:39", otuOrOther: "393" },
          { depth: "3", time: "420", total: "47:40", otuOrOther: "393" },
          { depth: "0", time: "1", total: "47:41", otuOrOther: "393" },
        ],
        headerBgColor: "bg-gray-100",
        scheduleColumns: ["Depth (msw)", "Time (min)", "Total (hr:min)", "OTU"],
      },
    ],
    [],
  );

  const FlowchartDialog = React.memo(
    ({
      id,
      title,
      description,
      icon,
      component,
    }: {
      id: string;
      title: string;
      description: string;
      icon: string;
      component: React.ReactNode | null;
    }) => (
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full p-3 rounded border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors text-left">
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-xs text-gray-900">{title}</p>
                <p className="text-xs text-gray-600 mt-0.5">{description}</p>
              </div>
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">{title}</DialogTitle>
          </DialogHeader>
          <div className="mt-6 p-4 bg-white rounded border border-blue-200">
            {component ? (
              component
            ) : (
              <p className="text-sm text-gray-600">Flowchart for {title}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    ),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <Navigation />

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with Safety Alert */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-start lg:gap-6">
            <div className="flex-1 mb-6 lg:mb-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                Diving Tables Safety Guide
              </h1>
              <p className="text-gray-600 text-sm">
                Interactive procedures & emergency protocols
              </p>
            </div>

            <div className="lg:flex-shrink-0 w-full lg:w-auto">
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-red-900 text-sm">
                      Safety-Critical Information
                    </p>
                    <p className="text-xs text-red-800 mt-1">
                      Always verify with operations manual and diving
                      supervisor. Click procedures to view details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards Grid - moved to bottom */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            style={{ display: "none" }}
          >
            {infoCards.map((card) => (
              <Card key={card.id} className={`${card.color} border-2`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="text-xl">{card.icon}</div>
                    <CardTitle className="text-sm">{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {card.points.map((point, idx) => (
                      <li key={idx} className="text-xs text-gray-700">
                        ����� {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content: Diving Tables and Treatment Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Left: Diving Tables */}
            <div>
              <Card className="h-full">
                <CardHeader className="border-b pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Diving Tables
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Select table and procedure type
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {tables.map((table) => (
                    <div
                      key={table.id}
                      className={`border-l-4 border-b pb-4 px-3 py-2 rounded-r last:border-b-0 last:pb-4 ${table.borderColor} ${table.bgColor}`}
                    >
                      {/* Title and Badge codes on same row */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-sm text-gray-900">
                          {table.name}
                        </h3>
                        {table.codes.map((code) => (
                          <button
                            key={code}
                            onClick={() => navigate(`/tables/${code.toLowerCase()}`)}
                            className={`text-xs font-mono h-6 px-2 rounded text-white ${table.badgeBgColor} hover:opacity-80 transition-opacity cursor-pointer`}
                          >
                            {code}
                          </button>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-600 mb-2">
                        {table.description}
                      </p>

                      {/* Procedure buttons */}
                      <div className="flex flex-wrap gap-1.5">
                        {table.procedures.normal && (
                          <ProcedureDialog
                            key={`${table.id}-normal`}
                            procedure={table.procedures.normal}
                            label="Normal Use"
                            tableId={table.id}
                          />
                        )}
                        {table.procedures.emergency && (
                          <ProcedureDialog
                            key={`${table.id}-emergency`}
                            procedure={table.procedures.emergency}
                            label="Emergency"
                            tableId={table.id}
                          />
                        )}
                        {table.procedures.crashDive && (
                          <ProcedureDialog
                            key={`${table.id}-crashDive`}
                            procedure={table.procedures.crashDive}
                            label="Crash Dive"
                            tableId={table.id}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Center: Treatment Tables */}
            <div>
              <Card className="h-full">
                <CardHeader className="border-b pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      ���� Treatment Tables
                    </CardTitle>
                    <CardDescription className="text-xs">
                      DCS & CAGE protocols
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 gap-3">
                    {treatmentTables.map((table) => (
                      <TreatmentTableDialog key={table.id} table={table} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Emergency Flowcharts - Full Width Below */}
          <div className="grid grid-cols-1 gap-6 mt-6">
            {/* Emergency Flowcharts */}
            <div>
              <Card className="h-full">
                <CardHeader className="border-b pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Emergency Flowcharts
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Interactive decision trees
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <FlowchartDialog
                    id="sil15-emergency"
                    title="Emergency Procedure Air Table (SIL15)"
                    description="Dive interrupted - emergency decompression crash dive procedure"
                    icon="🔵"
                    component={<EmergencyProcedureAirTable />}
                  />
                  <FlowchartDialog
                    id="sox15-emergency-1"
                    title="Emergency Procedure 1 for Surface/Ox Table (SOX15)"
                    description="Irregularity in decompression - treatment table selection"
                    icon="🔴"
                    component={<EmergencyProcedure1SOX15 />}
                  />
                  <FlowchartDialog
                    id="sox15-emergency-2"
                    title="Emergency Procedure 2 for Surface/Ox Table (SOX15)"
                    description="Oxygen failure during decompression - decision tree"
                    icon="🟠"
                    component={<EmergencyProcedure2SOX15 />}
                  />
                  <FlowchartDialog
                    id="nitrox-emergency-1"
                    title="Emergency Procedure 1 Nitrox Tables"
                    description="Need for surface decompression - table selection with EAD"
                    icon="🟢"
                    component={<EmergencyProcedure1NitroxTables />}
                  />
                  <FlowchartDialog
                    id="nitrox-emergency-2"
                    title="Emergency Procedure 2 Nitrox Tables"
                    description="Irregularity in decompression - nitrox treatment procedures"
                    icon="🟣"
                    component={<EmergencyProcedure2NitroxTables />}
                  />
                  <FlowchartDialog
                    id="treatment-tables-guide"
                    title="Treatment Tables (DCS & CAGE)"
                    description="When to use treatment tables - decision tree and logic"
                    icon="💊"
                    component={
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900 mb-2">
                            Important First Steps:
                          </h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>
                              • <strong>Most important:</strong> Administer
                              oxygen and fluids as soon as possible
                            </li>
                            <li>
                              • Start recompression to 18 metres while breathing
                              oxygen
                            </li>
                            <li>
                              • For very mild symptoms only: treatment at 12
                              metres (after medical consultation)
                            </li>
                            <li>
                              • Seek advice from a diving medical specialist as
                              soon as possible
                            </li>
                            <li>
                              • <strong>Do NOT delay treatment</strong> while
                              awaiting medical advice
                            </li>
                          </ul>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-sm text-gray-900 mb-2">
                            Treatment Decision Tree:
                          </h4>
                          <ul className="text-sm text-gray-700 space-y-2">
                            <li>
                              <strong>
                                Mild skin-bends (purple rash only):
                              </strong>{" "}
                              CX12 or USN-5
                            </li>
                            <li>
                              <strong>Type I DCS / Residual symptoms:</strong>{" "}
                              CX12, USN-5
                            </li>
                            <li>
                              <strong>
                                Type II DCS (serious neurological):
                              </strong>{" "}
                              USN-T6, CX30, or AIR-T3
                            </li>
                            <li>
                              <strong>Air Embolism:</strong> USN-6 or CX30
                            </li>
                            <li>
                              <strong>
                                Air Treatment (no oxygen available):
                              </strong>{" "}
                              AIR-T1A, AIR-T2A, or AIR-T3
                            </li>
                          </ul>
                        </div>

                        <div className="bg-amber-100 border-l-4 border-amber-500 p-3 rounded">
                          <p className="text-xs font-semibold text-amber-900">
                            ⚠️ Note:
                          </p>
                          <p className="text-xs text-amber-800">
                            Air treatment tables are provided with reluctance
                            and only for oxygen delivery failure. Prevent this
                            at all costs.
                          </p>
                        </div>
                      </div>
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Treatment Tables Data Section - Hidden, replaced with cards above */}
          <div className="mt-12 pt-8 border-t" style={{ display: "none" }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Treatment Tables (DCS & CAGE)
            </h2>

            {/* Oxygen Treatment Tables Group */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Oxygen Treatment Tables
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CX12 */}
                <Card>
                  <CardHeader className="bg-green-50 border-b">
                    <CardTitle className="text-base">
                      COMEX Table CX 12
                    </CardTitle>
                    <Badge className="w-fit mt-2">CX12</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Use For:
                      </h4>
                      <p className="text-sm text-gray-700">
                        Mild forms of skin-bends (purple blotching rash only)
                        and treatment of residual symptoms
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Key Parameters:
                      </h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Descent rate: 2 msw/min</li>
                        <li>• Ascent rate: 0.5 msw/min</li>
                        <li>• Symptoms relieved within 4 min at ≤8 msw</li>
                        <li>• Only on prescription by diving physician</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">
                        Schedule:
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-center border">
                                Pressure (msw)
                              </th>
                              <th className="px-2 py-1 text-center border">
                                Time (min)
                              </th>
                              <th className="px-2 py-1 text-center border">
                                Gas
                              </th>
                              <th className="px-2 py-1 text-right border">
                                Total (min)
                              </th>
                              <th className="px-2 py-1 text-right border">
                                OTU
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                71
                              </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                5
                              </td>
                              <td className="px-2 py-1 text-center border">
                                Air
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:25
                              </td>
                              <td className="px-2 py-1 text-center border">
                                73
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:45
                              </td>
                              <td className="px-2 py-1 text-center border">
                                144
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                18-Sep
                              </td>
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:15
                              </td>
                              <td className="px-2 py-1 text-center border">
                                233
                              </td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                9
                              </td>
                              <td className="px-2 py-1 text-center border">
                                5
                              </td>
                              <td className="px-2 py-1 text-center border">
                                Air
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                233
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                9
                              </td>
                              <td className="px-2 py-1 text-center border">
                                20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:40
                              </td>
                              <td className="px-2 py-1 text-center border">
                                280
                              </td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                9
                              </td>
                              <td className="px-2 py-1 text-center border">
                                5
                              </td>
                              <td className="px-2 py-1 text-center border">
                                Air
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:45
                              </td>
                              <td className="px-2 py-1 text-center border">
                                280
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                9-0
                              </td>
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                02:15
                              </td>
                              <td className="px-2 py-1 text-center border">
                                331
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* USN-5 */}
                <Card>
                  <CardHeader className="bg-green-50 border-b">
                    <CardTitle className="text-base">
                      US Navy Oxygen Treatment Table 4
                    </CardTitle>
                    <Badge className="w-fit mt-2">USN-5</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Use For:
                      </h4>
                      <p className="text-sm text-gray-700">
                        Prevention (omitted decompression with no symptoms) and
                        mild forms of skin-bends
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Key Parameters:
                      </h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Descent rate: 7.5 msw/min</li>
                        <li>• Ascent rate: 0.3 msw/min</li>
                        <li>• Time at 18 msw starts on arrival</li>
                        <li>• Can switch to Table 6 if O₂ problems arise</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">
                        Schedule:
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-center border">
                                Pressure (msw)
                              </th>
                              <th className="px-2 py-1 text-center border">
                                Time (min)
                              </th>
                              <th className="px-2 py-1 text-center border">
                                Gas
                              </th>
                              <th className="px-2 py-1 text-right border">
                                Total (min)
                              </th>
                              <th className="px-2 py-1 text-right border">
                                OTU
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                71
                              </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                5
                              </td>
                              <td className="px-2 py-1 text-center border">
                                Air
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:25
                              </td>
                              <td className="px-2 py-1 text-center border">
                                73
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:45
                              </td>
                              <td className="px-2 py-1 text-center border">
                                144
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                18-Sep
                              </td>
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:15
                              </td>
                              <td className="px-2 py-1 text-center border">
                                233
                              </td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                9
                              </td>
                              <td className="px-2 py-1 text-center border">
                                5
                              </td>
                              <td className="px-2 py-1 text-center border">
                                Air
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                233
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                9
                              </td>
                              <td className="px-2 py-1 text-center border">
                                20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:40
                              </td>
                              <td className="px-2 py-1 text-center border">
                                280
                              </td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                9
                              </td>
                              <td className="px-2 py-1 text-center border">
                                5
                              </td>
                              <td className="px-2 py-1 text-center border">
                                Air
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:45
                              </td>
                              <td className="px-2 py-1 text-center border">
                                280
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                9-0
                              </td>
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                02:15
                              </td>
                              <td className="px-2 py-1 text-center border">
                                331
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* USN-6 */}
                <Card>
                  <CardHeader className="bg-orange-50 border-b">
                    <CardTitle className="text-base">
                      US Navy Oxygen Treatment Table 6
                    </CardTitle>
                    <Badge className="w-fit mt-2">USN-6</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Use For:
                      </h4>
                      <p className="text-sm text-gray-700">
                        Type I & II DCS if symptoms don't disappear within 10
                        min at 18 msw, and air embolism
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Key Parameters:
                      </h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Descent rate: 7.5 msw/min</li>
                        <li>��� Ascent rate: 0.3 msw/min</li>
                        <li>
                          • Can be lengthened 25 min at 18 msw or 75 min at 9
                          msw
                        </li>
                        <li>• Longest treatment table for serious symptoms</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">
                        Schedule (abbreviated):
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-center border">
                                Pressure (msw)
                              </th>
                              <th className="px-2 py-1 text-center border">
                                Time (min)
                              </th>
                              <th className="px-2 py-1 text-center border">
                                Gas
                              </th>
                              <th className="px-2 py-1 text-right border">
                                Total (hr:min)
                              </th>
                              <th className="px-2 py-1 text-right border">
                                OTU
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                71
                              </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                5
                              </td>
                              <td className="px-2 py-1 text-center border">
                                Air
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:25
                              </td>
                              <td className="px-2 py-1 text-center border">
                                73
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:45
                              </td>
                              <td className="px-2 py-1 text-center border">
                                307
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                9
                              </td>
                              <td className="px-2 py-1 text-center border">
                                60
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O���
                              </td>
                              <td className="px-2 py-1 text-center border">
                                03:00
                              </td>
                              <td className="px-2 py-1 text-center border">
                                448
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                04:15
                              </td>
                              <td className="px-2 py-1 text-center border">
                                590
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                9-0
                              </td>
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                04:45
                              </td>
                              <td className="px-2 py-1 text-center border">
                                641
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CX30 */}
                <Card>
                  <CardHeader className="bg-red-50 border-b">
                    <CardTitle className="text-base">
                      COMEX Table CX 30
                    </CardTitle>
                    <Badge className="w-fit mt-2">CX30</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Use For:
                      </h4>
                      <p className="text-sm text-gray-700">
                        Very serious decompression sickness and air embolism
                        (only on prescription)
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Key Parameters:
                      </h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Uses 50/50 mix (oxygen/helium or nitrogen)</li>
                        <li>• Descent rate: 2-3 minutes</li>
                        <li>• Ascent rates vary by depth: 5 min/msw</li>
                        <li>• Longest and deepest treatment table</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">
                        Schedule (abbreviated):
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-center border">
                                Pressure (msw)
                              </th>
                              <th className="px-2 py-1 text-center border">
                                Time (min)
                              </th>
                              <th className="px-2 py-1 text-center border">
                                Gas
                              </th>
                              <th className="px-2 py-1 text-right border">
                                Total (hr:min)
                              </th>
                              <th className="px-2 py-1 text-right border">
                                OTU
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-purple-100 hover:bg-purple-200">
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                40
                              </td>
                              <td className="px-2 py-1 text-center border">
                                50/50
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:43
                              </td>
                              <td className="px-2 py-1 text-center border">
                                100
                              </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                              <td className="px-2 py-1 text-center border">
                                30-24
                              </td>
                              <td className="px-2 py-1 text-center border">
                                5
                              </td>
                              <td className="px-2 py-1 text-center border">
                                Air
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:48
                              </td>
                              <td className="px-2 py-1 text-center border">
                                103
                              </td>
                            </tr>
                            <tr className="bg-purple-100 hover:bg-purple-200">
                              <td className="px-2 py-1 text-center border">
                                24
                              </td>
                              <td className="px-2 py-1 text-center border">
                                25
                              </td>
                              <td className="px-2 py-1 text-center border">
                                50/50
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:43
                              </td>
                              <td className="px-2 py-1 text-center border">
                                214
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                25
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                02:43
                              </td>
                              <td className="px-2 py-1 text-center border">
                                352
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                04:38
                              </td>
                              <td className="px-2 py-1 text-center border">
                                646
                              </td>
                            </tr>
                            <tr className="bg-sky-100 hover:bg-sky-200">
                              <td className="px-2 py-1 text-center border">
                                12-0
                              </td>
                              <td className="px-2 py-1 text-center border">
                                24
                              </td>
                              <td className="px-2 py-1 text-center border">
                                O₂
                              </td>
                              <td className="px-2 py-1 text-center border">
                                07:02
                              </td>
                              <td className="px-2 py-1 text-center border">
                                942
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Air Treatment Tables Group */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Air Treatment Tables (Backup Only)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AIR-1A */}
                <Card>
                  <CardHeader className="bg-gray-100 border-b">
                    <CardTitle className="text-base">
                      Air Treatment Table 1A
                    </CardTitle>
                    <Badge className="w-fit mt-2">AIR-1A</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Use For:
                      </h4>
                      <p className="text-sm text-gray-700">
                        Pain only DCS (Type I) if oxygen unavailable and pain
                        disappears at depth &lt;20 msw
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Key Parameters:
                      </h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Descent rate: 7.5 msw/min</li>
                        <li>• Ascent rate: 1 minute between stops</li>
                        <li>• Use air throughout (no oxygen)</li>
                        <li>• Slower recompression for pain-only symptoms</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">
                        Schedule:
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-center border">
                                Depth (msw)
                              </th>
                              <th className="px-2 py-1 text-center border">
                                Time (min)
                              </th>
                              <th className="px-2 py-1 text-right border">
                                Total (hr:min)
                              </th>
                              <th className="px-2 py-1 text-right border">
                                OTU
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                22
                              </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                              <td className="px-2 py-1 text-center border">
                                24
                              </td>
                              <td className="px-2 py-1 text-center border">
                                12
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:43
                              </td>
                              <td className="px-2 py-1 text-center border">
                                28
                              </td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:14
                              </td>
                              <td className="px-2 py-1 text-center border">
                                35
                              </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                              <td className="px-2 py-1 text-center border">
                                12
                              </td>
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                02:16
                              </td>
                              <td className="px-2 py-1 text-center border">
                                37
                              </td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                6
                              </td>
                              <td className="px-2 py-1 text-center border">
                                60
                              </td>
                              <td className="px-2 py-1 text-center border">
                                04:18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                37
                              </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                              <td className="px-2 py-1 text-center border">
                                3
                              </td>
                              <td className="px-2 py-1 text-center border">
                                120
                              </td>
                              <td className="px-2 py-1 text-center border">
                                06:19
                              </td>
                              <td className="px-2 py-1 text-center border">
                                37
                              </td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                0
                              </td>
                              <td className="px-2 py-1 text-center border">
                                1
                              </td>
                              <td className="px-2 py-1 text-center border">
                                06:20
                              </td>
                              <td className="px-2 py-1 text-center border">
                                37
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AIR-2A */}
                <Card>
                  <CardHeader className="bg-gray-100 border-b">
                    <CardTitle className="text-base">
                      Air Treatment Table 2A
                    </CardTitle>
                    <Badge className="w-fit mt-2">AIR-2A</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Use For:
                      </h4>
                      <p className="text-sm text-gray-700">
                        Pain only DCS (Type I) if oxygen unavailable and pain
                        disappears at depth &gt;20 msw
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Key Parameters:
                      </h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Descent rate: 7.5 msw/min</li>
                        <li>• Ascent rate: 1 minute between stops</li>
                        <li>• Deeper starting depth (50 msw) for deep pain</li>
                        <li>�� Longer total decompression (10:59 hours)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">
                        Schedule (abbreviated):
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-center border">
                                Depth (msw)
                              </th>
                              <th className="px-2 py-1 text-center border">
                                Time (min)
                              </th>
                              <th className="px-2 py-1 text-right border">
                                Total (hr:min)
                              </th>
                              <th className="px-2 py-1 text-right border">
                                OTU
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                50
                              </td>
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                43
                              </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                12
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:09
                              </td>
                              <td className="px-2 py-1 text-center border">
                                76
                              </td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:53
                              </td>
                              <td className="px-2 py-1 text-center border">
                                89
                              </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                              <td className="px-2 py-1 text-center border">
                                9
                              </td>
                              <td className="px-2 py-1 text-center border">
                                120
                              </td>
                              <td className="px-2 py-1 text-center border">
                                04:56
                              </td>
                              <td className="px-2 py-1 text-center border">
                                93
                              </td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                3
                              </td>
                              <td className="px-2 py-1 text-center border">
                                240
                              </td>
                              <td className="px-2 py-1 text-center border">
                                10:58
                              </td>
                              <td className="px-2 py-1 text-center border">
                                93
                              </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                              <td className="px-2 py-1 text-center border">
                                0
                              </td>
                              <td className="px-2 py-1 text-center border">
                                1
                              </td>
                              <td className="px-2 py-1 text-center border">
                                10:59
                              </td>
                              <td className="px-2 py-1 text-center border">
                                93
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AIR-3 */}
                <Card className="md:col-span-2 lg:col-span-1">
                  <CardHeader className="bg-gray-100 border-b">
                    <CardTitle className="text-base">
                      Air Treatment Table 3
                    </CardTitle>
                    <Badge className="w-fit mt-2">AIR-3</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Use For:
                      </h4>
                      <p className="text-sm text-gray-700">
                        Serious symptoms (Type II) if oxygen unavailable and
                        symptoms disappear within 30 min at 50 msw
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        Key Parameters:
                      </h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Descent rate: As fast as possible</li>
                        <li>• Ascent rate: 1 minute between stops</li>
                        <li>• Very long decompression (18:59 hours)</li>
                        <li>• For serious neurological symptoms only</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">
                        Schedule (abbreviated):
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-center border">
                                Depth (msw)
                              </th>
                              <th className="px-2 py-1 text-center border">
                                Time (min)
                              </th>
                              <th className="px-2 py-1 text-right border">
                                Total (hr:min)
                              </th>
                              <th className="px-2 py-1 text-right border">
                                OTU
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                50
                              </td>
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                00:30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                43
                              </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                12
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:09
                              </td>
                              <td className="px-2 py-1 text-center border">
                                76
                              </td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                18
                              </td>
                              <td className="px-2 py-1 text-center border">
                                30
                              </td>
                              <td className="px-2 py-1 text-center border">
                                01:53
                              </td>
                              <td className="px-2 py-1 text-center border">
                                89
                              </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                              <td className="px-2 py-1 text-center border">
                                9
                              </td>
                              <td className="px-2 py-1 text-center border">
                                720
                              </td>
                              <td className="px-2 py-1 text-center border">
                                14:56
                              </td>
                              <td className="px-2 py-1 text-center border">
                                93
                              </td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="px-2 py-1 text-center border">
                                3
                              </td>
                              <td className="px-2 py-1 text-center border">
                                120
                              </td>
                              <td className="px-2 py-1 text-center border">
                                18:58
                              </td>
                              <td className="px-2 py-1 text-center border">
                                93
                              </td>
                            </tr>
                            <tr className="bg-gray-50 hover:bg-gray-100">
                              <td className="px-2 py-1 text-center border">
                                0
                              </td>
                              <td className="px-2 py-1 text-center border">
                                1
                              </td>
                              <td className="px-2 py-1 text-center border">
                                18:59
                              </td>
                              <td className="px-2 py-1 text-center border">
                                93
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-xs font-semibold text-red-900">
                  ��️ Critical Warning:
                </p>
                <p className="text-xs text-red-800 mt-1">
                  Air treatment tables are provided only for oxygen system
                  failure. In the 1960s, these tables showed a 50% recurrence
                  rate of DCS symptoms because air breathing at depth increases
                  nitrogen loading. Use oxygen treatment tables whenever
                  possible. Prevent oxygen delivery failure at all costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
