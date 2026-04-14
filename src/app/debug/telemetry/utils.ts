import type { LineSeriesOption, ScatterSeriesOption } from 'echarts/charts';
import type { EChartsOption } from 'echarts/types/dist/shared';

import { Session_Name_Choices_Enum } from '@/types/graphql';

export type DebugDriverSession = {
  driver_id?: string | null;
  session_id?: string | null;
  constructorByConstructorId?: {
    color?: string | null;
  } | null;
  driver?: {
    abbreviation?: string | null;
    full_name?: string | null;
    number?: number | null;
  } | null;
};

export type DebugLap = {
  lap_number?: number | null;
  lap_time?: number | null;
  pitin_time?: number | null;
  pitout_time?: number | null;
  session_time?: number | null;
};

export type DebugTelemetryPoint = {
  time?: number | null;
  session_time?: number | null;
  speed?: number | null;
  gear?: number | null;
  rpm?: number | null;
  throttle?: number | null;
  brake?: boolean | null;
  drs?: number | null;
  distance?: number | null;
  x?: number | null;
  y?: number | null;
};

export type SelectedLap = {
  key: string;
  year: number;
  round: number;
  eventName: string;
  sessionName: Session_Name_Choices_Enum;
  driverId: string;
  sessionId: string;
  constructorColor?: string | null;
  driverAbbr: string;
  driverNumber: number | null;
  lapNumber: number;
  lapTime: number | null;
};

export type LapSample = {
  distance: number;
  elapsed: number;
  speed: number;
  throttle: number;
  brake: number;
  drs: number;
  rpm: number;
  gear: number;
  x: number | null;
  y: number | null;
};

export type MetricId =
  | 'speed'
  | 'throttle'
  | 'brake'
  | 'rpm'
  | 'drs'
  | 'gear'
  | 'delta';

type MetricConfig = {
  id: MetricId;
  label: string;
  yAxisName: string;
  smooth?: boolean;
  step?: 'start' | 'middle' | 'end';
};

export type CircuitCornerMarker = {
  distance: number;
  label: string;
};

export type TrackCornerLabel = {
  x: number;
  y: number;
  label: string;
};

export type TrackTransform = {
  originX: number;
  originY: number;
  cos: number;
  sin: number;
};

export type DerivedLapSeries = {
  lap: SelectedLap;
  samples: LapSample[];
};

export type CompareResult = {
  baselineKey: string | null;
  baselineLabel: string | null;
  xAxis: number[];
  seriesByMetric: Record<
    MetricId,
    { name: string; color: string; data: [number, number][] }[]
  >;
  trackSeries: LineSeriesOption[];
  /** Baseline samples with x/y (same geometry as track map); for distance → XY cursor. */
  baselineTrackSamples: LapSample[];
};

export const METRIC_CONFIGS: MetricConfig[] = [
  { id: 'speed', label: 'Speed', yAxisName: 'km/h', smooth: true },
  { id: 'delta', label: 'Delta', yAxisName: 's', smooth: true },
  { id: 'throttle', label: 'Throttle %', yAxisName: '%', smooth: true },
  { id: 'brake', label: 'Brake', yAxisName: 'ON/OFF', step: 'end' },
  { id: 'rpm', label: 'RPM', yAxisName: 'rpm', smooth: true },
  { id: 'drs', label: 'DRS', yAxisName: 'ON/OFF', step: 'end' },
  { id: 'gear', label: 'Gear', yAxisName: 'gear', step: 'end' },
];

export const CHART_HEIGHT_BY_METRIC: Record<MetricId, number> = {
  speed: 300,
  delta: 100,
  throttle: 200,
  brake: 100,
  rpm: 200,
  drs: 100,
  gear: 200,
};

export const DRS_LAST_YEAR = 2025;
const DRS_ON_VALUES = new Set([10, 12, 14]);

export const CHART_PALETTE = [
  '#ffffff',
  '#ef4444',
  '#eab308',
  '#22c55e',
  '#06b6c4',
  '#3b82f6',
  '#8b5ca0',
  '#ec4899',
  '#a855ff',
];

