// Crash Dive Procedure - Based on PDF
export function CrashDiveProcedure() {
  return (
    <div className="w-full overflow-auto bg-white p-4">
      <svg viewBox="0 0 500 700" className="mx-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .rounded-box { fill: #0ea5e9; stroke: #0369a1; stroke-width: 2; }
            .diamond { fill: #06b6d4; stroke: #0369a1; stroke-width: 2; }
            .rect { fill: #0284c7; stroke: #0369a1; stroke-width: 2; }
            .text-white { fill: white; font-size: 12px; font-weight: bold; text-anchor: middle; }
            .text-dark { fill: #1f2937; font-size: 11px; font-weight: bold; }
            .arrow { stroke: #1f2937; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
          `}</style>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#1f2937" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="150" y="20" width="200" height="60" rx="30" className="rounded-box" />
        <text x="250" y="55" className="text-white">Dive is interrupted</text>

        {/* Arrow down */}
        <path d="M 250 80 L 250 130" className="arrow" />

        {/* Decision Diamond */}
        <polygon points="250,130 350,190 250,250 150,190" className="diamond" />
        <text x="250" y="185" className="text-white">Repeat interval</text>
        <text x="250" y="205" className="text-white">&gt; 4 hrs?</text>

        {/* YES arrow right */}
        <path d="M 350 190 L 420 190" className="arrow" />
        <text x="380" y="180" className="text-dark">YES</text>
        <rect x="420" y="160" width="60" height="60" rx="5" className="rect" />
        <text x="450" y="190" className="text-white">Surface/</text>
        <text x="450" y="205" className="text-white">ox-table</text>

        {/* NO arrow down */}
        <path d="M 250 250 L 250 310" className="arrow" />
        <text x="270" y="285" className="text-dark">NO</text>

        {/* Emergency decompression box */}
        <rect x="50" y="310" width="400" height="60" rx="5" className="rect" />
        <text x="250" y="340" className="text-white">Emergency decompression crash dive</text>
        <text x="250" y="360" className="text-white">procedure (§ 9.3)</text>

        {/* Arrow down */}
        <path d="M 250 370 L 250 420" className="arrow" />

        {/* Decision Diamond */}
        <polygon points="250,420 350,480 250,540 150,480" className="diamond" />
        <text x="250" y="480" className="text-white">Oxygen</text>
        <text x="250" y="500" className="text-white">available?</text>

        {/* YES arrow right */}
        <path d="M 350 480 L 420 480" className="arrow" />
        <text x="380" y="470" className="text-dark">YES</text>
        <rect x="420" y="450" width="60" height="60" rx="5" className="rect" />
        <text x="450" y="480" className="text-white">From 12m</text>
        <text x="450" y="495" className="text-white">20min O₂</text>

        {/* NO arrow down */}
        <path d="M 250 540 L 250 600" className="arrow" />
        <text x="270" y="575" className="text-dark">NO</text>

        {/* Bottom outcomes */}
        <rect x="70" y="600" width="140" height="80" rx="5" className="rect" />
        <text x="140" y="625" className="text-white">4 hrs near</text>
        <text x="140" y="645" className="text-white">decompression</text>
        <text x="140" y="665" className="text-white">chamber</text>

        <rect x="290" y="600" width="140" height="80" rx="5" className="rect" />
        <text x="360" y="625" className="text-white">2 hrs near</text>
        <text x="360" y="645" className="text-white">decompression</text>
        <text x="360" y="665" className="text-white">chamber</text>

        {/* Connect YES outcome down */}
        <path d="M 450 510 L 450 550 L 360 550 L 360 600" className="arrow" />
      </svg>
    </div>
  );
}

// Oxygen Failure During Decompression - Based on PDF
export function OxygenFailureDuringDecompression() {
  return (
    <div className="w-full overflow-auto bg-white p-4">
      <svg viewBox="0 0 500 800" className="mx-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .rounded-box { fill: #f97316; stroke: #c2410c; stroke-width: 2; }
            .diamond { fill: #fb923c; stroke: #c2410c; stroke-width: 2; }
            .rect { fill: #fdba74; stroke: #c2410c; stroke-width: 2; }
            .text-white { fill: white; font-size: 12px; font-weight: bold; text-anchor: middle; }
            .text-dark { fill: #1f2937; font-size: 11px; font-weight: bold; }
            .arrow { stroke: #1f2937; stroke-width: 2; fill: none; marker-end: url(#arrowhead2); }
          `}</style>
          <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#1f2937" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="140" y="20" width="220" height="60" rx="30" className="rounded-box" />
        <text x="250" y="55" className="text-white">Oxygen failure</text>

        {/* Arrow down */}
        <path d="M 250 80 L 250 130" className="arrow" />

        {/* Surface air table */}
        <rect x="100" y="130" width="300" height="50" rx="5" className="rect" />
        <text x="250" y="160" className="text-white">Surface air table (SAB)</text>

        {/* Arrow down */}
        <path d="M 250 180 L 250 230" className="arrow" />

        {/* Decision Diamond - Oxygen restored? */}
        <polygon points="250,230 350,290 250,350 150,290" className="diamond" />
        <text x="250" y="295" className="text-white">Oxygen</text>
        <text x="250" y="315" className="text-white">restored?</text>

        {/* NO loop back */}
        <path d="M 150 290 L 80 290 L 80 155 L 100 155" className="arrow" />
        <text x="100" y="280" className="text-dark">NO</text>

        {/* YES arrow down */}
        <path d="M 250 350 L 250 400" className="arrow" />
        <text x="270" y="380" className="text-dark">YES</text>

        {/* From 12 metres 20 min oxygen */}
        <rect x="70" y="400" width="360" height="50" rx="5" className="rect" />
        <text x="250" y="430" className="text-white">From 12 metres 20 min. oxygen and 5 min. air</text>

        {/* Arrow down */}
        <path d="M 250 450 L 250 500" className="arrow" />

        {/* Decision Diamond - OTU > 450? */}
        <polygon points="250,500 350,560 250,620 150,560" className="diamond" />
        <text x="250" y="560" className="text-white">OTU</text>
        <text x="250" y="580" className="text-white">&gt; 450?</text>

        {/* NO loop back to oxygen */}
        <path d="M 150 560 L 80 560 L 80 425 L 70 425" className="arrow" />
        <text x="100" y="550" className="text-dark">NO</text>

        {/* YES arrow down */}
        <path d="M 250 620 L 250 670" className="arrow" />
        <text x="270" y="650" className="text-dark">YES</text>

        {/* Decision Diamond - Oxygen intake > 1/3? */}
        <polygon points="250,670 350,730 250,790 150,730" className="diamond" />
        <text x="250" y="730" className="text-white">O₂ intake</text>
        <text x="250" y="750" className="text-white">&gt; 1/3?</text>

        {/* NO outcome - 4 hrs */}
        <path d="M 150 730 L 80 730 L 80 660" className="arrow" />
        <text x="100" y="720" className="text-dark">NO</text>
        <rect x="20" y="660" width="120" height="80" rx="5" className="rect" />
        <text x="80" y="690" className="text-white">4 hrs near</text>
        <text x="80" y="710" className="text-white">decompression</text>
        <text x="80" y="730" className="text-white">chamber</text>

        {/* YES outcome - 2 hrs */}
        <path d="M 350 730 L 420 730 L 420 660" className="arrow" />
        <text x="380" y="720" className="text-dark">YES</text>
        <rect x="360" y="660" width="120" height="80" rx="5" className="rect" />
        <text x="420" y="690" className="text-white">2 hrs near</text>
        <text x="420" y="710" className="text-white">decompression</text>
        <text x="420" y="730" className="text-white">chamber</text>
      </svg>
    </div>
  );
}

// Surface Decompression Required - Based on PDF
export function SurfaceDecompressionRequired() {
  return (
    <div className="w-full overflow-auto bg-white p-4">
      <svg viewBox="0 0 500 800" className="mx-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .rounded-box { fill: #06b6d4; stroke: #0369a1; stroke-width: 2; }
            .diamond { fill: #22d3ee; stroke: #0369a1; stroke-width: 2; }
            .rect { fill: #67e8f9; stroke: #0369a1; stroke-width: 2; }
            .text-white { fill: white; font-size: 12px; font-weight: bold; text-anchor: middle; }
            .text-dark { fill: #1f2937; font-size: 11px; font-weight: bold; }
            .arrow { stroke: #1f2937; stroke-width: 2; fill: none; marker-end: url(#arrowhead3); }
          `}</style>
          <marker id="arrowhead3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#1f2937" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="100" y="20" width="300" height="60" rx="30" className="rounded-box" />
        <text x="250" y="55" className="text-white">Need for surface decompression</text>

        {/* Arrow down */}
        <path d="M 250 80 L 250 130" className="arrow" />

        {/* Decision Diamond */}
        <polygon points="250,130 350,190 250,250 150,190" className="diamond" />
        <text x="250" y="185" className="text-white">Repeat interval</text>
        <text x="250" y="205" className="text-white">&gt; 4 hrs?</text>

        {/* YES arrow right */}
        <path d="M 350 190 L 420 190" className="arrow" />
        <text x="380" y="180" className="text-dark">YES</text>
        <rect x="420" y="160" width="70" height="60" rx="5" className="rect" />
        <text x="455" y="190" className="text-white">Air or surface</text>
        <text x="455" y="210" className="text-white">ox table</text>

        {/* NO arrow down */}
        <path d="M 250 250 L 250 310" className="arrow" />
        <text x="270" y="285" className="text-dark">NO</text>

        {/* Emergency decompression */}
        <rect x="30" y="310" width="440" height="60" rx="5" className="rect" />
        <text x="250" y="335" className="text-white">Emergency decompression crash dive</text>
        <text x="250" y="355" className="text-white">procedure</text>

        {/* Arrow down */}
        <path d="M 250 370 L 250 420" className="arrow" />

        {/* Decision Diamond */}
        <polygon points="250,420 350,480 250,540 150,480" className="diamond" />
        <text x="250" y="485" className="text-white">Oxygen</text>
        <text x="250" y="505" className="text-white">available?</text>

        {/* YES arrow right */}
        <path d="M 350 480 L 420 480" className="arrow" />
        <text x="380" y="470" className="text-dark">YES</text>

        {/* Decision Diamond - OTU */}
        <polygon points="420,465 490,520 420,575 350,520" className="diamond" />
        <text x="420" y="520" className="text-white">OTU</text>
        <text x="420" y="540" className="text-white">&gt;450?</text>

        {/* YES - Air only */}
        <path d="M 490 520 L 430 625" className="arrow" />
        <text x="470" y="570" className="text-dark">YES</text>
        <rect x="370" y="625" width="120" height="50" rx="5" className="rect" />
        <text x="430" y="655" className="text-white">Air only</text>

        {/* NO - Continue down */}
        <path d="M 250 540 L 250 625" className="arrow" />
        <text x="270" y="580" className="text-dark">NO</text>
        <rect x="170" y="625" width="160" height="50" rx="5" className="rect" />
        <text x="250" y="655" className="text-white">20min O₂, 5min air</text>

        {/* Final outcomes */}
        <rect x="50" y="700" width="140" height="80" rx="5" className="rect" />
        <text x="120" y="730" className="text-white">4 hrs near</text>
        <text x="120" y="750" className="text-white">decompression</text>
        <text x="120" y="770" className="text-white">chamber</text>

        <rect x="310" y="700" width="140" height="80" rx="5" className="rect" />
        <text x="380" y="730" className="text-white">2 hrs near</text>
        <text x="380" y="750" className="text-white">decompression</text>
        <text x="380" y="770" className="text-white">chamber</text>

        {/* Connect to outcomes */}
        <path d="M 250 675 L 250 700" className="arrow" />
        <path d="M 430 675 L 380 700" className="arrow" />
      </svg>
    </div>
  );
}

// Irregularity During Decompression - Based on PDF
export function IrregularityDuringDecompression() {
  return (
    <div className="w-full overflow-auto bg-white p-4">
      <svg viewBox="0 0 500 800" className="mx-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>{`
            .rounded-box { fill: #3b82f6; stroke: #1e40af; stroke-width: 2; }
            .diamond { fill: #60a5fa; stroke: #1e40af; stroke-width: 2; }
            .rect { fill: #93c5fd; stroke: #1e40af; stroke-width: 2; }
            .text-white { fill: white; font-size: 12px; font-weight: bold; text-anchor: middle; }
            .text-dark { fill: #1f2937; font-size: 11px; font-weight: bold; }
            .arrow { stroke: #1f2937; stroke-width: 2; fill: none; marker-end: url(#arrowhead4); }
          `}</style>
          <marker id="arrowhead4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#1f2937" />
          </marker>
        </defs>

        {/* Start */}
        <rect x="110" y="20" width="280" height="60" rx="30" className="rounded-box" />
        <text x="250" y="55" className="text-white">Irregularity in decompression</text>

        {/* Arrow down */}
        <path d="M 250 80 L 250 130" className="arrow" />

        {/* Decision Diamond */}
        <polygon points="250,130 350,190 250,250 150,190" className="diamond" />
        <text x="250" y="195" className="text-white">Oxygen</text>
        <text x="250" y="215" className="text-white">available?</text>

        {/* NO arrow left */}
        <path d="M 150 190 L 70 190" className="arrow" />
        <text x="100" y="180" className="text-dark">NO</text>
        <rect x="20" y="160" width="100" height="60" rx="5" className="rect" />
        <text x="70" y="195" className="text-white">Treatment</text>
        <text x="70" y="215" className="text-white">table 3</text>

        {/* YES arrow down */}
        <path d="M 250 250 L 250 310" className="arrow" />
        <text x="270" y="285" className="text-dark">YES</text>

        {/* Treatment table 5 */}
        <rect x="150" y="310" width="200" height="50" rx="5" className="rect" />
        <text x="250" y="340" className="text-white">Treatment table 5</text>

        {/* Arrow down */}
        <path d="M 250 360 L 250 410" className="arrow" />

        {/* Decision Diamond - DCS Symptoms */}
        <polygon points="250,410 350,470 250,530 150,470" className="diamond" />
        <text x="250" y="470" className="text-white">Symptoms of</text>
        <text x="250" y="490" className="text-white">DCS?</text>

        {/* NO arrow right */}
        <path d="M 350 470 L 420 470 L 420 570" className="arrow" />
        <text x="380" y="460" className="text-dark">NO</text>

        {/* YES arrow down */}
        <path d="M 250 530 L 250 580" className="arrow" />
        <text x="270" y="560" className="text-dark">YES</text>

        {/* Treatment table 6 or 4 */}
        <rect x="130" y="580" width="240" height="50" rx="5" className="rect" />
        <text x="250" y="610" className="text-white">Treatment table 6 or 4</text>

        {/* Arrow down */}
        <path d="M 250 630 L 250 680" className="arrow" />

        {/* Final outcomes */}
        <rect x="70" y="680" width="140" height="80" rx="5" className="rect" />
        <text x="140" y="710" className="text-white">4 hrs near</text>
        <text x="140" y="730" className="text-white">decompression</text>
        <text x="140" y="750" className="text-white">chamber</text>

        <rect x="290" y="680" width="140" height="80" rx="5" className="rect" />
        <text x="360" y="710" className="text-white">2 hrs near</text>
        <text x="360" y="730" className="text-white">decompression</text>
        <text x="360" y="750" className="text-white">chamber</text>

        {/* Connect NO path down */}
        <path d="M 420 570 L 420 650 L 360 650 L 360 680" className="arrow" />
      </svg>
    </div>
  );
}

// Backward compatibility - export with old names
export const SIL15FlowchartEmergency = CrashDiveProcedure;
export const SOX15FlowchartEmergency1 = OxygenFailureDuringDecompression;
export const NitroxFlowchartEmergency1 = SurfaceDecompressionRequired;
