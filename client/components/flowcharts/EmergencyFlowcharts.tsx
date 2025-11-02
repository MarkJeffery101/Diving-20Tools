// Crash Dive Procedure
export function CrashDiveProcedure() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 450" className="w-full h-auto">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#1f2937" />
          </marker>
        </defs>

        {/* Start: Dive is interrupted */}
        <rect x="75" y="10" width="150" height="40" rx="20" fill="#0ea5e9" stroke="#0369a1" strokeWidth="2" />
        <text x="150" y="35" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Dive is interrupted</text>

        {/* Arrow */}
        <path d="M 150 50 L 150 75" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />

        {/* Decision: Repeat > 4 hrs? */}
        <polygon points="150,75 210,110 150,145 90,110" fill="#06b6d4" stroke="#0369a1" strokeWidth="2" />
        <text x="150" y="110" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Repeat</text>
        <text x="150" y="125" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">&gt; 4 hrs?</text>

        {/* YES - Surface/ox-table */}
        <path d="M 210 110 L 240 110" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
        <text x="225" y="105" fontSize="10" fontWeight="bold" fill="#1f2937">YES</text>
        <rect x="240" y="90" width="50" height="40" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
        <text x="265" y="115" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">Surface/</text>
        <text x="265" y="127" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">ox-table</text>

        {/* NO - Down */}
        <path d="M 150 145 L 150 180" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
        <text x="165" y="165" fontSize="10" fontWeight="bold" fill="#1f2937">NO</text>

        {/* Emergency box */}
        <rect x="30" y="180" width="240" height="50" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
        <text x="150" y="205" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Emergency decompression crash dive</text>

        {/* Arrow */}
        <path d="M 150 230 L 150 260" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />

        {/* Decision: Oxygen available? */}
        <polygon points="150,260 210,295 150,330 90,295" fill="#06b6d4" stroke="#0369a1" strokeWidth="2" />
        <text x="150" y="295" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Oxygen</text>
        <text x="150" y="310" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">available?</text>

        {/* YES - Oxygen protocol */}
        <path d="M 210 295 L 240 295" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
        <text x="225" y="290" fontSize="10" fontWeight="bold" fill="#1f2937">YES</text>
        <rect x="240" y="275" width="50" height="40" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
        <text x="265" y="295" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">20min O₂</text>
        <text x="265" y="307" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">5min air</text>

        {/* NO - Down */}
        <path d="M 150 330 L 150 360" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
        <text x="165" y="350" fontSize="10" fontWeight="bold" fill="#1f2937">NO</text>

        {/* Bottom: 4 hrs outcome */}
        <rect x="60" y="360" width="90" height="60" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
        <text x="105" y="380" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">4 hrs near</text>
        <text x="105" y="395" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">decompression</text>
        <text x="105" y="410" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">chamber</text>

        {/* Connect YES oxygen down and to right outcome */}
        <path d="M 265 315 L 265 340 L 195 340 L 195 360" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />

        {/* Bottom: 2 hrs outcome */}
        <rect x="150" y="360" width="90" height="60" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
        <text x="195" y="380" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">2 hrs near</text>
        <text x="195" y="395" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">decompression</text>
        <text x="195" y="410" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">chamber</text>
      </svg>
    </div>
  );
}

