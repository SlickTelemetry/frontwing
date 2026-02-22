import { Link } from '@tanstack/react-router';

import { SprintBadge } from '@/components/badges/sprint-badge';

import { SeasonEvent } from '@/types/global';

export const EventContainer = ({
  event,
  children,
  clickable = true,
}: {
  event: SeasonEvent;
  children: React.ReactNode;
  clickable?: boolean;
}) => {
  if (!event) return null;
  const {
    year,
    event_name,
    round_number,
    location,
    country,
    event_format,
    event_date,
  } = event;

  const eventUrl = `${year}/${location?.replace(/ /g, '-').toLowerCase()}`;
  const eventDate =
    event_date &&
    new Date(event_date).toLocaleString(undefined, {
      timeZone: 'UTC',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const containerContent = (
    <>
      {/* Heading */}
      <div className='flex items-center gap-4 p-4'>
        <p className='flex h-5 w-5 items-center justify-center text-xl leading-tight font-black opacity-50'>
          {round_number}
        </p>
        <div className='flex-1'>
          <div className='flex items-center justify-between'>
            <p className='text-sm' data-cy='event-date'>
              {eventDate}
            </p>
            <SprintBadge format={event_format} />
          </div>
          {event_name && (
            <p className='text-lg leading-tight font-black'>
              {event_name.replace(/Grand Prix/g, 'GP')}
            </p>
          )}
          <p className='text-sm' data-cy='location'>
            {location && `${location},`} {country}
          </p>
        </div>
      </div>
      {children}
    </>
  );

  return clickable ? (
    <Link
      to='/$year'
      params={{ year: year }}
      className='block border transition-colors hover:bg-gray-50 dark:hover:bg-gray-800'
    >
      {containerContent}
    </Link>
  ) : (
    <div className='border'>{containerContent}</div>
  );
};
