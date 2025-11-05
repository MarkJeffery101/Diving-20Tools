import React from 'react';

// 1. Emergency Procedure Air Table (SIL15)
export function EmergencyProcedureAirTable() {
  return (
    <svg viewBox="0 0 600 900" className="w-full h-auto">
      <defs>
        <linearGradient id="grad-blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0369a1', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="grad-teal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Start */}
      <rect x="150" y="20" width="300" height="80" rx="40" fill="url(#grad-teal)" stroke="#0369a1" strokeWidth="2"/>
      <text x="300" y="65" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Dive is interrupted</text>

      {/* Arrow down */}
      <line x1="300" y1="100" x2="300" y2="140" stroke="#0369a1" strokeWidth="2" markerEnd="url(#arrowhead)"/>

      {/* Decision 1: Repeat interval > 4 hrs? */}
      <polygon points="300,140 420,200 300,260 180,200" fill="url(#grad-blue)" stroke="#0369a1" strokeWidth="2"/>
      <text x="300" y="195" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Repeat interval</text>
      <text x="300" y="215" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">&gt; 4 hrs?</text>

      {/* YES arrow to Surface/ox-table */}
      <line x1="420" y1="200" x2="500" y2="200" stroke="#0369a1" strokeWidth="2"/>
      <text x="460" y="190" fill="#0369a1" fontSize="12" fontWeight="bold">YES</text>
      <rect x="500" y="170" width="80" height="60" rx="5" fill="url(#grad-blue)" stroke="#0369a1" strokeWidth="2"/>
      <text x="540" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Surface/ox-table</text>

      {/* NO arrow down */}
      <line x1="300" y1="260" x2="300" y2="300" stroke="#0369a1" strokeWidth="2"/>
      <text x="320" y="285" fill="#0369a1" fontSize="12" fontWeight="bold">NO</text>

      {/* Emergency decompression crash dive procedure */}
      <rect x="100" y="300" width="400" height="80" rx="5" fill="url(#grad-blue)" stroke="#0369a1" strokeWidth="2"/>
      <text x="300" y="335" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Emergency decompression crash</text>
      <text x="300" y="358" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">dive procedure</text>

      {/* Arrow down */}
      <line x1="300" y1="380" x2="300" y2="420" stroke="#0369a1" strokeWidth="2"/>

      {/* Decision 2: Oxygen available? */}
      <polygon points="300,420 420,480 300,540 180,480" fill="url(#grad-blue)" stroke="#0369a1" strokeWidth="2"/>
      <text x="300" y="485" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Oxygen</text>
      <text x="300" y="505" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">available?</text>

      {/* YES arrow down */}
      <line x1="300" y1="540" x2="300" y2="580" stroke="#0369a1" strokeWidth="2"/>
      <text x="320" y="565" fill="#0369a1" fontSize="12" fontWeight="bold">YES</text>

      {/* From 12 metres oxygen/air */}
      <rect x="80" y="580" width="440" height="80" rx="5" fill="url(#grad-blue)" stroke="#0369a1" strokeWidth="2"/>
      <text x="300" y="615" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">From 12 metres 20 min oxygen</text>
      <text x="300" y="635" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">and 5 min air</text>

      {/* Arrow down */}
      <line x1="300" y1="660" x2="300" y2="700" stroke="#0369a1" strokeWidth="2"/>

      {/* Bottom boxes - 2hrs and 4hrs */}
      <g>
        {/* 2hrs box */}
        <rect x="50" y="700" width="220" height="100" rx="8" fill="url(#grad-teal)" stroke="#0369a1" strokeWidth="2"/>
        <text x="160" y="735" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2 hrs near</text>
        <text x="160" y="752" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">decompression</text>
        <text x="160" y="769" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber</text>
        <text x="160" y="790" textAnchor="middle" fill="white" fontSize="11">Repeat interval 12 hrs</text>
      </g>

      {/* NO arrow to 4hrs */}
      <line x1="180" y1="480" x2="80" y2="480" stroke="#0369a1" strokeWidth="2"/>
      <line x1="80" y1="480" x2="80" y2="750" stroke="#0369a1" strokeWidth="2"/>
      <text x="45" y="475" fill="#0369a1" fontSize="12" fontWeight="bold">NO</text>

      <g>
        {/* 4hrs box */}
        <rect x="330" y="700" width="220" height="100" rx="8" fill="url(#grad-teal)" stroke="#0369a1" strokeWidth="2"/>
        <text x="440" y="735" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4 hrs near</text>
        <text x="440" y="752" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">decompression</text>
        <text x="440" y="769" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber</text>
        <text x="440" y="790" textAnchor="middle" fill="white" fontSize="11">Repeat interval 12 hrs</text>
      </g>

      {/* Arrow from main path to 4hrs */}
      <line x1="300" y1="700" x2="440" y2="700" stroke="#0369a1" strokeWidth="2"/>

      {/* Arrow marker definition */}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#0369a1" />
        </marker>
      </defs>
    </svg>
  );
}

