// Crash Dive Procedure Flowchart
export function CrashDiveProcedure() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 300 380" className="min-w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .start { fill: #0ea5e9; stroke: #0369a1; stroke-width: 1.5; }
            .decision { fill: #06b6d4; stroke: #0369a1; stroke-width: 1.5; }
            .process { fill: #0284c7; stroke: #0369a1; stroke-width: 1.5; }
            .outcome { fill: #0369a1; stroke: #082f49; stroke-width: 1.5; }
            .text { fill: white; font-size: 11px; font-weight: 600; text-anchor: middle; }
            .label { fill: #1f2937; font-size: 9px; font-weight: 700; }
            .arrow { stroke: #334155; stroke-width: 1.5; fill: none; marker-end: url(#arrow1); }
          `}</style>
          <marker id="arrow1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#334155" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="75" y="10" width="150" height="35" rx="18" className="start" />
        <text x="150" y="32" className="text">Dive is interrupted</text>

        {/* Arrow */}
        <path d="M 150 45 L 150 70" className="arrow" />

        {/* Decision: Repeat interval > 4hrs? */}
        <polygon points="150,70 200,95 150,120 100,95" className="decision" />
        <text x="150" y="99" className="text">Repeat</text>
        <text x="150" y="110" className="text">&gt; 4hrs?</text>

        {/* YES path */}
        <path d="M 200 95 L 245 95" className="arrow" />
        <text x="220" y="90" className="label">YES</text>
        <rect x="245" y="80" width="50" height="30" rx="4" className="process" />
        <text x="270" y="100" className="text">Surface/</text>
        <text x="270" y="110" className="text">ox-table</text>

        {/* NO path */}
        <path d="M 150 120 L 150 155" className="arrow" />
        <text x="160" y="140" className="label">NO</text>

        {/* Emergency decompression */}
        <rect x="40" y="155" width="220" height="30" rx="4" className="process" />
        <text x="150" y="175" className="text">Emergency decompression crash dive</text>

        {/* Arrow */}
        <path d="M 150 185 L 150 210" className="arrow" />

        {/* Decision: Oxygen available? */}
        <polygon points="150,210 200,235 150,260 100,235" className="decision" />
        <text x="150" y="239" className="text">Oxygen</text>
        <text x="150" y="250" className="text">available?</text>

        {/* YES path */}
        <path d="M 200 235 L 245 235" className="arrow" />
        <text x="220" y="230" className="label">YES</text>
        <rect x="245" y="220" width="50" height="30" rx="4" className="process" />
        <text x="270" y="240" className="text">20min O₂</text>
        <text x="270" y="250" className="text">5min air</text>

        {/* NO path */}
        <path d="M 150 260 L 150 285" className="arrow" />
        <text x="160" y="275" className="label">NO</text>

        {/* Final outcomes */}
        {/* YES outcome */}
        <path d="M 270 250 L 270 300" className="arrow" />
        <rect x="230" y="300" width="80" height="40" rx="4" className="outcome" />
        <text x="270" y="315" className="text">2 hrs near</text>
        <text x="270" y="327" className="text">chamber</text>

        {/* NO outcome */}
        <rect x="60" y="285" width="80" height="40" rx="4" className="outcome" />
        <text x="100" y="300" className="text">4 hrs near</text>
        <text x="100" y="312" className="text">chamber</text>

        {/* Repeat interval note */}
        <text x="150" y="365" className="label">Repeat interval: 12 hours</text>
      </svg>
    </div>
  );
}

// Oxygen Failure During Decompression Flowchart
export function OxygenFailureDuringDecompression() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 320 400" className="min-w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .start { fill: #f97316; stroke: #c2410c; stroke-width: 1.5; }
            .decision { fill: #fb923c; stroke: #c2410c; stroke-width: 1.5; }
            .process { fill: #fdba74; stroke: #c2410c; stroke-width: 1.5; }
            .outcome { fill: #dc2626; stroke: #7f1d1d; stroke-width: 1.5; }
            .text { fill: white; font-size: 11px; font-weight: 600; text-anchor: middle; }
            .label { fill: #1f2937; font-size: 9px; font-weight: 700; }
            .arrow { stroke: #334155; stroke-width: 1.5; fill: none; marker-end: url(#arrow2); }
          `}</style>
          <marker id="arrow2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#334155" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="60" y="10" width="200" height="35" rx="18" className="start" />
        <text x="160" y="32" className="text">Oxygen failure</text>

        {/* Arrow */}
        <path d="M 160 45 L 160 70" className="arrow" />

        {/* Process: Surface air table */}
        <rect x="80" y="70" width="160" height="30" rx="4" className="process" />
        <text x="160" y="90" className="text">Surface air table (SAB)</text>

        {/* Arrow */}
        <path d="M 160 100 L 160 125" className="arrow" />

        {/* Decision: Oxygen restored? */}
        <polygon points="160,125 210,150 160,175 110,150" className="decision" />
        <text x="160" y="150" className="text">Oxygen</text>
        <text x="160" y="161" className="text">restored?</text>

        {/* NO path - Loop back to SAB */}
        <path d="M 110 150 L 40 150 L 40 85 L 80 85" className="arrow" />
        <text x="70" y="145" className="label">NO</text>

        {/* YES path */}
        <path d="M 160 175 L 160 200" className="arrow" />
        <text x="170" y="190" className="label">YES</text>

        {/* Oxygen protocol */}
        <rect x="70" y="200" width="180" height="30" rx="4" className="process" />
        <text x="160" y="220" className="text">20min O₂ and 5min air</text>

        {/* Arrow */}
        <path d="M 160 230 L 160 255" className="arrow" />

        {/* Decision: OTU > 450? */}
        <polygon points="160,255 210,280 160,305 110,280" className="decision" />
        <text x="160" y="283" className="text">OTU &gt;</text>
        <text x="160" y="294" className="text">450?</text>

        {/* YES - Stop O2 */}
        <path d="M 210 280 L 250 280 L 250 320" className="arrow" />
        <text x="230" y="275" className="label">YES</text>

        {/* NO - Continue O2 */}
        <path d="M 160 305 L 160 330" className="arrow" />
        <text x="170" y="320" className="label">NO</text>

        {/* Decision: O2 intake > 1/3? */}
        <polygon points="160,330 210,355 160,380 110,355" className="decision" />
        <text x="160" y="351" className="text">O₂ intake</text>
        <text x="160" y="362" className="text">&gt; 1/3 deco?</text>

        {/* Final outcomes */}
        {/* Left outcome - 4 hrs */}
        <path d="M 110 355 L 60 355 L 60 345" className="arrow" />
        <text x="80" y="350" className="label">NO</text>
        <rect x="20" y="345" width="80" height="35" rx="4" className="outcome" />
        <text x="60" y="360" className="text">4 hrs</text>
        <text x="60" y="372" className="text">chamber</text>

        {/* Right outcome - 2 hrs */}
        <path d="M 210 355 L 250 355 L 250 345" className="arrow" />
        <text x="230" y="350" className="label">YES</text>
        <rect x="220" y="345" width="80" height="35" rx="4" className="outcome" />
        <text x="260" y="360" className="text">2 hrs</text>
        <text x="260" y="372" className="text">chamber</text>
      </svg>
    </div>
  );
}

// Surface Decompression Required Flowchart
export function SurfaceDecompressionRequired() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 320 400" className="min-w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .start { fill: #06b6d4; stroke: #0369a1; stroke-width: 1.5; }
            .decision { fill: #22d3ee; stroke: #0369a1; stroke-width: 1.5; }
            .process { fill: #67e8f9; stroke: #0369a1; stroke-width: 1.5; }
            .outcome { fill: #0284c7; stroke: #082f49; stroke-width: 1.5; }
            .text { fill: white; font-size: 11px; font-weight: 600; text-anchor: middle; }
            .label { fill: #1f2937; font-size: 9px; font-weight: 700; }
            .arrow { stroke: #334155; stroke-width: 1.5; fill: none; marker-end: url(#arrow3); }
          `}</style>
          <marker id="arrow3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#334155" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="50" y="10" width="220" height="35" rx="18" className="start" />
        <text x="160" y="32" className="text">Need for surface decompression</text>

        {/* Arrow */}
        <path d="M 160 45 L 160 70" className="arrow" />

        {/* Decision: Repeat > 4hrs? */}
        <polygon points="160,70 210,95 160,120 110,95" className="decision" />
        <text x="160" y="99" className="text">Repeat</text>
        <text x="160" y="110" className="text">&gt; 4hrs?</text>

        {/* YES path */}
        <path d="M 210 95 L 255 95" className="arrow" />
        <text x="235" y="90" className="label">YES</text>
        <rect x="255" y="80" width="55" height="30" rx="4" className="process" />
        <text x="282" y="100" className="text">Air/SOX</text>
        <text x="282" y="110" className="text">table</text>

        {/* NO path */}
        <path d="M 160 120 L 160 155" className="arrow" />
        <text x="170" y="140" className="label">NO</text>

        {/* Emergency crash dive */}
        <rect x="40" y="155" width="240" height="30" rx="4" className="process" />
        <text x="160" y="175" className="text">Emergency decompression crash dive</text>

        {/* Arrow */}
        <path d="M 160 185 L 160 210" className="arrow" />

        {/* Decision: Oxygen available? */}
        <polygon points="160,210 210,235 160,260 110,235" className="decision" />
        <text x="160" y="239" className="text">Oxygen</text>
        <text x="160" y="250" className="text">available?</text>

        {/* YES path */}
        <path d="M 210 235 L 255 235" className="arrow" />
        <text x="235" y="230" className="label">YES</text>

        {/* Decision: OTU > 450? */}
        <polygon points="255,220 305,245 255,270 205,245" className="decision" />
        <text x="255" y="248" className="text">OTU &gt;</text>
        <text x="255" y="259" className="text">450?</text>

        {/* YES - Air only */}
        <path d="M 305 245 L 250 300" className="arrow" />
        <text x="290" y="270" className="label">YES</text>
        <rect x="230" y="300" width="40" height="25" rx="4" className="outcome" />
        <text x="250" y="318" className="text">Air</text>

        {/* NO path - Continue O2 */}
        <path d="M 160 260 L 160 300" className="arrow" />
        <text x="170" y="280" className="label">NO</text>

        {/* Final outcomes */}
        {/* Left - 4 hrs */}
        <rect x="60" y="300" width="80" height="40" rx="4" className="outcome" />
        <text x="100" y="315" className="text">4 hrs</text>
        <text x="100" y="327" className="text">chamber</text>

        {/* Right - 2 hrs */}
        <rect x="180" y="300" width="80" height="40" rx="4" className="outcome" />
        <text x="220" y="315" className="text">2 hrs</text>
        <text x="220" y="327" className="text">chamber</text>
      </svg>
    </div>
  );
}

// Irregularity During Decompression Flowchart
export function IrregularityDuringDecompression() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 300 380" className="min-w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .start { fill: #0ea5e9; stroke: #0369a1; stroke-width: 1.5; }
            .decision { fill: #0284c7; stroke: #0369a1; stroke-width: 1.5; }
            .process { fill: #3b82f6; stroke: #1e40af; stroke-width: 1.5; }
            .outcome { fill: #1e40af; stroke: #082f49; stroke-width: 1.5; }
            .text { fill: white; font-size: 11px; font-weight: 600; text-anchor: middle; }
            .label { fill: #1f2937; font-size: 9px; font-weight: 700; }
            .arrow { stroke: #334155; stroke-width: 1.5; fill: none; marker-end: url(#arrow4); }
          `}</style>
          <marker id="arrow4" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#334155" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="55" y="10" width="190" height="35" rx="18" className="start" />
        <text x="150" y="32" className="text">Irregularity in decompression</text>

        {/* Arrow */}
        <path d="M 150 45 L 150 70" className="arrow" />

        {/* Decision: Oxygen available? */}
        <polygon points="150,70 200,95 150,120 100,95" className="decision" />
        <text x="150" y="99" className="text">Oxygen</text>
        <text x="150" y="110" className="text">available?</text>

        {/* NO path */}
        <path d="M 100 95 L 40 95 L 40 145" className="arrow" />
        <text x="65" y="90" className="label">NO</text>
        <rect x="15" y="145" width="50" height="30" rx="4" className="process" />
        <text x="40" y="165" className="text">Table 3</text>

        {/* YES path */}
        <path d="M 150 120 L 150 155" className="arrow" />
        <text x="160" y="140" className="label">YES</text>
        <rect x="100" y="155" width="100" height="30" rx="4" className="process" />
        <text x="150" y="175" className="text">Table 5</text>

        {/* Arrow */}
        <path d="M 150 185 L 150 210" className="arrow" />

        {/* Decision: DCS Symptoms? */}
        <polygon points="150,210 200,235 150,260 100,235" className="decision" />
        <text x="150" y="239" className="text">DCS</text>
        <text x="150" y="250" className="text">symptoms?</text>

        {/* NO path */}
        <path d="M 200 235 L 245 235 L 245 300" className="arrow" />
        <text x="220" y="230" className="label">NO</text>

        {/* YES path */}
        <path d="M 150 260 L 150 285" className="arrow" />
        <text x="160" y="275" className="label">YES</text>
        <rect x="90" y="285" width="120" height="30" rx="4" className="process" />
        <text x="150" y="305" className="text">Table 6 or 4</text>

        {/* Arrow down */}
        <path d="M 150 315 L 150 340" className="arrow" />

        {/* Arrow from NO */}
        <path d="M 245 300 L 245 340" className="arrow" />

        {/* Final outcomes */}
        {/* YES outcome */}
        <rect x="70" y="340" width="80" height="35" rx="4" className="outcome" />
        <text x="110" y="355" className="text">4 hrs near</text>
        <text x="110" y="367" className="text">chamber</text>

        {/* NO outcome */}
        <rect x="210" y="340" width="80" height="35" rx="4" className="outcome" />
        <text x="250" y="355" className="text">2 hrs near</text>
        <text x="250" y="367" className="text">chamber</text>
      </svg>
    </div>
  );
}

// Backward compatibility - export with old names
export const SIL15FlowchartEmergency = CrashDiveProcedure;
export const SOX15FlowchartEmergency1 = OxygenFailureDuringDecompression;
export const NitroxFlowchartEmergency1 = SurfaceDecompressionRequired;
