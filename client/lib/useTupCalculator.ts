import { useState, useMemo, useCallback, useEffect } from "react";
import {
  DiveInputs,
  DiveOutputs,
  DecompressionRecord,
  SelfTestResult,
} from "./tupTypes";
import { tupCsvData } from "./tupCsvData";
import {
  parseCSV,
  toRecords,
  round,
  getPO2BgClass,
  nextIMCADeeper,
  IMCA_TUP_LIMITS,
  filterByDepth,
  nextDATADeeper,
  calculateExposure,
  DECOMPRESSION_STOPS,
} from "./tupCalculator";

export const useTupCalculator = () => {
  // All state hooks must be at the top, in the same order every render
  const [inputs, setInputs] = useState<DiveInputs>({
    maxDepth: "",
    o2: "",
    diveTime: "",
  });
  const [outputs, setOutputs] = useState<DiveOutputs>({
    bellDepth: "",
    po2: "",
    dmac: "",
    po2BgClass: "",
    bellmanEsot: "",
    diversEsot: "",
    bellmanOtu: "",
    diversOtu: "",
    tableDepth: "",
  });
  const [filteredRecords, setFilteredRecords] = useState<DecompressionRecord[]>(
    [],
  );
  const [statusMessage, setStatusMessage] = useState("Dataset embedded");
  const [selfTestResult, setSelfTestResult] = useState<SelfTestResult>({
    passed: false,
    message: "Running self-tests…",
  });
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [matchingMessage, setMatchingMessage] = useState<string>("");

  const { allRecords, dataDepths } = useMemo(() => {
    const rows = parseCSV(tupCsvData.trim());
    const records = toRecords(rows);
    const depths = Array.from(
      new Set(
        records
          .map((r) => parseFloat(r["Depth(m/sw)"]))
          .filter((v) => !isNaN(v)),
      ),
    ).sort((a, b) => a - b);
    return { allRecords: records, dataDepths: depths };
  }, []);

  const runSelfTests = useCallback(() => {
    try {
      const sample =
        "Depth(m/sw),BottomTime Min,Time till(1st stop Min)\n9,400,0.9\n15,200,0.6,,,,,,,,,,,,,,41.5,83,146,1\n";
      const parsed = parseCSV(sample);
      if (!(parsed.length >= 2)) throw new Error("CSV parse failed");
      const temp = toRecords(parsed);
      if (!(temp[1] && temp[1]._flag === 1))
        throw new Error("Flag mapping failed");

      const synCSV =
        "Depth(m/sw),BottomTime Min,Time till(1st stop Min)\n18,60,1.5\n19,60,1.3\n36,60,2.1\n";
      const testRecords = toRecords(parseCSV(synCSV));
      const testDepths = [18, 19, 36];

      let t = filterByDepth(18.5, testRecords, testDepths);
      if (!(t.usedDepth === 19 && t.snapped === true))
        throw new Error("18.5→19 dataset snap failed");
      t = filterByDepth(33.4, testRecords, testDepths);
      if (!(t.usedDepth === 36 && t.snapped === true))
        throw new Error("33.4→36 dataset snap failed");
      if (
        !(
          nextIMCADeeper(17) === 18 &&
          nextIMCADeeper(22.1) === 23 &&
          nextIMCADeeper(51) === 51 &&
          nextIMCADeeper(55) === null
        )
      )
        throw new Error("IMCA helper failed");

      setSelfTestResult({ passed: true, message: "Self-tests passed" });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "An unknown error occurred";
      setSelfTestResult({
        passed: false,
        message: `Self-tests failed: ${message}`,
      });
    }
  }, []);

  useEffect(() => {
    runSelfTests();
    setFilteredRecords(allRecords);
    setStatusMessage(`Showing all ${allRecords.length} rows`);
  }, [allRecords, runSelfTests]);

  const compute = useCallback(() => {
    const depth = Number(inputs.maxDepth);
    const o2Pct = Number(inputs.o2);
    const validO2Values = [21, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

    if (
      !Number.isFinite(depth) ||
      depth <= 0 ||
      !Number.isFinite(o2Pct) ||
      !validO2Values.includes(o2Pct)
    ) {
      setOutputs({
        bellDepth: "",
        po2: "",
        dmac: "",
        po2BgClass: "bg-transparent",
        bellmanEsot: "",
        diversEsot: "",
        bellmanOtu: "",
        diversOtu: "",
        tableDepth: "",
      });
      setFilteredRecords(allRecords);
      setStatusMessage(`Showing all ${allRecords.length} rows`);
      setSelectedRowIndex(null);
      return;
    }

    const FO2 = o2Pct / 100;
    const safetyEad =
      o2Pct === 21 ? depth : ((1 - FO2) / 0.775) * (depth + 10) - 10;
    const po2AtDepth = FO2 * (depth / 10 + 1);
    const bellDepth = round(safetyEad, 1);

    const snap = nextIMCADeeper(depth);
    const limit = snap != null ? IMCA_TUP_LIMITS[snap] : null;
    const dmacText = limit ? `${limit} min @ ${snap} msw` : "—";

    const {
      records: rows,
      usedDepth,
      snapped,
    } = filterByDepth(bellDepth, allRecords, dataDepths);
    setFilteredRecords(rows);

    const diveTimeNum = Number(inputs.diveTime);
    let newSelectedRowIndex: number | null = null;
    if (Number.isFinite(diveTimeNum) && diveTimeNum > 0) {
      const foundIndex = rows.findIndex(
        (rec) => Number(rec["BottomTime Min"]) >= diveTimeNum,
      );
      if (foundIndex !== -1) {
        newSelectedRowIndex = foundIndex;
      }
    }
    setSelectedRowIndex(newSelectedRowIndex);

    let bellmanEsot = "";
    let diversEsot = "";
    let bellmanOtu = "";
    let diversOtu = "";

    if (newSelectedRowIndex !== null) {
      const selectedRecord = rows[newSelectedRowIndex];
      let totalBellmanOtu = 0;
      let totalBellmanEsot = 0;
      let totalDiverOtu = 0;
      let totalDiverEsot = 0;

      const bottomTime = Number(selectedRecord["BottomTime Min"]) || 0;
      const timeTillFirstStop =
        Number(selectedRecord["Time till(1st stop Min)"]) || 0;
      const segment1Time = bottomTime + timeTillFirstStop;

      if (segment1Time > 0) {
        const diverExposure = calculateExposure(depth, o2Pct, segment1Time);
        totalDiverOtu += diverExposure.otu;
        totalDiverEsot += diverExposure.esot;
        totalBellmanOtu += diverExposure.otu * 0.7;
        totalBellmanEsot += diverExposure.esot * 0.7;
      }

      for (const stop of DECOMPRESSION_STOPS) {
        const timeAtStop = Number(selectedRecord[stop.column]) || 0;
        if (timeAtStop > 0) {
          const exposure = calculateExposure(stop.depth, stop.o2, timeAtStop);
          totalDiverOtu += exposure.otu;
          totalDiverEsot += exposure.esot;
          totalBellmanOtu += exposure.otu * 0.7;
          totalBellmanEsot += exposure.esot * 0.7;
        }
      }

      bellmanEsot = round(totalBellmanEsot, 1).toString();
      diversEsot = round(totalDiverEsot, 1).toString();
      bellmanOtu = round(totalBellmanOtu, 1).toString();
      diversOtu = round(totalDiverOtu, 1).toString();
    }

    const po2Class = getPO2BgClass(po2AtDepth);
    setOutputs({
      bellDepth: bellDepth,
      po2: round(po2AtDepth, 2),
      dmac: dmacText,
      po2BgClass: po2Class,
      bellmanEsot: bellmanEsot,
      diversEsot: diversEsot,
      bellmanOtu: bellmanOtu,
      diversOtu: diversOtu,
      tableDepth: usedDepth,
    });

    setStatusMessage(
      `Depth ${bellDepth} msw (snapped: ${snapped ? "yes" : "no"}), showing ${rows.length} rows`,
    );
  }, [inputs, allRecords, dataDepths]);

  useEffect(() => {
    setMatchingMessage("");

    const depth = Number(inputs.maxDepth);
    const o2Pct = Number(inputs.o2);
    const validO2Values = [21, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

    if (
      !Number.isFinite(depth) ||
      depth <= 0 ||
      !Number.isFinite(o2Pct) ||
      !validO2Values.includes(o2Pct)
    ) {
      setOutputs({
        bellDepth: "",
        po2: "",
        dmac: "",
        po2BgClass: "bg-transparent",
        bellmanEsot: "",
        diversEsot: "",
        bellmanOtu: "",
        diversOtu: "",
        tableDepth: "",
      });
      setFilteredRecords(allRecords);
      setStatusMessage(`Showing all ${allRecords.length} rows`);
      setSelectedRowIndex(null);
      return;
    }

    const FO2 = o2Pct / 100;
    const safetyEad =
      o2Pct === 21 ? depth : ((1 - FO2) / 0.775) * (depth + 10) - 10;
    const po2AtDepth = FO2 * (depth / 10 + 1);
    const bellDepth = round(safetyEad, 1);

    const snap = nextIMCADeeper(depth);
    const limit = snap != null ? IMCA_TUP_LIMITS[snap] : null;
    const dmacText = limit ? `${limit} min @ ${snap} msw` : "—";

    const {
      records: rows,
      usedDepth,
      snapped,
    } = filterByDepth(bellDepth, allRecords, dataDepths);
    setFilteredRecords(rows);

    const diveTimeNum = Number(inputs.diveTime);
    let newSelectedRowIndex: number | null = null;
    if (Number.isFinite(diveTimeNum) && diveTimeNum > 0) {
      const foundIndex = rows.findIndex(
        (rec) => Number(rec["BottomTime Min"]) >= diveTimeNum,
      );
      if (foundIndex !== -1) {
        newSelectedRowIndex = foundIndex;
      }
    }
    setSelectedRowIndex(newSelectedRowIndex);

    let bellmanEsot = "";
    let diversEsot = "";
    let bellmanOtu = "";
    let diversOtu = "";

    if (newSelectedRowIndex !== null) {
      const selectedRecord = rows[newSelectedRowIndex];
      let totalBellmanOtu = 0;
      let totalBellmanEsot = 0;
      let totalDiverOtu = 0;
      let totalDiverEsot = 0;

      const bottomTime = Number(selectedRecord["BottomTime Min"]) || 0;
      const timeTillFirstStop =
        Number(selectedRecord["Time till(1st stop Min)"]) || 0;
      const segment1Time = bottomTime + timeTillFirstStop;

      if (segment1Time > 0) {
        const diverExposure = calculateExposure(depth, o2Pct, segment1Time);
        totalDiverOtu += diverExposure.otu;
        totalDiverEsot += diverExposure.esot;
        totalBellmanOtu += diverExposure.otu * 0.7;
        totalBellmanEsot += diverExposure.esot * 0.7;
      }

      for (const stop of DECOMPRESSION_STOPS) {
        const timeAtStop = Number(selectedRecord[stop.column]) || 0;
        if (timeAtStop > 0) {
          const exposure = calculateExposure(stop.depth, stop.o2, timeAtStop);
          totalDiverOtu += exposure.otu;
          totalDiverEsot += exposure.esot;
          totalBellmanOtu += exposure.otu * 0.7;
          totalBellmanEsot += exposure.esot * 0.7;
        }
      }

      bellmanEsot = round(totalBellmanEsot, 1).toString();
      diversEsot = round(totalDiverEsot, 1).toString();
      bellmanOtu = round(totalBellmanOtu, 1).toString();
      diversOtu = round(totalDiverOtu, 1).toString();
    }

    const po2Class = getPO2BgClass(po2AtDepth);
    setOutputs({
      bellDepth: bellDepth,
      po2: round(po2AtDepth, 2),
      dmac: dmacText,
      po2BgClass: po2Class,
      bellmanEsot: bellmanEsot,
      diversEsot: diversEsot,
      bellmanOtu: bellmanOtu,
      diversOtu: diversOtu,
      tableDepth: usedDepth,
    });

    setStatusMessage(
      `Depth ${bellDepth} msw (snapped: ${snapped ? "yes" : "no"}), showing ${rows.length} rows`,
    );
  }, [inputs, allRecords, dataDepths]);

  return {
    inputs,
    setInputs,
    outputs,
    filteredRecords,
    statusMessage,
    selfTestResult,
    selectedRowIndex,
    setSelectedRowIndex,
    matchingMessage,
    setMatchingMessage,
  };
};
