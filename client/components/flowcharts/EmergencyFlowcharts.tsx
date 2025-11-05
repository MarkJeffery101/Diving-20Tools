import React from 'react';

// 1. Emergency Procedure Air Table (SIL15)
export function EmergencyProcedureAirTable() {
  return (
    <div
      className="w-full rounded-lg"
      style={{
        backgroundImage: 'url("https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2F786bc075ca0445d4b902e3ac2eefb7dc?format=webp&width=1400")',
        backgroundSize: 'contain',
        backgroundPosition: '50% 30px',
        backgroundRepeat: 'no-repeat',
        height: '480px',
        overflow: 'hidden'
      }}
    />
  );
}

// 2. Emergency Procedure 1 for Surface/Ox Table (SOX15) - Irregularity in Decompression
export function EmergencyProcedure1SOX15() {
  return (
    <div
      className="w-full rounded-lg"
      style={{
        backgroundImage: 'url("https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2F4218098246674be3b9464e90a4219161?format=webp&width=1400")',
        backgroundSize: 'contain',
        backgroundPosition: '50% 35px',
        backgroundRepeat: 'no-repeat',
        height: '520px',
        overflow: 'hidden'
      }}
    />
  );
}

// 3. Emergency Procedure 2 for Surface/Ox Table (SOX15) - Oxygen Failure
export function EmergencyProcedure2SOX15() {
  return (
    <div
      className="w-full rounded-lg"
      style={{
        backgroundImage: 'url("https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2F8cfb14cf160640bd83fc4aaa8d04e8bb?format=webp&width=1400")',
        backgroundSize: 'contain',
        backgroundPosition: '50% 35px',
        backgroundRepeat: 'no-repeat',
        height: '570px',
        overflow: 'hidden'
      }}
    />
  );
}

// 4. Emergency Procedure 1 Nitrox Tables - Need for Surface Decompression
export function EmergencyProcedure1NitroxTables() {
  return (
    <div
      className="w-full rounded-lg"
      style={{
        backgroundImage: 'url("https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2F086c02daa6644349a131ec40ad54849b?format=webp&width=1400")',
        backgroundSize: 'contain',
        backgroundPosition: '50% 35px',
        backgroundRepeat: 'no-repeat',
        height: '570px',
        overflow: 'hidden'
      }}
    />
  );
}

// 5. Emergency Procedure 2 Nitrox Tables - Irregularity in Decompression
export function EmergencyProcedure2NitroxTables() {
  return (
    <div
      className="w-full rounded-lg"
      style={{
        backgroundImage: 'url("https://cdn.builder.io/api/v1/image/assets%2Fab9db6a681044b748ef518df8cd48de8%2Fd767cdc30d3b4b9782372e85acb24477?format=webp&width=1400")',
        backgroundSize: 'contain',
        backgroundPosition: '50% 35px',
        backgroundRepeat: 'no-repeat',
        height: '520px',
        overflow: 'hidden'
      }}
    />
  );
}

// Backward compatibility
export const CrashDiveProcedure = EmergencyProcedureAirTable;
export const OxygenFailureDuringDecompression = EmergencyProcedure2SOX15;
export const SurfaceDecompressionRequired = EmergencyProcedure1NitroxTables;
export const IrregularityDuringDecompression = EmergencyProcedure1SOX15;