export function formatLapTime(lapTimeMs?: number | null) {
  if (lapTimeMs == null || Number.isNaN(lapTimeMs)) return 'n/a';
  const totalMs = Math.max(0, Math.round(lapTimeMs));
  const minutes = Math.floor(totalMs / 60_000);
  const seconds = Math.floor((totalMs % 60_000) / 1_000);
  const milliseconds = totalMs % 1_000;
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMilliseconds = String(milliseconds).padStart(3, '0');
  return minutes > 0
    ? `${minutes}:${formattedSeconds}.${formattedMilliseconds}`
    : `${formattedSeconds}.${formattedMilliseconds}`;
}

export function lapLabel(lap: SelectedLap) {
  return `${lap.driverAbbr} Lap ${lap.lapNumber}`;
}

export function makeLapKey(params: {
  year: number;
  round: number;
  sessionName: Session_Name_Choices_Enum;
  driverId: string;
  sessionId: string;
  lapNumber: number;
}) {
  return `${params.year}:${params.round}:${params.sessionName}:${params.driverId}:${params.sessionId}:${params.lapNumber}`;
}

export function binaryInterpolate(
  distances: number[],
  values: number[],
  targetDistance: number,
) {
  if (distances.length === 0 || values.length === 0) return 0;
  if (targetDistance <= distances[0]) return values[0];
  const lastIdx = distances.length - 1;
  if (targetDistance >= distances[lastIdx]) return values[lastIdx];

  let low = 0;
  let high = lastIdx;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const value = distances[mid];
    if (value === targetDistance) return values[mid];
    if (value < targetDistance) low = mid + 1;
    else high = mid - 1;
  }

  const right = Math.min(low, lastIdx);
  const left = Math.max(0, right - 1);
  const leftDistance = distances[left];
  const rightDistance = distances[right];
  if (rightDistance === leftDistance) return values[left];
  const ratio =
    (targetDistance - leftDistance) / (rightDistance - leftDistance);
  return values[left] + ratio * (values[right] - values[left]);
}

export function buildLapSamples(points: DebugTelemetryPoint[]) {
  const sorted = [...points]
    .filter((p) => p.distance != null)
    .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

  const timeOrigin = sorted[0]?.session_time ?? sorted[0]?.time ?? 0;
  const seenDistance = new Set<number>();

  const samples: LapSample[] = [];
  for (const p of sorted) {
    if (p.distance == null) continue;
    const distance = Number(p.distance);
    if (seenDistance.has(distance)) continue;
    seenDistance.add(distance);
    const rawElapsed =
      (p.session_time ?? p.time ?? timeOrigin) - (timeOrigin ?? 0);
    const rawDrs = Number(p.drs ?? 0);
    const drs = DRS_ON_VALUES.has(rawDrs) ? 1 : 0;
    samples.push({
      distance,
      elapsed: Math.max(0, rawElapsed),
      speed: Number(p.speed ?? 0),
      throttle: Number(p.throttle ?? 0),
      brake: p.brake ? 100 : 0,
      drs,
      rpm: Number(p.rpm ?? 0),
      gear: Number(p.gear ?? 0),
      x: p.x ?? null,
      y: p.y ?? null,
    });
  }
  return samples;
}

export function createTrackTransform(
  points: Array<[number, number]>,
  rotationDegrees?: number | null,
): TrackTransform | null {
  if (points.length === 0) return null;

  let originX = Number.POSITIVE_INFINITY;
  let originY = Number.POSITIVE_INFINITY;
  for (const [x, y] of points) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    originX = Math.min(originX, x);
    originY = Math.min(originY, y);
  }

  if (!Number.isFinite(originX) || !Number.isFinite(originY)) return null;

  const angle = Number.isFinite(Number(rotationDegrees))
    ? Number(rotationDegrees)
    : 0;
  const radians = (angle * Math.PI) / 180;
  return {
    originX,
    originY,
    cos: Math.cos(radians),
    sin: Math.sin(radians),
  };
}

export function transformTrackCoordinate(
  point: [number, number],
  transform: TrackTransform | null,
): [number, number] {
  if (!transform) return point;
  const [x, y] = point;
  const normalizedX = x - transform.originX;
  const normalizedY = y - transform.originY;
  const flippedY = -normalizedY;
  const rotatedX = normalizedX * transform.cos - flippedY * transform.sin;
  const rotatedY = normalizedX * transform.sin + flippedY * transform.cos;
  return [rotatedX, -rotatedY];
}

