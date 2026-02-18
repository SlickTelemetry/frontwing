import { TelemetryClient } from '@/app/telemetry/_client';

async function TelemetryExample() {
  //   props: {
  //   searchParams: Promise<{ year: string; event: string; session: string }>;
  // }
  // const { year, event, session } = await props.searchParams;

  // const { data, error } = await getTelemetry({
  //   year,
  //   event: eventLocationDecode(event),
  //   session: sessionDecode(session) as Session_Name_Choices_Enum,
  //   lap: 1,
  // });

  // if (!data || error) return notFound();

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

  return <TelemetryClient />;
}

export default TelemetryExample;
