# Next.js → TanStack Start Migration Plan

This plan is tailored to the **frontwing** (Slick Telemetry) codebase and follows the [TanStack Start migration guide](https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js). Run commands yourself; order matters.

---

## Phase 0: Prerequisites & Backup

- [ ] **Backup / branch**: Create a migration branch, e.g. `git checkout -b migrate/tanstack-start`.
- [ ] **Node/pnpm**: Ensure Node 24.11.x and pnpm 10.x (per `package.json` engines).
- [ ] **Document current behavior**: Quick smoke test of main flows (home, year, event, session, standings, map, constructor, countdown) so you can verify after migration.

---

## Phase 1: Remove Next.js and Install TanStack

### 1.1 Uninstall Next.js and remove config

```bash
pnpm remove next @tailwindcss/postcss next-sitemap
```

Delete these files:

- `next.config.js`
- `postcss.config.mjs`
- `next-sitemap.config.js` (sitemap will be replaced later; see Phase 6)

### 1.2 Install TanStack Start and Vite deps

```bash
pnpm add @tanstack/react-router @tanstack/react-start
pnpm add -D vite @vitejs/plugin-react @tailwindcss/vite vite-tsconfig-paths
```

---

## Phase 2: Project Configuration

### 2.1 `package.json` scripts

Replace Next scripts with Vite/TanStack:

```json
"scripts": {
  "dev": "vite dev",
  "build": "vite build",
  "start": "node .output/server/index.mjs",
  "cy:open": "cypress open",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix && pnpm format",
  "lint:strict": "eslint --max-warnings=0",
  "typecheck": "tsc --pretty --noEmit --incremental false",
  "generate": "graphql-codegen --config codegen.ts"
}
```

- Remove `postbuild` (next-sitemap). Add sitemap/robots later (Phase 6).
- Ensure `"type": "module"` exists in `package.json`.

### 2.2 `vite.config.ts` (create at repo root)

```ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    tanstackStart({
      srcDirectory: 'src',
      router: { routesDirectory: 'app' },
    }),
    viteReact(),
  ],
})
```

### 2.3 PostHog rewrites (Next.js → Vite proxy)

Move rewrites from `next.config.js` into Vite `server.proxy` in `vite.config.ts`:

```ts
export default defineConfig({
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
  // ... plugins
})
```

Adjust `rewrite` if your exact paths differ. TanStack/Vite may also support trailing-slash behavior via router or server config; document `skipTrailingSlashRedirect` and replicate if needed.

### 2.4 `tsconfig.json`

- Remove `"plugins": [{ "name": "next" }]`.
- Remove `"next-env.d.ts"` and `.next` from `include`/exclude; add Vite types if needed, e.g. `"types": ["vite/client"]` or reference `@tanstack/react-start` types per their docs.
- Keep `"paths": { "@/*": ["./src/*"] }`; `vite-tsconfig-paths` will use it.

### 2.5 Environment variables (codegen & GraphQL client)

- Vite exposes **client** env via `import.meta.env.VITE_*`, not `process.env.NEXT_PUBLIC_*`.
- Your `codegen.ts` and `src/lib/client.ts` use `NEXT_PUBLIC_HASURA_GRAPHQL_URL`, `NEXT_PUBLIC_HASURA_ROLE`; codegen also uses `HASURA_GRAPHQL_ADMIN_*` (server-only for schema fetch).
- **Options**: (A) Add `VITE_HASURA_GRAPHQL_URL` and `VITE_HASURA_ROLE` in `.env`, and in `vite.config.ts` pass them through if codegen runs in Node with `dotenv`; or (B) Keep `NEXT_PUBLIC_*` and in Vite define `define: { 'process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL': JSON.stringify(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL) }` (and same for role) so existing code keeps working. For codegen, keep using `dotenv.config()` so schema fetch still sees admin secret; for browser, switch to `import.meta.env.VITE_*` when you’re ready and update `client.ts` and any component that reads those vars.
- **Production**: When you deploy, replicate these env vars on the host and keep names consistent (see **Phase 9: Deploy**).

---

## Phase 3: Root Layout and Router Bootstrap

### 3.1 Root layout: `src/app/layout.tsx` → `src/app/__root.tsx`