// Oxygen Failure During Decompression
export function OxygenFailureDuringDecompression() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 320 480" className="w-full h-auto">
        <defs>
          <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#1f2937" />
          </marker>
        </defs>

        {/* Start: Oxygen failure */}
        <rect x="80" y="10" width="160" height="40" rx="20" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
        <text x="160" y="35" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Oxygen failure</text>

        {/* Arrow */}
        <path d="M 160 50 L 160 75" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)" />

        {/* Process: Surface air table */}
        <rect x="70" y="75" width="180" height="40" rx="4" fill="#fdba74" stroke="#c2410c" strokeWidth="2" />
        <text x="160" y="101" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Surface air table (SAB)</text>

        {/* Arrow */}
        <path d="M 160 115 L 160 140" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)" />

        {/* Decision: Oxygen restored? */}
        <polygon points="160,140 220,175 160,210 100,175" fill="#fb923c" stroke="#c2410c" strokeWidth="2" />
        <text x="160" y="175" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Oxygen</text>
        <text x="160" y="190" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">restored?</text>

        {/* NO loop back */}
        <path d="M 100 175 L 50 175 L 50 95 L 70 95" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)" />
        <text x="70" y="170" fontSize="10" fontWeight="bold" fill="#1f2937">NO</text>

        {/* YES down */}
        <path d="M 160 210 L 160 240" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)" />
        <text x="175" y="230" fontSize="10" fontWeight="bold" fill="#1f2937">YES</text>

        {/* 20min O2, 5min air */}
        <rect x="60" y="240" width="200" height="40" rx="4" fill="#fdba74" stroke="#c2410c" strokeWidth="2" />
        <text x="160" y="266" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">20min O₂ and 5min air</text>

        {/* Arrow */}
        <path d="M 160 280 L 160 305" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)" />

        {/* Decision: OTU > 450? */}
        <polygon points="160,305 220,340 160,375 100,340" fill="#fb923c" stroke="#c2410c" strokeWidth="2" />
        <text x="160" y="340" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">OTU</text>
        <text x="160" y="355" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">&gt; 450?</text>

        {/* NO loop back to oxygen */}
        <path d="M 100 340 L 50 340 L 50 260 L 60 260" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)" />
        <text x="70" y="335" fontSize="10" fontWeight="bold" fill="#1f2937">NO</text>

        {/* YES down */}
        <path d="M 160 375 L 160 400" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)" />
        <text x="175" y="390" fontSize="10" fontWeight="bold" fill="#1f2937">YES</text>

        {/* Decision: O2 intake > 1/3? */}
        <polygon points="160,400 220,435 160,470 100,435" fill="#fb923c" stroke="#c2410c" strokeWidth="2" />
        <text x="160" y="435" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">O₂ &gt; 1/3?</text>
      </svg>
    </div>
  );
}

// Surface Decompression Required
export function SurfaceDecompressionRequired() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 340 460" className="w-full h-auto">
        <defs>
          <marker id="arrowhead3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#1f2937" />
          </marker>
        </defs>

        {/* Start: Need surface decompression */}
        <rect x="60" y="10" width="220" height="40" rx="20" fill="#06b6d4" stroke="#0369a1" strokeWidth="2" />
        <text x="170" y="35" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Need surface decompression</text>

        {/* Arrow */}
        <path d="M 170 50 L 170 75" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead3)" />

        {/* Decision: Repeat > 4 hrs? */}
        <polygon points="170,75 230,110 170,145 110,110" fill="#22d3ee" stroke="#0369a1" strokeWidth="2" />
        <text x="170" y="110" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Repeat</text>
        <text x="170" y="125" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">&gt; 4 hrs?</text>

        {/* YES - Air or SOX */}
        <path d="M 230 110 L 265 110" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead3)" />
        <text x="250" y="105" fontSize="10" fontWeight="bold" fill="#1f2937">YES</text>
        <rect x="265" y="90" width="60" height="40" rx="4" fill="#67e8f9" stroke="#0369a1" strokeWidth="2" />
        <text x="295" y="115" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">Air/SOX</text>

        {/* NO - Down */}
        <path d="M 170 145 L 170 180" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead3)" />
        <text x="185" y="165" fontSize="10" fontWeight="bold" fill="#1f2937">NO</text>

        {/* Emergency crash dive */}
        <rect x="35" y="180" width="270" height="50" rx="4" fill="#67e8f9" stroke="#0369a1" strokeWidth="2" />
        <text x="170" y="205" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Emergency decompression crash dive</text>

        {/* Arrow */}
        <path d="M 170 230 L 170 260" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead3)" />

        {/* Decision: Oxygen available? */}
        <polygon points="170,260 230,295 170,330 110,295" fill="#22d3ee" stroke="#0369a1" strokeWidth="2" />
        <text x="170" y="295" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Oxygen</text>
        <text x="170" y="310" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">available?</text>

        {/* YES - Right */}
        <path d="M 230 295 L 265 295" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead3)" />
        <text x="250" y="290" fontSize="10" fontWeight="bold" fill="#1f2937">YES</text>

        {/* Decision: OTU */}
        <polygon points="280,280 310,295 280,310 250,295" fill="#22d3ee" stroke="#0369a1" strokeWidth="2" />
        <text x="280" y="298" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">OTU?</text>

        {/* NO - Down */}
        <path d="M 170 330 L 170 365" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead3)" />
        <text x="185" y="350" fontSize="10" fontWeight="bold" fill="#1f2937">NO</text>

        {/* 20min O2 */}
        <rect x="100" y="365" width="140" height="40" rx="4" fill="#67e8f9" stroke="#0369a1" strokeWidth="2" />
        <text x="170" y="391" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">20min O₂, 5min air</text>

        {/* Outcomes - left */}
        <rect x="40" y="420" width="110" height="35" rx="4" fill="#67e8f9" stroke="#0369a1" strokeWidth="2" />
        <text x="95" y="442" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">4 hrs near</text>

        {/* Outcomes - right */}
        <rect x="190" y="420" width="110" height="35" rx="4" fill="#67e8f9" stroke="#0369a1" strokeWidth="2" />
        <text x="245" y="442" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">2 hrs near</text>

        {/* Connect down to outcomes */}
        <path d="M 170 405 L 170 420" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead3)" />
      </svg>
    </div>
  );
}

