import { useLazyQuery } from '@apollo/client/react';
import { Circle } from 'lucide-react';
import { useState } from 'react';

import { formatLapTime } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';

import { GetTelemetry } from '@/features/telemetry/api/get-telemetry';
import { useTelemetryData } from '@/features/telemetry/hooks/useTelemetryData';

import {
  GetTelemetryDriverLapsQuery,
  Session_Name_Choices_Enum,
} from '@/types/graphql';

export const LapButtonContainer = ({
  season,
  event,
  driver,
  color,
  driverSession,
}: {
  season: number;
  event: string;
  driver: string;
  color: string;
  driverSession: GetTelemetryDriverLapsQuery['drivers'][number]['driver_sessions'][number];
}) => {
  const [laps, setLaps] = useState<number[]>([]);
  const { setTelemetries } = useTelemetryData();
  const [loadTelemetry] = useLazyQuery(GetTelemetry);

  const sessionName = driverSession.session?.name as Session_Name_Choices_Enum;

  const removeTelemetryData = (lapNum: string) => {
    setTelemetries((telemetries) =>
      telemetries.filter(
        (d) =>
          !(
            d.season === season.toString() &&
            d.event === event &&
            d.driver === driver &&
            d.session === sessionName &&
            d.lap === lapNum.toString()
          ),
      ),
    );
  };

  const fetchTelemetryData = async (lapNum: number) => {
    const { data } = await loadTelemetry({
      variables: {
        season: season.toString(),
        event: event ? { _regex: event } : {},
        // circuit: circuit ? { _eq: circuit } : {},
        driver: driver,
        session: sessionName,
        lap: lapNum,
      },
    });

    if (!data || !data.telemetry) return;

    setTelemetries((drivers) => [
      ...drivers,
      {
        season: season.toString(),
        event,
        driver,
        color,
        session: sessionName,
        lap: lapNum.toString(),
        telemetry: data?.telemetry,
      },
    ]);
  };

  const toggleLap = (lapNum: number) => {
    if (laps.includes(lapNum)) {
      setLaps((prev) => prev.filter((l) => l !== lapNum));

      // Remove from telemtry context
      removeTelemetryData(lapNum.toString());
    } else {
      setLaps((prev) => [...prev, lapNum]);

      // fetch data and add to telemetry context
      fetchTelemetryData(lapNum);
    }
  };

  return (
    <TabsContent
      key={driverSession.session?.name}
      value={driverSession.session?.name as string}
    >
      <div className='grid'>
        <div className='flex gap-2 overflow-x-scroll py-2'>
          {driverSession.laps?.map(
            (lap) =>
              lap.lap_time && (
                <LapButton
                  handleLapSelector={toggleLap}
                  key={lap.lap_number}
                  active={laps?.includes(lap.lap_number || 0)}
                  {...lap}
                />
              ),
          )}
        </div>
      </div>
    </TabsContent>
  );
};

const LapButton = ({
  handleLapSelector,
  active,
  ...lap
}: GetTelemetryDriverLapsQuery['drivers'][number]['driver_sessions'][number]['laps'][number] & {
  handleLapSelector: (lapNum: number) => void;
  active?: boolean;
}) => {
  if (!lap.lap_time) return;

  const fillVar = `var(--${lap.compound?.toLowerCase()}-${lap.fresh_tyre ? 'new' : 'old'})`;

  return (
    <Button
      className='w-32'
      onClick={() => handleLapSelector(lap.lap_number as number)}
      variant={active ? 'default' : 'secondary'}
      key={lap.lap_number}
    >
      <p className='font-black'>{lap.lap_number}</p>
      <p>|</p>
      <p>{formatLapTime(lap.lap_time)}</p>
      <Circle fill={fillVar} />
    </Button>
  );
};