/** Map distance along lap to track plane (x,y) using baseline samples with coordinates. */
export function xyAtDistanceOnTrack(
  samples: LapSample[],
  distance: number,
): [number, number] | null {
  const withXY = samples.filter(
    (s) =>
      s.x != null &&
      s.y != null &&
      Number.isFinite(s.x) &&
      Number.isFinite(s.y) &&
      Number.isFinite(s.distance),
  );
  if (withXY.length < 2) return null;
  const distances = withXY.map((s) => s.distance);
  const xs = withXY.map((s) => s.x as number);
  const ys = withXY.map((s) => s.y as number);
  const x = binaryInterpolate(distances, xs, distance);
  const y = binaryInterpolate(distances, ys, distance);
  return [x, y];
}

/** Distance (x-axis) from ECharts `updateAxisPointer` payload. */
export function distanceFromAxisPointerEvent(raw: unknown): number | null {
  if (!raw || typeof raw !== 'object') return null;
  const e = raw as {
    axesInfo?: Array<{ value?: number; axisDim?: string }>;
  };
  if (!e.axesInfo?.length) return null;
  const xInfo = e.axesInfo.find((a) => a.axisDim === 'x');
  const v = xInfo?.value ?? e.axesInfo[0]?.value;
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  return null;
}

export type MetricValueFormat = 'integer' | 'deltaFloat' | 'onOff';

/** Shared dark tooltip panel (matches telemetry UI on dark background). */
const ECHARTS_DARK_TOOLTIP = {
  backgroundColor: 'rgba(9, 9, 11, 0.94)',
  borderColor: 'rgba(255, 255, 255, 0.12)',
  borderWidth: 1,
  padding: [8, 12],
  textStyle: {
    color: '#f4f4f5',
    fontSize: 12,
  },
};

function formatMetricYValue(value: unknown, format: MetricValueFormat): string {
  const n = Number(value);
  if (Number.isNaN(n)) return '—';
  if (format === 'onOff') return n >= 1 ? 'ON' : 'OFF';
  if (format === 'deltaFloat') {
    const normalized = Math.abs(n) < 0.0005 ? 0 : n;
    return normalized.toFixed(3);
  }
  return Math.round(n).toString();
}

/** Y from line series tooltip item ([distance, y] data). */
function yFromTooltipParam(item: { value?: unknown; data?: unknown }): unknown {
  const { value } = item;
  if (Array.isArray(value) && value.length >= 2) return value[1];
  if (typeof value === 'number') return value;
  const { data } = item;
  if (Array.isArray(data) && data.length >= 2) return data[1];
  return value;
}

