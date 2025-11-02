// Crash Dive Procedure
export function CrashDiveProcedure() {
  return (
    <div className="w-full p-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg">
      <svg viewBox="0 0 400 550" className="w-full h-auto max-w-2xl mx-auto">
        <defs>
          <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#0369a1" />
          </marker>
          <style>{`.label { font-size: 12px; font-weight: bold; fill: white; text-anchor: middle; dominant-baseline: middle; }`}</style>
        </defs>

        {/* Start: Dive interrupted */}
        <rect x="125" y="20" width="150" height="50" rx="25" fill="#0ea5e9" stroke="#0369a1" strokeWidth="2" />
        <text x="200" y="48" className="label">Dive is interrupted</text>

        {/* Arrow down */}
        <path d="M 200 70 L 200 95" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" />

        {/* Diamond 1: Repeat > 4 hrs */}
        <polygon points="200,95 270,130 200,165 130,130" fill="#06b6d4" stroke="#0369a1" strokeWidth="2" />
        <text x="200" y="127" className="label">Repeat</text>
        <text x="200" y="143" className="label">&gt; 4 hrs?</text>

        {/* YES branch right */}
        <path d="M 270 130 L 320 130" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" />
        <text x="290" y="120" style={{fontSize: '11px', fill: '#0369a1', fontWeight: 'bold'}}>YES</text>
        <rect x="320" y="105" width="60" height="50" rx="5" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
        <text x="350" y="130" className="label" style={{fontSize: '11px'}}>Surface/</text>
        <text x="350" y="145" className="label" style={{fontSize: '11px'}}>ox-table</text>

        {/* NO branch down */}
        <path d="M 200 165 L 200 200" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" />
        <text x="210" y="185" style={{fontSize: '11px', fill: '#0369a1', fontWeight: 'bold'}}>NO</text>

        {/* Box: Emergency decompression */}
        <rect x="80" y="200" width="240" height="60" rx="5" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
        <text x="200" y="222" className="label">Emergency decompression</text>
        <text x="200" y="240" className="label">crash dive procedure</text>

        {/* Arrow down */}
        <path d="M 200 260 L 200 290" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" />

        {/* Diamond 2: Oxygen available */}
        <polygon points="200,290 270,325 200,360 130,325" fill="#06b6d4" stroke="#0369a1" strokeWidth="2" />
        <text x="200" y="322" className="label">Oxygen</text>
        <text x="200" y="338" className="label">available?</text>

        {/* YES branch right */}
        <path d="M 270 325 L 320 325" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" />
        <text x="290" y="315" style={{fontSize: '11px', fill: '#0369a1', fontWeight: 'bold'}}>YES</text>
        <rect x="320" y="300" width="60" height="50" rx="5" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
        <text x="350" y="318" className="label" style={{fontSize: '11px'}}>20min O₂</text>
        <text x="350" y="333" className="label" style={{fontSize: '11px'}}>5min air</text>

        {/* NO branch down */}
        <path d="M 200 360 L 200 395" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" />
        <text x="210" y="380" style={{fontSize: '11px', fill: '#0369a1', fontWeight: 'bold'}}>NO</text>

        {/* YES outcome: connect to right */}
        <path d="M 350 350 L 350 430 L 250 430" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" />

        {/* Bottom boxes */}
        {/* Left: 4 hrs NO */}
        <rect x="110" y="395" width="90" height="70" rx="5" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
        <text x="155" y="418" className="label" style={{fontSize: '11px'}}>4 hrs near</text>
        <text x="155" y="433" className="label" style={{fontSize: '11px'}}>decompression</text>
        <text x="155" y="448" className="label" style={{fontSize: '11px'}}>chamber</text>

        {/* Right: 2 hrs YES */}
        <rect x="200" y="395" width="90" height="70" rx="5" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
        <text x="245" y="418" className="label" style={{fontSize: '11px'}}>2 hrs near</text>
        <text x="245" y="433" className="label" style={{fontSize: '11px'}}>decompression</text>
        <text x="245" y="448" className="label" style={{fontSize: '11px'}}>chamber</text>
      </svg>
    </div>
  );
}

