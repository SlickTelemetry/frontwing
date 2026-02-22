import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import appCss from './globals.css?url';

import { ApolloProvider } from '@/app/apollo-provider';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Slick Telemetry' },
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
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        <ApolloProvider>
          <Outlet />
          <Scripts />
        </ApolloProvider>
      </body>
    </html>
  );
}
