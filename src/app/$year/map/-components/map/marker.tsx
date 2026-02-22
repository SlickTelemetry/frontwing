import { useState } from 'react';
import { Marker } from 'react-map-gl/mapbox';

import { ConnectionLine } from './connection-line';

import { MapScheduleLocationFragment } from '@/types/graphql';

export const MapMarker = ({
  event,
  nextEvent,
  prevEvent,
  color,
  selectEvent,
}: {
  event: MapScheduleLocationFragment;
  nextEvent?: MapScheduleLocationFragment;
  prevEvent?: MapScheduleLocationFragment;
  color: string;
  selectEvent: () => void;
}) => {
  const [isActive, setActive] = useState(false);
  const { latitude, longitude } = {
    latitude: null,
    longitude: null,
    ...event,
  };
  return (
    <>
      {prevEvent && (
        <ConnectionLine
          active={isActive}
          event={event}
          color={color}
          adjacentEvent={prevEvent}
        />
      )}
      {nextEvent && (
        <ConnectionLine
          active={isActive}
          event={event}
          color={color}
          adjacentEvent={nextEvent}
        />
      )}
      <Marker
        longitude={longitude as number}
        latitude={latitude as number}
        onClick={selectEvent}
      >
        <div
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          className='relative flex cursor-pointer items-center justify-center'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill={color}
            className='lucide-map-pin absolute'
          >
            <path d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0' />
          </svg>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill={color}
            stroke='currentColor'
            strokeWidth='1'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide-map-pin'
          >
            <path d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0' />
          </svg>

          <p className='absolute pb-0.5'>{event.round_number}</p>
        </div>
      </Marker>
    </>
  );
};
