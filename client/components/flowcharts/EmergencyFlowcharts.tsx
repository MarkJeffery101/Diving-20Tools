import React from 'react';

export function EmergencyProcedureAirTable() {
  return (
    <svg viewBox="0 0 600 900" className="w-full h-auto">
      <defs>
        <linearGradient id="grad-blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00a4cc', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0080a3', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="grad-darker-blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0080a3', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#006080', stopOpacity: 1 }} />
        </linearGradient>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#00688a" />
        </marker>
      </defs>

      <text x="120" y="30" fontSize="18" fontWeight="bold" fill="#333">Emergency Procedure Air Table (SIL15)</text>

      {/* Start: Dive is interrupted */}
      <rect x="110" y="50" width="280" height="60" rx="30" fill="url(#grad-blue)" stroke="#00688a" strokeWidth="2"/>
      <text x="250" y="85" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Dive is interrupted</text>

      {/* Arrow down */}
      <line x1="250" y1="110" x2="250" y2="150" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead)"/>

      {/* Decision 1: Repeat interval > 4 hrs? */}
      <polygon points="250,150 350,200 250,250 150,200" fill="url(#grad-blue)" stroke="#00688a" strokeWidth="2"/>
      <text x="250" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Repeat interval</text>
      <text x="250" y="215" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">&gt; 4 hrs?</text>

      {/* YES arrow right */}
      <line x1="350" y1="200" x2="410" y2="200" stroke="#00688a" strokeWidth="2"/>
      <text x="375" y="190" fill="#00688a" fontSize="12" fontWeight="bold">YES</text>
      <rect x="410" y="170" width="150" height="60" rx="8" fill="url(#grad-blue)" stroke="#00688a" strokeWidth="2"/>
      <text x="485" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Surface/ox-table</text>

      {/* NO arrow down */}
      <line x1="250" y1="250" x2="250" y2="300" stroke="#00688a" strokeWidth="2"/>
      <text x="220" y="280" fill="#00688a" fontSize="12" fontWeight="bold">NO</text>

      {/* Emergency decompression crash dive procedure */}
      <rect x="100" y="300" width="300" height="80" rx="8" fill="url(#grad-darker-blue)" stroke="#00688a" strokeWidth="2"/>
      <text x="250" y="335" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Emergency decompression</text>
      <text x="250" y="355" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">crash dive procedure</text>

      {/* Arrow down */}
      <line x1="250" y1="380" x2="250" y2="420" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead)"/>

      {/* Decision 2: Oxygen available? */}
      <polygon points="250,420 350,480 250,540 150,480" fill="url(#grad-darker-blue)" stroke="#00688a" strokeWidth="2"/>
      <text x="250" y="485" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Oxygen</text>
      <text x="250" y="505" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">available?</text>

      {/* YES arrow down */}
      <line x1="250" y1="540" x2="250" y2="590" stroke="#00688a" strokeWidth="2"/>
      <text x="220" y="570" fill="#00688a" fontSize="12" fontWeight="bold">YES</text>

      {/* From 12 metres 20 min. oxygen and 5 min. air */}
      <rect x="80" y="590" width="340" height="80" rx="8" fill="url(#grad-blue)" stroke="#00688a" strokeWidth="2"/>
      <text x="250" y="620" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">From 12 metres 20 min. oxygen</text>
      <text x="250" y="640" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">and 5 min. air</text>

      {/* Arrow down */}
      <line x1="250" y1="670" x2="250" y2="710" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead)"/>

      {/* NO arrow right from oxygen decision */}
      <line x1="350" y1="480" x2="450" y2="480" stroke="#00688a" strokeWidth="2"/>
      <text x="390" y="470" fill="#00688a" fontSize="12" fontWeight="bold">NO</text>
      <line x1="450" y1="480" x2="450" y2="740" stroke="#00688a" strokeWidth="2"/>

      {/* Bottom outcome boxes */}
      <g>
        {/* Left box: 2 hrs */}
        <rect x="60" y="710" width="320" height="100" rx="8" fill="url(#grad-blue)" stroke="#00688a" strokeWidth="2"/>
        <text x="220" y="745" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2 hrs near decompression</text>
        <text x="220" y="765" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber Repeat interval 12 hrs</text>
      </g>

      <g>
        {/* Right box: 4 hrs */}
        <rect x="420" y="710" width="320" height="100" rx="8" fill="url(#grad-blue)" stroke="#00688a" strokeWidth="2"/>
        <text x="580" y="745" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4 hrs near decompression</text>
        <text x="580" y="765" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber Repeat interval 12 hrs</text>
      </g>

      {/* Lines to bottom boxes */}
      <line x1="250" y1="710" x2="220" y2="710" stroke="#00688a" strokeWidth="2"/>
      <line x1="450" y1="710" x2="580" y2="710" stroke="#00688a" strokeWidth="2"/>
    </svg>
  );
}

