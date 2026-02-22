import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: import.meta.env.VITE_HASURA_GRAPHQL_URL || '',
    headers: {
      'x-hasura-role': import.meta.env.VITE_HASURA_ROLE || '',
    },
    fetchOptions: {
      cache: 'force-cache',
      // you can pass additional options that should be passed to `fetch` here,
      // e.g. Next.js-related `fetch` options regarding caching and revalidation
      // see https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
    },
  }),
});