export function buildMetricOption(params: {
  title: string;
  series: { name: string; color: string; data: [number, number][] }[];
  step?: 'start' | 'middle' | 'end';
  smooth?: boolean;
  yMin?: number;
  yMax?: number;
  /** Integer metrics vs delta (seconds, max 3 decimals). */
  valueFormat?: MetricValueFormat;
  yAxisSplitNumber?: number;
  cornerMarkers?: CircuitCornerMarker[];
}) {
  const valueFormat = params.valueFormat ?? 'integer';
  const cornerLineData =
    params.cornerMarkers?.map((corner) => ({
      xAxis: corner.distance,
      name: corner.label,
    })) ?? [];

  const option: EChartsOption = {
    animation: false,
    title: {
      text: params.title,
      top: 4,
      textStyle: { fontSize: 13, fontWeight: 500 },
    },
    tooltip: {
      ...ECHARTS_DARK_TOOLTIP,
      trigger: 'axis',
      axisPointer: { type: 'line', snap: false },
      confine: true,
      /** Formats Y in default tooltip fragments when ECharts composes content. */
      valueFormatter: (value: unknown) => {
        if (Array.isArray(value) && value.length >= 2) {
          return formatMetricYValue(value[1], valueFormat);
        }
        return formatMetricYValue(value, valueFormat);
      },
      /** Full HTML; omit shared x (Distance) line so only series rows show. */
      formatter: (tooltipParams: unknown) => {
        const list = (
          Array.isArray(tooltipParams)
            ? tooltipParams
            : tooltipParams
              ? [tooltipParams]
              : []
        ) as Array<{
          seriesName?: string;
          marker?: string;
          value?: unknown;
          data?: unknown;
        }>;
        if (list.length === 0) return '';

        const lines: string[] = [];
        for (const item of list) {
          const y = yFromTooltipParam(item);
          const text = formatMetricYValue(y, valueFormat);
          lines.push(`${item.marker ?? ''}${item.seriesName ?? ''}: ${text}`);
        }
        return lines.join('<br/>');
      },
    },
    grid: {
      left: 44,
      right: 14,
      top: 30,
      bottom: 26,
    },
    xAxis: {
      type: 'value',
      axisLabel: { show: false },
      axisTick: { show: false },
      axisPointer: { show: true, snap: false },
      splitLine: { show: false },
      min: 0,
      max: 'dataMax',
    },
    yAxis: {
      type: 'value',
      nameLocation: 'start',
      min: params.yMin ?? 'dataMin',
      max: params.yMax ?? 'dataMax',
      splitLine: { show: false },
      splitNumber: params.yAxisSplitNumber,
      axisLabel: {
        formatter: (value: number | string) =>
          formatMetricYValue(value, valueFormat),
      },
    },
    series: [
      ...params.series.map(
        (series) =>
          ({
            type: 'line' as const,
            name: series.name,
            data: series.data,
            showSymbol: false,
            smooth: Boolean(params.smooth),
            step: params.step,
            lineStyle: { width: 1, color: series.color },
            itemStyle: { color: series.color },
            emphasis: { focus: 'series' },
          }) as LineSeriesOption,
      ),
      ...(cornerLineData.length > 0
        ? [
            {
              type: 'line',
              name: '__corners__',
              // Keep helper series invisible but bound to same coordinate system.
              data: params.series[0]?.data ?? [],
              showSymbol: false,
              silent: true,
              lineStyle: { opacity: 0 },
              itemStyle: { opacity: 0 },
              tooltip: { show: false },
              z: 50,
              markLine: {
                symbol: 'none',
                silent: true,
                animation: false,
                lineStyle: {
                  type: 'dashed',
                  width: 0.5,
                  color: 'rgba(255, 255, 255, 0.65)',
                },
                label: {
                  show: true,
                  position: 'start',
                  formatter: '{b}',
                  color: '#e4e4e7',
                  fontSize: 10,
                },
                data: cornerLineData,
              },
            } as LineSeriesOption,
          ]
        : []),
    ],
  };
  return option;
}

export function buildTrackMapOption(
  series: LineSeriesOption[],
  cursorXY?: [number, number] | null,
  cornerLabels?: TrackCornerLabel[],
) {
  const cursorSeries: ScatterSeriesOption[] =
    cursorXY != null
      ? [
          {
            id: 'track-distance-cursor',
            type: 'scatter',
            name: 'Cursor',
            data: [cursorXY],
            symbolSize: 18,
            itemStyle: {
              color: '#ffffff',
              borderColor: 'rgba(0,0,0,0.85)',
              borderWidth: 2,
              shadowBlur: 6,
              shadowColor: 'rgba(0,0,0,0.45)',
            },
            z: 999,
            silent: true,
            tooltip: { show: false },
          },
        ]
      : [];

  const cornerLabelSeries: ScatterSeriesOption[] =
    cornerLabels && cornerLabels.length > 0
      ? [
          {
            id: 'track-corners',
            type: 'scatter',
            name: 'Corners',
            data: cornerLabels.map((corner) => [corner.x, corner.y]),
            symbolSize: 1,
            itemStyle: { color: 'transparent' },
            label: {
              show: true,
              formatter: (params: { dataIndex?: number }) =>
                cornerLabels[params.dataIndex ?? 0]?.label ?? '',
              position: 'top',
              color: '#f4f4f5',
              fontSize: 10,
              fontWeight: 600,
            },
            z: 900,
            silent: true,
            tooltip: { show: false },
          },
        ]
      : [];

  const option: EChartsOption = {
    animation: false,
    grid: { left: 10, right: 10, top: 30, bottom: 10 },
    xAxis: { type: 'value', show: false, scale: true },
    yAxis: { type: 'value', show: false, scale: true },
    series: [
      ...series,
      ...cornerLabelSeries,
      ...cursorSeries,
    ] as EChartsOption['series'],
  };
  return option;
}