export function EmergencyProcedure1SOX15() {
  return (
    <svg viewBox="0 0 600 900" className="w-full h-auto">
      <defs>
        <linearGradient id="grad-blue-sox" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00a4cc', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0080a3', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="grad-darker-blue-sox" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0080a3', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#006080', stopOpacity: 1 }} />
        </linearGradient>
        <marker id="arrowhead-sox" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#00688a" />
        </marker>
      </defs>

      <text x="80" y="30" fontSize="16" fontWeight="bold" fill="#333">Flowchart Emergency Procedure 1 for Surface/Ox Table (SOX15)</text>

      {/* Start: Irregularity in decompression */}
      <rect x="110" y="50" width="280" height="60" rx="30" fill="url(#grad-blue-sox)" stroke="#00688a" strokeWidth="2"/>
      <text x="250" y="85" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Irregularity in</text>
      <text x="250" y="103" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">decompression</text>

      {/* Arrow down */}
      <line x1="250" y1="110" x2="250" y2="150" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead-sox)"/>

      {/* Decision 1: Oxygen available? */}
      <polygon points="250,150 350,210 250,270 150,210" fill="url(#grad-blue-sox)" stroke="#00688a" strokeWidth="2"/>
      <text x="250" y="210" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Oxygen</text>
      <text x="250" y="228" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">available?</text>

      {/* NO arrow right to Treatment table 3 */}
      <line x1="350" y1="210" x2="410" y2="210" stroke="#00688a" strokeWidth="2"/>
      <text x="375" y="200" fill="#00688a" fontSize="12" fontWeight="bold">NO</text>
      <rect x="410" y="180" width="150" height="60" rx="8" fill="url(#grad-blue-sox)" stroke="#00688a" strokeWidth="2"/>
      <text x="485" y="215" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Treatment table 3</text>

      {/* YES arrow down to Treatment table 5 */}
      <line x1="250" y1="270" x2="250" y2="320" stroke="#00688a" strokeWidth="2"/>
      <text x="220" y="300" fill="#00688a" fontSize="12" fontWeight="bold">YES</text>

      {/* Treatment table 5 */}
      <rect x="120" y="320" width="260" height="60" rx="8" fill="url(#grad-blue-sox)" stroke="#00688a" strokeWidth="2"/>
      <text x="250" y="355" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Treatment table 5</text>

      {/* Arrow down */}
      <line x1="250" y1="380" x2="250" y2="420" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead-sox)"/>

      {/* Decision 2: Symptoms of Decompression sickness? */}
      <polygon points="250,420 350,490 250,560 150,490" fill="url(#grad-darker-blue-sox)" stroke="#00688a" strokeWidth="2"/>
      <text x="250" y="485" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Symptoms of</text>
      <text x="250" y="503" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Decompression</text>
      <text x="250" y="521" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">sickness?</text>

      {/* NO arrow right */}
      <line x1="350" y1="490" x2="450" y2="490" stroke="#00688a" strokeWidth="2"/>
      <text x="390" y="480" fill="#00688a" fontSize="12" fontWeight="bold">NO</text>
      <line x1="450" y1="490" x2="450" y2="750" stroke="#00688a" strokeWidth="2"/>

      {/* YES arrow down to Treatment table 6 or 4 */}
      <line x1="250" y1="560" x2="250" y2="610" stroke="#00688a" strokeWidth="2"/>
      <text x="220" y="590" fill="#00688a" fontSize="12" fontWeight="bold">YES</text>

      {/* Treatment table 6 or 4 */}
      <rect x="110" y="610" width="280" height="60" rx="8" fill="url(#grad-blue-sox)" stroke="#00688a" strokeWidth="2"/>
      <text x="250" y="645" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Treatment table 6 or 4</text>

      {/* Arrow down */}
      <line x1="250" y1="670" x2="250" y2="710" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead-sox)"/>

      {/* Bottom outcome boxes */}
      <g>
        {/* Left box: 4 hrs */}
        <rect x="60" y="710" width="320" height="100" rx="8" fill="url(#grad-blue-sox)" stroke="#00688a" strokeWidth="2"/>
        <text x="220" y="745" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4 hrs near decompression</text>
        <text x="220" y="765" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber Repeat interval 12 hrs</text>
      </g>

      <g>
        {/* Right box: 2 hrs */}
        <rect x="420" y="710" width="320" height="100" rx="8" fill="url(#grad-blue-sox)" stroke="#00688a" strokeWidth="2"/>
        <text x="580" y="745" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2 hrs near decompression</text>
        <text x="580" y="765" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber Repeat interval 12 hrs</text>
      </g>

      {/* Lines to bottom boxes */}
      <line x1="250" y1="710" x2="220" y2="710" stroke="#00688a" strokeWidth="2"/>
      <line x1="450" y1="710" x2="580" y2="710" stroke="#00688a" strokeWidth="2"/>
    </svg>
  );
}