// Oxygen Failure During Decompression
export function OxygenFailureDuringDecompression() {
  return (
    <div className="w-full p-4 bg-gradient-to-br from-orange-50 to-slate-50 rounded-lg">
      <svg viewBox="0 0 400 600" className="w-full h-auto max-w-2xl mx-auto">
        <defs>
          <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#c2410c" />
          </marker>
          <style>{`.label { font-size: 12px; font-weight: bold; fill: white; text-anchor: middle; dominant-baseline: middle; }`}</style>
        </defs>

        {/* Start: Oxygen failure */}
        <rect x="120" y="20" width="160" height="50" rx="25" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
        <text x="200" y="48" className="label">Oxygen failure</text>

        {/* Arrow down */}
        <path d="M 200 70 L 200 95" stroke="#c2410c" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)" />

        {/* Process: Surface air table */}
        <rect x="100" y="95" width="200" height="50" rx="5" fill="#fdba74" stroke="#c2410c" strokeWidth="2" />
        <text x="200" y="123" className="label">Surface air table (SAB)</text>

        {/* Arrow down */}
        <path d="M 200 145 L 200 170" stroke="#c2410c" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)" />

        {/* Diamond 1: Oxygen restored */}
        <polygon points="200,170 270,205 200,240 130,205" fill="#fb923c" stroke="#c2410c" strokeWidth="2" />
        <text x="200" y="202" className="label">Oxygen</text>
        <text x="200" y="218" className="label">restored?</text>

        {/* NO loop back */}
        <path d="M 130 205 L 70 205 L 70 120 L 100 120" stroke="#c2410c" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)" />
        <text x="80" y="195" style={{fontSize: '11px', fill: '#c2410c', fontWeight: 'bold'}}>NO</text>

        {/* YES down */}
        <path d="M 200 240 L 200 270" stroke="#c2410c" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)" />
        <text x="210" y="260" style={{fontSize: '11px', fill: '#c2410c', fontWeight: 'bold'}}>YES</text>

        {/* Process: 20 min oxygen */}
        <rect x="70" y="270" width="260" height="50" rx="5" fill="#fdba74" stroke="#c2410c" strokeWidth="2" />
        <text x="200" y="298" className="label">20min O₂ and 5min air</text>

        {/* Arrow down */}
        <path d="M 200 320 L 200 345" stroke="#c2410c" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)" />

        {/* Diamond 2: OTU > 450 */}
        <polygon points="200,345 270,380 200,415 130,380" fill="#fb923c" stroke="#c2410c" strokeWidth="2" />
        <text x="200" y="380" className="label">OTU</text>
        <text x="200" y="396" className="label">&gt; 450?</text>

        {/* NO loop back to oxygen */}
        <path d="M 130 380 L 70 380 L 70 295 L 70 295" stroke="#c2410c" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)" />
        <text x="80" y="370" style={{fontSize: '11px', fill: '#c2410c', fontWeight: 'bold'}}>NO</text>

        {/* YES down */}
        <path d="M 200 415 L 200 445" stroke="#c2410c" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)" />
        <text x="210" y="435" style={{fontSize: '11px', fill: '#c2410c', fontWeight: 'bold'}}>YES</text>

        {/* Diamond 3: O2 intake > 1/3 */}
        <polygon points="200,445 270,480 200,515 130,480" fill="#fb923c" stroke="#c2410c" strokeWidth="2" />
        <text x="200" y="477" className="label" style={{fontSize: '11px'}}>O₂ intake</text>
        <text x="200" y="493" className="label" style={{fontSize: '11px'}}>&gt; 1/3?</text>

        {/* Bottom outcomes */}
        {/* NO: 4 hrs */}
        <rect x="50" y="525" width="100" height="60" rx="5" fill="#fdba74" stroke="#c2410c" strokeWidth="2" />
        <text x="100" y="548" className="label" style={{fontSize: '11px'}}>4 hrs near</text>
        <text x="100" y="563" className="label" style={{fontSize: '11px'}}>chamber</text>

        {/* YES: 2 hrs */}
        <rect x="250" y="525" width="100" height="60" rx="5" fill="#fdba74" stroke="#c2410c" strokeWidth="2" />
        <text x="300" y="548" className="label" style={{fontSize: '11px'}}>2 hrs near</text>
        <text x="300" y="563" className="label" style={{fontSize: '11px'}}>chamber</text>

        {/* Connect diamonds to outcomes */}
        <path d="M 130 480 L 80 480 L 80 525" stroke="#c2410c" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)" />
        <path d="M 270 480 L 320 480 L 320 525" stroke="#c2410c" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)" />
      </svg>
    </div>
  );
}

