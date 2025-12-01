import clsx from 'clsx';
import { EyeOff, Settings } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

import {
  COMPETITION_SESSIONS,
  PRACTICE_SESSIONS,
  QUALIFYING_SESSIONS,
  SESSION_KEYS,
} from '@/lib/constants';
import { shouldHideResults } from '@/lib/utils';
import {
  useLocalStorage,
  useReadLocalStorage,
  useSessionStorage,
} from '@/hooks/use-storage';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  CompetitionResults,
  PracticeResults,
  QualifyingResults,
} from './results-tables';

import { FragmentType, graphql, useFragment } from '@/types';
import { Session_Name_Choices_Enum } from '@/types/graphql';

const EventSessionResults = graphql(`
  fragment EventSessionResults on events {
    competition: sessions(
      order_by: { scheduled_start_time_utc: asc }
      where: { name: { _in: [Sprint, Race] } }
      limit: 2
    ) {
      scheduled_start_time_utc
      name
      ...EventCompetitionResults
    }
    qualifying: sessions(
      order_by: { scheduled_start_time_utc: asc }
      where: { name: { _in: [Sprint_Shootout, Sprint_Qualifying, Qualifying] } }
      limit: 2
    ) {
      scheduled_start_time_utc
      name
      ...EventQualifyingResults
    }
    practice: sessions(
      order_by: { scheduled_start_time_utc: asc }
      where: { name: { _in: [Practice_1, Practice_2, Practice_3] } }
      limit: 3
    ) {
      scheduled_start_time_utc
      name
      ...EventPracticeResults
    }
  }
`);

export default function EventResultsContainer({
  loading,
  ...props
}: {
  loading: boolean;
  sessions: FragmentType<typeof EventSessionResults>[];
}) {
  const { year, event } = useParams();
  const [data] = useFragment(EventSessionResults, props?.sessions);
  const sessions = data
    ? [...data.practice, ...data.qualifying, ...data.competition].sort(
        (a, b) =>
          new Date(a.scheduled_start_time_utc!).getTime() -
          new Date(b.scheduled_start_time_utc!).getTime(),
      )
    : [];

  if (!loading && 0 >= sessions?.length) return;
  return (
    <div className='grid gap-2'>
      <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight'>
        Results
      </h2>
      <Tabs
        defaultValue={SESSION_KEYS[0]}
        className='max-w-svw overflow-x-scroll md:overflow-x-visible'
      >
        <div className='flex items-center gap-4'>
          <TabsList>
            <SelectTabList
              loading={loading}
              sessions={sessions.map((s) => s.name ?? '')}
            />
            <ResultsTabList
              loading={loading}
              sessions={sessions.map((s) => s.name ?? '')}
            />
          </TabsList>
          <ResultsSettingsDropdown />
        </div>
        <div className='relative'>
          {SESSION_KEYS.map((key, i) => {
            if (!sessions[i]) return;
            const sessionName = sessions[i]?.name as Session_Name_Choices_Enum;
            return (
              <TabsContent key={key} value={key}>
                <Table>
                  {COMPETITION_SESSIONS.includes(sessionName) && (
                    <CompetitionResults
                      session={data.competition.filter(
                        (s) => s?.name === sessionName,
                      )}
                    />
                  )}
                  {QUALIFYING_SESSIONS.includes(sessionName) && (
                    <QualifyingResults
                      session={data.qualifying.filter(
                        (s) => s?.name === sessionName,
                      )}
                    />
                  )}
                  {PRACTICE_SESSIONS.includes(sessionName) && (
                    <PracticeResults
                      session={data.practice.filter(
                        (s) => s?.name === sessionName,
                      )}
                    />
                  )}
                  {loading && <ResultsTableBodySkeleton />}
                </Table>
              </TabsContent>
            );
          })}
          <ResultsTableOverlay
            year={year as string}
            event={event as string}
            latestSession={sessions.at(-1)?.scheduled_start_time_utc}
          />
        </div>
      </Tabs>
    </div>
  );
}