- **Rename** `src/app/layout.tsx` to `src/app/__root.tsx`.
- **Replace** content with TanStack root route pattern:
  - Use `createRootRoute` from `@tanstack/react-router`.
  - Replace Next `metadata` with `head: () => ({ meta: [...], links: [...] })` (title, description, viewport, etc.).
  - Import globals CSS via `import appCss from './globals.css?url'` and add a `links` entry for it.
  - Root component: render `<html>`, `<head>` with `<HeadContent />`, `<body>` with `<Outlet />` and `<Scripts />`.
  - Wrap children with `ApolloProvider` and `ThemeProvider` (next-themes) as you do today.
- **Fonts**: Remove `next/font` (Rubik). Use Tailwind + Fontsource (or similar):
  - `pnpm add -D @fontsource-variable/rubik` (or closest variable/family).
  - In `globals.css`: `@import '@fontsource-variable/rubik';` and in `@theme` set `--font-sans` (or a named class) to Rubik. Apply that class or variable to `body` in `__root.tsx`.

### 3.2 Router entry: `src/router.tsx` (new file)

Create `src/router.tsx`:

```tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
  })
}
```

TanStack Start will generate `routeTree.gen` from your `app` routes; create this file after the first route files exist (or run dev once to generate).

---

## Phase 4: Route and File Structure Mapping

Map App Router paths to TanStack file-based routes under `src/app` (with `routesDirectory: 'app'`).

| Next.js path / file | TanStack Start file |
|---------------------|---------------------|
| `app/layout.tsx` | `app/__root.tsx` (done in Phase 3) |
| `app/page.tsx` | `app/index.tsx` |
| `app/not-found.tsx` | `app/not-found.tsx` or error boundary (see TanStack error boundaries) |
| `app/[year]/layout.tsx` | `app/$year.tsx` (layout route: component with `<Outlet />`) |
| `app/[year]/page.tsx` | `app/$year/index.tsx` |
| `app/[year]/not-found.tsx` | `app/$year/not-found.tsx` or route-level error |
| `app/[year]/map/page.tsx` | `app/$year/map.tsx` |
| `app/[year]/map/layout.tsx` | Layout in `app/$year/map.tsx` or a layout route as needed |
| `app/[year]/standings/page.tsx` | `app/$year/standings.tsx` |
| `app/[year]/standings/layout.tsx` | Same: layout in route or parent |
| `app/[year]/[event]/page.tsx` | `app/$year/$event/index.tsx` or `app/$year/$event.tsx` (check TanStack nested index) |
| `app/[year]/[event]/layout.tsx` | `app/$year/$event.tsx` (layout with Outlet) |
| `app/[year]/[event]/not-found.tsx` | `app/$year/$event/not-found.tsx` |
| `app/[year]/[event]/[session]/page.tsx` | `app/$year/$event/$session.tsx` (or index under $session) |
| `app/[year]/[event]/[session]/layout.tsx` | Layout in same file or parent |
| `app/[year]/[event]/[session]/not-found.tsx` | `app/$year/$event/$session/not-found.tsx` |
| `app/constructor/[id]/page.tsx` | `app/constructor/$id.tsx` |
| `app/countdown/page.tsx` | `app/countdown.tsx` |

Use TanStack’s “layout route” pattern: a route file that exports a component rendering `<Outlet />` for nested segments. Nested layouts (e.g. year, event, session) become such layout routes with child routes underneath.

---

## Phase 5: Per-File Code Replacements

### 5.1 Navigation and params

- **Link**: `import Link from 'next/link'` → `import { Link } from '@tanstack/react-router'`. Replace `href` with `to`.
- **Params**: `params: Promise<{ year: string }>` + `use(params)` → `Route.useParams()` in the component (e.g. `const { year } = Route.useParams()`). Same for `event`, `session`, `id`.
- **Search params**: `useSearchParams()` → `Route.useSearch()` (returns typed search object).
- **Router**: `useRouter()` → `useRouter()` from `@tanstack/react-router` (e.g. `router.push()`, `router.navigate()`).
- **Pathname**: `usePathname()` → path from router or `Route.useLocation().pathname` (or equivalent from TanStack Router).
- **notFound()**: Use TanStack’s `notFound()` from router or throw/return a not-found route/component; see TanStack “not found” / error boundary docs.

### 5.2 Images

