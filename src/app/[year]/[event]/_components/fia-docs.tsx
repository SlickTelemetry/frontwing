'use client';
import { ArrowUpDown, FileText, Loader2, Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

import { FragmentType, graphql, useFragment } from '@/types';
import { FiaDocsFragment as FIADocsFragmentType } from '@/types/graphql';

const FIADocsFragment = graphql(`
  fragment FIADocs on fia_documents {
    title
    url
    publish_time
  }
`);

type FIADocsProps = {
  documents?: FragmentType<typeof FIADocsFragment>[];
  loading?: boolean;
};

export function FIADocs({ loading, ...props }: FIADocsProps) {
  const documents = useFragment(FIADocsFragment, props?.documents) ?? [];
  const [ascending, setAscending] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // TODO: Contemplate if should separate filtering and sorting logic
  const getDocNumber = (title: string): number | null => {
    const match = title.match(/^Doc\s+(\d+)\s*-/i);
    return match ? parseInt(match[1], 10) : null;
  };

  const viewingDocs = [...documents]
    .filter((d) => d.title.toLowerCase().includes(searchInput.toLowerCase()))
    .sort((a, b) => {
      const aDocNum = getDocNumber(a.title);
      const bDocNum = getDocNumber(b.title);

      // If both have doc numbers, sort by doc number
      if (aDocNum !== null && bDocNum !== null) {
        return ascending ? aDocNum - bDocNum : bDocNum - aDocNum;
      }

      // If neither has doc number, fall back to publish_time
      return ascending
        ? new Date(a.publish_time).getTime() -
            new Date(b.publish_time).getTime()
        : new Date(b.publish_time).getTime() -
            new Date(a.publish_time).getTime();
    });

  return (
    <>
      <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight'>
        FIA Docs
      </h2>
      <div className='flex gap-2 px-px pb-2'>
        <InputGroup>
          <InputGroupInput
            disabled={loading}
            onPaste={(e) => setSearchInput(e.clipboardData.getData('text'))}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder='Search...'
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align='inline-end'>
            {loading ? (
              <Loader2 className='animate-spin' />
            ) : (
              `${viewingDocs.length} docs`
            )}
          </InputGroupAddon>
          <InputGroupAddon align='inline-end'>
            <InputGroupButton onClick={() => setAscending(!ascending)}>
              <ArrowUpDown />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className='relative flex-1 overflow-y-scroll'>
        <div className='from-background sticky top-0 h-4 bg-linear-to-b to-transparent'></div>
        <ul className='-mt-2 px-[3px]'>
          {loading ? (
            <FIADocSkeleton />
          ) : (
            viewingDocs.map((doc) => (
              <li key={doc.url ?? doc.title} className='pt-2 first:pt-0'>
                <FIADocButton {...doc} />
              </li>
            ))
          )}
          {!loading && viewingDocs.length === 0 && (
            <p className='text-muted-foreground py-4 text-center text-sm'>
              No documents found.
            </p>
          )}
        </ul>
        <div className='from-background sticky bottom-0 h-4 bg-linear-to-t to-transparent'></div>
      </div>
    </>
  );
}

function FIADocButton(doc: FIADocsFragmentType) {
  return (
    <Button
      variant='outline'
      disabled={!doc.url}
      className='group h-fit w-full cursor-pointer text-left xl:gap-4'
      aria-label={doc.title}
      onClick={() =>
        doc.url &&
        window.open(
          `https://docs.google.com/gview?embedded=true&url=${doc.url}`,
          // '_blank',
        )
      }
    >
      <FileText className='group-focus:stroke-accent group-hover:stroke-accent size-8' />
      <div className='w-full'>
        <p className='line-clamp-2 leading-snug tracking-tight text-pretty'>
          {doc.title}
        </p>
        <p className='text-sm font-normal'>
          {new Date(doc.publish_time).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            // hourCycle: 'h24',
          })}
        </p>
      </div>
    </Button>
  );
}

function FIADocSkeleton() {
  return Array.from({ length: 10 }).map((_, idx) => (
    <li key={`fia-doc-skeleton-${idx}`} className='pt-2 first-of-type:pt-0'>
      <Button
        variant='outline'
        disabled
        className='h-fit w-full text-left disabled:opacity-80 xl:gap-4'
      >
        <FileText className='stroke-muted size-8 animate-pulse' />
        <div className='w-full space-y-2'>
          <div className='bg-muted h-4 w-3/4 rounded-md' />
          <div className='bg-muted h-3 w-1/4 rounded-md' />
        </div>
      </Button>
    </li>
  ));
}