// 2. Emergency Procedure 1 for Surface/Ox Table (SOX15)
export function EmergencyProcedure1SOX15() {
  return (
    <svg viewBox="0 0 600 950" className="w-full h-auto">
      <defs>
        <linearGradient id="grad-red" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0369a1', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Start */}
      <rect x="120" y="20" width="360" height="80" rx="40" fill="url(#grad-red)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="55" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">Irregularity in</text>
      <text x="300" y="80" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">decompression</text>

      {/* Arrow down */}
      <line x1="300" y1="100" x2="300" y2="140" stroke="#0284c7" strokeWidth="2"/>

      {/* Decision 1: Oxygen available? */}
      <polygon points="300,140 420,200 300,260 180,200" fill="url(#grad-red)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="195" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Oxygen</text>
      <text x="300" y="215" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">available?</text>

      {/* NO arrow left to Treatment table 3 */}
      <line x1="180" y1="200" x2="100" y2="200" stroke="#0284c7" strokeWidth="2"/>
      <text x="130" y="190" fill="#0284c7" fontSize="12" fontWeight="bold">NO</text>
      <rect x="20" y="170" width="150" height="60" rx="5" fill="url(#grad-red)" stroke="#0284c7" strokeWidth="2"/>
      <text x="95" y="205" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Treatment table 3</text>

      {/* YES arrow down to Treatment table 5 */}
      <line x1="300" y1="260" x2="300" y2="310" stroke="#0284c7" strokeWidth="2"/>
      <text x="320" y="290" fill="#0284c7" fontSize="12" fontWeight="bold">YES</text>
      <rect x="180" y="310" width="240" height="60" rx="5" fill="url(#grad-red)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="345" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Treatment table 5</text>

      {/* Arrow down */}
      <line x1="300" y1="370" x2="300" y2="410" stroke="#0284c7" strokeWidth="2"/>

      {/* Decision 2: Symptoms of DCS? */}
      <polygon points="300,410 420,470 300,530 180,470" fill="url(#grad-red)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="460" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Symptoms of</text>
      <text x="300" y="478" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Decompression</text>
      <text x="300" y="496" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">sickness?</text>

      {/* NO arrow right */}
      <line x1="420" y1="470" x2="500" y2="470" stroke="#0284c7" strokeWidth="2"/>
      <line x1="500" y1="470" x2="500" y2="750" stroke="#0284c7" strokeWidth="2"/>
      <text x="460" y="460" fill="#0284c7" fontSize="12" fontWeight="bold">NO</text>

      {/* YES arrow down to Treatment table 6 or 4 */}
      <line x1="300" y1="530" x2="300" y2="590" stroke="#0284c7" strokeWidth="2"/>
      <text x="320" y="565" fill="#0284c7" fontSize="12" fontWeight="bold">YES</text>
      <rect x="150" y="590" width="300" height="70" rx="5" fill="url(#grad-red)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="635" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Treatment table 6 or 4</text>

      {/* Arrow down */}
      <line x1="300" y1="660" x2="300" y2="700" stroke="#0284c7" strokeWidth="2"/>

      {/* Bottom outcome boxes */}
      <g>
        {/* 4hrs box */}
        <rect x="50" y="700" width="200" height="110" rx="8" fill="url(#grad-red)" stroke="#0284c7" strokeWidth="2"/>
        <text x="150" y="735" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4 hrs near</text>
        <text x="150" y="755" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">decompression</text>
        <text x="150" y="775" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber</text>
        <text x="150" y="795" textAnchor="middle" fill="white" fontSize="10">Repeat interval 12 hrs</text>
      </g>

      <g>
        {/* 2hrs box */}
        <rect x="350" y="700" width="200" height="110" rx="8" fill="url(#grad-red)" stroke="#0284c7" strokeWidth="2"/>
        <text x="450" y="735" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2 hrs near</text>
        <text x="450" y="755" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">decompression</text>
        <text x="450" y="775" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber</text>
        <text x="450" y="795" textAnchor="middle" fill="white" fontSize="10">Repeat interval 12 hrs</text>
      </g>

      {/* Lines to bottom boxes */}
      <line x1="300" y1="700" x2="150" y2="700" stroke="#0284c7" strokeWidth="2"/>
      <line x1="300" y1="700" x2="450" y2="700" stroke="#0284c7" strokeWidth="2"/>
      <line x1="500" y1="750" x2="450" y2="750" stroke="#0284c7" strokeWidth="2"/>
      <line x1="95" y1="230" x2="95" y2="750" stroke="#0284c7" strokeWidth="2"/>
      <line x1="95" y1="750" x2="150" y2="750" stroke="#0284c7" strokeWidth="2"/>
    </svg>
  );
}

