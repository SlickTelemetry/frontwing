import { format } from 'echarts';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { useCallback } from 'react';

import { FIXED_STANDINGS_CHART_TOOLTIP_WIDTH_CH } from '@/lib/constants';

import {
  getSprintBadgeHtml,
  isSprintFormat,
} from '@/components/badges/sprint-badge';

import { compareCountback } from '@/app/[year]/standings/_components/countback';

import { GetStandingsQuery } from '@/types/graphql';

interface UseTooltipFormatterProps {
  events: GetStandingsQuery['events'];
  activeItems: string[];
  buildPosition: (
    items: string[],
    events: GetStandingsQuery['events'],
  ) => Record<string, number[][]>;
}

export function useTooltipFormatter({
  events,
  activeItems,
  buildPosition,
}: UseTooltipFormatterProps) {
  const positionCountsTimeline = buildPosition(activeItems, events);

  return useCallback(
    (params: CallbackDataParams[]) => {
      if (!params?.length) return '';
      const eventIndex = params[0].dataIndex;

      const event = events[eventIndex];
      const round = eventIndex + 1;

      const sprint = isSprintFormat(event?.format);
      const sprintBadge = sprint ? getSprintBadgeHtml('ml-1') : '';

      // Header with round and event name
      const headerText = format.encodeHTML(
        `R${round} - ${event?.name?.replace('Grand Prix', 'GP')}`,
      );
      const header = `<div class='font-bold text-white mb-1 flex items-center'>${headerText}${sprintBadge}</div>`;

      const getCountsThroughRound = (seriesName: string) => {
        const timeline = positionCountsTimeline[seriesName];
        if (!timeline?.length) return [];
        if (eventIndex < timeline.length) {
          return timeline[eventIndex] ?? [];
        }
        return timeline[timeline.length - 1] ?? [];
      };

      // Partition: "Available Points" first, then others sorted by points + countback
      const availablePointsName = 'Available Points';
      const [availableFirst, rest] = params.reduce<
        [CallbackDataParams[], CallbackDataParams[]]
      >(
        (acc, p) => {
          if (String(p.seriesName) === availablePointsName) {
            acc[0].push(p);
          } else {
            acc[1].push(p);
          }
          return acc;
        },
        [[], []],
      );

      // Sort rest by: 1) Points (descending) 2) Countback
      rest.sort((a, b) => {
        const aValue = (a.value as number) ?? 0;
        const bValue = (b.value as number) ?? 0;

        if (bValue !== aValue) {
          return bValue - aValue;
        }

        const aCounts = getCountsThroughRound(String(a.seriesName));
        const bCounts = getCountsThroughRound(String(b.seriesName));

        return compareCountback(aCounts, bCounts);
      });

      const orderedParams = [...availableFirst, ...rest];

      const body = orderedParams
        .map((p, index) => {
          // Available points should not be ranked
          const isAvailablePoints =
            String(p.seriesName) === availablePointsName;
          const rankDisplay = isAvailablePoints
            ? ''
            : String(index - availableFirst.length + 1);
          return format.formatTpl(
            `
          <div class='flex items-center justify-between gap-2 border-t'>
            <div class='flex items-center gap-2'>
              <span class='w-4 text-right text-xs text-muted-foreground'>${rankDisplay}</span>
              <span class="inline-block rounded-full w-2 h-2" style="background-color:${p.color};"></span>
              <span style="color:${p.color}">{a}</span>
            </div>
            {c}
          </div>`,
            p,
            true,
          );
        })
        .join('');

      // Wrap header + body in a fixed-width container so tooltip width doesn't
      // change between events. Width is based on the longest header text.
      return `
        <div class="whitespace-normal wrap-break-word" style="width:${FIXED_STANDINGS_CHART_TOOLTIP_WIDTH_CH}ch;">
          ${header + body}
        </div>
      `;
    },
    [events, positionCountsTimeline],
  );
}
