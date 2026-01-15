import { usePathname, useRouter } from 'next/navigation';

export default function useUrlUpdater() {
  const router = useRouter();
  const pathname = usePathname();

  return (level: 'year' | 'event' | 'session', value: string) => {
    const segments = pathname.split('/').filter(Boolean);

    const indexMap = {
      year: 0,
      event: 1,
      session: 2,
    } as const;

    const idx = indexMap[level];

    const nextSegments = [...segments.slice(0, idx), value];

    const nextPath = '/' + nextSegments.join('/');

    router.push(nextPath);
  };
}
