import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertTriangle, Zap, Clock, BookOpen } from 'lucide-react';

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

  const ProcedureButton = ({
    procedure,
    label,
    tableId,
  }: {
    procedure: ProcedureData;
    label: string;
    tableId: string;
  }) => {
    const dialogId = `${tableId}-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <Dialog>
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
                    <div
                      key={idx}
                      className="flex gap-3 items-start text-sm"
                    >
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
  };

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
                        • {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Diving Tables Section */}
          <div>
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Diving Tables
                </CardTitle>
                <CardDescription className="text-xs">
                  Select table and procedure type
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {tables.map((table) => (
                  <div key={table.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base text-gray-900">
                          {table.name}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1">
                          {table.description}
                        </p>
                      </div>
                    </div>

                    {/* Badge codes */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {table.codes.map((code) => (
                        <Badge key={code} variant="outline" className="text-xs font-mono">
                          {code}
                        </Badge>
                      ))}
                    </div>

                    {/* Procedure buttons */}
                    <div className="flex flex-wrap gap-1.5">
                      {table.procedures.normal && (
                        <ProcedureButton
                          procedure={table.procedures.normal}
                          label="Normal Use"
                          tableId={table.id}
                        />
                      )}
                      {table.procedures.emergency && (
                        <ProcedureButton
                          procedure={table.procedures.emergency}
                          label="Emergency"
                          tableId={table.id}
                        />
                      )}
                      {table.procedures.crashDive && (
                        <ProcedureButton
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
        </div>
      </div>
    </div>
  );
}