- **next/image**: Replace with `@unpic/react` (or standard `<img>`) per migration guide.
  - `pnpm add @unpic/react`
  - Use `<Image src={...} width={...} height={...} alt={...} />` (numeric width/height). Remove Next-specific props; replicate `remotePatterns` via Unpic config or allowlist if needed.

### 5.3 Root layout and metadata

- **Root**: Already covered in Phase 3 (metadata → `head`, font → Fontsource + CSS).
- **Nested metadata** (e.g. `[year]/layout.tsx` `generateMetadata`): Use route `head` in the corresponding TanStack route file (e.g. `app/$year.tsx`) so each segment can set title/description.

### 5.4 Cookies / server-only (e.g. `[year]/layout.tsx`)

- **`cookies()` from `next/headers`**: In TanStack Start use **Server Functions** or **environment/request context** to read cookies on the server and pass into layout. Example: create a server function that returns sidebar state, call it from the layout route’s loader or component (if SSR), and pass result as props or context. Alternatively use client-side cookie read for sidebar state to avoid server dependency.

### 5.5 Hooks that use Next APIs

- **`use-url-updater.ts`**: Replace `usePathname` / `useRouter` with TanStack’s `useRouter()` and path from `useLocation()` or route params; build the new path the same way and call `router.navigate(nextPath)` (or equivalent).

### 5.6 Global “not found”

- Keep a single `not-found` route/component and wire it via TanStack’s notFound handling so all `notFound()`-style flows render your existing `NotFoundError` + layout.

### 5.7 GraphQL & codegen (keep as-is; optional TanStack Query path)

You already use **GraphQL Code Generator** (client preset, `./src/types/`) and `graphql` + `useFragment` / `FragmentType` from `@/types`. This is compatible with TanStack Start and does not need to change.

