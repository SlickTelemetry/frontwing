import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  nitro: {
    noExternals: ['graphql'],
  },
  server: {
    port: 3000,
    proxy: {
      '/relay-QqWm/static': {
        target: 'https://us-assets.i.posthog.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/relay-QqWm\/static/, '/static'),
      },
      '/relay-QqWm': {
        target: 'https://us.i.posthog.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/relay-QqWm/, ''),
      },
    },
  },
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    tanstackStart({
      srcDirectory: 'src',
      router: { routesDirectory: 'app' },
    }),
    nitro(),
    viteReact(),
  ],
});
