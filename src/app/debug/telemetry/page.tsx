'use client';

import { useApolloClient, useQuery } from '@apollo/client/react';
import type { LineSeriesOption } from 'echarts/charts';
import { LineChart, ScatterChart } from 'echarts/charts';
import {
  AxisPointerComponent,
  GridComponent,
  MarkLineComponent,
  TooltipComponent,
} from 'echarts/components';
import { TitleComponent } from 'echarts/components';
import type { EChartsType } from 'echarts/core';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts/types/dist/shared';
import { GripVertical, Search, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  GET_DEBUG_CIRCUIT_DETAILS,
  GET_DEBUG_DRIVER_LAPS,
  GET_DEBUG_HIERARCHY,
  GET_DEBUG_LAP_TELEMETRY,
  GET_DEBUG_LAP_TELEMETRY_NO_DRS,
  GET_DEBUG_SESSION_DRIVERS,
} from '@/lib/queries';
import { cn } from '@/lib/utils';
import { useECharts } from '@/hooks/use-EChart';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  binaryInterpolate,
  buildLapSamples,
  buildMetricOption,
  buildTrackMapOption,
  CHART_HEIGHT_BY_METRIC,
  CHART_PALETTE,
  CircuitCornerMarker,
  CompareResult,
  createTrackTransform,
  DebugDriverSession,
  DebugLap,
  DebugTelemetryPoint,
  DerivedLapSeries,
  distanceFromAxisPointerEvent,
  DRS_LAST_YEAR,
  formatLapTime,
  lapLabel,
  LapSample,
  makeLapKey,
  METRIC_CONFIGS,
  MetricId,
  SelectedLap,
  TrackCornerLabel,
  transformTrackCoordinate,
  xyAtDistanceOnTrack,
} from './utils';

import { Session_Name_Choices_Enum } from '@/types/graphql';

echarts.use([
  LineChart,
  ScatterChart,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
  MarkLineComponent,
  CanvasRenderer,
  TitleComponent,
]);

function TelemetryChart({
  chartId,
  option,
  height = 210,
  group,
  onInstance,
}: {
  chartId: string;
  option: EChartsOption;
  height?: number;
  group?: string;
  onInstance?: (id: string, instance: EChartsType | null) => void;
}) {
  const domRef = useRef<HTMLDivElement>(null);
  const chartRef = useECharts(domRef);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    if (group) chart.group = group;
    chart.setOption(option, true);
    onInstance?.(chartId, chart);
    return () => {
      onInstance?.(chartId, null);
    };
  }, [chartId, chartRef, group, onInstance, option]);

  return (
    <div ref={domRef} style={{ height }} className='w-full rounded border' />
  );
}

