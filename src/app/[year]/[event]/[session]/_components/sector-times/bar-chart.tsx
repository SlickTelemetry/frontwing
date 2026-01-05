import { useEffect, useRef } from 'react';

import { formatLapTime } from '@/lib/utils';
import { useECharts } from '@/hooks/use-EChart';

import { baseOptions } from '@/app/[year]/[event]/[session]/_components/sector-times';
import { DriverTimes } from '@/app/[year]/[event]/[session]/_components/sectorTimes';

interface EChartsCallbackParams {
  dataIndex: number;
  name: string;
  value: number | string | number[]; // Value of the data item
  seriesName?: string;
  // Data item itself (e.g., for bar series, it's {value: ..., itemStyle: ...})
  data: { value: number | null; itemStyle?: { color: string } };
  color?: string;
}

export const SectorChart = ({
  sectorKey,
  times,
}: {
  sectorKey: keyof DriverTimes['sectors'];
  times: DriverTimes[];
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useECharts(chartRef);

  // Sort by fastest sector times
  const driverTimes = [...times]
    .filter(
      (d) =>
        d.sectors[sectorKey].time !== null && d.sectors[sectorKey].time > 0,
    )
    .sort(
      (a, b) =>
        Number(a.sectors[sectorKey].time || 0) -
        Number(b.sectors[sectorKey].time || 0),
    );

  // Initialize base options once (tooltip uses item color, not external maps)
  useEffect(() => {
    if (!chartInstance.current) return;
    chartInstance.current.setOption(baseOptions);
  }, [chartInstance]);

  useEffect(() => {
    if (!chartInstance.current) return;
    const abbreviations = driverTimes.map((d) => d.abbreviation);
    const sectorTimes = driverTimes.map((d) => d.sectors[sectorKey].time);
    const lapNumbers = driverTimes.map((d) => d.sectors[sectorKey].lap);
    const colors = driverTimes.map((d) => `#${d.color}`);

    const formatter = (params: EChartsCallbackParams[]) => {
      if (!Array.isArray(params) || !params.length) return '';

      let tableHtml = `<div class="grid grid-cols-[auto_1fr_1fr] items-center">`;

      driverTimes.forEach((driver, index) => {
        const isHovered = index === params[0].dataIndex;
        const time = formatLapTime(driver.sectors[sectorKey].time);
        const lap = driver.sectors[sectorKey].lap;
        const color = colors[index];
        tableHtml += `
          <div class="flex gap-1 items-center w-fit mr-1">
            <div class="rounded-full size-3" style="background-color:${color};"></div>
            <p style="color:${color}">${driver.abbreviation}:</p>
          </div>
          <p>${time || 'N/A'}</p>
          <p class="text-right">${lap ? `L${lap}` : 'N/A'}</p>
          <hr class="col-span-full" style="border-color:${isHovered ? color : 'inherit'}"/>
        `;
      });

      tableHtml += `</div>`;
      return tableHtml;
    };

    chartInstance.current.setOption({
      tooltip: { formatter },
      xAxis: {
        data: abbreviations,
      },
      series: [
        {
          name: `Sector ${sectorKey.slice(-1)}`,
          type: 'bar',
          data: sectorTimes.map((value, index) => ({
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
              return `Lap ${lap}\n${(params.value / 1000).toFixed(3)}s`;
            },
          },
          barWidth: '60%',
        },
      ],
    });
  }, [chartInstance, driverTimes, sectorKey]);

  if (driverTimes.length === 0) {
    return (
      <div className='rounded border p-2'>
        <div className='flex h-125 items-center justify-center text-gray-500'>
          No data available
        </div>
      </div>
    );
  }

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};
