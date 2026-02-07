import NotFoundError from '@/components/errors/not-found-error';
import { Footer } from '@/components/Footer';

import { LandingNav } from '@/app/_components/nav';

const link = {
  href: '/',
  title: 'Home',
};
export default function NotFound() {
  return (
    <div className='container flex flex-1 flex-col items-center'>
      <LandingNav />

      <NotFoundError title='Page not found' link={link} />

      <Footer />
    </div>
  );
}
