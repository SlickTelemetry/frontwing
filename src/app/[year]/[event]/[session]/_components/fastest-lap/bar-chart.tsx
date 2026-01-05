import * as echarts from 'echarts/core';
import { useEffect, useMemo, useRef } from 'react';

import { formatLapTime } from '@/lib/utils';
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

    chartInstance.current.setOption(baseOptions);
  }, [chartInstance]);

  useEffect(() => {
    if (!chartInstance.current) return;
    const abbreviations = driverTimes.map((d) => d.abbreviation);
    const lapTimes = driverTimes.map((d) => d.fastestLap.lap_time);
    const lapNumbers = driverTimes.map((d) => d.fastestLap.lap_number);

    const potentialBests = driverTimes.map((d) =>
      d.fastestLap.potential_best !== 0
        ? Number(d.fastestLap.potential_best)
        : null,
    );
    const colors = driverTimes.map((d) => `#${d.color}`);

    const formatter = (params: EChartsCallbackParams) => {
      const driverData = driverTimes.find(
        (d) => d.abbreviation === (params?.name || ''),
      );
      if (!driverData) return '';

      let tableHtml = `<p class="text-center font-bold">${driverData.abbreviation}</p>`;
      tableHtml += `
        <div class="grid grid-cols-[auto_1fr_1fr] *:border-b *:border-r *:border-foreground items-center text-center">
            <div>&nbsp;</div>
            <div class="px-1">Best Sectors</div>
            <div class="px-1">Fastest Lap</div>

            <div class="px-1">S1</div>
            <div>
              ${
                driverData.sectors.sector1.time !== null
                  ? `${formatLapTime(driverData.sectors.sector1.time)}s`
                  : 'N/A'
              }
            </div>
            <div>
              ${
                driverData.fastestLap.sector1 !== null
                  ? `${formatLapTime(driverData.fastestLap.sector1)}s`
                  : 'N/A'
              }
            </div>

            <div  class="px-1">S2</div>
            <div>
              ${
                driverData.sectors.sector2.time
                  ? `${formatLapTime(driverData.sectors.sector2.time)}s`
                  : 'N/A'
              }
            </div>
            <div>
              ${
                driverData.fastestLap.sector2 !== null
                  ? `${formatLapTime(driverData.fastestLap.sector2)}s`
                  : 'N/A'
              }
            </div>

            <div  class="px-1">S3</div>
            <div>
            ${
              driverData.sectors.sector3.time
                ? `${formatLapTime(driverData.sectors.sector3.time)}s`
                : 'N/A'
            }
              </div>
              <div>
                ${
                  driverData.fastestLap.sector3
                    ? `${formatLapTime(driverData.fastestLap.sector3)}s`
                    : 'N/A'
                }
              </div>
              
              <div class="px-1">Lap</div>
              <div>
              ${
                driverData.fastestLap.potential_best
                  ? `${formatLapTime(driverData.fastestLap.potential_best)}s`
                  : 'N/A'
              }
              </div>
              <div>
                ${
                  driverData.fastestLap.lap_time !== null
                    ? `${formatLapTime(driverData.fastestLap.lap_time)}s`
                    : 'N/A'
                }
              </div>
        </div>
        `;

      return tableHtml;
    };

    const option: echarts.EChartsCoreOption = {
      xAxis: {
        data: abbreviations,
      },
      tooltip: { formatter },
      series: [
        // {
        //   name: 'Sector 1 PB',
        //   type: 'bar',
        //   // barWidth: 16,
        //   stack: 'Potential Best Breakdown',
        //   data: driverTimes.map((value, index) => ({
        //     value: value.sectors.sector1.time,
        //     itemStyle: {
        //       color: colors[index] + '90',
        //       borderRadius: 4,
        //       borderWidth: 1,
        //       borderColor: 'transparent',
        //     },
        //   })),
        // },
        // {
        //   name: 'Sector 2  PB',
        //   type: 'bar',
        //   stack: 'Potential Best Breakdown',
        //   // barWidth: 16,
        //   data: driverTimes.map((value, index) => ({
        //     value: value.sectors.sector2.time,
        //     itemStyle: {
        //       color: colors[index] + '90',
        //       borderRadius: 4,
        //       borderWidth: 1,
        //       borderColor: 'transparent',
        //     },
        //   })),
        // },
        // {
        //   name: 'Sector 3 PB',
        //   type: 'bar',
        //   stack: 'Potential Best Breakdown',
        //   // barWidth: 16,
        //   data: driverTimes.map((value, index) => ({
        //     value: value.sectors.sector3.time,
        //     itemStyle: {
        //       color: colors[index] + '90',
        //       borderRadius: 4,
        //       borderWidth: 1,
        //       borderColor: 'transparent',
        //     },
        //   })),
        // },
        // {
        //   name: 'Sector 1',
        //   type: 'bar',
        //   stack: 'Fastest Lap Breakdown',
        //   // barWidth: 16,
        //   data: driverTimes.map((value, index) => ({
        //     value: value.fastestLap.sector1,
        //     itemStyle: {
        //       color: colors[index],
        //       borderRadius: 4,
        //       borderWidth: 1,
        //       borderColor: 'transparent',
        //     },
        //   })),
        // },
        // {
        //   name: 'Sector 2',
        //   type: 'bar',
        //   stack: 'Fastest Lap Breakdown',
        //   // barWidth: 16,
        //   data: driverTimes.map((value, index) => ({
        //     value: value.fastestLap.sector2,
        //     itemStyle: {
        //       color: colors[index],
        //       borderRadius: 4,
        //       borderWidth: 1,
        //       borderColor: 'transparent',
        //     },
        //   })),
        // },
        // {
        //   name: 'Sector 3',
        //   type: 'bar',
        //   stack: 'Fastest Lap Breakdown',
        //   // barWidth: 16,

        //   data: driverTimes.map((value, index) => ({
        //     value: value.fastestLap.sector3,
        //     itemStyle: {
        //       color: colors[index],
        //       borderRadius: 4,
        //       borderWidth: 1,
        //       borderColor: 'transparent',
        //     },
        //   })),
        // },

        {
          name: 'Lap Times',
          type: 'bar',
          data: lapTimes.map((value, index) => ({
            value: value,
            itemStyle: {
              color: colors[index],
              borderRadius: [12, 12, 0, 0],
            },
          })),
          label: {
            show: true,
            position: 'top',
            formatter: (params: { dataIndex: number; value: number }) => {
              const driverIndex = params.dataIndex;
              const lap = lapNumbers[driverIndex];
              return `Lap ${lap}\n${formatLapTime(params.value)?.toString().slice(2)}`;
            },
          },
        },

        {
          name: 'Potential Best',
          type: 'scatter',
          data: potentialBests,
          itemStyle: {
            color: '#FFD700',
          },
        },
      ],
    };

    chartInstance.current.setOption(option);
  }, [chartInstance, driverTimes]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};
