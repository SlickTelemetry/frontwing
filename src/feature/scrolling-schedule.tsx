'use client';

import { useQuery } from '@apollo/client/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

import { eventLocationEncode } from '@/lib/utils';

import { SprintBadge } from '@/components/badges/sprint-badge';

import { graphql } from '@/types';

const GetAllSchedules = graphql(`
  query GetAllSchedules @cached {
    schedule {
      event_format
      event_name
      round_number
      location
      country
      session1_date_utc
      session5_date_utc
      year
    }
  }
`);

const ScheduleComponent: React.FC = () => {
  const router = useRouter();
  const [currentYear] = useState<number>(new Date().getFullYear());

  const componentRef = useRef<HTMLDivElement>(null);
  const eventsContainerRef = useRef<HTMLDivElement>(null);

  const { data } = useQuery(GetAllSchedules);

  const handleMouseEnterComponent = () => {};

  const handleMouseLeaveComponent = () => {};

  const handleEventLeave = () => {};

  return (
    <motion.div
      ref={componentRef}
      className='relative flex w-full flex-col items-center justify-center overflow-hidden'
      onClick={handleMouseEnterComponent}
      onMouseLeave={handleMouseLeaveComponent}
    >
      {/* <AnimatePresence>
        <motion.div
          className='bg-opacity-90 bg-foreground absolute top-0 mb-5 flex gap-5 rounded-[10px] px-5 py-2.5 shadow-lg'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {Array.from(years)?.map((year) => (
            <motion.span
              key={year}
              className={clsx(
                'cursor-pointer font-semibold transition-colors duration-300',
                currentYear === year ? 'text-accent' : 'text-background',
              )}
              onClick={() => handleYearClick(year as number)}
              whileTap={{ scale: 0.9 }}
            >
              {year}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence> */}

      <div
        ref={eventsContainerRef}
        className='scrollbar scrollbar-thumb-accent scrollbar-track-muted flex w-full items-center justify-start gap-3.75 overflow-x-auto px-4 py-4'
      >
        {data?.schedule
          .filter((event) => event.year === currentYear)
          .map((event) => {
            return (
              <div
                key={'id-' + event?.event_name + event?.year} // Use event.id for unique key
                className='border-muted flex w-40 shrink-0 cursor-pointer flex-col justify-between gap-2 overflow-hidden rounded-xl border p-4 shadow-lg transition-all duration-300'
                onClick={() =>
                  router.push(
                    `/${currentYear}/${eventLocationEncode(event.event_name)}`,
                  )
                }
                onMouseLeave={handleEventLeave}
                // initial={{ width: '140px' }}
                // animate={{ width: isExpanded ? '240px' : '140px' }}
                // transition={{ duration: 0.2 }}
              >
                <p className='truncate text-sm leading-snug'>
                  {event.location}, {event.country}
                </p>
                <div className='flex items-center gap-2'>
                  <h3 className='truncate align-bottom leading-tight font-bold'>
                    {event.event_name?.replace('Grand Prix', 'GP')}
                  </h3>
                  <SprintBadge style='short' format={event.event_format} />
                </div>
                <p className=''>
                  {new Date(
                    event.session1_date_utc as string,
                  ).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  -{' '}
                  {new Date(
                    event.session5_date_utc as string,
                  ).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                {/* <Button asChild>
                  <Link
                    href={`${event.year}/${eventLocationEncode(event.event_name)}`}
                  >
                    Event <ArrowUpRight />
                  </Link>
                </Button> */}
              </div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default ScheduleComponent;
