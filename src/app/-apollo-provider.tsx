'use client';
// ^ this file needs the "use client" pragma

import { ApolloProvider as ApolloProviderBase } from '@apollo/client/react';

import { client } from '@/lib/client';

// you need to create a component to wrap your app in
export function ApolloProvider({ children }: React.PropsWithChildren) {
  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
}
