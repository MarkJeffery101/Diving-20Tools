// SIL15 Emergency Procedure Flowchart
export function SIL15FlowchartEmergency() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 400 600" className="min-w-full" preserveAspectRatio="xMidYMid meet">
        {/* Rounded rectangles and diamonds */}
        <defs>
          <style>{`
            .flowchart-start { fill: #60a5fa; stroke: #1e40af; stroke-width: 2; }
            .flowchart-decision { fill: #0ea5e9; stroke: #0369a1; stroke-width: 2; }
            .flowchart-process { fill: #3b82f6; stroke: #1e40af; stroke-width: 2; }
            .flowchart-text { fill: white; font-size: 12px; font-weight: bold; text-anchor: middle; }
            .flowchart-label { fill: #1f2937; font-size: 11px; font-weight: bold; }
            .flowchart-arrow { stroke: #374151; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
          `}</style>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#374151" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="100" y="20" width="200" height="50" rx="25" className="flowchart-start" />
        <text x="200" y="50" className="flowchart-text">
          Dive is interrupted
        </text>

        {/* Arrow down */}
        <path d="M 200 70 L 200 110" className="flowchart-arrow" />

        {/* Decision: Repeat interval > 4 hrs? */}
        <polygon
          points="200,110 280,150 200,190 120,150"
          className="flowchart-decision"
        />
        <text x="200" y="150" className="flowchart-text">
          Repeat interval
        </text>
        <text x="200" y="165" className="flowchart-text">
          &gt; 4 hrs?
        </text>

        {/* YES path - Surface/ox-table */}
        <path d="M 280 150 L 320 150" className="flowchart-arrow" />
        <text x="300" y="145" className="flowchart-label">
          YES
        </text>
        <rect x="320" y="130" width="70" height="40" rx="5" className="flowchart-process" />
        <text x="355" y="155" className="flowchart-text">
          Surface/
        </text>
        <text x="355" y="168" className="flowchart-text">
          ox-table
        </text>

        {/* NO path - Emergency procedure */}
        <path d="M 200 190 L 200 230" className="flowchart-arrow" />
        <text x="205" y="215" className="flowchart-label">
          NO
        </text>
        <rect x="75" y="230" width="250" height="50" rx="5" className="flowchart-process" />
        <text x="200" y="255" className="flowchart-text">
          Emergency decompression
        </text>
        <text x="200" y="270" className="flowchart-text">
          crash dive procedure (§ 9.3)
        </text>

        {/* Arrow down */}
        <path d="M 200 280 L 200 320" className="flowchart-arrow" />

        {/* Decision: Oxygen available? */}
        <polygon
          points="200,320 280,360 200,400 120,360"
          className="flowchart-decision"
        />
        <text x="200" y="360" className="flowchart-text">
          Oxygen
        </text>
        <text x="200" y="375" className="flowchart-text">
          available?
        </text>

        {/* YES - Oxygen protocol */}
        <path d="M 280 360 L 320 360" className="flowchart-arrow" />
        <text x="300" y="355" className="flowchart-label">
          YES
        </text>
        <rect x="320" y="340" width="70" height="40" rx="5" className="flowchart-process" />
        <text x="355" y="360" className="flowchart-text">
          From 12m
        </text>
        <text x="355" y="373" className="flowchart-text">
          20min O₂
        </text>

        {/* Final outcomes */}
        {/* YES path outcome */}
        <path d="M 355 380 L 355 420" className="flowchart-arrow" />
        <rect x="305" y="420" width="100" height="60" rx="5" className="flowchart-process" />
        <text x="355" y="440" className="flowchart-text">
          2 hrs near
        </text>
        <text x="355" y="453" className="flowchart-text">
          decompression
        </text>
        <text x="355" y="466" className="flowchart-text">
          chamber
        </text>

        {/* NO path outcome */}
        <path d="M 200 400 L 200 420" className="flowchart-arrow" />
        <text x="205" y="415" className="flowchart-label">
          NO
        </text>
        <rect x="50" y="420" width="100" height="60" rx="5" className="flowchart-process" />
        <text x="100" y="440" className="flowchart-text">
          4 hrs near
        </text>
        <text x="100" y="453" className="flowchart-text">
          decompression
        </text>
        <text x="100" y="466" className="flowchart-text">
          chamber
        </text>

        {/* Final note */}
        <text x="200" y="530" className="flowchart-label">
          Repeat interval: 12 hours
        </text>
      </svg>
    </div>
  );
}

