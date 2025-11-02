// Crash Dive Procedure Flowchart
export function CrashDiveProcedure() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 300 420" className="min-w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .start { fill: url(#grad-blue); stroke: #0369a1; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .decision { fill: url(#grad-cyan); stroke: #0369a1; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .process { fill: url(#grad-blue-dark); stroke: #0369a1; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .outcome { fill: url(#grad-slate); stroke: #082f49; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .text { fill: white; font-size: 10px; font-weight: 600; text-anchor: middle; }
            .label { fill: #334155; font-size: 8px; font-weight: 700; }
            .arrow { stroke: #475569; stroke-width: 2; fill: none; marker-end: url(#arrow1); }
          `}</style>
          <marker id="arrow1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#475569" />
          </marker>
          <linearGradient id="grad-blue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#1e40af', stopOpacity: 0.95}} />
          </linearGradient>
          <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#06b6d4', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#0369a1', stopOpacity: 0.95}} />
          </linearGradient>
          <linearGradient id="grad-blue-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#0284c7', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#0369a1', stopOpacity: 0.95}} />
          </linearGradient>
          <linearGradient id="grad-slate" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#1e293b', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#082f49', stopOpacity: 0.95}} />
          </linearGradient>
        </defs>

        {/* Start */}
        <rect x="65" y="10" width="170" height="35" rx="18" className="start" />
        <text x="150" y="32" className="text">Dive interrupted</text>

        {/* Arrow */}
        <path d="M 150 45 L 150 75" className="arrow" />

        {/* Decision: Repeat interval > 4hrs? */}
        <polygon points="150,75 225,120 150,165 75,120" className="decision" />
        <text x="150" y="115" className="text">Repeat</text>
        <text x="150" y="128" className="text">&gt; 4hrs?</text>

        {/* YES path */}
        <path d="M 225 120 L 260 120" className="arrow" />
        <text x="240" y="115" className="label">YES</text>
        <rect x="260" y="105" width="35" height="30" rx="4" className="process" />
        <text x="277" y="125" className="text">SOX</text>

        {/* NO path */}
        <path d="M 150 165 L 150 200" className="arrow" />
        <text x="165" y="185" className="label">NO</text>

        {/* Emergency decompression */}
        <rect x="30" y="200" width="240" height="35" rx="4" className="process" />
        <text x="150" y="223" className="text">Emergency crash dive</text>

        {/* Arrow */}
        <path d="M 150 235 L 150 265" className="arrow" />

        {/* Decision: Oxygen available? */}
        <polygon points="150,265 225,310 150,355 75,310" className="decision" />
        <text x="150" y="305" className="text">Oxygen</text>
        <text x="150" y="318" className="text">avail?</text>

        {/* YES path */}
        <path d="M 225 310 L 260 310" className="arrow" />
        <text x="240" y="305" className="label">YES</text>
        <rect x="260" y="295" width="35" height="30" rx="4" className="process" />
        <text x="277" y="315" className="text">O₂</text>

        {/* NO path */}
        <path d="M 150 355 L 150 380" className="arrow" />
        <text x="165" y="370" className="label">NO</text>

        {/* Final outcomes */}
        {/* YES outcome */}
        <path d="M 277 325 L 277 360" className="arrow" />
        <rect x="245" y="360" width="65" height="35" rx="4" className="outcome" />
        <text x="277" y="375" className="text">2 hrs</text>
        <text x="277" y="387" className="text">near</text>

        {/* NO outcome */}
        <rect x="85" y="380" width="65" height="35" rx="4" className="outcome" />
        <text x="117" y="395" className="text">4 hrs</text>
        <text x="117" y="407" className="text">near</text>
      </svg>
    </div>
  );
}

// Oxygen Failure During Decompression Flowchart
export function OxygenFailureDuringDecompression() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 320 440" className="min-w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .start { fill: url(#grad-orange); stroke: #c2410c; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .decision { fill: url(#grad-amber); stroke: #c2410c; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .process { fill: url(#grad-orange-light); stroke: #c2410c; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .outcome { fill: url(#grad-red); stroke: #7f1d1d; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .text { fill: white; font-size: 10px; font-weight: 600; text-anchor: middle; }
            .label { fill: #334155; font-size: 8px; font-weight: 700; }
            .arrow { stroke: #475569; stroke-width: 2; fill: none; marker-end: url(#arrow2); }
          `}</style>
          <marker id="arrow2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#475569" />
          </marker>
          <linearGradient id="grad-orange" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#f97316', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#c2410c', stopOpacity: 0.95}} />
          </linearGradient>
          <linearGradient id="grad-amber" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#fb923c', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#c2410c', stopOpacity: 0.95}} />
          </linearGradient>
          <linearGradient id="grad-orange-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#fdba74', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#c2410c', stopOpacity: 0.95}} />
          </linearGradient>
          <linearGradient id="grad-red" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#dc2626', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#7f1d1d', stopOpacity: 0.95}} />
          </linearGradient>
        </defs>

        {/* Start */}
        <rect x="50" y="10" width="220" height="35" rx="18" className="start" />
        <text x="160" y="30" className="text">Oxygen failure</text>

        {/* Arrow */}
        <path d="M 160 45 L 160 75" className="arrow" />

        {/* Process: Surface air table */}
        <rect x="70" y="75" width="180" height="30" rx="4" className="process" />
        <text x="160" y="95" className="text">Surface air table (SAB)</text>

        {/* Arrow */}
        <path d="M 160 105 L 160 135" className="arrow" />

        {/* Decision: Oxygen restored? */}
        <polygon points="160,135 235,180 160,225 85,180" className="decision" />
        <text x="160" y="175" className="text">Oxygen</text>
        <text x="160" y="188" className="text">restored?</text>

        {/* NO path - Loop back to SAB */}
        <path d="M 85 180 L 35 180 L 35 90 L 70 90" className="arrow" />
        <text x="50" y="175" className="label">NO</text>

        {/* YES path */}
        <path d="M 160 225 L 160 255" className="arrow" />
        <text x="175" y="245" className="label">YES</text>

        {/* Oxygen protocol */}
        <rect x="60" y="255" width="200" height="30" rx="4" className="process" />
        <text x="160" y="275" className="text">20min O₂ and 5min air</text>

        {/* Arrow */}
        <path d="M 160 285 L 160 315" className="arrow" />

        {/* Decision: OTU > 450? */}
        <polygon points="160,315 235,360 160,405 85,360" className="decision" />
        <text x="160" y="360" className="text">OTU &gt;</text>
        <text x="160" y="373" className="text">450?</text>

        {/* YES - Stop O2 */}
        <path d="M 235 360 L 270 360 L 270 395" className="arrow" />
        <text x="260" y="355" className="label">YES</text>

        {/* NO - Continue O2 */}
        <path d="M 160 405 L 160 425" className="arrow" />
        <text x="175" y="420" className="label">NO</text>

        {/* Final outcomes */}
        {/* Left outcome - 4 hrs */}
        <rect x="40" y="395" width="65" height="35" rx="4" className="outcome" />
        <text x="72" y="410" className="text">4 hrs</text>
        <text x="72" y="422" className="text">near</text>

        {/* Right outcome - 2 hrs */}
        <rect x="235" y="395" width="65" height="35" rx="4" className="outcome" />
        <text x="267" y="410" className="text">2 hrs</text>
        <text x="267" y="422" className="text">near</text>
      </svg>
    </div>
  );
}

// Surface Decompression Required Flowchart
export function SurfaceDecompressionRequired() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 340 440" className="min-w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .start { fill: url(#grad-cyan2); stroke: #0369a1; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .decision { fill: url(#grad-sky); stroke: #0369a1; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .process { fill: url(#grad-cyan-light); stroke: #0369a1; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .outcome { fill: url(#grad-blue2); stroke: #082f49; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .text { fill: white; font-size: 10px; font-weight: 600; text-anchor: middle; }
            .label { fill: #334155; font-size: 8px; font-weight: 700; }
            .arrow { stroke: #475569; stroke-width: 2; fill: none; marker-end: url(#arrow3); }
          `}</style>
          <marker id="arrow3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#475569" />
          </marker>
          <linearGradient id="grad-cyan2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#06b6d4', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#0369a1', stopOpacity: 0.95}} />
          </linearGradient>
          <linearGradient id="grad-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#22d3ee', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#0369a1', stopOpacity: 0.95}} />
          </linearGradient>
          <linearGradient id="grad-cyan-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#67e8f9', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#0369a1', stopOpacity: 0.95}} />
          </linearGradient>
          <linearGradient id="grad-blue2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#0284c7', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#082f49', stopOpacity: 0.95}} />
          </linearGradient>
        </defs>

        {/* Start */}
        <rect x="40" y="10" width="260" height="35" rx="18" className="start" />
        <text x="170" y="30" className="text">Need surface decompression</text>

        {/* Arrow */}
        <path d="M 170 45 L 170 75" className="arrow" />

        {/* Decision: Repeat > 4hrs? */}
        <polygon points="170,75 245,120 170,165 95,120" className="decision" />
        <text x="170" y="115" className="text">Repeat</text>
        <text x="170" y="128" className="text">&gt; 4hrs?</text>

        {/* YES path */}
        <path d="M 245 120 L 285 120" className="arrow" />
        <text x="270" y="115" className="label">YES</text>
        <rect x="285" y="105" width="40" height="30" rx="4" className="process" />
        <text x="305" y="125" className="text">SOX</text>

        {/* NO path */}
        <path d="M 170 165 L 170 200" className="arrow" />
        <text x="185" y="185" className="label">NO</text>

        {/* Emergency crash dive */}
        <rect x="30" y="200" width="280" height="35" rx="4" className="process" />
        <text x="170" y="223" className="text">Emergency crash dive</text>

        {/* Arrow */}
        <path d="M 170 235 L 170 265" className="arrow" />

        {/* Decision: Oxygen available? */}
        <polygon points="170,265 245,310 170,355 95,310" className="decision" />
        <text x="170" y="305" className="text">Oxygen</text>
        <text x="170" y="318" className="text">avail?</text>

        {/* YES path */}
        <path d="M 245 310 L 285 310" className="arrow" />
        <text x="270" y="305" className="label">YES</text>

        {/* Decision: OTU > 450? */}
        <polygon points="285,295 320,330 285,365 250,330" className="decision" />
        <text x="285" y="333" className="text">OTU</text>
        <text x="285" y="346" className="text">&gt;450?</text>

        {/* YES - Air only */}
        <path d="M 320 330 L 280 395" className="arrow" />
        <text x="310" y="360" className="label">YES</text>
        <rect x="260" y="395" width="40" height="30" rx="4" className="outcome" />
        <text x="280" y="415" className="text">Air</text>

        {/* NO path - Continue O2 */}
        <path d="M 170 355 L 170 395" className="arrow" />
        <text x="185" y="375" className="label">NO</text>

        {/* Final outcomes */}
        {/* Left - 4 hrs */}
        <rect x="75" y="395" width="65" height="35" rx="4" className="outcome" />
        <text x="107" y="410" className="text">4 hrs</text>
        <text x="107" y="422" className="text">near</text>

        {/* Right - 2 hrs */}
        <rect x="195" y="395" width="65" height="35" rx="4" className="outcome" />
        <text x="227" y="410" className="text">2 hrs</text>
        <text x="227" y="422" className="text">near</text>
      </svg>
    </div>
  );
}

// Irregularity During Decompression Flowchart
export function IrregularityDuringDecompression() {
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 300 420" className="min-w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .start { fill: url(#grad-blue3); stroke: #0369a1; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .decision { fill: url(#grad-sky2); stroke: #0369a1; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .process { fill: url(#grad-blue-mid); stroke: #0369a1; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .outcome { fill: url(#grad-slate2); stroke: #082f49; stroke-width: 2; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
            .text { fill: white; font-size: 10px; font-weight: 600; text-anchor: middle; }
            .label { fill: #334155; font-size: 8px; font-weight: 700; }
            .arrow { stroke: #475569; stroke-width: 2; fill: none; marker-end: url(#arrow4); }
          `}</style>
          <marker id="arrow4" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#475569" />
          </marker>
          <linearGradient id="grad-blue3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#0ea5e9', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#0369a1', stopOpacity: 0.95}} />
          </linearGradient>
          <linearGradient id="grad-sky2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#0284c7', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#0369a1', stopOpacity: 0.95}} />
          </linearGradient>
          <linearGradient id="grad-blue-mid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#1e40af', stopOpacity: 0.95}} />
          </linearGradient>
          <linearGradient id="grad-slate2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#1e293b', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#082f49', stopOpacity: 0.95}} />
          </linearGradient>
        </defs>

        {/* Start */}
        <rect x="35" y="10" width="230" height="35" rx="18" className="start" />
        <text x="150" y="30" className="text">Irregularity in decompression</text>

        {/* Arrow */}
        <path d="M 150 45 L 150 75" className="arrow" />

        {/* Decision: Oxygen available? */}
        <polygon points="150,75 225,120 150,165 75,120" className="decision" />
        <text x="150" y="115" className="text">Oxygen</text>
        <text x="150" y="128" className="text">avail?</text>

        {/* NO path */}
        <path d="M 75 120 L 35 120 L 35 170" className="arrow" />
        <text x="50" y="115" className="label">NO</text>
        <rect x="15" y="170" width="40" height="30" rx="4" className="process" />
        <text x="35" y="190" className="text">T3</text>

        {/* YES path */}
        <path d="M 150 165 L 150 200" className="arrow" />
        <text x="165" y="185" className="label">YES</text>
        <rect x="110" y="200" width="80" height="30" rx="4" className="process" />
        <text x="150" y="220" className="text">Table 5</text>

        {/* Arrow */}
        <path d="M 150 230 L 150 260" className="arrow" />

        {/* Decision: DCS Symptoms? */}
        <polygon points="150,260 225,305 150,350 75,305" className="decision" />
        <text x="150" y="300" className="text">DCS</text>
        <text x="150" y="313" className="text">sympt?</text>

        {/* NO path */}
        <path d="M 225 305 L 260 305 L 260 370" className="arrow" />
        <text x="245" y="300" className="label">NO</text>

        {/* YES path */}
        <path d="M 150 350 L 150 375" className="arrow" />
        <text x="165" y="365" className="label">YES</text>
        <rect x="100" y="375" width="100" height="30" rx="4" className="process" />
        <text x="150" y="395" className="text">Table 6/4</text>

        {/* Arrow down */}
        <path d="M 150 405 L 150 360" className="arrow" />

        {/* Arrow from NO */}
        <path d="M 260 370 L 260 360" className="arrow" />

        {/* Final outcomes */}
        {/* YES outcome */}
        <rect x="85" y="360" width="65" height="35" rx="4" className="outcome" />
        <text x="117" y="375" className="text">4 hrs</text>
        <text x="117" y="387" className="text">near</text>

        {/* NO outcome */}
        <rect x="230" y="360" width="65" height="35" rx="4" className="outcome" />
        <text x="262" y="375" className="text">2 hrs</text>
        <text x="262" y="387" className="text">near</text>
      </svg>
    </div>
  );
}

// Backward compatibility - export with old names
export const SIL15FlowchartEmergency = CrashDiveProcedure;
export const SOX15FlowchartEmergency1 = OxygenFailureDuringDecompression;
export const NitroxFlowchartEmergency1 = SurfaceDecompressionRequired;
