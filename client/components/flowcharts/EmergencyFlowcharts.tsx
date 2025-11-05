import React, { useEffect } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid with custom theme
mermaid.initialize({ 
  startOnLoad: true, 
  theme: 'default', 
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  flowchart: {
    useMaxWidth: true,
    padding: '40'
  }
});

interface MermaidDiagramProps {
  definition: string;
  id: string;
}

function MermaidDiagram({ definition, id }: MermaidDiagramProps) {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return (
    <div className="w-full overflow-auto p-6">
      <div className="mermaid" id={id} dangerouslySetInnerHTML={{ __html: definition }} />
    </div>
  );
}

// 1. Emergency Procedure Air Table (SIL15)
export function EmergencyProcedureAirTable() {
  const definition = `graph TD
    A["🔴 Dive is interrupted"]
    B{"Repeat interval<br/>>&nbsp;4 hrs?"}
    C["Surface/ox-table"]
    D["Emergency decompression<br/>crash dive procedure"]
    E{"Oxygen<br/>available?"}
    F["From 12 metres<br/>20 min oxygen<br/>5 min air"]
    G["4 hrs near<br/>decompression<br/>chamber<br/>Repeat interval 12 hrs"]
    H["2 hrs near<br/>decompression<br/>chamber<br/>Repeat interval 12 hrs"]
    
    A --> B
    B -->|YES| C
    B -->|NO| D
    D --> E
    E -->|YES| F
    E -->|NO| G
    F --> H
    G --> G
    H --> H
    
    style A fill:#1e40af,stroke:#1e3a8a,stroke-width:3px,color:#fff,font-size:14px,font-weight:bold
    style B fill:#3b82f6,stroke:#1e40af,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style C fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style D fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style E fill:#3b82f6,stroke:#1e40af,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style F fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style G fill:#0891b2,stroke:#0369a1,stroke-width:2px,color:#fff,font-size:12px,font-weight:600
    style H fill:#0891b2,stroke:#0369a1,stroke-width:2px,color:#fff,font-size:12px,font-weight:600`;

  return (
    <div className="w-full p-6 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 rounded-lg overflow-x-auto border border-blue-200">
      <MermaidDiagram definition={definition} id="sil15-emergency-diagram" />
    </div>
  );
}

// 2. Emergency Procedure 1 for Surface/Ox Table (SOX15) - Irregularity in Decompression
export function EmergencyProcedure1SOX15() {
  const definition = `graph TD
    A["🔴 Irregularity in<br/>decompression"]
    B{"Oxygen<br/>available?"}
    C["Treatment table 3"]
    D["Treatment table 5"]
    E{"Symptoms of<br/>Decompression<br/>sickness?"}
    F["Treatment table 6 or 4"]
    G["2 hrs near<br/>decompression<br/>chamber<br/>Repeat interval 12 hrs"]
    H["4 hrs near<br/>decompression<br/>chamber<br/>Repeat interval 12 hrs"]
    
    A --> B
    B -->|NO| C
    B -->|YES| D
    D --> E
    E -->|NO| G
    E -->|YES| F
    F --> H
    C --> H
    
    style A fill:#dc2626,stroke:#991b1b,stroke-width:3px,color:#fff,font-size:14px,font-weight:bold
    style B fill:#f87171,stroke:#dc2626,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style C fill:#ea580c,stroke:#c2410c,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style D fill:#ea580c,stroke:#c2410c,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style E fill:#f87171,stroke:#dc2626,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style F fill:#ea580c,stroke:#c2410c,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style G fill:#d97706,stroke:#b45309,stroke-width:2px,color:#fff,font-size:12px,font-weight:600
    style H fill:#d97706,stroke:#b45309,stroke-width:2px,color:#fff,font-size:12px,font-weight:600`;

  return (
    <div className="w-full p-6 bg-gradient-to-br from-red-50 via-slate-50 to-orange-50 rounded-lg overflow-x-auto border border-red-200">
      <MermaidDiagram definition={definition} id="sox15-emergency-1-diagram" />
    </div>
  );
}

