'use client';
import { useQuery } from '@apollo/client/react';
import { Info } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { GET_SESSION_LAP_TIMES } from '@/lib/queries';
import { eventLocationDecode, sessionDecode } from '@/lib/utils';

import { Loader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';
import { Toggle } from '@/components/toggle';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { LapTimesChart } from '@/app/[year]/[event]/[session]/_components/lapTimes/chart';

import { GetSessionLapTimesQuery } from '@/types/graphql';
import { Session_Name_Choices_Enum } from '@/types/graphql';

export const LapTimeContainer = () => {
  const { year, event, session } = useParams();
  const { loading, data, error } = useQuery(GET_SESSION_LAP_TIMES, {
    variables: {
      year: parseInt(year as string),
      event: eventLocationDecode(event as string),
      session: sessionDecode(session as string) as Session_Name_Choices_Enum,
    },
  });

  if (error || (!data?.sessions && !loading)) return <ServerPageError />;

  return (
    <div className='grid gap-4'>
      {loading ? (
        <Loader />
      ) : (
        <div className='border-foreground flex h-125 flex-col rounded border p-4 lg:h-[80dvh]'>
          <LapTimeChartContainer data={data} />
        </div>
      )}
    </div>
  );
};

const LapTimeChartContainer = ({
  data,
}: {
  data?: GetSessionLapTimesQuery;
}) => {
  const [showPitIn, setShowPitIn] = useState(false);
  const [hideOutliers, setHideOutliers] = useState<number | null>(1.1);

  return (
    <>
      <div className='z-10 flex w-full flex-wrap items-center gap-4 pb-4'>
        <h2 className='mr-auto flex-1 scroll-m-20 text-2xl font-semibold tracking-tight'>
          Raw Lap Times
        </h2>
        <Toggle
          id='hide-outliers'
          toggle={() => setShowPitIn((prev) => !prev)}
          checked={showPitIn}
        >
          Show Pit Laps
        </Toggle>
        <Separator
          orientation='vertical'
          className='data-[orientation=vertical]:h-4'
        />
        <div className='flex items-center gap-2'>
          <Select
            value={hideOutliers ? (hideOutliers * 100).toFixed(0) : 'all'}
            onValueChange={(value) =>
              setHideOutliers(value === 'all' ? null : parseInt(value) / 100)
            }
          >
            <SelectTrigger id='outlier-select-trigger' className='w-30'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='all'>Show All</SelectItem>
                <SelectItem value='110'>110%</SelectItem>
                <SelectItem value='125'>125%</SelectItem>
                <SelectItem value='150'>150%</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label
            htmlFor='outlier-select-trigger'
            className='flex items-center gap-2'
          >
            Hide Outliers
            <Popover>
              <PopoverTrigger>
                <Info className='size-4' />
              </PopoverTrigger>
              <PopoverContent>
                Outliers are lap times greater than the selected percentage of
                the session's average lap time.
                <br />
                <span className='font-mono text-xs'>
                  laptime &gt; avg time * 1.10 = outlier
                </span>
              </PopoverContent>
            </Popover>
          </Label>
        </div>
      </div>
      <LapTimesChart
        data={data}
        showPitIn={showPitIn}
        hideOutliers={hideOutliers}
      />
    </>
  );
};