// Surface Decompression Required
export function SurfaceDecompressionRequired() {
  return (
    <div className="w-full p-4 bg-gradient-to-br from-cyan-50 to-slate-50 rounded-lg">
      <svg viewBox="0 0 400 580" className="w-full h-auto max-w-2xl mx-auto">
        <defs>
          <marker id="arrowCyan" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#0369a1" />
          </marker>
          <style>{`.label { font-size: 12px; font-weight: bold; fill: white; text-anchor: middle; dominant-baseline: middle; }`}</style>
        </defs>

        {/* Start */}
        <rect x="70" y="20" width="260" height="50" rx="25" fill="#06b6d4" stroke="#0369a1" strokeWidth="2" />
        <text x="200" y="48" className="label">Need for surface decompression</text>

        {/* Arrow down */}
        <path d="M 200 70 L 200 95" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowCyan)" />

        {/* Diamond 1: Repeat > 4 hrs */}
        <polygon points="200,95 270,130 200,165 130,130" fill="#22d3ee" stroke="#0369a1" strokeWidth="2" />
        <text x="200" y="127" className="label">Repeat</text>
        <text x="200" y="143" className="label">&gt; 4 hrs?</text>

        {/* YES right */}
        <path d="M 270 130 L 320 130" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowCyan)" />
        <text x="290" y="120" style={{fontSize: '11px', fill: '#0369a1', fontWeight: 'bold'}}>YES</text>
        <rect x="320" y="105" width="70" height="50" rx="5" fill="#67e8f9" stroke="#0369a1" strokeWidth="2" />
        <text x="355" y="133" className="label" style={{fontSize: '11px'}}>Air/SOX</text>

        {/* NO down */}
        <path d="M 200 165 L 200 200" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowCyan)" />
        <text x="210" y="185" style={{fontSize: '11px', fill: '#0369a1', fontWeight: 'bold'}}>NO</text>

        {/* Emergency crash dive */}
        <rect x="60" y="200" width="280" height="60" rx="5" fill="#67e8f9" stroke="#0369a1" strokeWidth="2" />
        <text x="200" y="222" className="label">Emergency decompression</text>
        <text x="200" y="240" className="label">crash dive procedure</text>

        {/* Arrow down */}
        <path d="M 200 260 L 200 290" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowCyan)" />

        {/* Diamond 2: Oxygen available */}
        <polygon points="200,290 270,325 200,360 130,325" fill="#22d3ee" stroke="#0369a1" strokeWidth="2" />
        <text x="200" y="322" className="label">Oxygen</text>
        <text x="200" y="338" className="label">available?</text>

        {/* YES right to OTU check */}
        <path d="M 270 325 L 310 325" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowCyan)" />
        <text x="285" y="315" style={{fontSize: '11px', fill: '#0369a1', fontWeight: 'bold'}}>YES</text>

        {/* Small diamond: OTU */}
        <polygon points="330,310 360,325 330,340 300,325" fill="#22d3ee" stroke="#0369a1" strokeWidth="2" />
        <text x="330" y="328" className="label" style={{fontSize: '10px'}}>OTU?</text>

        {/* NO down */}
        <path d="M 200 360 L 200 390" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowCyan)" />
        <text x="210" y="380" style={{fontSize: '11px', fill: '#0369a1', fontWeight: 'bold'}}>NO</text>

        {/* Process: 20 min O2 */}
        <rect x="100" y="390" width="200" height="50" rx="5" fill="#67e8f9" stroke="#0369a1" strokeWidth="2" />
        <text x="200" y="418" className="label">20min O₂, 5min air</text>

        {/* Bottom outcomes */}
        {/* Left: 2 hrs */}
        <rect x="60" y="460" width="100" height="60" rx="5" fill="#67e8f9" stroke="#0369a1" strokeWidth="2" />
        <text x="110" y="483" className="label" style={{fontSize: '11px'}}>2 hrs near</text>
        <text x="110" y="498" className="label" style={{fontSize: '11px'}}>chamber</text>

        {/* Right: 4 hrs */}
        <rect x="240" y="460" width="100" height="60" rx="5" fill="#67e8f9" stroke="#0369a1" strokeWidth="2" />
        <text x="290" y="483" className="label" style={{fontSize: '11px'}}>4 hrs near</text>
        <text x="290" y="498" className="label" style={{fontSize: '11px'}}>chamber</text>

        {/* Connect to outcomes */}
        <path d="M 200 440 L 200 460" stroke="#0369a1" strokeWidth="2" fill="none" markerEnd="url(#arrowCyan)" />
      </svg>
    </div>
  );
}

