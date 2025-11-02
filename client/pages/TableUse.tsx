import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, BookOpen, AlertTriangle, Zap, Waves } from 'lucide-react';
import {
  SIL15FlowchartEmergency,
  SOX15FlowchartEmergency1,
  SOX15FlowchartEmergency2,
  NitroxFlowchartEmergency1,
  NitroxFlowchartEmergency2,
  SIL15FlowchartInterrupted,
} from '@/components/flowcharts/EmergencyFlowcharts';

interface TableSection {
  title: string;
  icon: React.ReactNode;
  content: Array<{
    heading: string;
    subsections: Array<{
      title: string;
      text: string[];
      items?: string[];
      example?: string;
    }>;
    flowchart?: React.ReactNode;
  }>;
  color: string;
}

export default function TableUse() {
  const [expandedCard, setExpandedCard] = useState<number | null>(0);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const tableSections: TableSection[] = [
    {
      title: 'Standard Air Tables (SIL15)',
      icon: <Waves className="w-5 h-5" />,
      color: 'bg-blue-50 border-blue-200',
      content: [
        {
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
        },
        {
          heading: 'Emergency Procedures',
          subsections: [
            {
              title: 'Surface Decompression Option',
              text: [
                'If the repeat interval is more than 4 hours, use surface decompression tables with oxygen (HSOX15 or SOX15) if possible.',
                'This is possible even when one or more in water stops have been made that do not comply with the surface/ox table.',
                'This does not constitute an emergency procedure since normal surface decompression procedures are applied.',
              ],
            },
            {
              title: 'Crash Dive Procedure',
              text: [
                'If the repeat interval is shorter than 4 hours, or the total diving time exceeds that allowed in the surface decompression table, use the crash dive procedure.',
              ],
              items: [
                'Ascend to surface at a rate of < 10 metres per minute. Ignore all stops already made in water.',
                'Ensure diver is in chamber within 3 minutes and put under pressure at a depth equal to the depth of the first in water stop increased by 9 metres.',
                'Stay there for 5 minutes.',
                'Subsequently, carry out decompression according to the standard air tables (SIL15), for a period equal to the actual diving time increased by 10 minutes.',
                'If the chamber is equipped to provide oxygen, commence oxygen breathing from the 12 metre stop in periods of 20 minutes, alternated with 5 minutes on air.',
                'A repeat interval of not less than 12 hours must be observed.',
              ],
            },
          ],
          flowchart: <SIL15FlowchartEmergency />,
        },
      ],
    },
    {
      title: 'Surface/Oxygen Tables (SOX15)',
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-amber-50 border-amber-200',
      content: [
        {
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
        },
        {
          heading: 'Emergency Procedures',
          subsections: [
            {
              title: 'Oxygen Supply Failure',
              text: [
                'If oxygen breathing supplies fail, change to surface decompression tables using air (SAB15 or HSAB15).',
                'If it happens during decompression on the surface/oxygen table, resume at the stop where it happens.',
                'Time already done on oxygen should be considered as "time on air".',
                'The remainder of the stop and all consequent stops must be made according to the surface/air table (SAB15 or HSAB15).',
                'Following the use of air tables for surface decompression, a repetitive interval of not less than 12 hours must be observed.',
                'The diver must remain in the immediate vicinity of the compression chamber for 4 hours.',
              ],
            },
            {
              title: 'Oxygen Supply Restoration',
              text: [
                'Should the oxygen supply be restored, commence oxygen breathing from the 12 metres stop on for periods of 20 minutes alternated by 5 minutes of air breathing.',
                'Calculate OTU accumulated by oxygen breathing according to the OTU table.',
                'Add it to the OTU accumulation according to the surface decompression table using air only.',
                'Take care to remain within the normal 450 OTU per day limit.',
              ],
            },
          ],
          flowchart: <SOX15FlowchartEmergency1 />,
        },
      ],
    },
    {
      title: 'Nitrox Decompression Tables (NIA15 & NIB15)',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'bg-cyan-50 border-cyan-200',
      content: [
        {
          heading: 'Introduction',
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
          ],
        },
        {
          heading: 'Normal Use',
          subsections: [
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
            {
              title: 'OTU Management',
              text: [
                'OTUs are presented per 10 minutes nitrox breathing to enable OTU calculation.',
                'Maximum daily limit: 450 OTU.',
                'Following a decompression dive according to the nitrox tables, a repetitive dive is possible using the surface decompression table (HSOX15) after not less than 4 hours.',
              ],
            },
          ],
        },
        {
          heading: 'Emergency Procedures',
          subsections: [
            {
              title: 'Surface Decompression',
              text: [
                'If the repetitive interval is more than 4 hours, use surface decompression tables with oxygen (SOX15 or HSOX15) if possible.',
                'Select a table with a diving depth deeper than the equivalent air depth of the nitrox dive made.',
                'This does not constitute an emergency procedure since normal surface decompression procedures are applied.',
              ],
            },
            {
              title: 'Crash Dive Procedure',
              text: [
                'If the repetitive interval is shorter than 4 hours, or the dive time is longer than indicated in the surface decompression tables, use the crash dive procedure.',
              ],
              items: [
                'Select a standard air table with a diving depth deeper than the equivalent air depth of the nitrox dive made.',
                'Ascend to surface at a rate of no more than 10 metres per minute. Ignore all stops already made in water.',
                'Ensure diver is in chamber under pressure within 3 minutes after surfacing at a depth equal to the first in-water stop increased by 9 metres.',
                'Stay there for 5 minutes.',
                'Subsequently, carry out decompression according to the standard air tables (SIL), for a period equal to the actual diving time increased by 10 minutes.',
                'If the chamber is equipped to provide oxygen, commence oxygen breathing from the 12 metre stop in periods of 20 minutes, alternated with 5 minutes on air.',
                'Calculate OTU accumulation and stop using oxygen when limits are about to be exceeded.',
              ],
            },
          ],
          flowchart: <NitroxFlowchartEmergency1 />,
        },
      ],
    },
    {
      title: 'No-Stop Limits (ND15)',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-green-50 border-green-200',
      content: [
        {
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
        },
      ],
    },
    {
      title: 'Extended No-Stop Limits (LND15)',
      icon: <Waves className="w-5 h-5" />,
      color: 'bg-purple-50 border-purple-200',
      content: [
        {
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
        },
        {
          heading: 'Overrun Guidance',
          subsections: [
            {
              title: 'Exceeding LND15 Limits',
              text: [
                'Where possible, if the dive time exceeds the LND15, the dive must be completed using either the SIL15 tables or the SOX15 tables.',
                'Swell and wave conditions must be considered for these continuances.',
              ],
            },
            {
              title: 'LND15 Overrun Example',
              text: [
                'When diving on 14msw on LND15, the maximum allowed dive time is 100 minutes.',
                'If a SIL15 table is intended as continuance, acceptable swell/wave height must be no more than 1 metre.',
                'Minimum 10-minute continuance must be included in the dive time.',
              ],
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Navigation />

      <div className="px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
              Table Use Guide
            </h1>
            <p className="text-gray-600 text-lg">
              Comprehensive procedures, emergency protocols, and normal use guidelines for all diving tables
            </p>
          </div>

          {/* Alert Banner */}
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-900">Safety-Critical Information</p>
                <p className="text-sm text-red-800 mt-1">
                  Always verify with operations manual and diving supervisor. These guides are reference materials only.
                </p>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            {tableSections.map((section, idx) => (
              <Card key={idx} className={`${section.color} border-2 transition-all`}>
                <Collapsible
                  open={expandedCard === idx}
                  onOpenChange={() => setExpandedCard(expandedCard === idx ? null : idx)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-white/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{section.icon}</div>
                          <div>
                            <CardTitle>{section.title}</CardTitle>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            expandedCard === idx ? 'transform rotate-180' : ''
                          }`}
                        />
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="space-y-6 pt-0">
                      {section.content.map((contentItem, contentIdx) => (
                        <div key={contentIdx} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">
                              {contentItem.heading}
                            </h3>
                            {contentItem.heading !== 'General' &&
                              contentItem.heading !== 'Introduction' &&
                              contentItem.heading !== 'Overrun Guidance' && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        setOpenDialog(`${idx}-${contentIdx}`)
                                      }
                                    >
                                      View Details
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle>
                                        {section.title} - {contentItem.heading}
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-6 py-4">
                                      {contentItem.subsections.map(
                                        (sub, subIdx) => (
                                          <div key={subIdx}>
                                            <h4 className="font-bold text-lg mb-2">
                                              {sub.title}
                                            </h4>
                                            <div className="space-y-2">
                                              {sub.text.map((line, idx) => (
                                                <p
                                                  key={idx}
                                                  className="text-sm text-gray-700 leading-relaxed"
                                                >
                                                  {line}
                                                </p>
                                              ))}
                                              {sub.items && (
                                                <ul className="list-decimal pl-5 space-y-1 mt-2">
                                                  {sub.items.map(
                                                    (item, itemIdx) => (
                                                      <li
                                                        key={itemIdx}
                                                        className="text-sm text-gray-700"
                                                      >
                                                        {item}
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              )}
                                              {sub.example && (
                                                <p className="text-sm text-gray-600 italic mt-2 p-2 bg-blue-50 rounded">
                                                  {sub.example}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}
                          </div>

                          {/* Subsections in card */}
                          <div className="space-y-3 pl-4 border-l-4 border-gray-300">
                            {contentItem.subsections.map((sub, subIdx) => (
                              <div key={subIdx} className="space-y-1">
                                <h4 className="font-semibold text-gray-900">
                                  {sub.title}
                                </h4>
                                {sub.text.length <= 2 && !sub.items && (
                                  <p className="text-sm text-gray-700">
                                    {sub.text[0]}
                                  </p>
                                )}
                                {sub.text.length > 2 && !sub.items && (
                                  <p className="text-sm text-gray-600">
                                    {sub.text[0]}
                                  </p>
                                )}
                                {sub.items && (
                                  <p className="text-xs text-gray-500 italic">
                                    {sub.items.length} steps - click "View Details" to expand
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Flowchart */}
                          {contentItem.flowchart && (
                            <div className="mt-6 p-4 bg-white rounded-lg border-2 border-gray-200">
                              <h4 className="font-bold text-gray-900 mb-4">
                                Emergency Decision Flowchart
                              </h4>
                              {contentItem.flowchart}
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