// 3. Emergency Procedure 2 for Surface/Ox Table (SOX15)
export function EmergencyProcedure2SOX15() {
  return (
    <svg viewBox="0 0 600 1050" className="w-full h-auto">
      <defs>
        <linearGradient id="grad-orange" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0369a1', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Start */}
      <rect x="150" y="20" width="300" height="70" rx="35" fill="url(#grad-orange)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="60" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">Oxygen failure</text>

      {/* Arrow down */}
      <line x1="300" y1="90" x2="300" y2="130" stroke="#0284c7" strokeWidth="2"/>

      {/* Surface air table */}
      <rect x="120" y="130" width="360" height="70" rx="5" fill="url(#grad-orange)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="175" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Surface air table (SAB)</text>

      {/* Arrow down */}
      <line x1="300" y1="200" x2="300" y2="240" stroke="#0284c7" strokeWidth="2"/>

      {/* Decision: Oxygen restored? */}
      <polygon points="300,240 420,300 300,360 180,300" fill="url(#grad-orange)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="305" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Oxygen</text>
      <text x="300" y="325" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">restored?</text>

      {/* NO arrow loops back */}
      <line x1="180" y1="300" x2="80" y2="300" stroke="#0284c7" strokeWidth="2"/>
      <line x1="80" y1="300" x2="80" y2="165" stroke="#0284c7" strokeWidth="2"/>
      <line x1="80" y1="165" x2="120" y2="165" stroke="#0284c7" strokeWidth="2"/>
      <text x="45" y="295" fill="#0284c7" fontSize="12" fontWeight="bold">NO</text>

      {/* YES arrow down */}
      <line x1="300" y1="360" x2="300" y2="400" stroke="#0284c7" strokeWidth="2"/>
      <text x="320" y="385" fill="#0284c7" fontSize="12" fontWeight="bold">YES</text>

      {/* Decision: OTU > 450? */}
      <polygon points="300,400 420,460 300,520 180,460" fill="url(#grad-orange)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="465" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">OTU</text>
      <text x="300" y="485" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">&gt; 450?</text>

      {/* NO arrow down */}
      <line x1="300" y1="520" x2="300" y2="560" stroke="#0284c7" strokeWidth="2"/>
      <text x="320" y="545" fill="#0284c7" fontSize="12" fontWeight="bold">NO</text>

      {/* From 12 metres oxygen/air */}
      <rect x="80" y="560" width="440" height="80" rx="5" fill="url(#grad-orange)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="595" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">From 12 metres 20 min</text>
      <text x="300" y="615" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">oxygen and 5 min air</text>

      {/* Arrow down */}
      <line x1="300" y1="640" x2="300" y2="680" stroke="#0284c7" strokeWidth="2"/>

      {/* Decision: Oxygen intake > 1/3 deco? */}
      <polygon points="300,680 420,740 300,800 180,740" fill="url(#grad-orange)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="730" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Oxygen intake</text>
      <text x="300" y="750" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">&gt; 1/3 of deco time?</text>

      {/* YES arrow down */}
      <line x1="300" y1="800" x2="300" y2="850" stroke="#0284c7" strokeWidth="2"/>
      <text x="320" y="830" fill="#0284c7" fontSize="12" fontWeight="bold">YES</text>

      {/* NO arrow right */}
      <line x1="420" y1="740" x2="500" y2="740" stroke="#0284c7" strokeWidth="2"/>
      <line x1="500" y1="740" x2="500" y2="880" stroke="#0284c7" strokeWidth="2"/>
      <text x="460" y="730" fill="#0284c7" fontSize="12" fontWeight="bold">NO</text>

      {/* YES arrow from OTU right */}
      <line x1="420" y1="460" x2="520" y2="460" stroke="#0284c7" strokeWidth="2"/>
      <line x1="520" y1="460" x2="520" y2="880" stroke="#0284c7" strokeWidth="2"/>
      <text x="470" y="450" fill="#0284c7" fontSize="12" fontWeight="bold">YES</text>

      {/* Bottom outcome boxes */}
      <g>
        {/* 2hrs box */}
        <rect x="50" y="850" width="200" height="110" rx="8" fill="url(#grad-orange)" stroke="#0284c7" strokeWidth="2"/>
        <text x="150" y="885" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2 hrs near</text>
        <text x="150" y="905" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">decompression</text>
        <text x="150" y="925" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber</text>
        <text x="150" y="945" textAnchor="middle" fill="white" fontSize="10">Repeat interval 12 hrs</text>
      </g>

      <g>
        {/* 4hrs box */}
        <rect x="350" y="850" width="200" height="110" rx="8" fill="url(#grad-orange)" stroke="#0284c7" strokeWidth="2"/>
        <text x="450" y="885" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4 hrs near</text>
        <text x="450" y="905" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">decompression</text>
        <text x="450" y="925" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber</text>
        <text x="450" y="945" textAnchor="middle" fill="white" fontSize="10">Repeat interval 12 hrs</text>
      </g>

      {/* Lines to bottom */}
      <line x1="300" y1="850" x2="150" y2="850" stroke="#0284c7" strokeWidth="2"/>
      <line x1="500" y1="880" x2="450" y2="880" stroke="#0284c7" strokeWidth="2"/>
    </svg>
  );
}

