import { PostHogProvider } from '@posthog/react';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';

import NotFoundError from '@/components/errors/not-found-error';
import { Footer } from '@/components/Footer';

import { ApolloProvider } from '@/app/-apollo-provider';
import { LandingNav } from '@/app/-components/nav';

import appCss from './globals.css?url';

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2026-01-30',
} as const;

// TODO!: https://posthog.com/docs/error-tracking/upload-source-maps/react

export const Route = createRootRoute({
  notFoundComponent: () => (
    <div className='container flex min-h-screen flex-col'>
      <LandingNav />
      <div className='flex flex-1 items-center justify-center'>
        <NotFoundError
          title='Page not found'
          link={{ href: '/', title: 'Home' }}
        />
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
        <PostHogProvider
          apiKey={import.meta.env.VITE_POSTHOG_KEY}
          options={options}
        >
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
        </PostHogProvider>
      </body>
    </html>
  );
}
