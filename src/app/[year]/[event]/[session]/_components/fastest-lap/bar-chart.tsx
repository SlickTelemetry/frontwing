import * as echarts from 'echarts/core';
import { useEffect, useMemo, useRef } from 'react';

import { useECharts } from '@/hooks/use-EChart';

import { baseOptions } from '@/app/[year]/[event]/[session]/_components/fastest-lap/config';
import { DriverTimes } from '@/app/[year]/[event]/[session]/_components/sectorTimes';

interface FastestLapEChartsProps {
  times: DriverTimes[];
}

interface EChartsCallbackParams {
  name: string;
  value: number | string | number[]; // Value of the data item
  seriesName?: string;
  // Data item itself (e.g., for bar series, it's {value: ..., itemStyle: ...})
  data: { value: number | null; itemStyle?: { color: string } };
  color?: string;
}

export const FastestLapChart: React.FC<FastestLapEChartsProps> = ({
  times,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useECharts(chartRef);

  const driverTimes = useMemo(
    () =>
      [...times]
        .filter((d) => d.fastestLap.lap_time !== null)
        .sort(
          (a, b) =>
            Number(a.fastestLap.lap_time || 0) -
            Number(b.fastestLap.lap_time || 0),
        ),
    [times],
  );

  // Initialize base options once (tooltip uses item color, not external maps)
  useEffect(() => {
    if (!chartInstance.current) return;

    const formatter = (params: EChartsCallbackParams[]) => {
      const driverData = driverTimes.find(
        (d) => d.abbreviation === (params[0]?.name || ''),
      );
      if (!driverData) return '';

      return `
              <div style="display: grid; grid-template-columns: auto auto auto; gap: 5px; font-weight: normal;">
                <div style="grid-column: 1 / span 3; text-align: center; font-weight: bold;">
                  ${driverData.abbreviation}
                </div>
                <div style="text-align: center;"></div>
                <div style="text-align: center;">Fastest Lap</div>
                <div style="text-align: center;">Best Sectors</div>

                <div style="text-align: center;">S1</div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.sector1.time !== null
                      ? `${driverData.fastestLap.sector1.time}s`
                      : 'N/A'
                  }
                </div>
                <div style="text-align: center;">
                  ${
                    driverData.sectors.sector1.time !== null
                      ? `${driverData.sectors.sector1.time}s`
                      : 'N/A'
                  }
                </div>

                <div style="text-align: center;">S2</div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.sector2.time !== null
                      ? `${driverData.fastestLap.sector2.time}s`
                      : 'N/A'
                  }
                </div>
                <div style="text-align: center;">
                  ${
                    driverData.sectors.sector2.time !== null
                      ? `${driverData.sectors.sector2.time}s`
                      : 'N/A'
                  }
                </div>

                <div style="text-align: center;">S3</div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.sector3.time !== null
                      ? `${driverData.fastestLap.sector3.time}s`
                      : 'N/A'
                  }
                </div>
                <div style="text-align: center;">
                  ${
                    driverData.sectors.sector3.time !== null
                      ? `${driverData.sectors.sector3.time}s`
                      : 'N/A'
                  }
                </div>

                <div style="text-align: center;">Lap</div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.lap_time !== null
                      ? `${driverData.fastestLap.lap_time}s`
                      : 'N/A'
                  }
                </div>
                <div style="text-align: center;">
                  ${
                    driverData.fastestLap.potential_best
                      ? `${driverData.fastestLap.potential_best}s 🔸`
                      : 'N/A'
                  }
                </div>
              </div>
            `;
    };

    chartInstance.current.setOption(
      {
        ...baseOptions,
        tooltip: { ...baseOptions.tooltip, formatter },
      },
      true,
    );
  }, [chartInstance, driverTimes]);

  useEffect(() => {
    if (!chartInstance.current) return;
    const abbreviations = driverTimes.map((d) => d.abbreviation);
    const lapTimes = driverTimes.map((d) => d.fastestLap.lap_time);
    const potentialBests = driverTimes.map((d) =>
      d.fastestLap.potential_best !== 0
        ? Number(d.fastestLap.potential_best)
        : null,
    );
    const colors = driverTimes.map((d) => `#${d.color}`);

    const option: echarts.EChartsCoreOption = {
      xAxis: {
        data: abbreviations,
      },
      series: [
        {
          name: 'Lap Times',
          type: 'bar',
          data: lapTimes.map((value, index) => ({
            value: value,
            itemStyle: {
              color: colors[index],
            },
          })),
          label: {
            show: true,
            position: 'top',
            // eslint-disable-next-line
            formatter: (params: any) => `${params.data.value.toFixed(3)}s`,
          },
        },
        {
          name: 'Potential Best',
          type: 'scatter',
          data: potentialBests.map((value) => ({
            value: value,
            itemStyle: {
              color: '#FFD700',
            },
          })),
          itemStyle: {
            color: '#FFD700',
          },
          z: 2,
          symbol: 'diamond',
          tooltip: {
            show: false, // Hide tooltip for this series as it's handled by the bar series
          },
        },
      ],
    };

    chartInstance.current.setOption(option);
  }, [chartInstance, driverTimes]);

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
};
