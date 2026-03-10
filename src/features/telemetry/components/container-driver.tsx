import { XIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { eventLocationDecode, sessionDecode } from '@/lib/utils';

import { ConstructorBadge } from '@/components/badges/constructor-badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getTelemetryDriverLaps } from '@/features/telemetry/api/get-driver-laps';
import { LapButtonContainer } from '@/features/telemetry/components/container-laps';

import { Session_Name_Choices_Enum } from '@/types/graphql';

export const DriverContainer = ({ driver }: { driver: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // const circuit = eventLocationDecode(searchParams.get('circuit'));
  const season = parseInt(searchParams.get('season') || '');
  const event = eventLocationDecode(searchParams.get('event') || '');
  const [session, setSession] = useState<Session_Name_Choices_Enum>(
    Session_Name_Choices_Enum.Race,
  );

  const { data } = getTelemetryDriverLaps({ driver, season, event, session });
  const driverSessions = data?.drivers?.[0]?.driver_sessions || [];

  const sessions =
    [...driverSessions]?.sort((a, b) => {
      if (!a.session?.name || !b.session?.name) return 0;
      return a.session.name.localeCompare(b.session.name);
    }) || [];

  const removeDriver = () => {
    const drivers = searchParams.getAll('driver');
    const updated = drivers.filter((d) => !d.startsWith(driver));
    const params = new URLSearchParams(searchParams);
    params.delete('driver');
    updated.forEach((d) => params.append('driver', d));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs
      className='block'
      value={session}
      onValueChange={(val) => setSession(val)}
    >
      <div className='flex items-center gap-4'>
        <div className='mr-auto flex items-center gap-2'>
          <p className='font-medium'>{data?.drivers[0].full_name}</p>
          {driverSessions?.[0]?.constructor && (
            <ConstructorBadge
              className='w-fit'
              {...driverSessions[0].constructor}
            />
          )}
        </div>
        <TabsList>
          {sessions.map((s) => (
            <TabsTrigger
              key={s.session?.name}
              value={s.session?.name as string}
            >
              {sessionDecode(s.session?.name as string)}
            </TabsTrigger>
          ))}
        </TabsList>
        <Button
          onClick={removeDriver}
          className='border-border border p-1'
          variant='destructive'
        >
          <XIcon />
        </Button>
      </div>
      {sessions.map((s) => (
        <LapButtonContainer
          key={s.session?.name}
          driverSession={s}
          season={season}
          event={event}
          driver={driver}
          color={`#${driverSessions[0].constructor?.color || 'b5b5b5'}`}
        />
      ))}
    </Tabs>
  );
};
