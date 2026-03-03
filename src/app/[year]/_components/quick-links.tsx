import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface LinkData {
  href: string;
  name: string;
  description?: string;
}

// Creating link data
function createQuickLinks(year: string): LinkData[] {
  if (!year) return [];
  return [
    {
      name: 'Season Map',
      href: `${year}/map`,
      description: 'View the travel of the season',
    },
    { name: 'Head to Head', href: '#', description: 'Compare driver results' },
  ];
}

// Rendering active links
function QuickLink({ href, name, description }: LinkData) {
  return (
    <Link
      href={href}
      className='group hover:bg-muted rounded border px-4 py-2 transition-colors'
      aria-label={`${name}, ${description ?? ''}`}
    >
      <div className='flex w-full items-center justify-between text-xl font-bold group-hover:underline'>
        {name}
        <ArrowUpRight />
      </div>
      {description && <p>{description}</p>}
    </Link>
  );
}

// Rendering placeholder links
function Placeholder({ name, description }: Omit<LinkData, 'href'>) {
  return (
    <div
      className='rounded border border-dashed px-4 py-2 opacity-50'
      title='Coming soon'
    >
      <div className='flex w-full cursor-not-allowed items-center justify-between text-xl font-bold'>
        {name}
        <ArrowUpRight />
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}

// Rendering the appropriate link component
function LinkRenderer({ href, name, description }: LinkData) {
  return href === '#' ? (
    <Placeholder name={name} description={description} />
  ) : (
    <QuickLink href={href} name={name} description={description} />
  );
}

// Composing and rendering the quick links container
export function SeasonQuickLinks({ year }: { year: string }) {
  // const { year } = useParams<{ year?: string }>();
  const links = createQuickLinks(year ?? '');

  return (
    <div
      className='flex flex-col gap-4 md:grid'
      style={{ gridTemplateColumns: `repeat(${links.length}, 1fr)` }}
    >
      {links.map((link) => (
        <LinkRenderer key={link.href} {...link} />
      ))}
    </div>
  );
}

export function SeasonQuickLinksSkeleton() {
  return (
    <div
      className='flex flex-col gap-4 md:grid'
      style={{ gridTemplateColumns: `repeat(2, 1fr)` }}
    >
      {Array.from({ length: 2 }).map((_, idx) => (
        <div
          key={`quick-link-skeleton-${idx}`}
          className='rounded border px-4 py-2'
        >
          <div className='flex w-full animate-pulse items-center justify-between gap-2'>
            <div className='bg-accent/50 h-6 w-32 rounded' />
            <div className='bg-accent/50 h-6 w-6 rounded' />
          </div>
          <div className='bg-accent/50 mt-2 h-4 w-3/4 rounded' />
        </div>
      ))}
    </div>
  );
}
