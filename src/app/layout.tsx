import clsx from 'clsx';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import './globals.css';

import { ApolloProvider } from '@/app/apollo-provider';

const rubik = Rubik({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Slick Telemetry',
  description: 'Formula 1 Data Analysis',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={clsx(
          'flex min-h-screen flex-col antialiased',
          rubik.className,
        )}
      >
        <ApolloProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
