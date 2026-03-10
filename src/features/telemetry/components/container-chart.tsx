import { SpeedChart } from '@/features/telemetry/components/chart-speed';
import { useTelemetryData } from '@/features/telemetry/hooks/useTelemetryData';

export default function Charts() {
  const { telemetries } = useTelemetryData();

  return (
    <div className='mx-auto w-250'>
      <div className='h-80'>
        <SpeedChart telemetries={telemetries} />
      </div>
      {/* <div className='h-40'>
        <RPMChart driverSessions={data.driver_sessions} />
      </div>
      <div className='h-40'>
        <ThrottleChart driverSessions={data.driver_sessions} />
      </div>
      <div className='h-40'>
        <GearChart driverSessions={data.driver_sessions} />
      </div>
      <div className='h-40'>
        <BrakeChart driverSessions={data.driver_sessions} />
      </div>
      <div className='h-40'>
        <DRSChart driverSessions={data.driver_sessions} />
      </div> */}
    </div>
  );
}