// 4. Emergency Procedure 1 Nitrox Tables
export function EmergencyProcedure1NitroxTables() {
  return (
    <svg viewBox="0 0 600 1050" className="w-full h-auto">
      <defs>
        <linearGradient id="grad-green" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0369a1', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Start */}
      <rect x="100" y="20" width="400" height="80" rx="40" fill="url(#grad-green)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Need for surface</text>
      <text x="300" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">decompression</text>

      {/* Arrow down */}
      <line x1="300" y1="100" x2="300" y2="140" stroke="#0284c7" strokeWidth="2"/>

      {/* Decision 1: Repeat interval > 4 hrs? */}
      <polygon points="300,140 420,200 300,260 180,200" fill="url(#grad-green)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="195" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Repeat interval</text>
      <text x="300" y="215" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">&gt; 4 hrs?</text>

      {/* YES arrow right */}
      <line x1="420" y1="200" x2="500" y2="200" stroke="#0284c7" strokeWidth="2"/>
      <text x="460" y="190" fill="#0284c7" fontSize="12" fontWeight="bold">YES</text>
      <rect x="500" y="155" width="85" height="90" rx="5" fill="url(#grad-green)" stroke="#0284c7" strokeWidth="2"/>
      <text x="542" y="190" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Air or surface</text>
      <text x="542" y="208" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ox table</text>
      <text x="542" y="225" textAnchor="middle" fill="white" fontSize="10">Table depth &gt;</text>
      <text x="542" y="240" textAnchor="middle" fill="white" fontSize="10">equivalent air</text>

      {/* NO arrow down */}
      <line x1="300" y1="260" x2="300" y2="300" stroke="#0284c7" strokeWidth="2"/>
      <text x="320" y="285" fill="#0284c7" fontSize="12" fontWeight="bold">NO</text>

      {/* Emergency decompression crash dive */}
      <rect x="80" y="300" width="440" height="80" rx="5" fill="url(#grad-green)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="335" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Emergency decompression crash</text>
      <text x="300" y="358" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">dive procedure</text>

      {/* Arrow down */}
      <line x1="300" y1="380" x2="300" y2="420" stroke="#0284c7" strokeWidth="2"/>

      {/* Decision 2: Oxygen available? */}
      <polygon points="300,420 420,480 300,540 180,480" fill="url(#grad-green)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="485" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Oxygen</text>
      <text x="300" y="505" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">available?</text>

      {/* NO arrow right */}
      <line x1="420" y1="480" x2="500" y2="480" stroke="#0284c7" strokeWidth="2"/>
      <line x1="500" y1="480" x2="500" y2="850" stroke="#0284c7" strokeWidth="2"/>
      <text x="460" y="470" fill="#0284c7" fontSize="12" fontWeight="bold">NO</text>

      {/* YES arrow down */}
      <line x1="300" y1="540" x2="300" y2="580" stroke="#0284c7" strokeWidth="2"/>
      <text x="320" y="565" fill="#0284c7" fontSize="12" fontWeight="bold">YES</text>

      {/* Decision 3: OTU > 450? */}
      <polygon points="300,580 420,640 300,700 180,640" fill="url(#grad-green)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="645" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">OTU</text>
      <text x="300" y="665" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">&gt; 450?</text>

      {/* YES arrow right to "Air only" */}
      <line x1="420" y1="640" x2="480" y2="640" stroke="#0284c7" strokeWidth="2"/>
      <text x="450" y="630" fill="#0284c7" fontSize="12" fontWeight="bold">YES</text>
      <rect x="480" y="610" width="80" height="60" rx="5" fill="url(#grad-green)" stroke="#0284c7" strokeWidth="2"/>
      <text x="520" y="645" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Air only</text>
      <line x1="520" y1="610" x2="520" y2="850" stroke="#0284c7" strokeWidth="2"/>

      {/* NO arrow down */}
      <line x1="300" y1="700" x2="300" y2="740" stroke="#0284c7" strokeWidth="2"/>
      <text x="320" y="725" fill="#0284c7" fontSize="12" fontWeight="bold">NO</text>

      {/* From 12 metres oxygen/air */}
      <rect x="80" y="740" width="440" height="80" rx="5" fill="url(#grad-green)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="775" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">From 12 metres 20 min oxygen</text>
      <text x="300" y="795" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">and 5 min air</text>

      {/* Arrow down */}
      <line x1="300" y1="820" x2="300" y2="860" stroke="#0284c7" strokeWidth="2"/>

      {/* Bottom boxes */}
      <g>
        {/* 2hrs */}
        <rect x="50" y="860" width="200" height="110" rx="8" fill="url(#grad-green)" stroke="#0284c7" strokeWidth="2"/>
        <text x="150" y="895" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2 hrs near</text>
        <text x="150" y="915" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">decompression</text>
        <text x="150" y="935" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber</text>
        <text x="150" y="955" textAnchor="middle" fill="white" fontSize="10">Repeat interval 12 hrs</text>
      </g>

      <g>
        {/* 4hrs */}
        <rect x="350" y="860" width="200" height="110" rx="8" fill="url(#grad-green)" stroke="#0284c7" strokeWidth="2"/>
        <text x="450" y="895" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4 hrs near</text>
        <text x="450" y="915" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">decompression</text>
        <text x="450" y="935" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber</text>
        <text x="450" y="955" textAnchor="middle" fill="white" fontSize="10">Repeat interval 12 hrs</text>
      </g>

      <line x1="300" y1="860" x2="150" y2="860" stroke="#0284c7" strokeWidth="2"/>
      <line x1="300" y1="860" x2="450" y2="860" stroke="#0284c7" strokeWidth="2"/>
      <line x1="500" y1="850" x2="450" y2="850" stroke="#0284c7" strokeWidth="2"/>
    </svg>
  );
}

