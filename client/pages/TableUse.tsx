import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertTriangle, Zap, Clock, BookOpen } from 'lucide-react';
import {
  CrashDiveProcedure,
  OxygenFailureDuringDecompression,
  SurfaceDecompressionRequired,
  IrregularityDuringDecompression,
} from '@/components/flowcharts/EmergencyFlowcharts';

interface ProcedureData {
  title: string;
  icon?: React.ReactNode;
  badgeColor: string;
  badgeText: string;
  warning: boolean;
  warningText?: string;
  content: (string | { type: 'title' | 'item' | 'list' | 'section'; text: string })[];
}

interface TableType {
  id: string;
  name: string;
  description: string;
  codes: string[];
  procedures: {
    normal?: ProcedureData;
    emergency?: ProcedureData;
    crashDive?: ProcedureData;
  };
}

export default function TableUse() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const infoCards = [
    {
      id: 'critical-time',
      icon: <Clock className="w-5 h-5" />,
      title: 'Critical Time Limits',
      points: [
        'Surface to chamber: 3 min',
        'Extended (clearing): 5 min',
        'Ascent speed: 5-10 m/min',
      ],
      color: 'bg-red-50 border-red-200',
    },
    {
      id: 'oxygen',
      icon: <Zap className="w-5 h-5" />,
      title: 'Oxygen Limits',
      points: [
        'Max PO₂: 1.6 bar',
        'IMCA limit: 1.4 bar',
        'Daily OTU: 450 max',
      ],
      color: 'bg-amber-50 border-amber-200',
    },
    {
      id: 'standby',
      icon: <AlertTriangle className="w-5 h-5" />,
      title: 'Standby Periods',
      points: [
        'With O₂: 2 hours',
        'Without O₂: 4 hours',
        'Min repeat: 2-12 hours',
      ],
      color: 'bg-cyan-50 border-cyan-200',
    },
  ];

  const tables: TableType[] = [
    {
      id: 'sil15',
      name: 'Standard Air Tables',
      description: 'Standard air decompression tables with 12-hour repetitive interval',
      codes: ['SIL15', 'H2SIL15', 'H4SIL15'],
      procedures: {
        normal: {
          title: 'Standard Air Tables - Normal Use',
          badgeColor: 'bg-green-600',
          badgeText: 'SIL15',
          warning: false,
          content: [
            { type: 'item', text: 'Based on a repetitive interval of 12 hours (SIL15)' },
            { type: 'item', text: 'Repetitive dives possible for intervals of no less than 2 or 4 hours (tables H2SIL15 and H4SIL15)' },
            { type: 'item', text: 'For dives with an interval of 4 to 12 hours, use the table with the 4-hour interval (H4SIL15)' },
            { type: 'item', text: 'Recommended: observe at least 12 hours interval following a repetitive dive' },
            { type: 'item', text: 'More repetitive dives possible in urgent operational circumstances, as long as the part of the table above the bold line is adhered to' },
            { type: 'item', text: 'Bold lines indicate decompression time on air exceeds 30 minutes (backup for oxygen procedures)' },
            { type: 'item', text: 'Bold lines may be exceeded in urgent circumstances, but only one repetitive dive recommended after extended decompression' },
            { type: 'item', text: 'For routine longer dives, use of oxygen is recommended (requires diving bell - use BOX tables)' },
            { type: 'item', text: 'After decompression dive, repetitive dive possible after not less than 4 hours using H4SOX15' },
            { type: 'item', text: 'After H4SOX15 repetitive dive, observe interval of not less than 12 hours' },
          ],
        },
        emergency: {
          title: 'Standard Air Tables - Emergency Procedures',
          badgeColor: 'bg-red-600',
          badgeText: 'SIL15',
          warning: true,
          warningText: 'Emergency procedures - follow carefully and consult diving supervisor',
          content: [
            { type: 'item', text: 'If in-water decompression needs to continue on surface:' },
            { type: 'item', text: 'If repeat interval > 4 hours: use surface decompression tables with oxygen (HSOX15 or SOX15)' },
            { type: 'item', text: 'Possible even when in-water stops don\'t comply with surface/ox table' },
            { type: 'item', text: 'Does not constitute emergency procedure when using normal surface decompression' },
            { type: 'item', text: 'If in-water stops cannot be made or only partly made: surface/ox table may NOT be used' },
            { type: 'item', text: 'In this case, choose emergency crash dive procedure' },
          ],
        },
        crashDive: {
          title: 'Standard Air Tables - Crash Dive',
          badgeColor: 'bg-red-600',
          badgeText: 'SIL15',
          warning: true,
          warningText: 'CRASH DIVE - Critical emergency procedure - all emergency rules apply',
          content: [
            { type: 'title', text: '1. Use if repeat interval < 4 hours OR total diving time exceeds surface decompression table allowance' },
            { type: 'title', text: '2. Ascend to surface at rate < 10 metres per minute (ignore all stops already made)' },
            { type: 'title', text: '3. Ensure diver is in chamber within 3 minutes' },
            { type: 'title', text: '4. Put under pressure at depth = first in-water stop + 9 metres' },
            { type: 'title', text: '5. Stay there for 5 minutes' },
            { type: 'title', text: '6. Carry out decompression according to SIL15 for period = actual diving time + 10 minutes' },
            { type: 'title', text: '7. If chamber equipped for oxygen: commence oxygen breathing from 12 metre stop in periods of 20 minutes, alternated with 5 minutes on air' },
            { type: 'title', text: '8. Crash dive = emergency procedure - all emergency rules apply' },
            { type: 'title', text: '9. Observe repeat interval of not less than 12 hours' },
            { type: 'title', text: '10. If oxygen used: remain in vicinity of chamber for 2 hours' },
            { type: 'title', text: '11. If no oxygen used: remain in vicinity of chamber for 4 hours' },
            { type: 'title', text: '12. Risk of decompression sickness increases under these conditions' },
          ],
        },
      },
    },
    {
      id: 'sox15',
      name: 'Surface/Oxygen Tables',
      description: 'Surface decompression tables with oxygen on and air-only SAB tables for backup',
      codes: ['SOX15', 'HSOX15', 'SAB15', 'HSAB15'],
      procedures: {
        normal: {
          title: 'Surface/Oxygen Tables - Normal Use',
          badgeColor: 'bg-green-600',
          badgeText: 'SOX15',
          warning: false,
          content: [
            { type: 'item', text: 'Tables with oxygen ("SOX" code) are for normal use' },
            { type: 'item', text: 'Surface decompression tables with air only ("SAB" code) are backup only for oxygen failure' },
            { type: 'item', text: 'If oxygen fails before planned dive: postpone dive until oxygen is available' },
            { type: 'item', text: 'Based on repetitive interval of 12 hours' },
            { type: 'item', text: 'Repetitive dive possible following interval of not less than 4 hours (HSOX15)' },
            { type: 'item', text: 'After air-only surface decompression: observe at least 12 hours interval' },
            { type: 'item', text: '3-minute limit between surface and first chamber stop is CRITICAL' },
            { type: 'item', text: 'Every surface decompression includes treatment aspect to eliminate nitrogen bubbles' },
            { type: 'item', text: 'Exceeding 3-minute limit increases treatment aspect and DCS risk' },
          ],
        },
        emergency: {
          title: 'Surface/Oxygen Tables - Emergency Procedures',
          badgeColor: 'bg-red-600',
          badgeText: 'SOX15',
          warning: true,
          warningText: 'Emergency procedures - follow carefully and consult diving supervisor',
          content: [
            { type: 'section', text: 'If 3-minute limit exceeded by no more than 2 minutes (max 5 minutes total):' },
            { type: 'item', text: '- Decompress according to chosen table' },
            { type: 'item', text: '- Extend oxygen breathing at 12m stop by 20 minutes' },
            { type: 'item', text: '- Extend oxygen breathing at 9m stop by 10 minutes' },
            { type: 'item', text: '- At both stops: alternate 20 min oxygen with 5 min air' },
            { type: 'item', text: '- Does NOT constitute emergency (repetitive dive allowed for SOX15)' },
            { type: 'item', text: '- Note in logbook as irregularity (use code "SOXOV")' },
            { type: 'item', text: 'If surface interval > 5 minutes: emergency procedure applies' },
            { type: 'item', text: 'SOX15 tables allow going to 12m stop for (un)dressing, provided oxygen breathing starts within 5 minutes from surface' },
            { type: 'item', text: 'Apply table starting from beginning of oxygen breathing' },
            { type: 'section', text: 'OXYGEN FAILURE:' },
            { type: 'item', text: 'Change to surface decompression tables using air (SAB15 or HSAB15)' },
            { type: 'item', text: 'If during decompression: resume at stop where failure occurs' },
            { type: 'item', text: 'Time already done on oxygen = "time on air"' },
            { type: 'item', text: 'Completed time at failure stop counts as "time on air"' },
            { type: 'item', text: 'Remainder of stop and all subsequent stops per SAB15/HSAB15' },
            { type: 'item', text: 'After using air tables: observe repetitive interval of not less than 12 hours' },
            { type: 'item', text: 'Increased DCS risk - diver must remain near chamber for 4 hours' },
            { type: 'item', text: 'If oxygen supply restored: commence oxygen from 12m stop (20 min periods alternated with 5 min air)' },
            { type: 'item', text: 'Calculate OTU accumulated and add to air table OTU - remain within 450 OTU/day limit' },
            { type: 'item', text: 'If oxygen breathing ≥ 1/3 of decompression time: standby period reduced from 4 to 2 hours' },
          ],
        },
      },
    },
    {
      id: 'nitrox',
      name: 'Nitrox Decompression Tables',
      description: 'Enriched air tables for reduced decompression time (NIA15: 40/60, NIB15: 35/65)',
      codes: ['NIA15', 'NIB15', 'H2NIA15', 'H4NIA15'],
      procedures: {
        normal: {
          title: 'Nitrox Decompression Tables - Normal Use',
          badgeColor: 'bg-green-600',
          badgeText: 'NIA15 / NIB15',
          warning: false,
          content: [
            { type: 'item', text: 'NIA15: 40% O₂ / 60% N₂ - max PO₂ ~1.5 bar at 27m' },
            { type: 'item', text: 'NIB15: 35% O₂ / 65% N₂ - max PO₂ 1.4 bar at 30m (IMCA limit)' },
            { type: 'item', text: 'Maximum PO₂ limit: 1.6 bar (not to be exceeded)' },
            { type: 'item', text: 'General limit of 1.5 bar seems safe for professional diving' },
            { type: 'item', text: 'Oxygen content deviation: max ±1% by volume' },
            { type: 'item', text: 'Check oxygen content in mixture before use' },
            { type: 'item', text: 'Based on repetitive interval of 12 hours' },
            { type: 'item', text: 'Repetitive dive possible after interval of not less than 2 or 4 hours (H2NI or H4NI)' },
            { type: 'item', text: 'Recommended: observe not less than 12 hours after repetitive dive' },
            { type: 'item', text: 'More than one repetitive dive possible if OTU limits not exceeded' },
            { type: 'item', text: 'Longer interval = less DCS risk' },
            { type: 'item', text: 'After dive with long decompression: only one repetitive dive recommended' },
            { type: 'item', text: 'Tables provide Equivalent Air Depth (EAD)' },
            { type: 'item', text: 'No-stop dives: use tables on page D-2 for normal no-stop times (includes OTU per 10 min)' },
            { type: 'item', text: 'Long no-deco dives: apply EAD of nitrox dive in LND air tables' },
            { type: 'item', text: 'When exceeding no-deco limits: decompress with nitrox tables (NIA or NIB), or SIL15, SOX15, or BOX15' },
            { type: 'item', text: 'If using alternate tables: choose table depth deeper than EAD' },
            { type: 'item', text: 'After nitrox decompression dive: repetitive dive possible using HSOX15 after not less than 4 hours' },
            { type: 'item', text: 'After such repetitive dive: observe interval of not less than 12 hours' },
          ],
        },
        emergency: {
          title: 'Nitrox Decompression Tables - Emergency Procedures',
          badgeColor: 'bg-red-600',
          badgeText: 'NIA15 / NIB15',
          warning: true,
          warningText: 'Emergency procedures - follow carefully and consult diving supervisor',
          content: [
            { type: 'item', text: 'If in-water decompression needs to continue on surface:' },
            { type: 'item', text: 'If repetitive interval > 4 hours: use surface decompression tables with oxygen (SOX15 or HSOX15)' },
            { type: 'item', text: 'Select table with diving depth deeper than EAD of nitrox dive' },
            { type: 'item', text: 'Possible even when in-water stops don\'t comply with surface/ox table' },
            { type: 'item', text: 'Does not constitute emergency procedure' },
            { type: 'item', text: 'If repetitive interval < 4 hours OR dive time longer than surface decompression tables: use crash dive procedure' },
          ],
        },
        crashDive: {
          title: 'Nitrox Decompression Tables - Crash Dive',
          badgeColor: 'bg-red-600',
          badgeText: 'NIA15 / NIB15',
          warning: true,
          warningText: 'CRASH DIVE - Critical emergency procedure - all emergency rules apply',
          content: [
            { type: 'title', text: '1. Select standard air table with diving depth deeper than EAD of nitrox dive' },
            { type: 'title', text: '2. Ascend to surface at rate ≤ 10 metres per minute (ignore all stops already made)' },
            { type: 'title', text: '3. Ensure diver is in chamber under pressure within 3 minutes after surfacing' },
            { type: 'title', text: '4. Put at depth = first in-water stop + 9 metres' },
            { type: 'title', text: '5. Stay there for 5 minutes' },
            { type: 'title', text: '6. Carry out decompression according to SIL tables for period = actual diving time + 10 minutes' },
            { type: 'title', text: '7. If chamber equipped for oxygen: commence oxygen breathing from 12m stop in periods of 20 minutes, alternated with 5 minutes on air' },
            { type: 'title', text: '8. Calculate OTU of extra oxygen periods using OTU table' },
            { type: 'title', text: '9. Stop using oxygen when OTU limits about to be exceeded' },
            { type: 'title', text: '10. Crash dive = emergency procedure - all emergency rules apply' },
            { type: 'title', text: '11. Observe repetitive interval of not less than 12 hours' },
            { type: 'title', text: '12. If oxygen used during decompression: remain near chamber for 2 hours' },
            { type: 'title', text: '13. If no oxygen used: remain near chamber for 4 hours' },
            { type: 'title', text: '14. Risk of decompression sickness increases under these conditions' },
          ],
        },
      },
    },
    {
      id: 'nd15',
      name: 'No-Stop Limits for Air Diving',
      description: 'Standard no-decompression limits for air diving',
      codes: ['ND15'],
      procedures: {
        normal: {
          title: 'No-Stop Limits for Air Diving - Normal Use',
          badgeColor: 'bg-green-600',
          badgeText: 'ND15',
          warning: false,
          content: [
            { type: 'item', text: 'Maximum allowable diving time without staged decompression per depth' },
            { type: 'item', text: 'Repeat intervals calculated for 2 and 8 hours' },
            { type: 'item', text: 'If repeat interval > 2 hours but < 8 hours: apply 2-hour repeat interval table' },
            { type: 'item', text: 'Total time under pressure must not exceed 8 hours in 24-hour period' },
            { type: 'item', text: 'Recommended: following dive with repeat interval < 8 hours, observe repeat interval ≥ 8 hours' },
            { type: 'item', text: 'Maximum ascent speed: 10 metres/minute' },
            { type: 'item', text: 'Minimum ascent speed: 5 metres/minute' },
            { type: 'item', text: 'If ascent speed < 5 m/min: add difference to diving time' },
          ],
        },
        emergency: {
          title: 'No-Stop Limits for Air Diving - Emergency Procedures',
          badgeColor: 'bg-red-600',
          badgeText: 'ND15',
          warning: true,
          warningText: 'Emergency procedures - follow carefully and consult diving supervisor',
          content: [
            { type: 'item', text: 'Ascent speed is CRITICAL for no-stop diving' },
            { type: 'item', text: 'Maximum: 10 m/min' },
            { type: 'item', text: 'Minimum: 5 m/min' },
            { type: 'item', text: 'Slower ascent: add extra time to dive time' },
          ],
        },
      },
    },
    {
      id: 'lnd15',
      name: 'Extended No-Stop Limits',
      description: 'Extended no-stop times with 12+ hour intervals and no repetitive dives',
      codes: ['LND15'],
      procedures: {
        normal: {
          title: 'Extended No-Stop Limits - Normal Use',
          badgeColor: 'bg-green-600',
          badgeText: 'LND15',
          warning: false,
          content: [
            { type: 'item', text: 'Longer no-stop times possible with 12+ hour repeat intervals' },
            { type: 'item', text: 'NO repetitive dives allowed' },
            { type: 'item', text: 'Repeat interval before and after dive: 12 hours' },
            { type: 'item', text: 'For harbour/shallow water jobs: no-stop limits between 9-15m at 1m intervals' },
            { type: 'item', text: 'Estimate table depth from depth reading plus error correction' },
            { type: 'section', text: 'Pneumofathometer corrections:' },
            { type: 'item', text: '- 0-30 msw / 0-100 fsw: +0.3 msw / +1 fsw' },
            { type: 'item', text: '- 31-60 msw / 101-200 fsw: +0.6 msw / +2 fsw' },
            { type: 'item', text: 'Maximum ascent speed: 10 metres/minute' },
            { type: 'item', text: 'Minimum ascent speed: 5 metres/minute' },
            { type: 'item', text: 'If ascent speed < 5 m/min: add difference to diving time' },
          ],
        },
        emergency: {
          title: 'Extended No-Stop Limits - Emergency Procedures',
          badgeColor: 'bg-red-600',
          badgeText: 'LND15',
          warning: true,
          warningText: 'Emergency procedures - follow carefully and consult diving supervisor',
          content: [
            { type: 'section', text: 'EXCEEDING LND15 GUIDANCE:' },
            { type: 'item', text: 'Where possible, complete dive and decompression using SIL15 or SOX15 tables' },
            { type: 'item', text: 'Consider swell and wave conditions for continuance based on foreseen table' },
            { type: 'section', text: 'EXAMPLE - 14msw LND15 (100 min max):' },
            { type: 'item', text: 'If using SIL15 as continuance: acceptable swell/wave height max 1 meter' },
            { type: 'item', text: 'If not acceptable: keep dive time in reserve within 100 min for possible entanglement' },
            { type: 'item', text: 'In these situations: minimum 10-minute continuance must be included in dive time' },
            { type: 'section', text: 'CONTINUANCE OPTIONS:' },
            { type: 'item', text: 'SIL15 possible for all LND15 dives deeper than 11msw' },
            { type: 'item', text: 'SOX15 possible for all LND15 dives deeper than 10msw (not from daughter craft)' },
            { type: 'section', text: 'SPECIFIC DEPTH OVERRUNS:' },
            { type: 'item', text: '9msw: no in-water stops required until 330 minutes. Give 20 min oxygen at surface' },
            { type: 'item', text: '10msw: 10-minute in-water stop required until 300 minutes. Give 20 min oxygen at surface' },
            { type: 'item', text: '11msw: 10-minute in-water stop required until 220 minutes. Give 20 min oxygen at surface' },
            { type: 'item', text: 'Note: Surface oxygen is continuance decompression, NOT treatment' },
            { type: 'section', text: 'EXTREME UNPLANNED EXTENSION:' },
            { type: 'item', text: 'If above cannot be accomplished: start US Navy Table 5' },
            { type: 'item', text: 'Seek advice from onshore medical physician ASAP' },
            { type: 'item', text: 'Report to N-Sea DTA:' },
            { type: 'item', text: '  - Within 5 guidance points: non-conformity' },
            { type: 'item', text: '  - If Table 5 started: incident' },
          ],
        },
      },
    },
  ];

  const renderFlowchartButton = (
    id: string,
    title: string,
    description: string,
    icon: string,
    component: React.ReactNode | null
  ) => (
    <Dialog key={id}>
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
  );

  const renderProcedureButton = (procedure: ProcedureData, label: string, tableId: string) => (
    <Dialog key={`${tableId}-${label}`}>
      <DialogTrigger asChild>
        <Button variant="outline" size="xs" className="h-7 px-3 text-xs justify-center">
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
              if (typeof item === 'string') {
                return (
                  <p key={idx} className="text-sm text-gray-700">
                    {item}
                  </p>
                );
              }

              if (item.type === 'title') {
                return (
                  <div key={idx} className="flex gap-3 items-start text-sm">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 pt-0.5">{item.text}</p>
                  </div>
                );
              }

              if (item.type === 'section') {
                return (
                  <p key={idx} className="text-sm font-bold text-orange-600 mt-4 mb-2">
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
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <Navigation />

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
              Diving Tables Safety Guide
            </h1>
            <p className="text-gray-600 text-sm">
              Interactive procedures & emergency protocols
            </p>
          </div>

          {/* Alert Banner */}
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-900 text-sm">Safety-Critical Information</p>
                <p className="text-xs text-red-800 mt-1">
                  Always verify with operations manual and diving supervisor. Click procedures to view details.
                </p>
              </div>
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
                        ��� {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Left: Diving Tables */}
            <div>
              <Card className="h-full">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Diving Tables
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Select table and procedure type
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {tables.map((table) => (
                    <div key={table.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      {/* Title and Badge codes on same row */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-sm text-gray-900">
                          {table.name}
                        </h3>
                        {table.codes.map((code) => (
                          <Badge key={code} variant="outline" className="text-xs font-mono h-6">
                            {code}
                          </Badge>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-600 mb-2">
                        {table.description}
                      </p>

                      {/* Procedure buttons */}
                      <div className="flex flex-wrap gap-1.5">
                        {table.procedures.normal && renderProcedureButton(table.procedures.normal, 'Normal Use', table.id)}
                        {table.procedures.emergency && renderProcedureButton(table.procedures.emergency, 'Emergency', table.id)}
                        {table.procedures.crashDive && renderProcedureButton(table.procedures.crashDive, 'Crash Dive', table.id)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right: Emergency Flowcharts */}
            <div>
              <Card className="h-full">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Emergency Flowcharts
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Interactive decision trees
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  {renderFlowchartButton(
                    'crash-dive',
                    'Crash Dive Procedure',
                    'Emergency decompression when dive is interrupted',
                    '⚠️',
                    <CrashDiveProcedure />
                  )}
                  {renderFlowchartButton(
                    'oxygen-failure',
                    'Oxygen Failure During Decompression',
                    'Response when oxygen supply fails',
                    '⏱️',
                    <OxygenFailureDuringDecompression />
                  )}
                  {renderFlowchartButton(
                    'surface-decompression',
                    'Surface Decompression Required',
                    'Decision tree for surface decompression scenarios',
                    '💨',
                    <SurfaceDecompressionRequired />
                  )}
                  {renderFlowchartButton(
                    'irregularity-decompression',
                    'Irregularity During Decompression',
                    'Treatment procedure for decompression irregularities',
                    '📈',
                    <IrregularityDuringDecompression />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Treatment Tables Section */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Treatment Tables (DCS & CAGE)</h2>

            {/* Introduction/Logic Tree */}
            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">When to Use Treatment Tables</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-2">Important First Steps:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Most important:</strong> Administer oxygen and fluids as soon as possible</li>
                    <li>• Start recompression to 18 metres while breathing oxygen</li>
                    <li>• For very mild symptoms only: treatment at 12 metres (after medical consultation)</li>
                    <li>• Seek advice from a diving medical specialist as soon as possible</li>
                    <li>• <strong>Do NOT delay treatment</strong> while awaiting medical advice</li>
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-sm text-gray-900 mb-2">Treatment Decision Tree:</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>Mild skin-bends (purple rash only):</strong> CX12 or USN-T5</li>
                    <li><strong>Type I DCS / Residual symptoms:</strong> CX12, USN-T5</li>
                    <li><strong>Type II DCS (serious neurological):</strong> USN-T6, CX30, or AIR-T3</li>
                    <li><strong>Air Embolism:</strong> USN-T6 or CX30</li>
                    <li><strong>Air Treatment (no oxygen available):</strong> AIR-T1A, AIR-T2A, or AIR-T3</li>
                  </ul>
                </div>

                <div className="bg-amber-100 border-l-4 border-amber-500 p-3 rounded">
                  <p className="text-xs font-semibold text-amber-900">⚠️ Note:</p>
                  <p className="text-xs text-amber-800">Air treatment tables are provided with reluctance and only for oxygen delivery failure. Prevent this at all costs.</p>
                </div>
              </CardContent>
            </Card>

            {/* Oxygen Treatment Tables Group */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Oxygen Treatment Tables</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CX12 */}
                <Card>
                  <CardHeader className="bg-green-50 border-b">
                    <CardTitle className="text-base">COMEX Table CX 12</CardTitle>
                    <Badge className="w-fit mt-2">CX12</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Use For:</h4>
                      <p className="text-sm text-gray-700">Mild forms of skin-bends (purple blotching rash only) and treatment of residual symptoms</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Key Parameters:</h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Descent rate: 2 msw/min</li>
                        <li>• Ascent rate: 0.5 msw/min</li>
                        <li>• Symptoms relieved within 4 min at ≤8 msw</li>
                        <li>• Only on prescription by diving physician</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Schedule:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-left border">Pressure (msw)</th>
                              <th className="px-2 py-1 text-center border">Time (min)</th>
                              <th className="px-2 py-1 text-center border">Gas</th>
                              <th className="px-2 py-1 text-right border">Total (min)</th>
                              <th className="px-2 py-1 text-right border">OTU</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">18</td><td className="px-2 py-1 text-center border">20</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">00:20</td><td className="px-2 py-1 text-right border">71</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">18</td><td className="px-2 py-1 text-center border">5</td><td className="px-2 py-1 text-center border">Air</td><td className="px-2 py-1 text-right border">00:25</td><td className="px-2 py-1 text-right border">73</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">18</td><td className="px-2 py-1 text-center border">20</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">00:45</td><td className="px-2 py-1 text-right border">144</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">18-Sep</td><td className="px-2 py-1 text-center border">30</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">01:15</td><td className="px-2 py-1 text-right border">233</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">9</td><td className="px-2 py-1 text-center border">5</td><td className="px-2 py-1 text-center border">Air</td><td className="px-2 py-1 text-right border">01:20</td><td className="px-2 py-1 text-right border">233</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">9</td><td className="px-2 py-1 text-center border">20</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">01:40</td><td className="px-2 py-1 text-right border">280</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">9</td><td className="px-2 py-1 text-center border">5</td><td className="px-2 py-1 text-center border">Air</td><td className="px-2 py-1 text-right border">01:45</td><td className="px-2 py-1 text-right border">280</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">9-0</td><td className="px-2 py-1 text-center border">30</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">02:15</td><td className="px-2 py-1 text-right border">331</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* USN-T5 */}
                <Card>
                  <CardHeader className="bg-green-50 border-b">
                    <CardTitle className="text-base">US Navy Oxygen Treatment Table 5</CardTitle>
                    <Badge className="w-fit mt-2">USN-T5</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Use For:</h4>
                      <p className="text-sm text-gray-700">Prevention (omitted decompression with no symptoms) and mild forms of skin-bends</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Key Parameters:</h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Descent rate: 7.5 msw/min</li>
                        <li>• Ascent rate: 0.3 msw/min</li>
                        <li>• Time at 18 msw starts on arrival</li>
                        <li>• Can switch to Table 6 if O₂ problems arise</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Schedule:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-left border">Pressure (msw)</th>
                              <th className="px-2 py-1 text-center border">Time (min)</th>
                              <th className="px-2 py-1 text-center border">Gas</th>
                              <th className="px-2 py-1 text-right border">Total (min)</th>
                              <th className="px-2 py-1 text-right border">OTU</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">18</td><td className="px-2 py-1 text-center border">20</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">00:20</td><td className="px-2 py-1 text-right border">71</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">18</td><td className="px-2 py-1 text-center border">5</td><td className="px-2 py-1 text-center border">Air</td><td className="px-2 py-1 text-right border">00:25</td><td className="px-2 py-1 text-right border">73</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">18</td><td className="px-2 py-1 text-center border">20</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">00:45</td><td className="px-2 py-1 text-right border">144</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">18-Sep</td><td className="px-2 py-1 text-center border">30</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">01:15</td><td className="px-2 py-1 text-right border">233</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">9</td><td className="px-2 py-1 text-center border">5</td><td className="px-2 py-1 text-center border">Air</td><td className="px-2 py-1 text-right border">01:20</td><td className="px-2 py-1 text-right border">233</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">9</td><td className="px-2 py-1 text-center border">20</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">01:40</td><td className="px-2 py-1 text-right border">280</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">9</td><td className="px-2 py-1 text-center border">5</td><td className="px-2 py-1 text-center border">Air</td><td className="px-2 py-1 text-right border">01:45</td><td className="px-2 py-1 text-right border">280</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">9-0</td><td className="px-2 py-1 text-center border">30</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">02:15</td><td className="px-2 py-1 text-right border">331</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* USN-T6 */}
                <Card>
                  <CardHeader className="bg-orange-50 border-b">
                    <CardTitle className="text-base">US Navy Oxygen Treatment Table 6</CardTitle>
                    <Badge className="w-fit mt-2">USN-T6</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Use For:</h4>
                      <p className="text-sm text-gray-700">Type I & II DCS if symptoms don't disappear within 10 min at 18 msw, and air embolism</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Key Parameters:</h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Descent rate: 7.5 msw/min</li>
                        <li>• Ascent rate: 0.3 msw/min</li>
                        <li>• Can be lengthened 25 min at 18 msw or 75 min at 9 msw</li>
                        <li>• Longest treatment table for serious symptoms</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Schedule (abbreviated):</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-left border">Pressure (msw)</th>
                              <th className="px-2 py-1 text-center border">Time (min)</th>
                              <th className="px-2 py-1 text-center border">Gas</th>
                              <th className="px-2 py-1 text-right border">Total (hr:min)</th>
                              <th className="px-2 py-1 text-right border">OTU</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">18</td><td className="px-2 py-1 text-center border">20</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">00:20</td><td className="px-2 py-1 text-right border">71</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">18</td><td className="px-2 py-1 text-center border">5</td><td className="px-2 py-1 text-center border">Air</td><td className="px-2 py-1 text-right border">00:25</td><td className="px-2 py-1 text-right border">73</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">18-Sep</td><td className="px-2 py-1 text-center border">30</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">01:45</td><td className="px-2 py-1 text-right border">307</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">9</td><td className="px-2 py-1 text-center border">60</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">03:00</td><td className="px-2 py-1 text-right border">448</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">9</td><td className="px-2 py-1 text-center border">60</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">04:15</td><td className="px-2 py-1 text-right border">590</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">9-0</td><td className="px-2 py-1 text-center border">30</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">04:45</td><td className="px-2 py-1 text-right border">641</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CX30 */}
                <Card>
                  <CardHeader className="bg-red-50 border-b">
                    <CardTitle className="text-base">COMEX Table CX 30</CardTitle>
                    <Badge className="w-fit mt-2">CX30</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Use For:</h4>
                      <p className="text-sm text-gray-700">Very serious decompression sickness and air embolism (only on prescription)</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Key Parameters:</h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Uses 50/50 mix (oxygen/helium or nitrogen)</li>
                        <li>• Descent rate: 2-3 minutes</li>
                        <li>• Ascent rates vary by depth: 5 min/msw</li>
                        <li>• Longest and deepest treatment table</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Schedule (abbreviated):</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-left border">Pressure (msw)</th>
                              <th className="px-2 py-1 text-center border">Time (min)</th>
                              <th className="px-2 py-1 text-center border">Gas</th>
                              <th className="px-2 py-1 text-right border">Total (hr:min)</th>
                              <th className="px-2 py-1 text-right border">OTU</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">30</td><td className="px-2 py-1 text-center border">40</td><td className="px-2 py-1 text-center border">50/50</td><td className="px-2 py-1 text-right border">00:43</td><td className="px-2 py-1 text-right border">100</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">30-24</td><td className="px-2 py-1 text-center border">5</td><td className="px-2 py-1 text-center border">Air</td><td className="px-2 py-1 text-right border">00:48</td><td className="px-2 py-1 text-right border">103</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">24</td><td className="px-2 py-1 text-center border">25</td><td className="px-2 py-1 text-center border">50/50</td><td className="px-2 py-1 text-right border">01:43</td><td className="px-2 py-1 text-right border">214</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">18</td><td className="px-2 py-1 text-center border">25</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">02:43</td><td className="px-2 py-1 text-right border">352</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">12</td><td className="px-2 py-1 text-center border">45</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">04:38</td><td className="px-2 py-1 text-right border">646</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">12-0</td><td className="px-2 py-1 text-center border">24</td><td className="px-2 py-1 text-center border">O₂</td><td className="px-2 py-1 text-right border">07:02</td><td className="px-2 py-1 text-right border">942</td></tr>
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">Air Treatment Tables (Backup Only)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AIR-T1A */}
                <Card>
                  <CardHeader className="bg-gray-100 border-b">
                    <CardTitle className="text-base">Air Treatment Table 1A</CardTitle>
                    <Badge className="w-fit mt-2">AIR-T1A</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Use For:</h4>
                      <p className="text-sm text-gray-700">Pain only DCS (Type I) if oxygen unavailable and pain disappears at depth &lt;20 msw</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Key Parameters:</h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Descent rate: 7.5 msw/min</li>
                        <li>• Ascent rate: 1 minute between stops</li>
                        <li>• Use air throughout (no oxygen)</li>
                        <li>• Slower recompression for pain-only symptoms</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Schedule:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-left border">Depth (msw)</th>
                              <th className="px-2 py-1 text-center border">Time (min)</th>
                              <th className="px-2 py-1 text-right border">Total (hr:min)</th>
                              <th className="px-2 py-1 text-right border">OTU</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">30</td><td className="px-2 py-1 text-center border">30</td><td className="px-2 py-1 text-right border">00:30</td><td className="px-2 py-1 text-right border">22</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">24</td><td className="px-2 py-1 text-center border">12</td><td className="px-2 py-1 text-right border">00:43</td><td className="px-2 py-1 text-right border">28</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">18</td><td className="px-2 py-1 text-center border">30</td><td className="px-2 py-1 text-right border">01:14</td><td className="px-2 py-1 text-right border">35</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">12</td><td className="px-2 py-1 text-center border">30</td><td className="px-2 py-1 text-right border">02:16</td><td className="px-2 py-1 text-right border">37</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">6</td><td className="px-2 py-1 text-center border">60</td><td className="px-2 py-1 text-right border">04:18</td><td className="px-2 py-1 text-right border">37</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">3</td><td className="px-2 py-1 text-center border">120</td><td className="px-2 py-1 text-right border">06:19</td><td className="px-2 py-1 text-right border">37</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">0</td><td className="px-2 py-1 text-center border">1</td><td className="px-2 py-1 text-right border">06:20</td><td className="px-2 py-1 text-right border">37</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AIR-T2A */}
                <Card>
                  <CardHeader className="bg-gray-100 border-b">
                    <CardTitle className="text-base">Air Treatment Table 2A</CardTitle>
                    <Badge className="w-fit mt-2">AIR-T2A</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Use For:</h4>
                      <p className="text-sm text-gray-700">Pain only DCS (Type I) if oxygen unavailable and pain disappears at depth &gt;20 msw</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Key Parameters:</h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Descent rate: 7.5 msw/min</li>
                        <li>• Ascent rate: 1 minute between stops</li>
                        <li>• Deeper starting depth (50 msw) for deep pain</li>
                        <li>• Longer total decompression (10:59 hours)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Schedule (abbreviated):</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-left border">Depth (msw)</th>
                              <th className="px-2 py-1 text-center border">Time (min)</th>
                              <th className="px-2 py-1 text-right border">Total (hr:min)</th>
                              <th className="px-2 py-1 text-right border">OTU</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">50</td><td className="px-2 py-1 text-center border">30</td><td className="px-2 py-1 text-right border">00:30</td><td className="px-2 py-1 text-right border">43</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">30</td><td className="px-2 py-1 text-center border">12</td><td className="px-2 py-1 text-right border">01:09</td><td className="px-2 py-1 text-right border">76</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">18</td><td className="px-2 py-1 text-center border">30</td><td className="px-2 py-1 text-right border">01:53</td><td className="px-2 py-1 text-right border">89</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">9</td><td className="px-2 py-1 text-center border">120</td><td className="px-2 py-1 text-right border">04:56</td><td className="px-2 py-1 text-right border">93</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">3</td><td className="px-2 py-1 text-center border">240</td><td className="px-2 py-1 text-right border">10:58</td><td className="px-2 py-1 text-right border">93</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">0</td><td className="px-2 py-1 text-center border">1</td><td className="px-2 py-1 text-right border">10:59</td><td className="px-2 py-1 text-right border">93</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AIR-T3 */}
                <Card className="md:col-span-2 lg:col-span-1">
                  <CardHeader className="bg-gray-100 border-b">
                    <CardTitle className="text-base">Air Treatment Table 3</CardTitle>
                    <Badge className="w-fit mt-2">AIR-T3</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Use For:</h4>
                      <p className="text-sm text-gray-700">Serious symptoms (Type II) if oxygen unavailable and symptoms disappear within 30 min at 50 msw</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Key Parameters:</h4>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        <li>• Descent rate: As fast as possible</li>
                        <li>• Ascent rate: 1 minute between stops</li>
                        <li>• Very long decompression (18:59 hours)</li>
                        <li>• For serious neurological symptoms only</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Schedule (abbreviated):</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-300">
                          <thead className="bg-blue-600 text-white">
                            <tr>
                              <th className="px-2 py-1 text-left border">Depth (msw)</th>
                              <th className="px-2 py-1 text-center border">Time (min)</th>
                              <th className="px-2 py-1 text-right border">Total (hr:min)</th>
                              <th className="px-2 py-1 text-right border">OTU</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">50</td><td className="px-2 py-1 text-center border">30</td><td className="px-2 py-1 text-right border">00:30</td><td className="px-2 py-1 text-right border">43</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">30</td><td className="px-2 py-1 text-center border">12</td><td className="px-2 py-1 text-right border">01:09</td><td className="px-2 py-1 text-right border">76</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">18</td><td className="px-2 py-1 text-center border">30</td><td className="px-2 py-1 text-right border">01:53</td><td className="px-2 py-1 text-right border">89</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">9</td><td className="px-2 py-1 text-center border">720</td><td className="px-2 py-1 text-right border">14:56</td><td className="px-2 py-1 text-right border">93</td></tr>
                            <tr className="bg-white hover:bg-gray-50"><td className="px-2 py-1 border">3</td><td className="px-2 py-1 text-center border">120</td><td className="px-2 py-1 text-right border">18:58</td><td className="px-2 py-1 text-right border">93</td></tr>
                            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-2 py-1 border">0</td><td className="px-2 py-1 text-center border">1</td><td className="px-2 py-1 text-right border">18:59</td><td className="px-2 py-1 text-right border">93</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-xs font-semibold text-red-900">⚠️ Critical Warning:</p>
                <p className="text-xs text-red-800 mt-1">
                  Air treatment tables are provided only for oxygen system failure. In the 1960s, these tables showed a 50% recurrence rate of DCS symptoms because air breathing at depth increases nitrogen loading. Use oxygen treatment tables whenever possible. Prevent oxygen delivery failure at all costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