- **Recommended (minimal change)**: Keep **Apollo Client** and your current pattern (`useQuery` with typed documents from `@/types`). Ensure `ApolloProvider` wraps the app in `__root.tsx` and that the GraphQL client uses the correct env (see 2.5). Your `pnpm run generate` script and `codegen.ts` stay as-is; only env access for schema URL may need to work under Node when running codegen (e.g. keep `dotenv` and `NEXT_PUBLIC_*` or switch codegen to read `VITE_*` from a small env loader).
- **Optional (TanStack Query + graphql-request)**: You can later migrate to [TanStack Query with GraphQL](https://tanstack.com/query/latest/docs/framework/react/graphql): same **codegen output** (`@/types`) works with `graphql-request` and `useQuery` from `@tanstack/react-query` for full type safety. That doc uses `graphql-request` + GraphQL Code Generator; your generated `graphql(...)` and typed document types are the same idea. If you adopt this, you’d replace Apollo’s `useQuery` with TanStack Query’s `useQuery` and use `request(endpoint, document, variables)` as the `queryFn`, and keep using your existing generated types. No change to codegen config is required for that optional step.

---

## Phase 6: Sitemap and robots

- **next-sitemap**: Remove. Add a custom sitemap/robots solution:
  - **Option A**: TanStack/Vite plugin or build script that emits `sitemap.xml` and `robots.txt` from route tree or a list of URLs (e.g. from your GraphQL/cms).
  - **Option B**: Server route (if TanStack supports it) that returns sitemap XML and robots.txt.
  - Reuse `siteUrl: 'https://slicktelemetry.com'` and policies from `next-sitemap.config.js`.

---

## Phase 7: Cleanup and Verification

### 7.1 Remove Next-specific files and references

- Delete `next-env.d.ts` if present.
- Remove any remaining `import ... from 'next/...'` (search for `from 'next/` and `from "next/`).
- Remove `"use client"` where it was only for Next; keep it only where required for client-only code (e.g. Apollo, theme, browser APIs). TanStack Start’s execution model may differ; follow their “Code Execution Patterns” / “Import Protection” docs.

### 7.2 Generate route tree and run dev

- Run `pnpm dev`. Fix any missing-route or generation errors; ensure `src/routeTree.gen.ts` (or equivalent) is generated from `src/app`.
- Resolve TypeScript errors (Route types, params, search params).
- Fix ESLint/Prettier as needed.

### 7.3 Manual and E2E tests

- Re-run smoke tests: home, `/2024`, `/2024/monaco`, `/2024/monaco/race`, standings, map, constructor, countdown.
- Run `pnpm run cy:open` and fix Cypress tests that depend on Next (e.g. `next/link`, `next/navigation`, or base URL).

### 7.4 Build and production

- `pnpm build`. Fix any static generation or server build issues.
- `pnpm start` and test production build locally.
- Re-enable or add sitemap/robots in build or at runtime (Phase 6).

---

## Phase 8: Optional and Follow-ups

- **Trailing slashes**: If you relied on `skipTrailingSlashRedirect`, replicate with TanStack/Vite (router config or server).
- **Image domains**: If you add server-side or build-time image optimization, mirror previous `remotePatterns` (via Unpic or similar) for via.placeholder.com, media.formula1.com, www.formula1.com.
- **Cypress**: Update baseUrl or visit paths if dev server URL or structure changed.
- **Vercel**: If you deploy on Vercel, check TanStack Start’s Vercel adapter or deployment docs and adjust build/output.

---

## Phase 9: Deploy

**Current**: Site is hosted on **Vercel**. TanStack Start is [designed to work with any hosting provider](https://tanstack.com/start/latest/docs/framework/react/guide/hosting). Official hosting partners are **Cloudflare**, **Netlify**, and **Railway**. Use the [TanStack Start Hosting guide](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) as the source of truth; below is a condensed checklist plus env/deploy notes for this project.

### 9.1 Deployment options (from Hosting guide)

| Target | Approach | Notes |
|--------|----------|--------|
| **Vercel** | [Nitro](https://tanstack.com/start/latest/docs/framework/react/guide/hosting#nitro) then Vercel one-click | Follow Nitro deployment instructions first. |
| **Node.js / Docker** | Nitro | `pnpm build` → `pnpm start` → `node .output/server/index.mjs`. Scripts: `"build": "vite build"`, `"start": "node .output/server/index.mjs"`. |
| **Railway** ⭐ | Nitro then connect repo | Auto-detects build; follow Nitro then connect GitHub. |
| **Netlify** ⭐ | `@netlify/vite-plugin-tanstack-start` | Add plugin to `vite.config.ts`; deploy with `npx netlify deploy`. Manual: `publish = "dist/client"`, build = `vite build`. |
| **Cloudflare Workers** ⭐ | `@cloudflare/vite-plugin` + Wrangler | Different pipeline: no `start`; use `pnpm run deploy` (build + wrangler deploy). Requires `wrangler.jsonc` and plugin order as per docs. |
| **Bun** | Nitro with `preset: 'bun'` or custom Bun server | React 19 required for Bun-specific path. |

**Nitro (shared for Vercel / Node / Railway / Bun):** Install nightly and add to `vite.config.ts`:

```json
"nitro": "npm:nitro-nightly@latest"
```

```ts
import { nitro } from 'nitro/vite'
// plugins: [tanstackStart(), nitro(), viteReact()]
```

Build output with Nitro is under **`.output/`** (not `dist/`). For Appwrite with Nitro v2/v3, output dir is `./.output`; some hosts use `./dist` for client-only.

### 9.2 Build and start commands

- **Build**: `pnpm build` (Vite + Nitro if using Nitro). Output: `.output/` when using Nitro.
- **Start** (Node/Nitro): `pnpm start` → `node .output/server/index.mjs`. Set this as the start command on Vercel/Node/Railway when using the Node/Nitro path.
- **Cloudflare**: No `start`; use `pnpm run deploy` (build + `wrangler deploy`). See Hosting guide for script changes.

### 9.3 Environment variables (deploy checklist)

| Variable | Used by | Notes |
|----------|---------|--------|
| **Client (browser)** | | |
| `NEXT_PUBLIC_HASURA_GRAPHQL_URL` | Apollo `client.ts` | If you switch to Vite env (Phase 2.5), rename to `VITE_HASURA_GRAPHQL_URL` in app code and in **every** host’s dashboard. |
| `NEXT_PUBLIC_HASURA_ROLE` | Apollo `client.ts` | Same: optional rename to `VITE_HASURA_ROLE`. |
| PostHog / analytics | PostHog script | Keep existing keys; no change unless you rename. |
| **Server / build only** | | |
| `HASURA_GRAPHQL_ADMIN_ROLE` | `codegen.ts` (schema fetch) | Only needed at **build time** if you run `pnpm run generate` on the host (e.g. in build step). If codegen runs locally only, not needed in deploy env. |
| `HASURA_GRAPHQL_ADMIN_SECRET` | `codegen.ts` | Same as above. |
| **Optional** | | |
| Any other `NEXT_PUBLIC_*` | App or libs | When moving off Next, decide: keep names and use Vite `define`, or migrate to `VITE_*` and update host env names everywhere. |

- **Vercel**: Env vars are in Project → Settings → Environment Variables. If you rename to `VITE_*`, update them there and ensure “Expose to Browser” (or equivalent) is set for client vars.
- **Other hosts**: Same idea—set the same names you use in code (either `NEXT_PUBLIC_*` with Vite `define`, or `VITE_*`). For Node-style deploy, server-only vars are usually not exposed to the client.

### 9.4 Platform-specific notes

- **Vercel**: Use Nitro deployment (9.1), then Vercel one-click. Set build command (`pnpm build`), output dir (per Vercel + Nitro docs), and start command if using Node server. Env vars: Project → Settings → Environment Variables.
- **Node / Railway**: `pnpm build` then `pnpm start`; set env in the host UI. Node version should match `engines` (24.x).
- **Netlify**: Add `@netlify/vite-plugin-tanstack-start`; `publish` can be `dist/client` with build command `vite build` (see Hosting guide for manual config).
- **Cloudflare**: Different flow (Wrangler, no `start`); follow [Hosting guide – Cloudflare Workers](https://tanstack.com/start/latest/docs/framework/react/guide/hosting#cloudflare-workers-) for plugin order, `wrangler.jsonc`, and script changes.

### 9.5 Things to confirm at deploy time

- [ ] Build command and output dir match host config.
- [ ] Start command (if applicable) is set correctly.
- [ ] All client env vars are set on the host (and use the same names as in code / Vite `define`).
- [ ] Codegen: if you run `pnpm run generate` in CI or on the host, build-time env (Hasura admin role/secret) is available there.
- [ ] PostHog proxy (Phase 2.3) works in production or PostHog is configured for your production domain.

---

## File-by-File Checklist (high level)

| Area | Action |
|------|--------|
| `src/app/__root.tsx` | Root layout + head + font via CSS |
| `src/router.tsx` | Create router with routeTree |
| `src/app/index.tsx` | Home page: Link, Image → TanStack Link, Unpic |
| `src/app/not-found.tsx` | Wire to TanStack not-found |
| `src/app/$year.tsx` | Year layout + head; cookies → server fn or client |
| `src/app/$year/index.tsx` | Season page: params, notFound, Link |
| `src/app/$year/map.tsx` | Map page: params, search, router |
| `src/app/$year/standings.tsx` | Standings: params, search, Link |
| `src/app/$year/$event.tsx` | Event layout |
| `src/app/$year/$event/index.tsx` (or single file) | Event page |
| `src/app/$year/$event/$session.tsx` | Session page |
| `src/app/constructor/$id.tsx` | Constructor page |
| `src/app/countdown.tsx` | Countdown page |
| All shared components using `Link` / `useParams` / `useRouter` / `usePathname` / `useSearchParams` | Replace with TanStack Router APIs |
| `use-url-updater.ts` | Use TanStack router and location |
| GraphQL codegen (`codegen.ts`, `pnpm run generate`, `@/types`) | Keep as-is; works with TanStack Start. Env vars: see Phase 2.5. |
| Apollo Client (or optional TanStack Query + graphql-request) | Keep Apollo in root; optionally migrate to TanStack Query + graphql-request using same codegen later ([TanStack Query GraphQL](https://tanstack.com/query/latest/docs/framework/react/graphql)). |
| PostHog, next-themes | Keep; ensure they work with new root (no changes if only wrapping in root). |

---

## References

- [Migrate from Next.js | TanStack Start](https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js)
- [Hosting | TanStack Start](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) — Nitro, Vercel, Node, Cloudflare, Netlify, Railway, Bun
- TanStack Start: Routing, Server Functions, Error Boundaries, Head/Meta
- Your existing codebase: `src/app`, `src/components`, `src/hooks`, `src/lib`

Good luck with the migration. Run Phase 1–2 first, then 3–4, then 5–7 in order; adjust file names if TanStack’s generator expects a slightly different convention (e.g. `$year.index.tsx` vs `$year/index.tsx`).