export function EmergencyProcedure2SOX15() {
  return (
    <svg viewBox="0 0 700 1100" className="w-full h-auto">
      <defs>
        <linearGradient id="grad-blue-sox2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00a4cc', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0080a3', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="grad-darker-blue-sox2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0080a3', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#006080', stopOpacity: 1 }} />
        </linearGradient>
        <marker id="arrowhead-sox2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#00688a" />
        </marker>
      </defs>

      <text x="90" y="30" fontSize="16" fontWeight="bold" fill="#333">Flowchart Emergency Procedure 2 for Surface/Ox Table (SOX15)</text>

      {/* Start: Oxygen failure */}
      <rect x="180" y="50" width="280" height="60" rx="30" fill="url(#grad-blue-sox2)" stroke="#00688a" strokeWidth="2"/>
      <text x="320" y="85" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Oxygen failure</text>

      {/* Arrow down */}
      <line x1="320" y1="110" x2="320" y2="150" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead-sox2)"/>

      {/* Surface air table(SAB) */}
      <rect x="140" y="150" width="360" height="70" rx="8" fill="url(#grad-blue-sox2)" stroke="#00688a" strokeWidth="2"/>
      <text x="320" y="192" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Surface air table(SAB)</text>

      {/* Arrow down */}
      <line x1="320" y1="220" x2="320" y2="260" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead-sox2)"/>

      {/* Feedback loop from SAB - NO arrow left */}
      <line x1="140" y1="185" x2="80" y2="185" stroke="#00688a" strokeWidth="2"/>
      <line x1="80" y1="185" x2="80" y2="340" stroke="#00688a" strokeWidth="2"/>
      <text x="100" y="175" fill="#00688a" fontSize="12" fontWeight="bold">NO</text>

      {/* Decision 1: Oxygen restored? */}
      <polygon points="320,260 420,330 320,400 220,330" fill="url(#grad-blue-sox2)" stroke="#00688a" strokeWidth="2"/>
      <text x="320" y="335" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Oxygen</text>
      <text x="320" y="353" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">restored?</text>

      {/* NO arrow left to feedback */}
      <line x1="220" y1="330" x2="80" y2="330" stroke="#00688a" strokeWidth="2"/>
      <text x="140" y="320" fill="#00688a" fontSize="12" fontWeight="bold">NO</text>

      {/* YES arrow down */}
      <line x1="320" y1="400" x2="320" y2="450" stroke="#00688a" strokeWidth="2"/>
      <text x="290" y="430" fill="#00688a" fontSize="12" fontWeight="bold">YES</text>

      {/* Decision 2: OTU > 450? */}
      <polygon points="320,450 420,520 320,590 220,520" fill="url(#grad-blue-sox2)" stroke="#00688a" strokeWidth="2"/>
      <text x="320" y="525" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">OTU &gt; 450?</text>

      {/* YES arrow right - feedback to SAB */}
      <line x1="420" y1="520" x2="500" y2="520" stroke="#00688a" strokeWidth="2"/>
      <text x="450" y="510" fill="#00688a" fontSize="12" fontWeight="bold">YES</text>
      <line x1="500" y1="520" x2="500" y2="185" stroke="#00688a" strokeWidth="2"/>
      <line x1="500" y1="185" x2="500" y2="185" stroke="#00688a" strokeWidth="2"/>

      {/* NO arrow down */}
      <line x1="320" y1="590" x2="320" y2="640" stroke="#00688a" strokeWidth="2"/>
      <text x="290" y="620" fill="#00688a" fontSize="12" fontWeight="bold">NO</text>

      {/* From 12 metres 20 min. oxygen and 5 min. air */}
      <rect x="130" y="640" width="380" height="80" rx="8" fill="url(#grad-blue-sox2)" stroke="#00688a" strokeWidth="2"/>
      <text x="320" y="670" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">From 12 metres 20 min.</text>
      <text x="320" y="688" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">oxygen and 5 min. air</text>

      {/* Feedback loop - NO from first oxygen decision */}
      <line x1="80" y1="340" x2="80" y2="680" stroke="#00688a" strokeWidth="2"/>
      <line x1="80" y1="680" x2="130" y2="680" stroke="#00688a" strokeWidth="2"/>

      {/* Arrow down */}
      <line x1="320" y1="720" x2="320" y2="770" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead-sox2)"/>

      {/* Decision 3: Oxygen intake > 1/3 of deco time? */}
      <polygon points="320,770 430,850 320,930 210,850" fill="url(#grad-darker-blue-sox2)" stroke="#00688a" strokeWidth="2"/>
      <text x="320" y="845" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Oxygen intake</text>
      <text x="320" y="863" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">&gt; 1/3 of deco</text>
      <text x="320" y="881" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">time?</text>

      {/* NO arrow right */}
      <line x1="430" y1="850" x2="550" y2="850" stroke="#00688a" strokeWidth="2"/>
      <text x="480" y="840" fill="#00688a" fontSize="12" fontWeight="bold">NO</text>
      <line x1="550" y1="850" x2="550" y2="1000" stroke="#00688a" strokeWidth="2"/>

      {/* YES arrow down */}
      <line x1="320" y1="930" x2="320" y2="980" stroke="#00688a" strokeWidth="2"/>
      <text x="290" y="960" fill="#00688a" fontSize="12" fontWeight="bold">YES</text>

      {/* Bottom outcome boxes */}
      <g>
        {/* Left box: 2 hrs */}
        <rect x="80" y="980" width="360" height="90" rx="8" fill="url(#grad-blue-sox2)" stroke="#00688a" strokeWidth="2"/>
        <text x="260" y="1015" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">2 hrs near decompression</text>
        <text x="260" y="1033" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">chamber Repeat interval 12</text>
        <text x="260" y="1051" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">hrs</text>
      </g>

      <g>
        {/* Right box: 4 hrs */}
        <rect x="500" y="980" width="360" height="90" rx="8" fill="url(#grad-blue-sox2)" stroke="#00688a" strokeWidth="2"/>
        <text x="680" y="1015" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">4 hrs near decompression</text>
        <text x="680" y="1033" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">chamber Repeat interval 12</text>
        <text x="680" y="1051" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">hrs</text>
      </g>

      {/* Lines to bottom boxes */}
      <line x1="320" y1="980" x2="260" y2="980" stroke="#00688a" strokeWidth="2"/>
      <line x1="550" y1="980" x2="680" y2="980" stroke="#00688a" strokeWidth="2"/>
    </svg>
  );
}

