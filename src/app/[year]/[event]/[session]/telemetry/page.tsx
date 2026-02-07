import { notFound } from 'next/navigation';

import { getNextEvent } from '@/features/telemetry/api/get-telemetry';
import { TelemetryChart } from '@/features/telemetry/components/telemetry-charts';

async function TelemetryExample() {
  const { data, error } = await getNextEvent();

  if (!data || error) return notFound();

  // const driverSessions = data.driver_sessions.map((ds) => {
  //   return {
  //     ...ds,
  //     telemetries: ds.telemetries.map((dataPoint) => ({
  //       ...dataPoint,
  //       session_time: parseInt(
  //         dataPoint.session_time?.toString().slice(0, 6) || '',
  //       ),
  //     })),
  //   };
  // });

  return (
    <div className='p-4'>
      <div className='flex gap-2'>
        <div>Select Year</div>
        <div>Select Event</div>
        <div>Select Session</div>
        <div>Select Driver</div>
        <div>Select Lap</div>
      </div>

      <div>
        <div className='h-300'>
          <TelemetryChart driverSessions={data.driver_sessions} />
        </div>
        {/* <div className='h-80'>
          <SpeedChart driverSessions={data.driver_sessions} />
        </div>
        <div className='h-80'>
          <RPMChart driverSessions={data.driver_sessions} />
        </div>
        <div className='h-80'>
          <ThrottleChart driverSessions={data.driver_sessions} />
        </div>
        <div className='h-80'>
          <GearChart driverSessions={data.driver_sessions} />
        </div>
        <div className='h-80'>
          <BrakeChart driverSessions={data.driver_sessions} />
        </div>
        <div className='h-80'>
          <DRSChart driverSessions={data.driver_sessions} />
        </div> */}
      </div>
    </div>
  );
}

export default TelemetryExample;
