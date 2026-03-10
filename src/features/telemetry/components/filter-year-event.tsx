import { useRouter, useSearchParams } from 'next/navigation';

import { eventLocationDecode, eventLocationEncode } from '@/lib/utils';

import { SprintBadge } from '@/components/badges/sprint-badge';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';

import { GetTelemetryOptionsQuery } from '@/types/graphql';

export function YearEventFilter({ data }: { data?: GetTelemetryOptionsQuery }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const season = searchParams.get('season');
  const event = eventLocationDecode(searchParams.get('event'));

  const seasons = data?.seasons.map((s) => s.year) as number[] | undefined;
  const events = [...(data?.events || [])].filter(
    (e) => e.year?.toString() === season,
  );

  const onSeasonChange = (val?: string | null) => {
    if (!val) return;

    const params = new URLSearchParams(searchParams);
    params.set('season', val.toString());
    params.delete('event');
    params.delete('circuit');

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const onEventChange = (val?: string | null) => {
    if (!val) return;

    const params = new URLSearchParams(searchParams);
    params.set('event', eventLocationEncode(val) as string);
    params.delete('circuit');

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <Label className='w-full pb-1 text-lg' htmlFor='year-event'>
        Search by Year & Event
      </Label>
      <div className='flex flex-wrap gap-x-4 p-1'>
        <Combobox
          id='year-event'
          items={seasons}
          value={season}
          onValueChange={onSeasonChange}
        >
          <ComboboxInput placeholder='Season' />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(season: string) => (
                <ComboboxItem key={season} value={season}>
                  {season}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        <Combobox
          items={events?.map(({ sessions: _s, ...rest }) => rest) || []}
          value={event}
          onValueChange={onEventChange}
        >
          <ComboboxInput
            disabled={!events || events.length === 0}
            className='w-75'
            placeholder='Event'
          />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(event) => (
                <ComboboxItem key={event.name} value={event.name}>
                  <p className='w-4 font-bold'>{event.round_number}</p>
                  <p className='w-full'>{event.name}</p>
                  <SprintBadge format={event.format} style='short' />
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </>
  );
}