export function EmergencyProcedure1NitroxTables() {
  return (
    <svg viewBox="0 0 650 950" className="w-full h-auto">
      <defs>
        <linearGradient id="grad-blue-nit1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00a4cc', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0080a3', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="grad-darker-blue-nit1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0080a3', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#006080', stopOpacity: 1 }} />
        </linearGradient>
        <marker id="arrowhead-nit1" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#00688a" />
        </marker>
      </defs>

      <text x="90" y="30" fontSize="16" fontWeight="bold" fill="#333">Flowchart Emergency Procedure 1 Nitrox Tables</text>

      {/* Start: Need for surface decompression */}
      <rect x="120" y="50" width="310" height="70" rx="35" fill="url(#grad-blue-nit1)" stroke="#00688a" strokeWidth="2"/>
      <text x="275" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Need for surface</text>
      <text x="275" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">decompression</text>

      {/* Arrow down */}
      <line x1="275" y1="120" x2="275" y2="160" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead-nit1)"/>

      {/* Decision 1: Repeat interval > 4 hrs? */}
      <polygon points="275,160 375,220 275,280 175,220" fill="url(#grad-blue-nit1)" stroke="#00688a" strokeWidth="2"/>
      <text x="275" y="215" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Repeat interval</text>
      <text x="275" y="233" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">&gt; 4 hrs?</text>

      {/* YES arrow right */}
      <line x1="375" y1="220" x2="450" y2="220" stroke="#00688a" strokeWidth="2"/>
      <text x="410" y="210" fill="#00688a" fontSize="12" fontWeight="bold">YES</text>
      <rect x="450" y="180" width="180" height="80" rx="8" fill="url(#grad-blue-nit1)" stroke="#00688a" strokeWidth="2"/>
      <text x="540" y="210" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Air or surface ox table</text>
      <text x="540" y="230" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Table depth &gt; equivalent</text>
      <text x="540" y="250" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">air depth</text>

      {/* NO arrow down */}
      <line x1="275" y1="280" x2="275" y2="330" stroke="#00688a" strokeWidth="2"/>
      <text x="245" y="310" fill="#00688a" fontSize="12" fontWeight="bold">NO</text>

      {/* Emergency decompression crash dive procedure */}
      <rect x="130" y="330" width="290" height="80" rx="8" fill="url(#grad-darker-blue-nit1)" stroke="#00688a" strokeWidth="2"/>
      <text x="275" y="360" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Emergency decompression</text>
      <text x="275" y="378" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">crash dive procedure</text>

      {/* Arrow down */}
      <line x1="275" y1="410" x2="275" y2="460" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead-nit1)"/>

      {/* Decision 2: Oxygen available? */}
      <polygon points="275,460 375,520 275,580 175,520" fill="url(#grad-darker-blue-nit1)" stroke="#00688a" strokeWidth="2"/>
      <text x="275" y="525" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Oxygen</text>
      <text x="275" y="543" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">available?</text>

      {/* NO arrow right */}
      <line x1="375" y1="520" x2="450" y2="520" stroke="#00688a" strokeWidth="2"/>
      <text x="410" y="510" fill="#00688a" fontSize="12" fontWeight="bold">NO</text>
      <line x1="450" y1="520" x2="450" y2="750" stroke="#00688a" strokeWidth="2"/>

      {/* YES arrow down */}
      <line x1="275" y1="580" x2="275" y2="630" stroke="#00688a" strokeWidth="2"/>
      <text x="245" y="610" fill="#00688a" fontSize="12" fontWeight="bold">YES</text>

      {/* Decision 3: OTU > 450? */}
      <polygon points="275,630 375,690 275,750 175,690" fill="url(#grad-blue-nit1)" stroke="#00688a" strokeWidth="2"/>
      <text x="275" y="695" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">OTU &gt; 450?</text>

      {/* YES arrow right - Air only */}
      <line x1="375" y1="690" x2="450" y2="690" stroke="#00688a" strokeWidth="2"/>
      <text x="410" y="680" fill="#00688a" fontSize="12" fontWeight="bold">YES</text>
      <rect x="450" y="660" width="140" height="60" rx="8" fill="url(#grad-blue-nit1)" stroke="#00688a" strokeWidth="2"/>
      <text x="520" y="695" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Air only</text>

      {/* Arrow from Air only down */}
      <line x1="520" y1="720" x2="520" y2="780" stroke="#00688a" strokeWidth="2"/>
      <line x1="520" y1="780" x2="450" y2="780" stroke="#00688a" strokeWidth="2"/>

      {/* NO arrow down */}
      <line x1="275" y1="750" x2="275" y2="800" stroke="#00688a" strokeWidth="2"/>
      <text x="245" y="780" fill="#00688a" fontSize="12" fontWeight="bold">NO</text>

      {/* From 12 metres 20 min. oxygen and 5 min. air */}
      <rect x="120" y="800" width="310" height="80" rx="8" fill="url(#grad-blue-nit1)" stroke="#00688a" strokeWidth="2"/>
      <text x="275" y="830" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">From 12 metres 20 min. oxygen</text>
      <text x="275" y="848" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">and 5 min. air</text>

      {/* Arrow down */}
      <line x1="275" y1="880" x2="275" y2="930" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead-nit1)"/>

      {/* Bottom outcome boxes */}
      <g>
        {/* Left box: 2 hrs */}
        <rect x="50" y="930" width="350" height="90" rx="8" fill="url(#grad-blue-nit1)" stroke="#00688a" strokeWidth="2"/>
        <text x="225" y="960" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">2 hrs near decompression</text>
        <text x="225" y="978" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">chamber Repeat interval 12 hrs</text>
      </g>

      <g>
        {/* Right box: 4 hrs */}
        <rect x="450" y="930" width="350" height="90" rx="8" fill="url(#grad-blue-nit1)" stroke="#00688a" strokeWidth="2"/>
        <text x="625" y="960" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">4 hrs near decompression</text>
        <text x="625" y="978" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">chamber Repeat interval 12 hrs</text>
      </g>

      {/* Lines to bottom boxes */}
      <line x1="275" y1="930" x2="225" y2="930" stroke="#00688a" strokeWidth="2"/>
      <line x1="450" y1="780" x2="625" y2="780" stroke="#00688a" strokeWidth="2"/>
      <line x1="625" y1="780" x2="625" y2="930" stroke="#00688a" strokeWidth="2"/>
    </svg>
  );
}

