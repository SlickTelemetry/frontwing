import { useLocation, useNavigate } from '@tanstack/react-router';

export default function useUrlUpdater() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate()

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

    navigate({ to: nextPath });
  };
}
