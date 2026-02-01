import { BarChart, LineChart, ScatterChart } from 'echarts/charts';
import {
  DataZoomComponent,
  GridComponent,
  MarkAreaComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect, useRef } from 'react';

import { useResizeObserver } from './use-resize-observer';

echarts.use([
  BarChart,
  ScatterChart,
  LineChart,
  MarkAreaComponent,
  DataZoomComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer,
]);

export function useECharts(ref: React.RefObject<HTMLDivElement | null>) {
  const chartInstance = useRef<echarts.ECharts>(null);

  useEffect(() => {
    if (!ref.current || chartInstance.current) return;
    chartInstance.current = echarts.init(ref.current);
    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [ref]);

  // Use the reusable resize observer hook
  useResizeObserver(ref, () => chartInstance.current?.resize());

  return chartInstance;
}