export function EmergencyProcedure2NitroxTables() {
  return (
    <svg viewBox="0 0 650 1000" className="w-full h-auto">
      <defs>
        <linearGradient id="grad-blue-nit2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00a4cc', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0080a3', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="grad-darker-blue-nit2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0080a3', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#006080', stopOpacity: 1 }} />
        </linearGradient>
        <marker id="arrowhead-nit2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#00688a" />
        </marker>
      </defs>

      <text x="90" y="30" fontSize="16" fontWeight="bold" fill="#333">Flowchart Emergency Procedure 2 Nitrox Tables</text>

      {/* Start: Irregularity in decompression */}
      <rect x="130" y="50" width="310" height="70" rx="35" fill="url(#grad-blue-nit2)" stroke="#00688a" strokeWidth="2"/>
      <text x="285" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Irregularity in decompression</text>

      {/* Arrow down */}
      <line x1="285" y1="120" x2="285" y2="160" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead-nit2)"/>

      {/* Decision 1: Oxygen available? */}
      <polygon points="285,160 385,220 285,280 185,220" fill="url(#grad-blue-nit2)" stroke="#00688a" strokeWidth="2"/>
      <text x="285" y="225" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Oxygen</text>
      <text x="285" y="243" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">available?</text>

      {/* NO arrow right to Treatment table 3 */}
      <line x1="385" y1="220" x2="450" y2="220" stroke="#00688a" strokeWidth="2"/>
      <text x="410" y="210" fill="#00688a" fontSize="12" fontWeight="bold">NO</text>
      <rect x="450" y="190" width="160" height="60" rx="8" fill="url(#grad-blue-nit2)" stroke="#00688a" strokeWidth="2"/>
      <text x="530" y="225" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Treatment table 3</text>

      {/* YES arrow down to Treatment table 5 */}
      <line x1="285" y1="280" x2="285" y2="330" stroke="#00688a" strokeWidth="2"/>
      <text x="255" y="310" fill="#00688a" fontSize="12" fontWeight="bold">YES</text>

      {/* Treatment table 5 */}
      <rect x="150" y="330" width="270" height="70" rx="8" fill="url(#grad-blue-nit2)" stroke="#00688a" strokeWidth="2"/>
      <text x="285" y="370" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Treatment table 5</text>

      {/* Arrow down */}
      <line x1="285" y1="400" x2="285" y2="450" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead-nit2)"/>

      {/* Decision 2: Symptoms of Decompression sickness? */}
      <polygon points="285,450 385,520 285,590 185,520" fill="url(#grad-darker-blue-nit2)" stroke="#00688a" strokeWidth="2"/>
      <text x="285" y="510" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Symptoms of</text>
      <text x="285" y="528" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Decompression</text>
      <text x="285" y="546" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">sickness?</text>

      {/* NO arrow right */}
      <line x1="385" y1="520" x2="470" y2="520" stroke="#00688a" strokeWidth="2"/>
      <text x="420" y="510" fill="#00688a" fontSize="12" fontWeight="bold">NO</text>
      <line x1="470" y1="520" x2="470" y2="800" stroke="#00688a" strokeWidth="2"/>

      {/* YES arrow down to Treatment table 6 or 4 */}
      <line x1="285" y1="590" x2="285" y2="640" stroke="#00688a" strokeWidth="2"/>
      <text x="255" y="620" fill="#00688a" fontSize="12" fontWeight="bold">YES</text>

      {/* Treatment table 6 or 4 */}
      <rect x="130" y="640" width="310" height="70" rx="8" fill="url(#grad-blue-nit2)" stroke="#00688a" strokeWidth="2"/>
      <text x="285" y="680" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Treatment table 6 or 4</text>

      {/* Arrow down */}
      <line x1="285" y1="710" x2="285" y2="760" stroke="#00688a" strokeWidth="2" markerEnd="url(#arrowhead-nit2)"/>

      {/* Bottom outcome boxes */}
      <g>
        {/* Left box: 4 hrs */}
        <rect x="50" y="760" width="360" height="100" rx="8" fill="url(#grad-blue-nit2)" stroke="#00688a" strokeWidth="2"/>
        <text x="230" y="795" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">4 hrs near decompression</text>
        <text x="230" y="813" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">chamber Repeat interval 12 hrs</text>
      </g>

      <g>
        {/* Right box: 2 hrs */}
        <rect x="470" y="760" width="360" height="100" rx="8" fill="url(#grad-blue-nit2)" stroke="#00688a" strokeWidth="2"/>
        <text x="650" y="795" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">2 hrs near decompression</text>
        <text x="650" y="813" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">chamber Repeat interval 12 hrs</text>
      </g>

      {/* Lines to bottom boxes */}
      <line x1="285" y1="760" x2="230" y2="760" stroke="#00688a" strokeWidth="2"/>
      <line x1="470" y1="800" x2="650" y2="800" stroke="#00688a" strokeWidth="2"/>
    </svg>
  );
}