function ResultsSettingsDropdown() {
  const [alwaysShow, setAlwaysShow] = useLocalStorage(
    'always-show-results',
    false,
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' aria-label='More Options'>
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <DropdownMenuCheckboxItem
              checked={!!alwaysShow}
              onCheckedChange={setAlwaysShow}
            >
              Always show results
            </DropdownMenuCheckboxItem>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ResultsTabList({
  loading,
  sessions,
}: {
  loading: boolean;
  sessions: string[];
}) {
  return SESSION_KEYS.map((key, i) => (
    <TabsTrigger
      disabled={loading}
      className={clsx(
        'w-24 truncate',
        sessions[i] && 'hidden md:inline-flex md:w-auto',
        !loading && !sessions[i] && 'hidden',
      )}
      key={key}
      value={key}
    >
      {loading && (
        <div className='bg-accent/50 h-5 w-16 animate-pulse rounded' />
      )}
      {sessions[i]?.replace('_', ' ')}
    </TabsTrigger>
  ));
}

function SelectTabList({
  loading,
  sessions,
}: {
  loading: boolean;
  sessions: string[];
}) {
  return (
    <Select disabled={loading}>
      <SelectTrigger className='w-fit md:hidden'>
        <SelectValue placeholder='Practice 1' />
      </SelectTrigger>
      <SelectContent>
        {SESSION_KEYS.map((key, i) => (
          <TabsTrigger className='block p-0' value={key} key={key}>
            <SelectItem value={key}>
              {sessions[i]?.replace('_', ' ')}
            </SelectItem>
          </TabsTrigger>
        ))}
      </SelectContent>
    </Select>
  );
}

export function ResultsTableBodySkeleton() {
  return (
    <>
      <TableHeader>
        <TableRow>
          <TableHead className='w-12 text-center'>Pos.</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead className='hidden md:table-cell'>Constructor</TableHead>
          <TableHead>Fastest Lap</TableHead>
          <TableHead className='text-center'>Laps</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((s, idx) => (
          <TableRow key={`skeleton-${idx}`}>
            <TableCell className='text-center'>
              <div className='bg-accent/50 h-5 animate-pulse rounded' />
            </TableCell>
            <TableCell className='font-medium'>
              <div className='bg-accent/50 h-5 animate-pulse rounded' />
            </TableCell>
            <TableCell>
              <div className='bg-accent/50 h-5 animate-pulse rounded' />
            </TableCell>
            <TableCell>
              <div className='bg-accent/50 h-5 animate-pulse rounded' />
            </TableCell>
            <TableCell className='w-12 text-center'>
              <div className='bg-accent/50 h-5 animate-pulse rounded' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}

const ResultsTableOverlay = ({
  year,
  event,
  latestSession,
}: {
  year: string;
  event: string;
  latestSession?: string | null;
}) => {
  const hideResults = shouldHideResults(latestSession);
  const alwaysShowResults = useReadLocalStorage('always-show-results');
  const [hidden, setHidden, removeHidden] = useSessionStorage(
    `results-hidden-${year}-${event}`,
    hideResults,
  );

  useEffect(() => {
    if (alwaysShowResults === 'true') {
      setHidden(false);
    }
  }, [alwaysShowResults, setHidden]);

  // Try to remove item if no longer in threshold timeframe
  if (!hideResults && hidden) {
    removeHidden();
  }

  if (!hidden) return;

  return (
    <div
      onClick={() => setHidden(false)}
      className='absolute inset-0 cursor-pointer rounded border backdrop-blur'
    >
      <div className='sticky top-1/4 flex flex-col items-center gap-2 py-12'>
        <Badge variant='secondary' className='gap-2 text-base'>
          <EyeOff className='size-4' />
          Results are hidden
        </Badge>
        <p>
          Click to show <b>available results</b> for this event
        </p>
        <p className='text-sm'>*Close this tab to hide results again</p>
      </div>
    </div>
  );
};