export default function DebugTelemetryPage() {
  const client = useApolloClient();
  const chartGroupRef = useRef(
    `telemetry-group-${Math.random().toString(36).slice(2)}`,
  );
  const [metricChartInstances, setMetricChartInstances] = useState<
    Record<string, EChartsType>
  >({});
  const [trackMapCursor, setTrackMapCursor] = useState<[number, number] | null>(
    null,
  );

  const [selectedDriver, setSelectedDriver] = useState<{
    driverId: string;
    sessionId: string;
  } | null>(null);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedRound, setSelectedRound] = useState<number | null>(null);
  const [selectedSessionName, setSelectedSessionName] =
    useState<Session_Name_Choices_Enum | null>(null);
  const [driverFilter, setDriverFilter] = useState('');
  const [lapFilter, setLapFilter] = useState('');

  const [selectedLaps, setSelectedLaps] = useState<SelectedLap[]>([]);
  const [telemetryByLapKey, setTelemetryByLapKey] = useState<
    Record<string, DebugTelemetryPoint[]>
  >({});
  const [loadingByLapKey, setLoadingByLapKey] = useState<
    Record<string, boolean>
  >({});
  const [errorByLapKey, setErrorByLapKey] = useState<
    Record<string, string | null>
  >({});
  const telemetryByLapKeyRef = useRef<Record<string, DebugTelemetryPoint[]>>(
    {},
  );
  const loadingByLapKeyRef = useRef<Record<string, boolean>>({});
  const errorByLapKeyRef = useRef<Record<string, string | null>>({});
  const selectedLapKeySetRef = useRef<Set<string>>(new Set());
  const activeRequestIdByLapKeyRef = useRef<Record<string, number>>({});

  const [chartOrder, setChartOrder] = useState<MetricId[]>(
    METRIC_CONFIGS.map((metric) => metric.id),
  );
  const [draggingChartId, setDraggingChartId] = useState<MetricId | null>(null);

  const { data: hierarchyData, loading: hierarchyLoading } = useQuery<{
    events: {
      year: number;
      name: string;
      round_number: number;
      sessions: { name: Session_Name_Choices_Enum }[];
    }[];
  }>(GET_DEBUG_HIERARCHY);

  const years = useMemo(
    () =>
      Array.from(new Set(hierarchyData?.events.map((e) => e.year))).sort(
        (a, b) => b - a,
      ),
    [hierarchyData],
  );
  const selectedYearEvents =
    hierarchyData?.events.filter((e) => e.year === selectedYear) ?? [];
  const currentEvent =
    selectedYearEvents.find((e) => e.round_number === selectedRound) ?? null;
  const selectedEventSessions = currentEvent?.sessions ?? [];

  const {
    data: driversData,
    loading: driversLoading,
    error: driversError,
  } = useQuery<{ sessions: { driver_sessions: DebugDriverSession[] }[] }>(
    GET_DEBUG_SESSION_DRIVERS,
    {
      variables: {
        year: selectedYear ?? 0,
        round: selectedRound ?? 0,
        session: selectedSessionName ?? Session_Name_Choices_Enum.Race,
      },
      skip: !selectedYear || !selectedRound || !selectedSessionName,
    },
  );

  const {
    data: lapsData,
    loading: lapsLoading,
    error: lapsError,
  } = useQuery<{ driver_sessions: { laps: DebugLap[] }[] }>(
    GET_DEBUG_DRIVER_LAPS,
    {
      variables: {
        driverId: selectedDriver?.driverId ?? '',
        sessionId: selectedDriver?.sessionId ?? '',
      },
      skip: !selectedDriver,
    },
  );

  const { data: circuitData } = useQuery<{
    circuits: { circuit_details?: unknown | null }[];
  }>(GET_DEBUG_CIRCUIT_DETAILS, {
    variables: {
      year: selectedYear ?? 0,
      round: selectedRound ?? 0,
      session: selectedSessionName ?? Session_Name_Choices_Enum.Race,
    },
    skip: !selectedYear || !selectedRound || !selectedSessionName,
  });

  const session = useMemo(
    () => driversData?.sessions?.[0] ?? null,
    [driversData],
  );
  const drivers = useMemo(() => session?.driver_sessions ?? [], [session]);
  const laps = useMemo(
    () => lapsData?.driver_sessions?.[0]?.laps ?? [],
    [lapsData],
  );

  const filteredDrivers = useMemo(() => {
    const query = driverFilter.trim().toLowerCase();
    if (!query) return drivers;
    return drivers.filter((driverSession) => {
      const abbr = driverSession.driver?.abbreviation?.toLowerCase() ?? '';
      const name = driverSession.driver?.full_name?.toLowerCase() ?? '';
      const number = String(driverSession.driver?.number ?? '');
      return (
        abbr.includes(query) || name.includes(query) || number.includes(query)
      );
    });
  }, [driverFilter, drivers]);

  const filteredLaps = useMemo(() => {
    const query = lapFilter.trim().toLowerCase();
    if (!query) return laps;
    return laps.filter((lap) => {
      const lapNumber = String(lap.lap_number ?? '');
      const lapTime = formatLapTime(lap.lap_time).toLowerCase();
      return lapNumber.includes(query) || lapTime.includes(query);
    });
  }, [lapFilter, laps]);

  const selectedLapKeySet = useMemo(
    () => new Set(selectedLaps.map((lap) => lap.key)),
    [selectedLaps],
  );

  useEffect(() => {
    const selectedKeys = new Set(selectedLaps.map((lap) => lap.key));
    setTelemetryByLapKey((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(([key]) => selectedKeys.has(key)),
      ),
    );
    setLoadingByLapKey((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(([key]) => selectedKeys.has(key)),
      ),
    );
    setErrorByLapKey((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(([key]) => selectedKeys.has(key)),
      ),
    );
  }, [selectedLaps]);

  useEffect(() => {
    telemetryByLapKeyRef.current = telemetryByLapKey;
  }, [telemetryByLapKey]);

  useEffect(() => {
    loadingByLapKeyRef.current = loadingByLapKey;
  }, [loadingByLapKey]);

  useEffect(() => {
    errorByLapKeyRef.current = errorByLapKey;
  }, [errorByLapKey]);

  useEffect(() => {
    selectedLapKeySetRef.current = new Set(selectedLaps.map((lap) => lap.key));
    const pendingLaps = selectedLaps.filter(
      (lap) =>
        !telemetryByLapKeyRef.current[lap.key] &&
        !loadingByLapKeyRef.current[lap.key] &&
        !errorByLapKeyRef.current[lap.key],
    );
    if (pendingLaps.length === 0) return;

    for (const lap of pendingLaps) {
      const nextRequestId =
        (activeRequestIdByLapKeyRef.current[lap.key] ?? 0) + 1;
      activeRequestIdByLapKeyRef.current[lap.key] = nextRequestId;
      setLoadingByLapKey((prev) => ({ ...prev, [lap.key]: true }));
      setErrorByLapKey((prev) => ({ ...prev, [lap.key]: null }));

      client
        .query<{ laps: { telemetries: DebugTelemetryPoint[] }[] }>({
          query:
            lap.year > DRS_LAST_YEAR
              ? GET_DEBUG_LAP_TELEMETRY_NO_DRS
              : GET_DEBUG_LAP_TELEMETRY,
          variables: {
            driverId: lap.driverId,
            sessionId: lap.sessionId,
            lapNumber: lap.lapNumber,
          },
          fetchPolicy: 'cache-first',
        })
        .then((result) => {
          if (activeRequestIdByLapKeyRef.current[lap.key] !== nextRequestId)
            return;
          if (!selectedLapKeySetRef.current.has(lap.key)) return;
          const points = result.data?.laps?.[0]?.telemetries ?? [];
          setTelemetryByLapKey((prev) => ({ ...prev, [lap.key]: points }));
        })
        .catch((error: Error) => {
          if (activeRequestIdByLapKeyRef.current[lap.key] !== nextRequestId)
            return;
          if (!selectedLapKeySetRef.current.has(lap.key)) return;
          setErrorByLapKey((prev) => ({ ...prev, [lap.key]: error.message }));
        })
        .finally(() => {
          if (activeRequestIdByLapKeyRef.current[lap.key] !== nextRequestId)
            return;
          if (!selectedLapKeySetRef.current.has(lap.key)) return;
          setLoadingByLapKey((prev) => ({ ...prev, [lap.key]: false }));
        });
    }
  }, [client, selectedLaps]);

  useEffect(() => {
    const group = chartGroupRef.current;
    const count = Object.keys(metricChartInstances).length;
    if (count > 1) {
      echarts.connect(group);
    }
    return () => {
      echarts.disconnect(group);
    };
  }, [metricChartInstances]);

  const lapColorByKey = useMemo(() => {
    const colorMap: Record<string, string> = {};
    for (let index = 0; index < selectedLaps.length; index += 1) {
      colorMap[selectedLaps[index].key] =
        CHART_PALETTE[index % CHART_PALETTE.length];
    }
    return colorMap;
  }, [selectedLaps]);

  const derivedSeries = useMemo<CompareResult>(() => {
    const lapSeries: DerivedLapSeries[] = selectedLaps
      .map((lap) => ({
        lap,
        samples: buildLapSamples(telemetryByLapKey[lap.key] ?? []),
      }))
      .filter((item) => item.samples.length > 1);

    const emptyResult: CompareResult = {
      baselineKey: null,
      baselineLabel: null,
      xAxis: [],
      seriesByMetric: {
        speed: [],
        throttle: [],
        brake: [],
        rpm: [],
        drs: [],
        gear: [],
        delta: [],
      },
      trackSeries: [],
      baselineTrackSamples: [],
    };
    if (lapSeries.length === 0) return emptyResult;

    const baseline = lapSeries.reduce((best, current) => {
      const bestTime = best.lap.lapTime ?? Number.POSITIVE_INFINITY;
      const currentTime = current.lap.lapTime ?? Number.POSITIVE_INFINITY;
      return currentTime < bestTime ? current : best;
    }, lapSeries[0]);

    const baselineLabel = `${baseline.lap.eventName} · ${lapLabel(baseline.lap)} (${formatLapTime(
      baseline.lap.lapTime,
    )})`;

    const useInterpolation = lapSeries.length > 1;
    const xAxis = useInterpolation
      ? baseline.samples.map((sample) => sample.distance)
      : lapSeries[0].samples.map((sample) => sample.distance);
    const baselineMaxDistance =
      baseline.samples[baseline.samples.length - 1]?.distance ?? 0;

    const mapDistanceByLapProgress = (
      targetDistanceOnBaseline: number,
      lapMaxDistance: number,
    ) => {
      if (
        !useInterpolation ||
        baselineMaxDistance <= 0 ||
        lapMaxDistance <= 0
      ) {
        return targetDistanceOnBaseline;
      }
      const progress = targetDistanceOnBaseline / baselineMaxDistance;
      return progress * lapMaxDistance;
    };

    const createSeriesData = (
      lap: DerivedLapSeries,
      selector: (sample: LapSample) => number,
    ) => {
      if (!useInterpolation) {
        return lap.samples.map(
          (sample) => [sample.distance, selector(sample)] as [number, number],
        );
      }
      const distances = lap.samples.map((sample) => sample.distance);
      const values = lap.samples.map(selector);
      return xAxis.map(
        (distance) =>
          [distance, binaryInterpolate(distances, values, distance)] as [
            number,
            number,
          ],
      );
    };

    const createBinarySeriesData = (
      lap: DerivedLapSeries,
      selector: (sample: LapSample) => number,
    ) => {
      if (!useInterpolation) {
        return lap.samples.map(
          (sample) => [sample.distance, selector(sample)] as [number, number],
        );
      }

      const distances = lap.samples.map((sample) => sample.distance);
      const values = lap.samples.map(selector);
      const lapMaxDistance = distances[distances.length - 1] ?? 0;

      return xAxis.map((distance) => {
        const mappedDistance = mapDistanceByLapProgress(
          distance,
          lapMaxDistance,
        );
        let right = distances.length - 1;
        while (right >= 0 && distances[right] > mappedDistance) {
          right -= 1;
        }
        const heldValue = right >= 0 ? values[right] : (values[0] ?? 0);
        return [distance, heldValue >= 1 ? 1 : 0] as [number, number];
      });
    };

    const elapsedByLapKey = new Map<string, number[]>();
    for (const lap of lapSeries) {
      const rawElapsed = lap.samples.map((sample) => sample.elapsed);
      const rawLapElapsedMs = rawElapsed[rawElapsed.length - 1] ?? 0;
      const officialLapTimeMs = lap.lap.lapTime ?? null;
      if (
        officialLapTimeMs != null &&
        officialLapTimeMs > 0 &&
        rawLapElapsedMs > 0
      ) {
        const scale = officialLapTimeMs / rawLapElapsedMs;
        elapsedByLapKey.set(
          lap.lap.key,
          rawElapsed.map((value) => value * scale),
        );
      } else {
        elapsedByLapKey.set(lap.lap.key, rawElapsed);
      }
    }

    const baselineElapsedDistances = baseline.samples.map(
      (sample) => sample.distance,
    );
    const baselineElapsedValues =
      elapsedByLapKey.get(baseline.lap.key) ??
      baseline.samples.map((sample) => sample.elapsed);

    const seriesByMetric: CompareResult['seriesByMetric'] = {
      speed: [],
      throttle: [],
      brake: [],
      rpm: [],
      drs: [],
      gear: [],
      delta: [],
    };

    for (const lap of lapSeries) {
      const name = lapLabel(lap.lap);
      const color = lapColorByKey[lap.lap.key] ?? '#999999';
      const speed = createSeriesData(lap, (sample) => sample.speed);
      const throttle = createSeriesData(lap, (sample) => sample.throttle);
      const brake = createBinarySeriesData(lap, (sample) => sample.brake);
      const rpm = createSeriesData(lap, (sample) => sample.rpm);
      const drs = createBinarySeriesData(lap, (sample) => sample.drs);
      const gear = createSeriesData(lap, (sample) => sample.gear);
      let delta: [number, number][] = [];

      if (!useInterpolation) {
        delta = xAxis.map((distance) => [distance, 0] as [number, number]);
      } else {
        const distances = lap.samples.map((sample) => sample.distance);
        const elapsedValues =
          elapsedByLapKey.get(lap.lap.key) ??
          lap.samples.map((sample) => sample.elapsed);
        const lapMaxDistance = distances[distances.length - 1] ?? 0;
        delta = xAxis.map((distance) => {
          const mappedDistance = mapDistanceByLapProgress(
            distance,
            lapMaxDistance,
          );
          const lapElapsed = binaryInterpolate(
            distances,
            elapsedValues,
            mappedDistance,
          );
          const baselineElapsed = binaryInterpolate(
            baselineElapsedDistances,
            baselineElapsedValues,
            distance,
          );
          // elapsed is ms from session_time; delta axis is seconds
          return [distance, (lapElapsed - baselineElapsed) / 1000] as [
            number,
            number,
          ];
        });
      }

      seriesByMetric.speed.push({ name, color, data: speed });
      seriesByMetric.throttle.push({ name, color, data: throttle });
      seriesByMetric.brake.push({ name, color, data: brake });
      seriesByMetric.rpm.push({ name, color, data: rpm });
      seriesByMetric.drs.push({ name, color, data: drs });
      seriesByMetric.gear.push({ name, color, data: gear });
      seriesByMetric.delta.push({ name, color, data: delta });
    }

    let trackSeries: LineSeriesOption[] = [];
    const baselineTrack = baseline.samples.filter(
      (sample) => sample.x != null && sample.y != null,
    );

    if (baselineTrack.length > 1) {
      if (!useInterpolation) {
        trackSeries = [
          {
            type: 'line',
            name: lapLabel(baseline.lap),
            showSymbol: false,
            lineStyle: {
              width: 3,
              color: lapColorByKey[baseline.lap.key] ?? '#999999',
            },
            data: baselineTrack.map(
              (sample) => [sample.x ?? 0, sample.y ?? 0] as [number, number],
            ),
          },
        ];
      } else {
        const lapsWithInterpolation = lapSeries.map((lap) => {
          const distances = lap.samples.map((sample) => sample.distance);
          const elapsed =
            elapsedByLapKey.get(lap.lap.key) ??
            lap.samples.map((sample) => sample.elapsed);
          const lapMaxDistance = distances[distances.length - 1] ?? 0;
          return { lap, distances, elapsed, lapMaxDistance };
        });

        const TRACK_SWITCH_TOLERANCE_MS = 2.5;
        const MIN_WINNER_RUN_DISTANCE_M = 45;

        type Segment = {
          winnerKey: string;
          points: [number, number][];
        };
        const rawWinnerKeys: string[] = [];
        const segmentLengths: number[] = [];

        for (let index = 0; index < baselineTrack.length - 1; index += 1) {
          const start = baselineTrack[index];
          const end = baselineTrack[index + 1];
          const timeByLapKey: Record<string, number> = {};
          let bestLapKey = baseline.lap.key;
          let bestTime = Number.POSITIVE_INFINITY;

          for (const item of lapsWithInterpolation) {
            const startDistance = mapDistanceByLapProgress(
              start.distance,
              item.lapMaxDistance,
            );
            const endDistance = mapDistanceByLapProgress(
              end.distance,
              item.lapMaxDistance,
            );
            const t0 = binaryInterpolate(
              item.distances,
              item.elapsed,
              startDistance,
            );
            const t1 = binaryInterpolate(
              item.distances,
              item.elapsed,
              endDistance,
            );
            const segmentTime = t1 - t0;
            timeByLapKey[item.lap.lap.key] = segmentTime;
            if (segmentTime < bestTime) {
              bestTime = segmentTime;
              bestLapKey = item.lap.lap.key;
            }
          }

          const previousWinner = rawWinnerKeys[rawWinnerKeys.length - 1];
          if (previousWinner && previousWinner !== bestLapKey) {
            const previousWinnerTime = timeByLapKey[previousWinner];
            if (
              Number.isFinite(previousWinnerTime) &&
              previousWinnerTime - bestTime <= TRACK_SWITCH_TOLERANCE_MS
            ) {
              bestLapKey = previousWinner;
            }
          }

          rawWinnerKeys.push(bestLapKey);
          segmentLengths.push(Math.max(0, end.distance - start.distance));
        }

        const stabilizedWinnerKeys = [...rawWinnerKeys];
        let runStart = 0;
        while (runStart < stabilizedWinnerKeys.length) {
          let runEnd = runStart + 1;
          while (
            runEnd < stabilizedWinnerKeys.length &&
            stabilizedWinnerKeys[runEnd] === stabilizedWinnerKeys[runStart]
          ) {
            runEnd += 1;
          }

          const runDistance = segmentLengths
            .slice(runStart, runEnd)
            .reduce((sum, value) => sum + value, 0);
          const previousWinner =
            runStart > 0 ? stabilizedWinnerKeys[runStart - 1] : null;
          const nextWinner =
            runEnd < stabilizedWinnerKeys.length
              ? stabilizedWinnerKeys[runEnd]
              : null;

          if (
            runDistance < MIN_WINNER_RUN_DISTANCE_M &&
            previousWinner &&
            nextWinner &&
            previousWinner === nextWinner
          ) {
            for (let i = runStart; i < runEnd; i += 1) {
              stabilizedWinnerKeys[i] = previousWinner;
            }
          }

          runStart = runEnd;
        }

        const segments: Segment[] = [];
        for (let index = 0; index < stabilizedWinnerKeys.length; index += 1) {
          const start = baselineTrack[index];
          const end = baselineTrack[index + 1];
          const winnerKey = stabilizedWinnerKeys[index];
          const linePoints: [number, number][] = [
            [start.x ?? 0, start.y ?? 0],
            [end.x ?? 0, end.y ?? 0],
          ];
          const last = segments[segments.length - 1];
          if (last && last.winnerKey === winnerKey) {
            last.points.push(linePoints[1]);
          } else {
            segments.push({ winnerKey, points: linePoints });
          }
        }

        trackSeries = segments.map((segment, index) => ({
          type: 'line',
          name: lapLabel(
            lapSeries.find((lap) => lap.lap.key === segment.winnerKey)?.lap ??
              baseline.lap,
          ),
          showSymbol: false,
          lineStyle: {
            width: 4,
            color: lapColorByKey[segment.winnerKey] ?? '#777777',
          },
          data: segment.points,
          z: 2 + index,
        }));
      }
    }

    return {
      baselineKey: baseline.lap.key,
      baselineLabel,
      xAxis,
      seriesByMetric,
      trackSeries,
      baselineTrackSamples: baselineTrack,
    };
  }, [lapColorByKey, selectedLaps, telemetryByLapKey]);

  const derivedSeriesRef = useRef(derivedSeries);
  derivedSeriesRef.current = derivedSeries;

  const baselineLapTimeMs = useMemo(() => {
    if (!derivedSeries.baselineKey) return null;
    const baselineLap = selectedLaps.find(
      (lap) => lap.key === derivedSeries.baselineKey,
    );
    return baselineLap?.lapTime ?? null;
  }, [derivedSeries.baselineKey, selectedLaps]);

  const cornerMarkers = useMemo<CircuitCornerMarker[]>(() => {
    const details = circuitData?.circuits?.[0]?.circuit_details as
      | {
          corners?: Array<{
            Number?: number | null;
            Letter?: string | null;
            Distance?: number | null;
          }>;
        }
      | undefined;

    const corners = details?.corners ?? [];
    const markers = corners
      .map((corner) => {
        const distance = Number(corner.Distance);
        if (!Number.isFinite(distance)) return null;
        const number = corner.Number;
        const letter = corner.Letter?.trim();
        const label = `${number ?? ''}${letter ?? ''}`.trim();
        return {
          distance,
          label: label.length > 0 ? label : 'Corner',
        };
      })
      .filter((marker): marker is CircuitCornerMarker => marker !== null)
      .sort((a, b) => a.distance - b.distance);
    return markers;
  }, [circuitData]);

  const trackCornerLabels = useMemo<TrackCornerLabel[]>(() => {
    const labels = cornerMarkers
      .map((corner) => {
        const xy = xyAtDistanceOnTrack(
          derivedSeries.baselineTrackSamples,
          corner.distance,
        );
        if (!xy) return null;
        return { x: xy[0], y: xy[1], label: corner.label };
      })
      .filter((item): item is TrackCornerLabel => item !== null);
    return labels;
  }, [cornerMarkers, derivedSeries.baselineTrackSamples]);

  const trackTransform = useMemo(() => {
    const details = circuitData?.circuits?.[0]?.circuit_details as
      | { rotation?: number | null }
      | undefined;
    const referencePoints = derivedSeries.baselineTrackSamples
      .filter(
        (sample) =>
          sample.x != null &&
          sample.y != null &&
          Number.isFinite(sample.x) &&
          Number.isFinite(sample.y),
      )
      .map(
        (sample) =>
          [sample.x as number, sample.y as number] as [number, number],
      );
    return createTrackTransform(referencePoints, details?.rotation ?? 0);
  }, [circuitData, derivedSeries.baselineTrackSamples]);

  const rotatedTrackSeries = useMemo<LineSeriesOption[]>(() => {
    return derivedSeries.trackSeries.map((series) => {
      const transformedData = (series.data ?? []).map((point) => {
        if (!Array.isArray(point) || point.length < 2)
          return [0, 0] as [number, number];
        const x = Number(point[0]);
        const y = Number(point[1]);
        if (!Number.isFinite(x) || !Number.isFinite(y))
          return [0, 0] as [number, number];
        return transformTrackCoordinate([x, y], trackTransform);
      });
      return {
        ...series,
        data: transformedData,
      };
    });
  }, [derivedSeries.trackSeries, trackTransform]);

  const rotatedTrackCornerLabels = useMemo<TrackCornerLabel[]>(() => {
    return trackCornerLabels.map((corner) => {
      const [x, y] = transformTrackCoordinate(
        [corner.x, corner.y],
        trackTransform,
      );
      return { ...corner, x, y };
    });
  }, [trackCornerLabels, trackTransform]);

  const rotatedTrackMapCursor = useMemo<[number, number] | null>(() => {
    if (!trackMapCursor) return null;
    return transformTrackCoordinate(trackMapCursor, trackTransform);
  }, [trackMapCursor, trackTransform]);

  const metricOptions = useMemo(() => {
    const options: Record<MetricId, EChartsOption> = {
      speed: buildMetricOption({
        title: 'Speed (km/h)',
        series: derivedSeries.seriesByMetric.speed,
        smooth: true,
        valueFormat: 'integer',
        cornerMarkers,
      }),
      throttle: buildMetricOption({
        title: 'Throttle %',
        series: derivedSeries.seriesByMetric.throttle,
        smooth: true,
        yMin: 0,
        yMax: 100,
        valueFormat: 'integer',
        yAxisSplitNumber: 2,
        cornerMarkers,
      }),
      brake: buildMetricOption({
        title: 'Brake (ON/OFF)',
        series: derivedSeries.seriesByMetric.brake,
        step: 'end',
        yMin: 0,
        yMax: 1,
        valueFormat: 'onOff',
        yAxisSplitNumber: 1,
        cornerMarkers,
      }),
      rpm: buildMetricOption({
        title: 'RPM (rpm)',
        series: derivedSeries.seriesByMetric.rpm,
        smooth: true,
        valueFormat: 'integer',
        cornerMarkers,
      }),
      drs: buildMetricOption({
        title: 'DRS (ON/OFF)',
        series: derivedSeries.seriesByMetric.drs,
        step: 'end',
        yMin: 0,
        yMax: 1,
        valueFormat: 'onOff',
        yAxisSplitNumber: 1,
        cornerMarkers,
      }),
      gear: buildMetricOption({
        title: 'Gear',
        series: derivedSeries.seriesByMetric.gear,
        step: 'end',
        valueFormat: 'integer',
        yAxisSplitNumber: 3,
        cornerMarkers,
      }),
      delta: buildMetricOption({
        title: 'Delta (s)',
        series: derivedSeries.seriesByMetric.delta,
        smooth: true,
        valueFormat: 'deltaFloat',
        yAxisSplitNumber: 1,
        cornerMarkers,
      }),
    };
    return options;
  }, [cornerMarkers, derivedSeries.seriesByMetric]);

  const shouldShowDrs = useMemo(() => {
    if (selectedLaps.length > 0) {
      return selectedLaps.some((lap) => lap.year <= DRS_LAST_YEAR);
    }
    if (selectedYear != null) {
      return selectedYear <= DRS_LAST_YEAR;
    }
    return true;
  }, [selectedLaps, selectedYear]);

  const visibleChartOrder = useMemo(
    () => chartOrder.filter((metricId) => metricId !== 'drs' || shouldShowDrs),
    [chartOrder, shouldShowDrs],
  );

  const trackMapOption = useMemo(
    () =>
      buildTrackMapOption(
        rotatedTrackSeries,
        rotatedTrackMapCursor,
        rotatedTrackCornerLabels,
      ),
    [rotatedTrackCornerLabels, rotatedTrackMapCursor, rotatedTrackSeries],
  );

  useEffect(() => {
    const samples = derivedSeries.baselineTrackSamples;
    if (samples.length < 2) {
      setTrackMapCursor(null);
      return;
    }

    const onAxisPointer = (evt: unknown) => {
      const e = evt as { axesInfo?: unknown[] | null };
      if (!e.axesInfo || e.axesInfo.length === 0) {
        setTrackMapCursor(null);
        return;
      }
      const distance = distanceFromAxisPointerEvent(evt);
      if (distance == null) {
        setTrackMapCursor(null);
        return;
      }
      const xy = xyAtDistanceOnTrack(
        derivedSeriesRef.current.baselineTrackSamples,
        distance,
      );
      if (xy) setTrackMapCursor(xy);
    };

    const charts = visibleChartOrder
      .map((id) => metricChartInstances[id])
      .filter(
        (c): c is EChartsType => Boolean(c) && !(c as EChartsType).isDisposed(),
      );

    for (const chart of charts) {
      if (!chart.isDisposed()) {
        chart.on('updateAxisPointer', onAxisPointer);
      }
    }

    return () => {
      for (const chart of charts) {
        if (!chart.isDisposed()) {
          chart.off('updateAxisPointer', onAxisPointer);
        }
      }
    };
  }, [
    derivedSeries.baselineTrackSamples,
    metricChartInstances,
    visibleChartOrder,
  ]);

  const currentContextReady =
    selectedYear != null &&
    selectedRound != null &&
    selectedSessionName != null &&
    selectedDriver != null;

  const addOrRemoveLap = (lap: DebugLap) => {
    if (!currentContextReady || lap.lap_number == null) return;
    const lapNumber = lap.lap_number;
    const driver = drivers.find(
      (d) =>
        d.driver_id === selectedDriver?.driverId &&
        d.session_id === selectedDriver?.sessionId,
    );
    if (!driver || !selectedDriver || !currentEvent || !selectedSessionName)
      return;

    const key = makeLapKey({
      year: selectedYear,
      round: selectedRound,
      sessionName: selectedSessionName,
      driverId: selectedDriver.driverId,
      sessionId: selectedDriver.sessionId,
      lapNumber,
    });

    setSelectedLaps((prev) => {
      if (prev.some((item) => item.key === key)) {
        return prev.filter((item) => item.key !== key);
      }
      return [
        ...prev,
        {
          key,
          year: selectedYear,
          round: selectedRound,
          eventName: currentEvent.name,
          sessionName: selectedSessionName,
          driverId: selectedDriver.driverId,
          sessionId: selectedDriver.sessionId,
          driverAbbr: driver.driver?.abbreviation ?? 'UNK',
          driverNumber: driver.driver?.number ?? null,
          lapNumber,
          lapTime: lap.lap_time ?? null,
        },
      ];
    });
  };

  const selectedCountsByDriverSession = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const lap of selectedLaps) {
      const key = `${lap.driverId}:${lap.sessionId}`;
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return counts;
  }, [selectedLaps]);

  const onChartInstance = useCallback(
    (id: string, instance: EChartsType | null) => {
      setMetricChartInstances((prev) => {
        if (!instance) {
          if (!prev[id]) return prev;
          const next = { ...prev };
          delete next[id];
          return next;
        }
        if (prev[id] === instance) return prev;
        return { ...prev, [id]: instance };
      });
    },
    [],
  );

  const onDropChart = (targetId: MetricId) => {
    if (!draggingChartId || draggingChartId === targetId) return;
    setChartOrder((prev) => {
      const next = [...prev];
      const fromIndex = next.indexOf(draggingChartId);
      const toIndex = next.indexOf(targetId);
      if (fromIndex < 0 || toIndex < 0) return prev;
      next.splice(fromIndex, 1);
      next.splice(toIndex, 0, draggingChartId);
      return next;
    });
    setDraggingChartId(null);
  };

  return (
    <div className='mx-auto w-full max-w-[1200px] space-y-4 px-4 py-4 sm:px-6 lg:px-8'>
      <div>
        <h1 className='text-xl font-semibold'>Debug Telemetry</h1>
        {selectedYear && selectedRound && selectedSessionName ? (
          <p className='text-muted-foreground text-sm'>
            {selectedYear} - Round {selectedRound} (
            {currentEvent?.name ?? 'Unknown Event'}) - {selectedSessionName}
          </p>
        ) : (
          <p className='text-muted-foreground text-sm'>
            Select a session to add laps for comparison.
          </p>
        )}
      </div>

      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
        <Select
          value={selectedYear !== null ? selectedYear.toString() : ''}
          onValueChange={(value) => {
            setSelectedYear(parseInt(value, 10));
            setSelectedRound(null);
            setSelectedSessionName(null);
            setSelectedDriver(null);
          }}
          disabled={hierarchyLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder='Year' />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedRound !== null ? selectedRound.toString() : ''}
          onValueChange={(value) => {
            setSelectedRound(parseInt(value, 10));
            setSelectedSessionName(null);
            setSelectedDriver(null);
          }}
          disabled={!selectedYear}
        >
          <SelectTrigger>
            <SelectValue placeholder='Event' />
          </SelectTrigger>
          <SelectContent>
            {selectedYearEvents.map((event) => (
              <SelectItem
                key={event.round_number}
                value={event.round_number.toString()}
              >
                {event.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedSessionName ?? ''}
          onValueChange={(value) => {
            setSelectedSessionName(value as Session_Name_Choices_Enum);
            setSelectedDriver(null);
          }}
          disabled={!selectedRound}
        >
          <SelectTrigger>
            <SelectValue placeholder='Session' />
          </SelectTrigger>
          <SelectContent>
            {selectedEventSessions.map((sessionItem) => (
              <SelectItem key={sessionItem.name} value={sessionItem.name}>
                {sessionItem.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className='text-muted-foreground flex items-center rounded border px-3 text-sm'>
          Selected laps #:{' '}
          <span className='ml-2 font-semibold'>{selectedLaps.length}</span>
        </div>
      </div>

      <section className='space-y-2 rounded border p-3'>
        <div className='flex items-center justify-between'>
          <h2 className='text-sm font-semibold uppercase'>Tracked Laps</h2>
          {derivedSeries.baselineLabel && (
            <p className='text-muted-foreground text-xs'>
              Baseline: {derivedSeries.baselineLabel}
            </p>
          )}
        </div>
        <div className='grid gap-2 sm:grid-cols-2 xl:grid-cols-3'>
          {selectedLaps.map((lap) => {
            const color = lapColorByKey[lap.key];
            const lapTimeDeltaSec =
              lap.lapTime != null && baselineLapTimeMs != null
                ? (lap.lapTime - baselineLapTimeMs) / 1000
                : null;
            const showDelta =
              lap.key !== derivedSeries.baselineKey &&
              Boolean(derivedSeries.baselineKey) &&
              lapTimeDeltaSec != null;

            return (
              <div key={lap.key} className='rounded border p-2 text-sm'>
                <div className='flex items-start justify-between gap-2'>
                  <div>
                    <p className='text-xs font-medium'>
                      {lap.year} {lap.eventName}
                    </p>
                    <p className='font-semibold' style={{ color }}>
                      {lap.driverAbbr} - Lap {lap.lapNumber}
                    </p>
                    <p className='text-muted-foreground text-xs'>
                      {lap.sessionName}
                    </p>
                  </div>
                  <button
                    type='button'
                    aria-label={`Remove ${lapLabel(lap)}`}
                    className='text-muted-foreground hover:text-foreground'
                    onClick={() =>
                      setSelectedLaps((prev) =>
                        prev.filter((item) => item.key !== lap.key),
                      )
                    }
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className='mt-1 flex items-baseline justify-between gap-2'>
                  <p className='text-lg font-semibold'>
                    {formatLapTime(lap.lapTime)}
                  </p>
                  {showDelta ? (
                    <p className='text-muted-foreground shrink-0 text-xs tabular-nums'>
                      {lapTimeDeltaSec >= 0 ? '+' : ''}
                      {lapTimeDeltaSec.toFixed(3)} s
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
          {selectedLaps.length === 0 && (
            <p className='text-muted-foreground col-span-full text-sm'>
              No laps tracked yet. Pick a session/driver and click laps to add
              them.
            </p>
          )}
        </div>
      </section>

      <div className='grid gap-4 lg:grid-cols-2'>
        <section className='space-y-2 rounded border p-3'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm font-semibold uppercase'>Drivers</h2>
            <span className='text-muted-foreground text-xs'>
              {filteredDrivers.length}
            </span>
          </div>
          <label className='border-input flex items-center gap-2 rounded border px-2 py-1 text-sm'>
            <Search size={14} className='text-muted-foreground' />
            <input
              value={driverFilter}
              onChange={(event) => setDriverFilter(event.target.value)}
              placeholder='Search drivers'
              className='placeholder:text-muted-foreground w-full bg-transparent outline-none'
            />
          </label>
          {driversLoading && (
            <p className='text-muted-foreground text-sm'>Loading drivers...</p>
          )}
          {driversError && (
            <p className='text-sm text-red-500'>
              Failed to load drivers: {driversError.message}
            </p>
          )}
          <div className='max-h-[320px] space-y-1 overflow-auto rounded border p-1'>
            {filteredDrivers.map((driverSession) => {
              const isCurrentDriver =
                selectedDriver?.driverId === driverSession.driver_id &&
                selectedDriver?.sessionId === driverSession.session_id;
              const selectedCount =
                selectedCountsByDriverSession[
                  `${driverSession.driver_id ?? ''}:${driverSession.session_id ?? ''}`
                ] ?? 0;
              return (
                <button
                  key={`${driverSession.driver_id ?? 'unknown'}:${driverSession.session_id ?? 'unknown'}`}
                  type='button'
                  className={cn(
                    'hover:bg-accent flex w-full items-center justify-between rounded px-2 py-1 text-left text-sm',
                    isCurrentDriver && 'bg-accent',
                  )}
                  onClick={() => {
                    const driverId = driverSession.driver_id;
                    const sessionId = driverSession.session_id;
                    if (!driverId || !sessionId) return;
                    setSelectedDriver({ driverId, sessionId });
                  }}
                >
                  <span className='flex items-center gap-2'>
                    <span className='font-semibold'>
                      {driverSession.driver?.abbreviation ?? 'UNK'}
                    </span>
                    <span className='text-muted-foreground text-xs'>
                      #{driverSession.driver?.number ?? '-'}
                    </span>
                    <span className='truncate'>
                      {driverSession.driver?.full_name}
                    </span>
                  </span>
                  {selectedCount > 0 && (
                    <span className='rounded border px-1.5 py-0.5 text-[10px] font-semibold'>
                      {selectedCount} added
                    </span>
                  )}
                </button>
              );
            })}
            {filteredDrivers.length === 0 &&
              !driversLoading &&
              !driversError && (
                <p className='text-muted-foreground p-2 text-sm'>
                  No matching drivers.
                </p>
              )}
          </div>
        </section>

        <section className='space-y-2 rounded border p-3'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm font-semibold uppercase'>Laps</h2>
            <span className='text-muted-foreground text-xs'>
              {filteredLaps.length}
            </span>
          </div>
          <label className='border-input flex items-center gap-2 rounded border px-2 py-1 text-sm'>
            <Search size={14} className='text-muted-foreground' />
            <input
              value={lapFilter}
              onChange={(event) => setLapFilter(event.target.value)}
              placeholder='Filter laps'
              className='placeholder:text-muted-foreground w-full bg-transparent outline-none'
              disabled={!selectedDriver}
            />
          </label>
          {!selectedDriver && (
            <p className='text-muted-foreground text-sm'>
              Select a driver to see laps.
            </p>
          )}
          {lapsLoading && (
            <p className='text-muted-foreground text-sm'>Loading laps...</p>
          )}
          {lapsError && (
            <p className='text-sm text-red-500'>
              Failed to load laps: {lapsError.message}
            </p>
          )}
          <div className='max-h-[320px] space-y-1 overflow-auto rounded border p-1'>
            {filteredLaps.map((lap) => {
              const key =
                currentContextReady && lap.lap_number != null
                  ? makeLapKey({
                      year: selectedYear,
                      round: selectedRound,
                      sessionName: selectedSessionName,
                      driverId: selectedDriver.driverId,
                      sessionId: selectedDriver.sessionId,
                      lapNumber: lap.lap_number,
                    })
                  : null;
              const isSelected = key ? selectedLapKeySet.has(key) : false;
              return (
                <button
                  key={`${lap.lap_number ?? 'unknown'}:${lap.lap_time ?? 'na'}`}
                  type='button'
                  className={cn(
                    'hover:bg-accent flex w-full items-center justify-between rounded px-2 py-1 text-left text-sm',
                    isSelected && 'bg-accent',
                  )}
                  onClick={() => addOrRemoveLap(lap)}
                  disabled={!selectedDriver}
                >
                  <span className='font-semibold'>Lap {lap.lap_number}</span>
                  <span className='flex items-center gap-2'>
                    <span className='text-muted-foreground text-xs'>
                      {formatLapTime(lap.lap_time)}
                    </span>
                    {isSelected && (
                      <span className='rounded border px-1.5 py-0.5 text-[10px] font-semibold'>
                        Added
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
            {filteredLaps.length === 0 &&
              selectedDriver &&
              !lapsLoading &&
              !lapsError && (
                <p className='text-muted-foreground p-2 text-sm'>
                  No matching laps.
                </p>
              )}
          </div>
        </section>
      </div>

      <section className='space-y-2'>
        <h2 className='text-sm font-semibold uppercase'>Telemetry Compare</h2>
        {selectedLaps.some((lap) => loadingByLapKey[lap.key]) && (
          <p className='text-muted-foreground text-sm'>
            Loading telemetry for selected laps...
          </p>
        )}
        {selectedLaps
          .filter((lap) => errorByLapKey[lap.key])
          .map((lap) => (
            <p key={lap.key} className='text-sm text-red-500'>
              {lapLabel(lap)} failed: {errorByLapKey[lap.key]}
            </p>
          ))}

        <div className='grid gap-3'>
          {visibleChartOrder.map((metricId) => {
            const metric = METRIC_CONFIGS.find((item) => item.id === metricId);
            if (!metric) return null;
            return (
              <div
                key={metric.id}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => onDropChart(metric.id)}
                className={cn(
                  'flex items-stretch gap-1 rounded',
                  draggingChartId === metric.id && 'opacity-70',
                )}
              >
                <div
                  draggable
                  onDragStart={() => setDraggingChartId(metric.id)}
                  onDragEnd={() => setDraggingChartId(null)}
                  title='Drag to reorder'
                  aria-label='Drag to reorder'
                  className='text-muted-foreground hover:text-foreground flex shrink-0 cursor-grab items-center self-stretch rounded px-0.5 py-1 active:cursor-grabbing'
                >
                  <GripVertical size={14} />
                </div>
                <div className='min-w-0 flex-1'>
                  <TelemetryChart
                    chartId={metric.id}
                    option={metricOptions[metric.id]}
                    height={CHART_HEIGHT_BY_METRIC[metric.id]}
                    group={chartGroupRef.current}
                    onInstance={onChartInstance}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className='space-y-2'>
        <div className='mx-auto h-[400px] w-full max-w-[400px]'>
          <TelemetryChart
            chartId='track-map'
            option={trackMapOption}
            height={400}
          />
        </div>
      </section>
    </div>
  );
}
