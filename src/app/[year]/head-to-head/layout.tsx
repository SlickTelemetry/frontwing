import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `Head to Head - Slick Telemetry`,
    description: `Live standings of the ${year} F1 season`,
  };
}

export default function MetadataLayer({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