// Irregularity During Decompression
export function IrregularityDuringDecompression() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 320 480" className="w-full h-auto">
        <defs>
          <marker id="arrowhead4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#1f2937" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="55" y="10" width="210" height="40" rx="20" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
        <text x="160" y="35" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Irregularity in decompression</text>

        {/* Arrow */}
        <path d="M 160 50 L 160 75" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead4)" />

        {/* Decision: Oxygen available? */}
        <polygon points="160,75 220,110 160,145 100,110" fill="#60a5fa" stroke="#1e40af" strokeWidth="2" />
        <text x="160" y="110" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">Oxygen</text>
        <text x="160" y="125" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">available?</text>

        {/* NO - Left to Table 3 */}
        <path d="M 100 110 L 50 110 L 50 155" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead4)" />
        <text x="70" y="105" fontSize="10" fontWeight="bold" fill="#1f2937">NO</text>
        <rect x="20" y="155" width="60" height="35" rx="4" fill="#93c5fd" stroke="#1e40af" strokeWidth="2" />
        <text x="50" y="177" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">Table 3</text>

        {/* YES - Down */}
        <path d="M 160 145 L 160 180" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead4)" />
        <text x="175" y="165" fontSize="10" fontWeight="bold" fill="#1f2937">YES</text>

        {/* Table 5 */}
        <rect x="110" y="180" width="100" height="35" rx="4" fill="#93c5fd" stroke="#1e40af" strokeWidth="2" />
        <text x="160" y="202" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">Table 5</text>

        {/* Arrow */}
        <path d="M 160 215 L 160 245" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead4)" />

        {/* Decision: DCS Symptoms? */}
        <polygon points="160,245 220,280 160,315 100,280" fill="#60a5fa" stroke="#1e40af" strokeWidth="2" />
        <text x="160" y="280" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">DCS</text>
        <text x="160" y="295" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">symptoms?</text>

        {/* NO - Right */}
        <path d="M 220 280 L 255 280 L 255 345" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead4)" />
        <text x="240" y="275" fontSize="10" fontWeight="bold" fill="#1f2937">NO</text>

        {/* YES - Down */}
        <path d="M 160 315 L 160 350" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead4)" />
        <text x="175" y="335" fontSize="10" fontWeight="bold" fill="#1f2937">YES</text>

        {/* Table 6 or 4 */}
        <rect x="100" y="350" width="120" height="35" rx="4" fill="#93c5fd" stroke="#1e40af" strokeWidth="2" />
        <text x="160" y="372" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">Table 6 or 4</text>

        {/* Arrow down */}
        <path d="M 160 385 L 160 410" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead4)" />

        {/* Left outcome - 4 hrs */}
        <rect x="50" y="410" width="110" height="35" rx="4" fill="#93c5fd" stroke="#1e40af" strokeWidth="2" />
        <text x="105" y="432" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">4 hrs near</text>

        {/* Right outcome - 2 hrs */}
        <rect x="160" y="410" width="110" height="35" rx="4" fill="#93c5fd" stroke="#1e40af" strokeWidth="2" />
        <text x="215" y="432" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">2 hrs near</text>

        {/* Connect NO down */}
        <path d="M 255 345 L 255 365 L 215 365 L 215 410" stroke="#1f2937" strokeWidth="2" fill="none" markerEnd="url(#arrowhead4)" />
      </svg>
    </div>
  );
}

// Backward compatibility
export const SIL15FlowchartEmergency = CrashDiveProcedure;
export const SOX15FlowchartEmergency1 = OxygenFailureDuringDecompression;
export const NitroxFlowchartEmergency1 = SurfaceDecompressionRequired;
