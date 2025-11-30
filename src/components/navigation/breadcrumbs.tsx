'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { eventLocationDecode, sessionDecode } from '@/lib/utils';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

function Breadcrumbs() {
  const { year, ...params } = useParams<{
    year: string;
    event?: string;
    session?: string;
  }>();

  // const activePage = <></>;
  // if (!params.event || !params.session) {
  //   activePage =
  // }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {!params.event ? (
            <BreadcrumbPage>{year}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={`/${year}`}>{year}</Link>
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
                <BreadcrumbLink asChild>
                  <Link href={`/${year}/${params.event}`}>
                    {eventLocationDecode(params.event)}
                  </Link>
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

export default Breadcrumbs;