// 5. Emergency Procedure 2 Nitrox Tables
export function EmergencyProcedure2NitroxTables() {
  return (
    <svg viewBox="0 0 600 950" className="w-full h-auto">
      <defs>
        <linearGradient id="grad-purple" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0369a1', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Start */}
      <rect x="80" y="20" width="440" height="80" rx="40" fill="url(#grad-purple)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="70" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Irregularity in decompression</text>

      {/* Arrow down */}
      <line x1="300" y1="100" x2="300" y2="140" stroke="#0284c7" strokeWidth="2"/>

      {/* Decision 1: Oxygen available? */}
      <polygon points="300,140 420,200 300,260 180,200" fill="url(#grad-purple)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="195" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Oxygen</text>
      <text x="300" y="215" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">available?</text>

      {/* NO arrow left to Treatment table 3 */}
      <line x1="180" y1="200" x2="100" y2="200" stroke="#0284c7" strokeWidth="2"/>
      <text x="130" y="190" fill="#0284c7" fontSize="12" fontWeight="bold">NO</text>
      <rect x="20" y="170" width="160" height="60" rx="5" fill="url(#grad-purple)" stroke="#0284c7" strokeWidth="2"/>
      <text x="100" y="205" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Treatment table 3</text>

      {/* YES arrow down to Treatment table 5 */}
      <line x1="300" y1="260" x2="300" y2="310" stroke="#0284c7" strokeWidth="2"/>
      <text x="320" y="290" fill="#0284c7" fontSize="12" fontWeight="bold">YES</text>
      <rect x="160" y="310" width="280" height="70" rx="5" fill="url(#grad-purple)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="350" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Treatment table 5</text>

      {/* Arrow down */}
      <line x1="300" y1="380" x2="300" y2="420" stroke="#0284c7" strokeWidth="2"/>

      {/* Decision 2: Symptoms of DCS? */}
      <polygon points="300,420 420,480 300,540 180,480" fill="url(#grad-purple)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="465" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Symptoms of</text>
      <text x="300" y="485" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Decompression</text>
      <text x="300" y="505" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">sickness?</text>

      {/* NO arrow right */}
      <line x1="420" y1="480" x2="500" y2="480" stroke="#0284c7" strokeWidth="2"/>
      <line x1="500" y1="480" x2="500" y2="750" stroke="#0284c7" strokeWidth="2"/>
      <text x="460" y="470" fill="#0284c7" fontSize="12" fontWeight="bold">NO</text>

      {/* YES arrow down to Treatment table 6 or 4 */}
      <line x1="300" y1="540" x2="300" y2="600" stroke="#0284c7" strokeWidth="2"/>
      <text x="320" y="575" fill="#0284c7" fontSize="12" fontWeight="bold">YES</text>
      <rect x="120" y="600" width="360" height="80" rx="5" fill="url(#grad-purple)" stroke="#0284c7" strokeWidth="2"/>
      <text x="300" y="645" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Treatment table 6 or 4</text>

      {/* Arrow down */}
      <line x1="300" y1="680" x2="300" y2="720" stroke="#0284c7" strokeWidth="2"/>

      {/* Bottom boxes */}
      <g>
        {/* 4hrs */}
        <rect x="50" y="720" width="210" height="110" rx="8" fill="url(#grad-purple)" stroke="#0284c7" strokeWidth="2"/>
        <text x="155" y="755" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4 hrs near</text>
        <text x="155" y="775" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">decompression</text>
        <text x="155" y="795" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber</text>
        <text x="155" y="815" textAnchor="middle" fill="white" fontSize="10">Repeat interval 12 hrs</text>
      </g>

      <g>
        {/* 2hrs */}
        <rect x="340" y="720" width="210" height="110" rx="8" fill="url(#grad-purple)" stroke="#0284c7" strokeWidth="2"/>
        <text x="445" y="755" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2 hrs near</text>
        <text x="445" y="775" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">decompression</text>
        <text x="445" y="795" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">chamber</text>
        <text x="445" y="815" textAnchor="middle" fill="white" fontSize="10">Repeat interval 12 hrs</text>
      </g>

      <line x1="300" y1="720" x2="155" y2="720" stroke="#0284c7" strokeWidth="2"/>
      <line x1="300" y1="720" x2="445" y2="720" stroke="#0284c7" strokeWidth="2"/>
      <line x1="100" y1="230" x2="100" y2="750" stroke="#0284c7" strokeWidth="2"/>
      <line x1="100" y1="750" x2="155" y2="750" stroke="#0284c7" strokeWidth="2"/>
      <line x1="500" y1="750" x2="445" y2="750" stroke="#0284c7" strokeWidth="2"/>
    </svg>
  );
}

// Backward compatibility
export const CrashDiveProcedure = EmergencyProcedureAirTable;
export const OxygenFailureDuringDecompression = EmergencyProcedure2SOX15;
export const SurfaceDecompressionRequired = EmergencyProcedure1NitroxTables;
export const IrregularityDuringDecompression = EmergencyProcedure1SOX15;
