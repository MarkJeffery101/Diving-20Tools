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
import {
  SIL15FlowchartEmergency,
  SOX15FlowchartEmergency1,
  NitroxFlowchartEmergency1,
  SIL15FlowchartInterrupted,
} from '@/components/flowcharts/EmergencyFlowcharts';

interface DetailContent {
  heading: string;
  subsections: Array<{
    title: string;
    text: string[];
    items?: string[];
    example?: string;
  }>;
  flowchart?: React.ReactNode;
}

export default function TableUse() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const infoCards = [
    {
      id: 'critical-time',
      icon: <Clock className="w-5 h-5" />,
      title: 'Critical Time Limits',
      points: [
        'Surface interval: > 2 min',
        'Ascent speed: 10 m/min',
        'Ascent speed: 5-10 m/min',
      ],
      color: 'bg-red-50 border-red-200',
    },
    {
      id: 'oxygen',
      icon: <Zap className="w-5 h-5" />,
      title: 'Oxygen Limits',
      points: [
        'Max PO₂: 1.4 bar',
        'Max: 1.6 bar',
        'Daily: OTU 450 max',
      ],
      color: 'bg-amber-50 border-amber-200',
    },
    {
      id: 'standby',
      icon: <AlertTriangle className="w-5 h-5" />,
      title: 'Standby Periods',
      points: [
        'Min interval: 2 hours',
        'Min interval: 4 hours',
        'Min repeat: 12 hours',
      ],
      color: 'bg-cyan-50 border-cyan-200',
    },
  ];

  const drivingTables = [
    {
      id: 'sil15',
      name: 'Standard Air Tables',
      description: 'Standard air decompression tables with 12-hour repetitive interval',
      codes: ['SIL15', 'H2SIL15', 'H4SIL15'],
      section: 'Standard Air Tables (SIL15)',
      category: 'Normal Use',
    },
    {
      id: 'sox15',
      name: 'Surface/Oxygen Tables',
      description: 'Surface decompression tables with oxygen on and without oxygen on backup',
      codes: ['SOX15', 'HSOX15', 'SAB15', 'HSAB15'],
      section: 'Surface/Oxygen Tables (SOX15)',
      category: 'Normal Use',
    },
    {
      id: 'ntrx',
      name: 'Nitrox Decompression Tables',
      description: 'Extended air nitrox tables for mixed gas diving (NIA15, H2NIA15, H4NIA15, NIB15, H2NIB15, H4NIB15)',
      codes: ['NIA15', 'NIB15', 'H2NIA15', 'H4NIA15'],
      section: 'Nitrox Decompression Tables (NIA15 & NIB15)',
      category: 'Normal Use',
    },
    {
      id: 'nd15',
      name: 'No-Stop Limits for Air Diving',
      description: 'Standard air decompression limits for air diving',
      codes: ['ND15'],
      section: 'No-Stop Limits (ND15)',
      category: 'Normal Use',
    },
    {
      id: 'lnd15',
      name: 'Extended No-Stop Limits',
      description: 'Extended no-stop limits with 12-hour repeat intervals and no repetitive dives',
      codes: ['LND15'],
      section: 'Extended No-Stop Limits (LND15)',
      category: 'Normal Use',
    },
  ];

  const emergencyFlowcharts = [
    {
      id: 'sil15-emergency',
      title: 'SIL15 Emergency Procedure',
      description: 'Decision tree for surface decompression confirmation',
      section: 'Standard Air Tables (SIL15)',
      category: 'Emergency Procedures',
      flowchart: <SIL15FlowchartEmergency />,
    },
    {
      id: 'sox15-surface',
      title: 'SOX15 - Surface Interval Exceeded',
      description: 'Response to exceeding 3-minute surface interval',
      section: 'Surface/Oxygen Tables (SOX15)',
      category: 'Emergency Procedures',
      flowchart: <SOX15FlowchartEmergency1 />,
    },
    {
      id: 'nitrox-surface',
      title: 'Nitrox - Surface Decompression',
      description: 'Response when surface decompression needed',
      section: 'Nitrox Decompression Tables (NIA15 & NIB15)',
      category: 'Emergency Procedures',
      flowchart: <NitroxFlowchartEmergency1 />,
    },
  ];

  const getDetailContent = (
    section: string,
    category: string
  ): DetailContent => {
    const detailMap: { [key: string]: DetailContent } = {
      'Standard Air Tables (SIL15)': {
        heading: 'Normal Use',
        subsections: [
          {
            title: 'Repetitive Diving',
            text: [
              'The standard tables are based on a repetitive interval of 12 hours (SIL15).',
              'Repetitive dives are possible for intervals of no less than 2 or 4 hours (tables H2SIL15 and H4SIL15).',
              'For dives with an interval of 4 to 12 hours, use the table with the 4-hour interval (H4SIL15).',
              'It is recommended that following a repetitive dive, an interval of at least 12 hours is observed.',
            ],
          },
          {
            title: 'Oxygen Back-up',
            text: [
              'The bold lines in the tables indicate that the section below is for decompression procedures using oxygen.',
              'The use of oxygen shortens decompression time and increases safety.',
              'The bold lines indicate that decompression time on air exceeds 30 minutes.',
              'In case of urgent operational circumstances, the bold lines may be exceeded.',
            ],
          },
          {
            title: 'Surface Decompression',
            text: [
              'Following a decompression dive according to standard air tables, a repetitive dive is possible after not less than 4 hours using the surface decompression table (H4SOX15).',
              'After such a repetitive dive, an interval of not less than 12 hours must be observed.',
            ],
          },
        ],
        flowchart: <SIL15FlowchartEmergency />,
      },
      'Surface/Oxygen Tables (SOX15)': {
        heading: 'Normal Use',
        subsections: [
          {
            title: 'Oxygen Decompression',
            text: [
              'The tables with oxygen ("SOX" in the table code) are for normal use.',
              'The surface decompression tables with air only ("SAB" in the table code) are for backup only, in case of oxygen failure.',
              'If oxygen fails before a planned dive with surface decompression, the dive should be postponed until oxygen is available.',
              'The standard tables are based on a repetitive interval of 12 hours.',
            ],
          },
          {
            title: 'Critical 3-Minute Limit',
            text: [
              'The 3-minute limit to the period between reaching the surface and the first stop in the compression chamber is VERY CRITICAL.',
              'Every surface decompression procedure comprises a treatment aspect to eliminate nitrogen bubbles.',
              'Every time the 3-minute limit is exceeded, the treatment aspect should be increased as the risk of decompression sickness is greatly increased.',
            ],
          },
          {
            title: 'Exceeding 3-Minute Limit (up to 5 minutes)',
            text: [
              'When the 3-minute limit is exceeded by no more than 2 minutes:',
            ],
            items: [
              'Decompress according to the chosen table',
              'Extend oxygen breathing at the 12 metre stop by 20 minutes',
              'At the 9 metre stop with 10 minutes',
              'At both these stops alternate 20 minutes oxygen with 5 minutes air',
            ],
            example: 'This does not constitute an emergency procedure (use table code "SOXOV").',
          },
        ],
        flowchart: <SOX15FlowchartEmergency1 />,
      },
      'Nitrox Decompression Tables (NIA15 & NIB15)': {
        heading: 'Normal Use',
        subsections: [
          {
            title: 'About Nitrox',
            text: [
              'Nitrox, or enriched air, is useful to reduce the decompression time for diving to about 30 metres.',
              'The depth limit is set by the maximum oxygen partial pressure that is allowed.',
              'Maximum PO₂ is usually set at 1.6 bar, but IMCA advises a limit of 1.4 bar.',
            ],
          },
          {
            title: 'NIA15 (40% O₂ / 60% N₂)',
            text: [
              'At a depth of 27 metres, these tables reach a PO₂ of nearly 1.5 bar.',
              'This is over the IMCA limit but within the general safety limit.',
            ],
          },
          {
            title: 'NIB15 (35% O₂ / 65% N₂)',
            text: [
              'PO₂ of 1.4 bar at 30 metres.',
              'Complies with IMCA limits.',
            ],
          },
          {
            title: 'Oxygen Content Check',
            text: [
              'For both nitrox 40/60 and 35/65 mixtures, an oxygen content deviation of more than ±1% by volume is not allowed.',
              'Oxygen content in the mixture must be checked BEFORE USE.',
            ],
          },
          {
            title: 'Repetitive Intervals',
            text: [
              'The standard tables are based on a repetitive interval of 12 hours.',
              'Repetitive dives possible following an interval of not less than 2 or 4 hours (table codes H2NI or H4NI).',
              'It is recommended that following a repetitive dive, an interval of not less than 12 hours is observed.',
              'More than one repetitive dive is possible, as long as OTU limits are not exceeded.',
            ],
          },
        ],
        flowchart: <NitroxFlowchartEmergency1 />,
      },
      'No-Stop Limits (ND15)': {
        heading: 'General',
        subsections: [
          {
            title: 'No-Stop Diving',
            text: [
              'Per maximum diving depth, the maximum allowable diving time without the necessity for staged decompression is indicated.',
              'The repeat intervals are calculated for 2 and 8 hours.',
              'Should the repeat interval be less than 8 hours but longer than 2 hours, apply the 2-hour repeat interval table.',
              'In both cases the total time spent under pressure must not exceed 8 hours in a 24-hour period.',
            ],
          },
          {
            title: 'Ascent Speed (Critical)',
            text: [
              'When diving within no-stop limits, a correct ascent speed is most important.',
              'Maximum ascent speed: 10 metres/minute.',
              'Minimum ascent speed: 5 metres/minute.',
              'If the ascent speed is less than 5 m/min, the difference should be added to the diving time.',
            ],
          },
        ],
        flowchart: undefined,
      },
      'Extended No-Stop Limits (LND15)': {
        heading: 'General',
        subsections: [
          {
            title: 'Extended Limits',
            text: [
              'Longer no-stop times are possible, but yield a repeat interval of 12 hours or more.',
              'No repetitive dives are allowed.',
              'For harbour jobs or other shallow water jobs, no-stop limits between 9 and 15 metres are given at 1 metre intervals.',
            ],
          },
          {
            title: 'Critical Rules',
            items: [
              'Repetitive dives are NOT allowed.',
              'The repeat interval before and after the dive is 12 hours.',
              'Estimate table depth from depth reading plus error correction.',
            ],
          },
          {
            title: 'Depth Correction Factor',
            text: [
              '0–30 msw: +0.3 msw correction',
              '31–60 msw: +0.6 msw correction',
            ],
          },
          {
            title: 'Ascent Speed (Critical)',
            text: [
              'When diving according to the extended no-stop table, a correct ascent speed is of the GREATEST IMPORTANCE.',
              'Maximum ascent speed: 10 metres/minute.',
              'Minimum ascent speed: 5 metres/minute.',
              'If ascent speed is less, the difference should be added to the diving time.',
            ],
          },
        ],
        flowchart: undefined,
      },
    };

    return (
      detailMap[section] || {
        heading: '',
        subsections: [],
        flowchart: undefined,
      }
    );
  };

  const DetailButton = ({ section, category }: { section: string; category: string }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setOpenDialog(section)}>
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{section}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4 text-sm">
          {getDetailContent(section, category).subsections.map((sub, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-base mb-2">{sub.title}</h4>
              <div className="space-y-2">
                {sub.text.map((line, lineIdx) => (
                  <p key={lineIdx} className="text-gray-700 leading-relaxed">
                    {line}
                  </p>
                ))}
                {sub.items && (
                  <ul className="list-decimal pl-5 space-y-1 mt-2">
                    {sub.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-gray-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {sub.example && (
                  <p className="text-gray-600 italic mt-2 p-2 bg-blue-50 rounded">
                    {sub.example}
                  </p>
                )}
              </div>
            </div>
          ))}
          {getDetailContent(section, category).flowchart && (
            <div className="mt-6 p-4 bg-white rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4">Emergency Decision Flowchart</h4>
              {getDetailContent(section, category).flowchart}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <Navigation />

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Diving Tables Section */}
            <div>
              <Card className="h-full">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Diving Tables
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Select table and decompression type
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  {drivingTables.map((table) => (
                    <div
                      key={table.id}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-900">
                            {table.name}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {table.description}
                          </p>
                        </div>
                        <DetailButton
                          section={table.section}
                          category={table.category}
                        />
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {table.codes.map((code) => (
                          <Badge
                            key={code}
                            variant="outline"
                            className="text-xs font-mono"
                          >
                            {code}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Emergency Flowcharts Section */}
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
                <CardContent className="space-y-3 pt-4">
                  {emergencyFlowcharts.map((flowchart) => (
                    <Dialog key={flowchart.id}>
                      <DialogTrigger asChild>
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors cursor-pointer">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm text-gray-900">
                                {flowchart.title}
                              </h4>
                              <p className="text-xs text-gray-600 mt-1">
                                {flowchart.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{flowchart.title}</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="p-4 bg-white rounded-lg border-2 border-gray-200">
                            {flowchart.flowchart}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* No-Stop Limits Section */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-lg">No-Stop Limits Tables</CardTitle>
              <CardDescription className="text-xs">
                Maximum dive times without decompression
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 text-center">
                  <Badge className="mb-3 bg-blue-600">ND15</Badge>
                  <h4 className="font-semibold text-sm mb-1">Air Diving No-Stop</h4>
                  <p className="text-xs text-gray-600">
                    Standard air decompression limits
                  </p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border-2 border-amber-200 text-center">
                  <Badge className="mb-3 bg-amber-600">LND15</Badge>
                  <h4 className="font-semibold text-sm mb-1">Extended No-Stop</h4>
                  <p className="text-xs text-gray-600">
                    Extended no-stop limits
                  </p>
                </div>
                <div className="p-4 bg-cyan-50 rounded-lg border-2 border-cyan-200 text-center">
                  <Badge className="mb-3 bg-cyan-600">H2/H4NI</Badge>
                  <h4 className="font-semibold text-sm mb-1">Nitrox 35/65</h4>
                  <p className="text-xs text-gray-600">
                    Nitrox 35/65 limits
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
