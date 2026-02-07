'use client';
import { useParams } from 'next/navigation';

import { SUPPORTED_SEASONS } from '@/lib/constants';

import NotFoundError from '@/components/errors/not-found-error';

export default function NotFound() {
  const { year } = useParams<{ year: string }>();
  const validYear = SUPPORTED_SEASONS.includes(parseInt(year));
  const linkYear = validYear ? year : SUPPORTED_SEASONS[0];
  const link = {
    href: `/${linkYear}`,
    title: `Back to ${linkYear} Season`,
  };
  return <NotFoundError title='No Session Found' link={link} />;
}
