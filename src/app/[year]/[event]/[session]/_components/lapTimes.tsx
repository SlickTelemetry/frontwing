'use client';
import { useQuery } from '@apollo/client/react';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { useParams } from 'next/navigation';
import React from 'react';

import { GET_SESSION_LAP_TIMES } from '@/lib/queries';
import { eventLocationDecode, sessionDecode } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';

import { Session_Name_Choices_Enum } from '@/types/graphql';

echarts.use([LineChart, TooltipComponent, GridComponent, CanvasRenderer]);

import { Loader } from '@/components/Loader';

import { LapTimesChart } from '@/app/[year]/[event]/[session]/_components/lapTimes/index';

const LapTimeContainer = () => {
  const { year, event, session } = useParams();
  const { loading, ...queryState } = useQuery(GET_SESSION_LAP_TIMES, {
    variables: {
      year: parseInt(year as string),
      event: eventLocationDecode(event as string),
      session: sessionDecode(session as string) as Session_Name_Choices_Enum,
    },
  });

  if (queryState.error || (!queryState.data?.sessions && !loading))
    return <ServerPageError />;

  return (
    <div className='grid gap-4'>
      {loading ? (
        <Loader />
      ) : (
        <div className='border-foreground h-[500px] rounded border p-4 lg:h-[75dvh]'>
          <LapTimesChart data={queryState.data} />
        </div>
      )}
    </div>
  );
};

export default LapTimeContainer;