// Irregularity During Decompression
export function IrregularityDuringDecompression() {
  return (
    <div className="w-full p-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg">
      <svg viewBox="0 0 400 600" className="w-full h-auto max-w-2xl mx-auto">
        <defs>
          <marker id="arrowBlue2" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#1e40af" />
          </marker>
          <style>{`.label { font-size: 12px; font-weight: bold; fill: white; text-anchor: middle; dominant-baseline: middle; }`}</style>
        </defs>

        {/* Start */}
        <rect x="80" y="20" width="240" height="50" rx="25" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
        <text x="200" y="48" className="label">Irregularity in decompression</text>

        {/* Arrow down */}
        <path d="M 200 70 L 200 95" stroke="#1e40af" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue2)" />

        {/* Diamond: Oxygen available */}
        <polygon points="200,95 270,130 200,165 130,130" fill="#60a5fa" stroke="#1e40af" strokeWidth="2" />
        <text x="200" y="127" className="label">Oxygen</text>
        <text x="200" y="143" className="label">available?</text>

        {/* NO left */}
        <path d="M 130 130 L 70 130 L 70 175" stroke="#1e40af" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue2)" />
        <text x="85" y="120" style={{fontSize: '11px', fill: '#1e40af', fontWeight: 'bold'}}>NO</text>
        <rect x="40" y="175" width="60" height="45" rx="5" fill="#93c5fd" stroke="#1e40af" strokeWidth="2" />
        <text x="70" y="201" className="label" style={{fontSize: '11px'}}>Table 3</text>

        {/* YES down */}
        <path d="M 200 165 L 200 200" stroke="#1e40af" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue2)" />
        <text x="210" y="185" style={{fontSize: '11px', fill: '#1e40af', fontWeight: 'bold'}}>YES</text>

        {/* Process: Table 5 */}
        <rect x="150" y="200" width="100" height="45" rx="5" fill="#93c5fd" stroke="#1e40af" strokeWidth="2" />
        <text x="200" y="226" className="label">Table 5</text>

        {/* Arrow down */}
        <path d="M 200 245 L 200 270" stroke="#1e40af" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue2)" />

        {/* Diamond: DCS symptoms */}
        <polygon points="200,270 270,305 200,340 130,305" fill="#60a5fa" stroke="#1e40af" strokeWidth="2" />
        <text x="200" y="302" className="label">DCS</text>
        <text x="200" y="318" className="label">symptoms?</text>

        {/* NO right */}
        <path d="M 270 305 L 310 305 L 310 375" stroke="#1e40af" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue2)" />
        <text x="285" y="295" style={{fontSize: '11px', fill: '#1e40af', fontWeight: 'bold'}}>NO</text>

        {/* YES down */}
        <path d="M 200 340 L 200 370" stroke="#1e40af" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue2)" />
        <text x="210" y="360" style={{fontSize: '11px', fill: '#1e40af', fontWeight: 'bold'}}>YES</text>

        {/* Process: Table 6 or 4 */}
        <rect x="110" y="370" width="180" height="45" rx="5" fill="#93c5fd" stroke="#1e40af" strokeWidth="2" />
        <text x="200" y="396" className="label">Table 6 or 4</text>

        {/* Arrow down */}
        <path d="M 200 415 L 200 440" stroke="#1e40af" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue2)" />

        {/* Bottom outcomes */}
        {/* Left: 4 hrs */}
        <rect x="50" y="440" width="100" height="60" rx="5" fill="#93c5fd" stroke="#1e40af" strokeWidth="2" />
        <text x="100" y="463" className="label" style={{fontSize: '11px'}}>4 hrs near</text>
        <text x="100" y="478" className="label" style={{fontSize: '11px'}}>chamber</text>

        {/* Right: 2 hrs */}
        <rect x="250" y="440" width="100" height="60" rx="5" fill="#93c5fd" stroke="#1e40af" strokeWidth="2" />
        <text x="300" y="463" className="label" style={{fontSize: '11px'}}>2 hrs near</text>
        <text x="300" y="478" className="label" style={{fontSize: '11px'}}>chamber</text>

        {/* Connect to outcomes */}
        <path d="M 200 440 L 200 410 L 100 410 L 100 440" stroke="#1e40af" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue2)" />
        <path d="M 310 375 L 310 410 L 300 410 L 300 440" stroke="#1e40af" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue2)" />
      </svg>
    </div>
  );
}

// Backward compatibility
export const SIL15FlowchartEmergency = CrashDiveProcedure;
export const SOX15FlowchartEmergency1 = OxygenFailureDuringDecompression;
export const NitroxFlowchartEmergency1 = SurfaceDecompressionRequired;
