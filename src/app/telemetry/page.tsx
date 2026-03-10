'use client';

import Charts from '@/features/telemetry/components/container-chart';
import { DriverContainer } from '@/features/telemetry/components/container-driver';
import { DriverFilter } from '@/features/telemetry/components/filter-driver';
import { YearEventFilter } from '@/features/telemetry/components/filter-year-event';
import { TelemetryDataProvider } from '@/features/telemetry/hooks/useTelemetryData';

async function TelemetryPage({
  searchParams,
}: {
  searchParams: Promise<{ driver: string | string[] | undefined }>;
}) {
  const { driver } = await searchParams;
  const drivers = Array.isArray(driver) ? driver : [driver];
  return (
    <TelemetryDataProvider>
      <div className='grid gap-8 p-4 lg:px-6'>
        <div className='mx-auto max-w-1/2'>
          <YearEventFilter />
          {/* <EventYearFilter /> */}

          <DriverFilter />
          <div className='mx-auto grid gap-4 py-4'>
            {drivers.map((d) => d && <DriverContainer driver={d} key={d} />)}
          </div>
        </div>
        <Charts />
      </div>
    </TelemetryDataProvider>
  );
}

export default TelemetryPage;