// SOX15 Emergency Procedure Flowchart 1
export function SOX15FlowchartEmergency1() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 400 650" className="min-w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .flowchart-start { fill: #f97316; stroke: #c2410c; stroke-width: 2; }
            .flowchart-decision { fill: #fb923c; stroke: #c2410c; stroke-width: 2; }
            .flowchart-process { fill: #fdba74; stroke: #c2410c; stroke-width: 2; }
            .flowchart-treatment { fill: #dc2626; stroke: #991b1b; stroke-width: 2; }
            .flowchart-text { fill: white; font-size: 12px; font-weight: bold; text-anchor: middle; }
            .flowchart-label { fill: #1f2937; font-size: 11px; font-weight: bold; }
            .flowchart-arrow { stroke: #374151; stroke-width: 2; fill: none; marker-end: url(#arrowhead2); }
          `}</style>
          <marker
            id="arrowhead2"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#374151" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="80" y="20" width="240" height="50" rx="25" className="flowchart-start" />
        <text x="200" y="50" className="flowchart-text">
          Irregularity in decompression
        </text>

        {/* Arrow */}
        <path d="M 200 70 L 200 110" className="flowchart-arrow" />

        {/* Decision */}
        <polygon
          points="200,110 280,150 200,190 120,150"
          className="flowchart-decision"
        />
        <text x="200" y="155" className="flowchart-text">
          Oxygen
        </text>
        <text x="200" y="170" className="flowchart-text">
          available?
        </text>

        {/* NO path */}
        <path d="M 120 150 L 40 150 L 40 210" className="flowchart-arrow" />
        <text x="70" y="145" className="flowchart-label">
          NO
        </text>
        <rect x="0" y="210" width="80" height="40" rx="5" className="flowchart-treatment" />
        <text x="40" y="235" className="flowchart-text">
          Treatment
        </text>
        <text x="40" y="248" className="flowchart-text">
          table 3
        </text>

        {/* YES path */}
        <path d="M 200 190 L 200 230" className="flowchart-arrow" />
        <text x="205" y="215" className="flowchart-label">
          YES
        </text>
        <rect x="100" y="230" width="200" height="40" rx="5" className="flowchart-treatment" />
        <text x="200" y="255" className="flowchart-text">
          Treatment table 5
        </text>

        {/* Arrow */}
        <path d="M 200 270 L 200 310" className="flowchart-arrow" />

        {/* Decision: Symptoms? */}
        <polygon
          points="200,310 280,350 200,390 120,350"
          className="flowchart-decision"
        />
        <text x="200" y="350" className="flowchart-text">
          Symptoms of DCS?
        </text>

        {/* NO path */}
        <path d="M 280 350 L 340 350 L 340 410" className="flowchart-arrow" />
        <text x="310" y="345" className="flowchart-label">
          NO
        </text>

        {/* YES path */}
        <path d="M 200 390 L 200 430" className="flowchart-arrow" />
        <text x="205" y="415" className="flowchart-label">
          YES
        </text>
        <rect x="70" y="430" width="130" height="40" rx="5" className="flowchart-treatment" />
        <text x="135" y="450" className="flowchart-text">
          Table 6 or 4
        </text>

        {/* Final outcomes */}
        <path d="M 135 470 L 135 510" className="flowchart-arrow" />
        <rect x="55" y="510" width="160" height="50" rx="5" className="flowchart-process" />
        <text x="135" y="530" className="flowchart-text">
          4 hrs near chamber
        </text>
        <text x="135" y="543" className="flowchart-text">
          Repeat interval 12 hrs
        </text>

        {/* NO outcome */}
        <path d="M 340 410 L 340 510" className="flowchart-arrow" />
        <rect x="270" y="510" width="160" height="50" rx="5" className="flowchart-process" />
        <text x="350" y="530" className="flowchart-text">
          2 hrs near chamber
        </text>
        <text x="350" y="543" className="flowchart-text">
          Repeat interval 12 hrs
        </text>
      </svg>
    </div>
  );
}

// SOX15 Emergency Procedure Flowchart 2
export function SOX15FlowchartEmergency2() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 500 700" className="min-w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .flowchart-start { fill: #f97316; stroke: #c2410c; stroke-width: 2; }
            .flowchart-decision { fill: #fb923c; stroke: #c2410c; stroke-width: 2; }
            .flowchart-process { fill: #fdba74; stroke: #c2410c; stroke-width: 2; }
            .flowchart-text { fill: white; font-size: 12px; font-weight: bold; text-anchor: middle; }
            .flowchart-label { fill: #1f2937; font-size: 11px; font-weight: bold; }
            .flowchart-arrow { stroke: #374151; stroke-width: 2; fill: none; marker-end: url(#arrowhead3); }
          `}</style>
          <marker
            id="arrowhead3"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#374151" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="140" y="20" width="220" height="50" rx="25" className="flowchart-start" />
        <text x="250" y="50" className="flowchart-text">
          Oxygen failure
        </text>

        {/* Arrow */}
        <path d="M 250 70 L 250 110" className="flowchart-arrow" />

        {/* Process */}
        <rect x="150" y="110" width="200" height="40" rx="5" className="flowchart-process" />
        <text x="250" y="135" className="flowchart-text">
          Surface air table (SAB)
        </text>

        {/* Arrow */}
        <path d="M 250 150 L 250 190" className="flowchart-arrow" />

        {/* Decision */}
        <polygon
          points="250,190 330,230 250,270 170,230"
          className="flowchart-decision"
        />
        <text x="250" y="235" className="flowchart-text">
          Oxygen
        </text>
        <text x="250" y="250" className="flowchart-text">
          restored?
        </text>

        {/* NO path - stays on SAB */}
        <path d="M 170 230 L 80 230 L 80 310" className="flowchart-arrow" />
        <text x="120" y="225" className="flowchart-label">
          NO
        </text>

        {/* YES path */}
        <path d="M 250 270 L 250 310" className="flowchart-arrow" />
        <text x="255" y="295" className="flowchart-label">
          YES
        </text>

        {/* Process: Oxygen from 12m */}
        <rect x="140" y="310" width="220" height="40" rx="5" className="flowchart-process" />
        <text x="250" y="335" className="flowchart-text">
          From 12m: 20min O₂ and 5min air
        </text>

        {/* Arrow */}
        <path d="M 250 350 L 250 390" className="flowchart-arrow" />

        {/* Decision: OTU > 450? */}
        <polygon
          points="250,390 330,430 250,470 170,430"
          className="flowchart-decision"
        />
        <text x="250" y="435" className="flowchart-text">
          OTU &gt;
        </text>
        <text x="250" y="450" className="flowchart-text">
          450?
        </text>

        {/* YES path - Stop O2 */}
        <path d="M 330 430 L 390 430" className="flowchart-arrow" />
        <text x="360" y="425" className="flowchart-label">
          YES
        </text>

        {/* NO path */}
        <path d="M 170 430 L 80 430 L 80 310 L 140 330" className="flowchart-arrow" />
        <text x="110" y="425" className="flowchart-label">
          NO
        </text>

        {/* Decision: Oxygen intake > 1/3? */}
        <path d="M 250 470 L 250 510" className="flowchart-arrow" />
        <polygon
          points="250,510 330,550 250,590 170,550"
          className="flowchart-decision"
        />
        <text x="250" y="550" className="flowchart-text">
          O₂ intake &gt;
        </text>
        <text x="250" y="565" className="flowchart-text">
          1/3 deco?
        </text>

        {/* Final outcomes */}
        {/* Left outcome - 4 hrs */}
        <path d="M 170 550 L 100 550 L 100 600" className="flowchart-arrow" />
        <text x="130" y="545" className="flowchart-label">
          NO
        </text>
        <rect x="20" y="600" width="160" height="50" rx="5" className="flowchart-process" />
        <text x="100" y="620" className="flowchart-text">
          4 hrs near chamber
        </text>
        <text x="100" y="633" className="flowchart-text">
          Repeat: 12 hrs
        </text>

        {/* Right outcome - 2 hrs */}
        <path d="M 330 550 L 400 550 L 400 600" className="flowchart-arrow" />
        <text x="370" y="545" className="flowchart-label">
          YES
        </text>
        <rect x="320" y="600" width="160" height="50" rx="5" className="flowchart-process" />
        <text x="400" y="620" className="flowchart-text">
          2 hrs near chamber
        </text>
        <text x="400" y="633" className="flowchart-text">
          Repeat: 12 hrs
        </text>
      </svg>
    </div>
  );
}

// Nitrox Emergency Procedure Flowchart 1
export function NitroxFlowchartEmergency1() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 450 650" className="min-w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .flowchart-start { fill: #06b6d4; stroke: #0369a1; stroke-width: 2; }
            .flowchart-decision { fill: #22d3ee; stroke: #0369a1; stroke-width: 2; }
            .flowchart-process { fill: #67e8f9; stroke: #0369a1; stroke-width: 2; }
            .flowchart-text { fill: white; font-size: 11px; font-weight: bold; text-anchor: middle; }
            .flowchart-label { fill: #1f2937; font-size: 10px; font-weight: bold; }
            .flowchart-arrow { stroke: #374151; stroke-width: 2; fill: none; marker-end: url(#arrowhead4); }
          `}</style>
          <marker
            id="arrowhead4"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#374151" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="90" y="20" width="270" height="50" rx="25" className="flowchart-start" />
        <text x="225" y="50" className="flowchart-text">
          Need for surface decompression
        </text>

        {/* Arrow */}
        <path d="M 225 70 L 225 110" className="flowchart-arrow" />

        {/* Decision */}
        <polygon
          points="225,110 305,150 225,190 145,150"
          className="flowchart-decision"
        />
        <text x="225" y="155" className="flowchart-text">
          Repeat
        </text>
        <text x="225" y="170" className="flowchart-text">
          &gt; 4 hrs?
        </text>

        {/* YES path */}
        <path d="M 305 150 L 360 150" className="flowchart-arrow" />
        <text x="335" y="145" className="flowchart-label">
          YES
        </text>
        <rect x="360" y="130" width="80" height="40" rx="5" className="flowchart-process" />
        <text x="400" y="155" className="flowchart-text">
          Air/SOX
        </text>
        <text x="400" y="168" className="flowchart-text">
          Table
        </text>

        {/* NO path */}
        <path d="M 225 190 L 225 230" className="flowchart-arrow" />
        <text x="230" y="215" className="flowchart-label">
          NO
        </text>
        <rect x="50" y="230" width="250" height="40" rx="5" className="flowchart-process" />
        <text x="225" y="255" className="flowchart-text">
          Emergency crash dive procedure
        </text>

        {/* Arrow */}
        <path d="M 225 270 L 225 310" className="flowchart-arrow" />

        {/* Decision: Oxygen? */}
        <polygon
          points="225,310 305,350 225,390 145,350"
          className="flowchart-decision"
        />
        <text x="225" y="355" className="flowchart-text">
          Oxygen
        </text>
        <text x="225" y="370" className="flowchart-text">
          available?
        </text>

        {/* YES - Oxygen protocol */}
        <path d="M 305 350 L 360 350" className="flowchart-arrow" />
        <text x="335" y="345" className="flowchart-label">
          YES
        </text>
        <rect x="360" y="330" width="80" height="40" rx="5" className="flowchart-process" />
        <text x="400" y="355" className="flowchart-text">
          20min O₂
        </text>
        <text x="400" y="368" className="flowchart-text">
          5min air
        </text>

        {/* NO path */}
        <path d="M 225 390 L 225 430" className="flowchart-arrow" />
        <text x="230" y="415" className="flowchart-label">
          NO
        </text>

        {/* Decision: OTU? */}
        <polygon
          points="225,430 305,470 225,510 145,470"
          className="flowchart-decision"
        />
        <text x="225" y="475" className="flowchart-text">
          OTU &gt;
        </text>
        <text x="225" y="490" className="flowchart-text">
          450?
        </text>

        {/* Outcomes */}
        {/* Left - Air only */}
        <path d="M 145 470 L 80 470 L 80 550" className="flowchart-arrow" />
        <text x="110" y="465" className="flowchart-label">
          YES
        </text>
        <rect x="20" y="550" width="120" height="40" rx="5" className="flowchart-process" />
        <text x="80" y="575" className="flowchart-text">
          Air only
        </text>

        {/* Right - Continue O2 */}
        <path d="M 305 470 L 360 470 L 360 550" className="flowchart-arrow" />
        <text x="335" y="465" className="flowchart-label">
          NO
        </text>

        {/* Continue O2 to outcomes */}
        <path d="M 360 350 L 360 510 L 280 510" className="flowchart-arrow" />

        {/* Final outcomes */}
        <path d="M 225 510 L 225 550" className="flowchart-arrow" />
        <rect x="145" y="550" width="160" height="40" rx="5" className="flowchart-process" />
        <text x="225" y="575" className="flowchart-text">
          2 hrs chamber / 12 hrs repeat
        </text>
      </svg>
    </div>
  );
}

// Nitrox Emergency Procedure Flowchart 2
export function NitroxFlowchartEmergency2() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 400 650" className="min-w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .flowchart-start { fill: #06b6d4; stroke: #0369a1; stroke-width: 2; }
            .flowchart-decision { fill: #22d3ee; stroke: #0369a1; stroke-width: 2; }
            .flowchart-process { fill: #67e8f9; stroke: #0369a1; stroke-width: 2; }
            .flowchart-treatment { fill: #dc2626; stroke: #991b1b; stroke-width: 2; }
            .flowchart-text { fill: white; font-size: 11px; font-weight: bold; text-anchor: middle; }
            .flowchart-label { fill: #1f2937; font-size: 10px; font-weight: bold; }
            .flowchart-arrow { stroke: #374151; stroke-width: 2; fill: none; marker-end: url(#arrowhead5); }
          `}</style>
          <marker
            id="arrowhead5"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#374151" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="50" y="20" width="300" height="50" rx="25" className="flowchart-start" />
        <text x="200" y="50" className="flowchart-text">
          Irregularity in decompression
        </text>

        {/* Arrow */}
        <path d="M 200 70 L 200 110" className="flowchart-arrow" />

        {/* Decision */}
        <polygon
          points="200,110 280,150 200,190 120,150"
          className="flowchart-decision"
        />
        <text x="200" y="155" className="flowchart-text">
          Oxygen
        </text>
        <text x="200" y="170" className="flowchart-text">
          available?
        </text>

        {/* NO path */}
        <path d="M 120 150 L 40 150 L 40 210" className="flowchart-arrow" />
        <text x="70" y="145" className="flowchart-label">
          NO
        </text>
        <rect x="0" y="210" width="80" height="40" rx="5" className="flowchart-treatment" />
        <text x="40" y="235" className="flowchart-text">
          Table 3
        </text>

        {/* YES path */}
        <path d="M 200 190 L 200 230" className="flowchart-arrow" />
        <text x="205" y="215" className="flowchart-label">
          YES
        </text>
        <rect x="100" y="230" width="200" height="40" rx="5" className="flowchart-treatment" />
        <text x="200" y="255" className="flowchart-text">
          Treatment table 5
        </text>

        {/* Arrow */}
        <path d="M 200 270 L 200 310" className="flowchart-arrow" />

        {/* Decision: Symptoms? */}
        <polygon
          points="200,310 280,350 200,390 120,350"
          className="flowchart-decision"
        />
        <text x="200" y="350" className="flowchart-text">
          Symptoms of
        </text>
        <text x="200" y="365" className="flowchart-text">
          DCS?
        </text>

        {/* NO path */}
        <path d="M 280 350 L 340 350 L 340 410" className="flowchart-arrow" />
        <text x="310" y="345" className="flowchart-label">
          NO
        </text>

        {/* YES path */}
        <path d="M 200 390 L 200 430" className="flowchart-arrow" />
        <text x="205" y="415" className="flowchart-label">
          YES
        </text>
        <rect x="70" y="430" width="130" height="40" rx="5" className="flowchart-treatment" />
        <text x="135" y="450" className="flowchart-text">
          Table 6 or 4
        </text>

        {/* Final outcomes */}
        <path d="M 135 470 L 135 510" className="flowchart-arrow" />
        <rect x="55" y="510" width="160" height="50" rx="5" className="flowchart-process" />
        <text x="135" y="530" className="flowchart-text">
          4 hrs near
        </text>
        <text x="135" y="543" className="flowchart-text">
          Repeat: 12 hrs
        </text>

        {/* NO outcome */}
        <path d="M 340 410 L 340 510" className="flowchart-arrow" />
        <rect x="270" y="510" width="160" height="50" rx="5" className="flowchart-process" />
        <text x="350" y="530" className="flowchart-text">
          2 hrs near
        </text>
        <text x="350" y="543" className="flowchart-text">
          Repeat: 12 hrs
        </text>
      </svg>
    </div>
  );
}

// SIL15 Interrupted Dive Flowchart
export function SIL15FlowchartInterrupted() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 350 500" className="min-w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .flowchart-start { fill: #3b82f6; stroke: #1e40af; stroke-width: 2; }
            .flowchart-decision { fill: #60a5fa; stroke: #1e40af; stroke-width: 2; }
            .flowchart-process { fill: #93c5fd; stroke: #1e40af; stroke-width: 2; }
            .flowchart-text { fill: white; font-size: 11px; font-weight: bold; text-anchor: middle; }
            .flowchart-label { fill: #1f2937; font-size: 10px; font-weight: bold; }
            .flowchart-arrow { stroke: #374151; stroke-width: 2; fill: none; marker-end: url(#arrowhead6); }
          `}</style>
          <marker
            id="arrowhead6"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#374151" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="75" y="20" width="200" height="50" rx="25" className="flowchart-start" />
        <text x="175" y="50" className="flowchart-text">
          Dive is interrupted
        </text>

        {/* Arrow */}
        <path d="M 175 70 L 175 110" className="flowchart-arrow" />

        {/* Decision */}
        <polygon
          points="175,110 255,150 175,190 95,150"
          className="flowchart-decision"
        />
        <text x="175" y="160" className="flowchart-text">
          Repeat interval &gt; 4 hrs?
        </text>

        {/* YES path */}
        <path d="M 255 150 L 300 150" className="flowchart-arrow" />
        <text x="280" y="145" className="flowchart-label">
          YES
        </text>
        <rect x="300" y="130" width="50" height="40" rx="5" className="flowchart-process" />
        <text x="325" y="155" className="flowchart-text">
          SOX15
        </text>

        {/* NO path */}
        <path d="M 175 190 L 175 230" className="flowchart-arrow" />
        <text x="180" y="215" className="flowchart-label">
          NO
        </text>
        <rect x="50" y="230" width="250" height="40" rx="5" className="flowchart-process" />
        <text x="175" y="255" className="flowchart-text">
          Emergency crash dive procedure
        </text>

        {/* Arrow */}
        <path d="M 175 270 L 175 310" className="flowchart-arrow" />

        {/* Final decision */}
        <polygon
          points="175,310 255,350 175,390 95,350"
          className="flowchart-decision"
        />
        <text x="175" y="360" className="flowchart-text">
          Oxygen available?
        </text>

        {/* Outcomes */}
        <path d="M 255 350 L 300 350" className="flowchart-arrow" />
        <text x="280" y="345" className="flowchart-label">
          YES
        </text>
        <rect x="300" y="330" width="50" height="40" rx="5" className="flowchart-process" />
        <text x="325" y="355" className="flowchart-text">
          O₂ at 12m
        </text>

        <path d="M 95 350 L 40 350 L 40 410" className="flowchart-arrow" />
        <text x="60" y="345" className="flowchart-label">
          NO
        </text>

        {/* Final boxes */}
        <rect x="20" y="410" width="120" height="50" rx="5" className="flowchart-process" />
        <text x="80" y="430" className="flowchart-text">
          4 hrs near
        </text>
        <text x="80" y="443" className="flowchart-text">
          12 hrs repeat
        </text>

        <path d="M 325 370 L 325 410" className="flowchart-arrow" />
        <rect x="265" y="410" width="120" height="50" rx="5" className="flowchart-process" />
        <text x="325" y="430" className="flowchart-text">
          2 hrs near
        </text>
        <text x="325" y="443" className="flowchart-text">
          12 hrs repeat
        </text>
      </svg>
    </div>
  );
}
