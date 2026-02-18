'use client';

import { useQuery } from '@apollo/client/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

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

import { graphql } from '@/types';

export default function TelemetryClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data } = useQuery(
    graphql(`
      query GetTelemetryOptions {
        circuits(distinct_on: name) {
          name
        }
        seasons: events(distinct_on: year, order_by: { year: desc }) {
          year
        }
        events(order_by: { date: desc }) {
          year
          name
          round_number
          format
          sessions(order_by: { date: desc }) {
            name
            circuit {
              name
            }
          }
        }
      }
    `),
  );

  const spCircuit = eventLocationDecode(searchParams.get('circuit'));

  // Session Might need to become context to pass initial value to child selectors
  const [circuit, setCircuit] = useState<string>(spCircuit);
  const [season, setSeason] = useState<number | null>();
  const [event, setEvent] = useState<string | null>();

  const seasons = data?.seasons.map((s) => s.year);
  const circuits = data?.circuits.map((c) => c.name);
  const events = [...(data?.events || [])].filter((e) => e.year === season);

  const handleSelectorChange = (key: string, value: string | null) => {
    if (!value) return;
    const params = new URLSearchParams(searchParams);

    params.set(key, value);
    params.delete('f');

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSeasonSelector = (val?: number | null) => {
    if (!val) return;

    setSeason(val);
    setEvent('');
  };

  const handleEventSelector = (val?: string | null) => {
    if (!val) return;

    const circuitMatch = events.find((e) => e.name === val)?.sessions[0].circuit
      ?.name;

    setEvent(val);
    setCircuit(circuitMatch || '');

    handleSelectorChange('circuit', eventLocationEncode(circuitMatch));
  };

  const handleCircuitSelector = (val: string | null) => {
    if (!val) return;
    setCircuit(val);
    handleSelectorChange('circuit', val);
  };

  return (
    <>
      <div className='mx-auto w-200 gap-4 py-4'>
        <div className='flex items-center gap-4'>
          <p className='flex size-8 items-center justify-center rounded-full border'>
            1
          </p>
          <div className='flex flex-col'>
            <Label htmlFor='circuit' className='pb-1 text-lg'>
              Select a Circuit
            </Label>

            <Combobox
              id='circuit'
              items={circuits}
              value={circuit}
              onValueChange={handleCircuitSelector}
            >
              <ComboboxInput placeholder='Circuit' />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(circuit) => (
                    <ComboboxItem key={circuit} value={circuit}>
                      {circuit}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <p className='flex-1 text-center text-2xl font-bold'>OR</p>

          <div className='flex flex-col'>
            <Label className='w-full pb-1 text-lg' htmlFor='year-event'>
              Find an event's circuit
            </Label>
            <div className='flex flex-wrap gap-x-4'>
              <Combobox
                id='year-event'
                items={seasons}
                value={season}
                onValueChange={handleSeasonSelector}
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
                disabled={!data}
                items={[...events]?.map(({ sessions: _s, ...rest }) => rest)}
                value={event}
                onValueChange={handleEventSelector}
              >
                <ComboboxInput placeholder='Event' />
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
          </div>
        </div>
      </div>
    </>
  );
}
