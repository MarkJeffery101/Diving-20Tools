import { useEffect } from 'react';
import React, { useEffect } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid
mermaid.initialize({ startOnLoad: true, theme: 'default', securityLevel: 'loose' });

interface MermaidDiagramProps {
  definition: string;
  id: string;
}

function MermaidDiagram({ definition, id }: MermaidDiagramProps) {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return (
    <div className="w-full overflow-auto p-4">
      <div className="mermaid" id={id} dangerouslySetInnerHTML={{ __html: definition }} />
    </div>
  );
}

// Crash Dive Procedure
export function CrashDiveProcedure() {
  const definition = `graph TD
    A["🔴 Dive is interrupted"]
    B{"Repeat interval<br/>>&nbsp;4 hrs?"}
    C["Surface/ox-table"]
    D["Emergency decompression<br/>crash dive procedure"]
    E{"Oxygen<br/>available?"}
    F["From 12m<br/>20min O₂ 5min air"]
    G["4 hrs near<br/>decompression<br/>chamber"]
    H["2 hrs near<br/>decompression<br/>chamber"]
    
    A --> B
    B -->|YES| C
    B -->|NO| D
    D --> E
    E -->|YES| F
    E -->|NO| G
    F --> H
    
    style A fill:#0ea5e9,stroke:#0369a1,stroke-width:2px,color:#fff
    style B fill:#06b6d4,stroke:#0369a1,stroke-width:2px,color:#fff
    style C fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#fff
    style D fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#fff
    style E fill:#06b6d4,stroke:#0369a1,stroke-width:2px,color:#fff
    style F fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#fff
    style G fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#fff
    style H fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#fff`;

  return (
    <div className="w-full p-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg overflow-x-auto">
      <MermaidDiagram definition={definition} id="crash-dive-diagram" />
    </div>
  );
}

// Oxygen Failure During Decompression
export function OxygenFailureDuringDecompression() {
  const definition = `graph TD
    A["🔴 Oxygen failure"]
    B["Surface air table SAB"]
    C{"Oxygen<br/>restored?"}
    D["From 12m<br/>20min O₂ 5min air"]
    E{"OTU<br/>>&nbsp;450?"}
    F{"O₂ intake<br/>>&nbsp;1/3 deco?"}
    G["4 hrs near<br/>decompression<br/>chamber"]
    H["2 hrs near<br/>decompression<br/>chamber"]

    A --> B
    B --> C
    C -->|NO| B
    C -->|YES| E
    E -->|NO| D
    E -->|YES| G
    D --> F
    D --> E
    F -->|NO| G
    F -->|YES| H
    B --> G
    
    style A fill:#f97316,stroke:#c2410c,stroke-width:2px,color:#fff
    style B fill:#fdba74,stroke:#c2410c,stroke-width:2px,color:#fff
    style C fill:#fb923c,stroke:#c2410c,stroke-width:2px,color:#fff
    style D fill:#fdba74,stroke:#c2410c,stroke-width:2px,color:#fff
    style E fill:#fb923c,stroke:#c2410c,stroke-width:2px,color:#fff
    style F fill:#fb923c,stroke:#c2410c,stroke-width:2px,color:#fff
    style G fill:#fdba74,stroke:#c2410c,stroke-width:2px,color:#fff
    style H fill:#fdba74,stroke:#c2410c,stroke-width:2px,color:#fff`;

  return (
    <div className="w-full p-4 bg-gradient-to-br from-orange-50 to-slate-50 rounded-lg overflow-x-auto">
      <MermaidDiagram definition={definition} id="oxygen-failure-diagram" />
    </div>
  );
}

// Surface Decompression Required
export function SurfaceDecompressionRequired() {
  const definition = `graph TD
    A["🔴 Need for surface decompression"]
    B{"Repeat interval<br/>>&nbsp;4 hrs?"}
    C["Air or surface<br/>ox table"]
    D["Emergency decompression<br/>crash dive procedure"]
    E{"Oxygen<br/>available?"}
    F{"OTU<br/>>&nbsp;450?"}
    G["Air only"]
    H["From 12m<br/>20min O₂ 5min air"]
    I["2 hrs near<br/>decompression<br/>chamber"]
    J["4 hrs near<br/>decompression<br/>chamber"]
    
    A --> B
    B -->|YES| C
    B -->|NO| D
    D --> E
    E -->|YES| F
    E -->|NO| I
    F -->|YES| G
    F -->|NO| H
    G --> J
    H --> I
    
    style A fill:#06b6d4,stroke:#0369a1,stroke-width:2px,color:#fff
    style B fill:#22d3ee,stroke:#0369a1,stroke-width:2px,color:#fff
    style C fill:#67e8f9,stroke:#0369a1,stroke-width:2px,color:#fff
    style D fill:#67e8f9,stroke:#0369a1,stroke-width:2px,color:#fff
    style E fill:#22d3ee,stroke:#0369a1,stroke-width:2px,color:#fff
    style F fill:#22d3ee,stroke:#0369a1,stroke-width:2px,color:#fff
    style G fill:#67e8f9,stroke:#0369a1,stroke-width:2px,color:#fff
    style H fill:#67e8f9,stroke:#0369a1,stroke-width:2px,color:#fff
    style I fill:#67e8f9,stroke:#0369a1,stroke-width:2px,color:#fff
    style J fill:#67e8f9,stroke:#0369a1,stroke-width:2px,color:#fff`;

  return (
    <div className="w-full p-4 bg-gradient-to-br from-cyan-50 to-slate-50 rounded-lg overflow-x-auto">
      <MermaidDiagram definition={definition} id="surface-decompression-diagram" />
    </div>
  );
}

// Irregularity During Decompression
export function IrregularityDuringDecompression() {
  const definition = `graph TD
    A["���� Irregularity in decompression"]
    B{"Oxygen<br/>available?"}
    C["Treatment table 3"]
    D["Treatment table 5"]
    E{"DCS<br/>symptoms?"}
    F["Treatment table 6 or 4"]
    G["2 hrs near<br/>decompression<br/>chamber"]
    H["4 hrs near<br/>decompression<br/>chamber"]
    
    A --> B
    B -->|NO| C
    B -->|YES| D
    D --> E
    E -->|NO| G
    E -->|YES| F
    F --> H
    C --> H
    
    style A fill:#3b82f6,stroke:#1e40af,stroke-width:2px,color:#fff
    style B fill:#60a5fa,stroke:#1e40af,stroke-width:2px,color:#fff
    style C fill:#93c5fd,stroke:#1e40af,stroke-width:2px,color:#fff
    style D fill:#93c5fd,stroke:#1e40af,stroke-width:2px,color:#fff
    style E fill:#60a5fa,stroke:#1e40af,stroke-width:2px,color:#fff
    style F fill:#93c5fd,stroke:#1e40af,stroke-width:2px,color:#fff
    style G fill:#93c5fd,stroke:#1e40af,stroke-width:2px,color:#fff
    style H fill:#93c5fd,stroke:#1e40af,stroke-width:2px,color:#fff`;

  return (
    <div className="w-full p-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg overflow-x-auto">
      <MermaidDiagram definition={definition} id="irregularity-decompression-diagram" />
    </div>
  );
}

// Backward compatibility
export const SIL15FlowchartEmergency = CrashDiveProcedure;
export const SOX15FlowchartEmergency1 = OxygenFailureDuringDecompression;
export const NitroxFlowchartEmergency1 = SurfaceDecompressionRequired;
