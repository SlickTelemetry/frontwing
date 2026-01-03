import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { useEffect, useRef } from 'react';

import { useECharts } from '@/hooks/use-EChart';

import { DriverTimes } from '@/app/[year]/[event]/[session]/_components/sectorTimes';
import { baseOptions } from '@/app/[year]/standings/_components/chart';

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

    const formatter = (params: EChartsCallbackParams[]) => {
      if (!Array.isArray(params) || !params.length) return '';

      let tableHtml = `
              <div style="border: 2px solid #c23531; border-radius: 4px; background-color: #282c34; padding: 10px; box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);">
                <table style="width: 100%; border-collapse: collapse; color: #fff; font-family: 'Arial', sans-serif;">
                  <thead>
                    <tr>
                      <th style="text-align: left; padding: 5px; font-weight: normal;"></th>
                      <th style="text-align: left; padding: 5px; font-weight: normal;">Time</th>
                      <th style="text-align: left; padding: 5px; font-weight: normal;">Lap</th>
                    </tr>
                  </thead>
                  <tbody>
            `;

      driverTimes.forEach((driver, index) => {
        const isHovered = index === params[0].dataIndex;
        const style = isHovered
          ? 'background-color: rgba(255, 255, 255, 0.2);'
          : '';
        const time = driver.sectors[sectorKey].time;
        const lap = driver.sectors[sectorKey].lap;

        tableHtml += `
                <tr style="${style}">
                  <td style="font-weight: bold; text-align: left; padding: 5px;">${driver.abbreviation}</td>
                  <td style="text-align: left; padding: 5px;">${
                    time ? `${time.toFixed(3)}s` : 'N/A'
                  }</td>
                  <td style="text-align: left; padding: 5px;">${lap || 'N/A'}</td>
                </tr>
              `;
      });

      tableHtml += `
                  </tbody>
                </table>
              </div>
            `;

      return tableHtml;
    };

    chartInstance.current.setOption(
      {
        ...baseOptions,

        title: {
          text:
            sectorKey === 'sector1'
              ? 'Sector 1'
              : sectorKey === 'sector2'
                ? 'Sector 2'
                : 'Sector 3',
        },
        tooltip: { ...baseOptions.tooltip, formatter },
      },
      true,
    );
  }, [chartInstance, driverTimes, sectorKey]);

  useEffect(() => {
    let chartInstance: echarts.ECharts | undefined;
    if (chartRef.current && driverTimes.length > 0) {
      chartInstance = echarts.init(chartRef.current, 'dark');

      const abbreviations = driverTimes.map((d) => d.abbreviation);
      const sectorTimes = driverTimes.map((d) => d.sectors[sectorKey].time);
      const lapNumbers = driverTimes.map((d) => d.sectors[sectorKey].lap);
      const colors = driverTimes.map((d) => `#${d.color}`);

      const option: EChartsOption = {
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
              },
            })),
            label: {
              show: true,
              position: 'top',
              formatter: (params: unknown) => {
                const param = params as { dataIndex: number; value: number };
                const driverIndex = param.dataIndex;
                const lap = lapNumbers[driverIndex];
                return `Lap ${lap}\n${Number(param.value).toFixed(3)}s`;
              },
              color: '#fff',
              fontSize: 10,
            },
            barWidth: '60%',
          },
        ],
      };

      chartInstance.setOption({ ...baseOptions, ...option });

      const handleResize = () => {
        chartInstance?.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance?.dispose();
      };
    }
  }, [driverTimes, sectorKey]);

  if (driverTimes.length === 0) {
    return (
      <div className='rounded border p-2'>
        <div className='flex h-125 items-center justify-center text-gray-500'>
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className='rounded border p-2'>
      <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};
