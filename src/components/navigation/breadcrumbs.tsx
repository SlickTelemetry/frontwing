'use client';
import { useParams } from 'next/navigation';

import { eventLocationDecode, sessionDecode } from '@/lib/utils';
import useUrlUpdater from '@/hooks/use-url-updater';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function Breadcrumbs() {
  const updateUrl = useUrlUpdater();

  const { year, ...params } = useParams<{
    year: string;
    event?: string;
    session?: string;
  }>();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {!params.event ? (
            <BreadcrumbPage>{year}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              className='cursor-pointer'
              onClick={() => updateUrl('year', year)}
            >
              {year}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {params.event && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {!params.session ? (
                <BreadcrumbPage>
                  {' '}
                  {eventLocationDecode(params.event)}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  className='cursor-pointer'
                  onClick={() => updateUrl('event', params.event ?? '')}
                >
                  {eventLocationDecode(params.event)}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        )}
        {params.session && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {sessionDecode(params.session).replace('_', ' ')}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
