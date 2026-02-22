import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config: CodegenConfig = {
  hooks: { afterAllFileWrite: ['prettier --write'] },
  schema: [
    {
      [import.meta.env.VITE_HASURA_GRAPHQL_URL as string]: {
        headers: {
          'x-hasura-role': import.meta.env.HASURA_GRAPHQL_ADMIN_ROLE as string,
          'x-hasura-admin-secret': import.meta.env
            .HASURA_GRAPHQL_ADMIN_SECRET as string,
        },
      },
    },
  ],
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/types/': {
      preset: 'client',
      config: {
        scalars: {
          bigint: 'number',
          numeric: 'number',
          jsonb: 'unknown',
        },
      },
    },
  },
};
export default config;
