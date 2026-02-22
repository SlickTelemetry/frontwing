import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import appCss from './globals.css?url';
import { ThemeProvider } from 'next-themes';

import { ApolloProvider } from '@/app/apollo-provider';
import NotFoundError from '@/components/errors/not-found-error';
import { Footer } from '@/components/Footer';

import { LandingNav } from '@/app/-components/nav';

export const Route = createRootRoute({
  notFoundComponent: () => (
    <div className='container flex min-h-screen flex-col'>
      <LandingNav />
      <div className='flex flex-1 items-center justify-center'>
        <NotFoundError title='Page not found' link={{ href: '/', title: 'Home' }} />
      </div>
      <Footer />
    </div>
  ),
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Slick Telemetry' },
      {
        name: 'description',
        content: 'Formula 1 Data Analysis',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ApolloProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Outlet />
            <Scripts />
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