// 3. Emergency Procedure 2 for Surface/Ox Table (SOX15) - Oxygen Failure
export function EmergencyProcedure2SOX15() {
  const definition = `graph TD
    A["🔴 Oxygen failure"]
    B["Surface air table<br/>SAB"]
    C{"Oxygen<br/>restored?"}
    D["From 12 metres<br/>20 min oxygen<br/>5 min air"]
    E{"OTU<br/>>&nbsp;450?"}
    F{"Oxygen intake<br/>>&nbsp;1/3 of deco<br/>time?"}
    G["2 hrs near<br/>decompression<br/>chamber<br/>Repeat interval 12 hrs"]
    H["4 hrs near<br/>decompression<br/>chamber<br/>Repeat interval 12 hrs"]

    A --> B
    B --> C
    C -->|NO| B
    C -->|YES| E
    E -->|YES| H
    E -->|NO| D
    D --> F
    F -->|YES| G
    F -->|NO| H
    B --> H
    
    style A fill:#dc2626,stroke:#991b1b,stroke-width:3px,color:#fff,font-size:14px,font-weight:bold
    style B fill:#ea580c,stroke:#c2410c,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style C fill:#f87171,stroke:#dc2626,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style D fill:#ea580c,stroke:#c2410c,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style E fill:#f87171,stroke:#dc2626,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style F fill:#f87171,stroke:#dc2626,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style G fill:#d97706,stroke:#b45309,stroke-width:2px,color:#fff,font-size:12px,font-weight:600
    style H fill:#d97706,stroke:#b45309,stroke-width:2px,color:#fff,font-size:12px,font-weight:600`;

  return (
    <div className="w-full p-6 bg-gradient-to-br from-orange-50 via-slate-50 to-red-50 rounded-lg overflow-x-auto border border-orange-200">
      <MermaidDiagram definition={definition} id="sox15-emergency-2-diagram" />
    </div>
  );
}

// 4. Emergency Procedure 1 Nitrox Tables - Need for Surface Decompression
export function EmergencyProcedure1NitroxTables() {
  const definition = `graph TD
    A["🔴 Need for surface<br/>decompression"]
    B{"Repeat interval<br/>>&nbsp;4 hrs?"}
    C["Air or surface ox table<br/>Table depth ><br/>equivalent air depth"]
    D["Emergency decompression<br/>crash dive procedure"]
    E{"Oxygen<br/>available?"}
    F{"OTU<br/>>&nbsp;450?"}
    G["Air only"]
    H["From 12 metres<br/>20 min oxygen<br/>5 min air"]
    I["2 hrs near<br/>decompression<br/>chamber<br/>Repeat interval 12 hrs"]
    J["4 hrs near<br/>decompression<br/>chamber<br/>Repeat interval 12 hrs"]
    
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
    
    style A fill:#059669,stroke:#065f46,stroke-width:3px,color:#fff,font-size:14px,font-weight:bold
    style B fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style C fill:#059669,stroke:#047857,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style D fill:#059669,stroke:#047857,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style E fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style F fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style G fill:#047857,stroke:#065f46,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style H fill:#059669,stroke:#047857,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style I fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff,font-size:12px,font-weight:600
    style J fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff,font-size:12px,font-weight:600`;

  return (
    <div className="w-full p-6 bg-gradient-to-br from-emerald-50 via-slate-50 to-green-50 rounded-lg overflow-x-auto border border-emerald-200">
      <MermaidDiagram definition={definition} id="nitrox-emergency-1-diagram" />
    </div>
  );
}

// 5. Emergency Procedure 2 Nitrox Tables - Irregularity in Decompression
export function EmergencyProcedure2NitroxTables() {
  const definition = `graph TD
    A["🔴 Irregularity in<br/>decompression"]
    B{"Oxygen<br/>available?"}
    C["Treatment table 3"]
    D["Treatment table 5"]
    E{"Symptoms of<br/>Decompression<br/>sickness?"}
    F["Treatment table 6 or 4"]
    G["2 hrs near<br/>decompression<br/>chamber<br/>Repeat interval 12 hrs"]
    H["4 hrs near<br/>decompression<br/>chamber<br/>Repeat interval 12 hrs"]
    
    A --> B
    B -->|NO| C
    B -->|YES| D
    D --> E
    E -->|NO| G
    E -->|YES| F
    F --> H
    C --> H
    
    style A fill:#7c3aed,stroke:#6d28d9,stroke-width:3px,color:#fff,font-size:14px,font-weight:bold
    style B fill:#a78bfa,stroke:#7c3aed,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style C fill:#7c3aed,stroke:#6d28d9,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style D fill:#7c3aed,stroke:#6d28d9,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style E fill:#a78bfa,stroke:#7c3aed,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style F fill:#7c3aed,stroke:#6d28d9,stroke-width:2px,color:#fff,font-size:13px,font-weight:600
    style G fill:#6d28d9,stroke:#5b21b6,stroke-width:2px,color:#fff,font-size:12px,font-weight:600
    style H fill:#6d28d9,stroke:#5b21b6,stroke-width:2px,color:#fff,font-size:12px,font-weight:600`;

  return (
    <div className="w-full p-6 bg-gradient-to-br from-violet-50 via-slate-50 to-purple-50 rounded-lg overflow-x-auto border border-violet-200">
      <MermaidDiagram definition={definition} id="nitrox-emergency-2-diagram" />
    </div>
  );
}

// Backward compatibility
export const CrashDiveProcedure = EmergencyProcedureAirTable;
export const OxygenFailureDuringDecompression = EmergencyProcedure2SOX15;
export const SurfaceDecompressionRequired = EmergencyProcedure1NitroxTables;
export const IrregularityDuringDecompression = EmergencyProcedure1SOX15;
