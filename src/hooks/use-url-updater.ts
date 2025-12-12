import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useUrlUpdater() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (level: 'year' | 'event' | 'session', value: string) => {
    const segments = pathname.split('/');
    const index = { year: 1, event: 2, session: 3 }[level];

    if (segments[index]) segments[index] = value;
    else segments.push(value);

    // TODO: Issue with sprint and convential events
    const newPath = segments.join('/');
    const newUrl = `${newPath}?${searchParams.toString()}`;
    router.push(newUrl);
  };
}
