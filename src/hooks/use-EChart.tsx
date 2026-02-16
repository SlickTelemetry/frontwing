import { BarChart, LineChart, ScatterChart } from 'echarts/charts';
import {
  DataZoomComponent,
  GraphicComponent,
  GridComponent,
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
  DataZoomComponent,
  TooltipComponent,
  GraphicComponent,
  GridComponent,
  CanvasRenderer,
]);

export function useECharts(ref: React.RefObject<HTMLDivElement | null>) {
  const chartInstance = useRef<echarts.ECharts>(null);

  useEffect(() => {
    if (!ref.current || chartInstance.current) return;
    chartInstance.current = echarts.init(ref.current);

    // TODO!: figure out why standings and lap times chart wont show this
    chartInstance.current.setOption({
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: 'center',
            z: 100,
            rotation: Math.PI / 4,
            style: {
              text: 'Slick Telemetry',
              font: 'bold 26px sans-serif', // TODO!: find a way to increase the size of the text WITHOUT affecting the chart UI
              fill: '#fff', // TODO!: add support for dark and light mode
              opacity: 0.5,
            },
          },
        ],
      },
    });

    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [ref]);

  // Use the reusable resize observer hook
  useResizeObserver(ref, () => chartInstance.current?.resize());

  return chartInstance;
}
