# Next.js → TanStack Start Migration Plan <!-- omit from toc -->

This plan is tailored to the **frontwing** (Slick Telemetry) codebase and follows the [TanStack Start migration guide](https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js). Run commands yourself; order matters.

---

Table of Contents:

- [Phase 0: Prerequisites \& Backup](#phase-0-prerequisites--backup)
- [Phase 1: Remove Next.js and Install TanStack](#phase-1-remove-nextjs-and-install-tanstack)
  - [1.1 Uninstall Next.js and remove config](#11-uninstall-nextjs-and-remove-config)
  - [1.2 Install TanStack Start and Vite deps](#12-install-tanstack-start-and-vite-deps)
- [Phase 2: Project Configuration](#phase-2-project-configuration)
  - [2.1 `package.json` scripts](#21-packagejson-scripts)
  - [2.2 `vite.config.ts` (create at repo root)](#22-viteconfigts-create-at-repo-root)
  - [2.3 PostHog rewrites (Next.js → Vite proxy)](#23-posthog-rewrites-nextjs--vite-proxy)
  - [2.4 `tsconfig.json`](#24-tsconfigjson)
  - [2.5 Environment variables (codegen \& GraphQL client)](#25-environment-variables-codegen--graphql-client)
- [Phase 3: Root Layout and Router Bootstrap](#phase-3-root-layout-and-router-bootstrap)
  - [3.1 Root layout: `src/app/layout.tsx` → `src/app/__root.tsx`](#31-root-layout-srcapplayouttsx--srcapp__roottsx)
  - [3.2 Router entry: `src/router.tsx` (new file)](#32-router-entry-srcroutertsx-new-file)
- [Phase 4: Route and File Structure Mapping](#phase-4-route-and-file-structure-mapping)
  - [4.1 File-based routing conventions (from TanStack Router – File-Based Routing)](#41-file-based-routing-conventions-from-tanstack-router--file-based-routing)
- [Phase 5: Per-File Code Replacements](#phase-5-per-file-code-replacements)
  - [5.1 Navigation and params](#51-navigation-and-params)
  - [5.2 Images](#52-images)
  - [5.3 Root layout and document head (metadata)](#53-root-layout-and-document-head-metadata)
  - [5.4 Cookies / server-only (e.g. `[year]/layout.tsx`)](#54-cookies--server-only-eg-yearlayouttsx)
  - [5.5 Hooks that use Next APIs](#55-hooks-that-use-next-apis)
  - [5.6 Not-found errors (Not Found Errors)](#56-not-found-errors-not-found-errors)
  - [5.7 GraphQL \& codegen (keep as-is; optional TanStack Query path)](#57-graphql--codegen-keep-as-is-optional-tanstack-query-path)
- [Phase 6: Sitemap and robots](#phase-6-sitemap-and-robots)
- [Phase 7: Cleanup and Verification](#phase-7-cleanup-and-verification)
  - [7.1 Remove Next-specific files and references](#71-remove-next-specific-files-and-references)
  - [7.2 Generate route tree and run dev](#72-generate-route-tree-and-run-dev)
  - [7.3 Manual and E2E tests](#73-manual-and-e2e-tests)
  - [7.4 Build and production](#74-build-and-production)
- [Phase 8: Optional and Follow-ups](#phase-8-optional-and-follow-ups)
- [Phase 9: Deploy](#phase-9-deploy)
  - [9.1 Deployment options (from Hosting guide)](#91-deployment-options-from-hosting-guide)
  - [9.2 Build and start commands](#92-build-and-start-commands)
  - [9.3 Environment variables (deploy checklist)](#93-environment-variables-deploy-checklist)
  - [9.4 Platform-specific notes](#94-platform-specific-notes)
  - [9.5 Things to confirm at deploy time](#95-things-to-confirm-at-deploy-time)
  - [9.6 Vercel + Nitro troubleshooting](#96-vercel--nitro-troubleshooting)
- [Lessons from /map and /standings Migration](#lessons-from-map-and-standings-migration)
  - [Imports from `-components`](#imports-from--components)
  - [notFoundComponent on parent routes](#notfoundcomponent-on-parent-routes)
  - [Empty data vs. invalid year](#empty-data-vs-invalid-year)
  - [useParams with `strict: false`](#useparams-with-strict-false)
  - [DashParams type (shared components)](#dashparams-type-shared-components)
  - [Link type assertions](#link-type-assertions)
  - [Route layout structure](#route-layout-structure)
  - [Search params](#search-params)
  - [Cookies (still TODO)](#cookies-still-todo)
- [Lessons from /$year, /$year/$event, and /$year/$event/$session Migration](#lessons-from-year-yearevent-and-yeareventsession-migration)
  - [Index route must use `createFileRoute`](#index-route-must-use-createfileroute)
  - [`Link` also requires `search` for routes with `validateSearch`](#link-also-requires-search-for-routes-with-validatesearch)
  - [Param type inconsistency across routes](#param-type-inconsistency-across-routes)
  - [`-components` import resolution with deep dynamic paths](#-components-import-resolution-with-deep-dynamic-paths)
  - [Shared components: `useParams` and type guards](#shared-components-useparams-and-type-guards)
  - [Programmatic navigation and `next/navigation` replacement](#programmatic-navigation-and-nextnavigation-replacement)
  - [`notFoundComponent` on event and session routes](#notfoundcomponent-on-event-and-session-routes)
  - [Throw `notFound` with `routeId` to preserve layout](#throw-notfound-with-routeid-to-preserve-layout)
- [ESLint integration (TODO)](#eslint-integration-todo)
- [File-by-File Checklist (high level)](#file-by-file-checklist-high-level)
- [References](#references)

---

## Phase 0: Prerequisites & Backup

- [ ] **Backup / branch**: Create a migration branch, e.g. `git checkout -b migrate/tanstack-start`.
- [ ] **Node/pnpm**: Ensure Node 24.13.x and pnpm 10.x (per `package.json` engines).
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
import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

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
});
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
});
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
  - Replace Next `metadata` with **`head: () => ({ ... })`** (see [Document Head Management](https://tanstack.com/router/v1/docs/guide/document-head-management)): the callback returns an object with `title`, `meta`, `links`, `styles`, and `scripts`. Use `meta: [{ title: '...' }, { name: 'description', content: '...' }, ...]` and `links` for CSS/favicon.
  - Import globals CSS via `import appCss from './globals.css?url'` and add a `links` entry for it.
  - Root component: render `<html>`, `<head>` with **`<HeadContent />`**, `<body>` with `<Outlet />` and **`<Scripts />`**. Both `<HeadContent />` and `<Scripts />` are **required** so route head and body scripts are applied.
  - Wrap children with `ApolloProvider` and **`ThemeProvider` from `next-themes`**. The `next-themes` package is framework-agnostic (not part of Next.js); keep it and use it in the root layout as you do today.
- **Fonts**: Remove `next/font` (Rubik). Use Tailwind + Fontsource (or similar):
  - `pnpm add -D @fontsource-variable/rubik` (or closest variable/family).
  - In `globals.css`: `@import '@fontsource-variable/rubik';` and in `@theme` set `--font-sans` (or a named class) to Rubik. Apply that class or variable to `body` in `__root.tsx`.

### 3.2 Router entry: `src/router.tsx` (new file)

Create `src/router.tsx`:

```tsx
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    // optional: defaultNotFoundComponent for routes with children; notFoundMode: 'fuzzy' | 'root'
  });
}
```

TanStack Start will generate `routeTree.gen` from your `app` routes; create this file after the first route files exist (or run dev once to generate). For not-found handling, see §5.6; set **`notFoundComponent`** on `__root.tsx` (and optionally on $year, $event, $session).

---

## Phase 4: Route and File Structure Mapping

Map App Router paths to TanStack file-based routes under `src/app` (with `routesDirectory: 'app'`).

| Next.js path / file                          | TanStack Start file                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------------------ |
| `app/layout.tsx`                             | `app/__root.tsx` (done in Phase 3)                                                   |
| `app/page.tsx`                               | `app/index.tsx`                                                                      |
| `app/not-found.tsx`                          | Use **`notFoundComponent`** on `__root.tsx` (see §5.6); no separate not-found route. |
| `app/[year]/layout.tsx`                      | `app/$year.tsx` (layout route: component with `<Outlet />`)                          |
| `app/[year]/page.tsx`                        | `app/$year/index.tsx`                                                                |
| `app/[year]/not-found.tsx`                   | Use **`notFoundComponent`** on `app/$year.tsx` (e.g. “No Season Found” UI).          |
| `app/[year]/map/page.tsx`                    | `app/$year/map/route.tsx` (layout) + `app/$year/map/index.tsx` (page)                |
| `app/[year]/map/layout.tsx`                  | `app/$year/map/route.tsx` (layout with head, Outlet)                                 |
| `app/[year]/standings/page.tsx`              | `app/$year/standings/route.tsx` (layout) + `app/$year/standings/index.tsx` (page)    |
| `app/[year]/standings/layout.tsx`            | `app/$year/standings/route.tsx` (layout with head, Outlet)                           |
| `app/[year]/[event]/page.tsx`                | `app/$year/$event/index.tsx` or `app/$year/$event.tsx` (check TanStack nested index) |
| `app/[year]/[event]/layout.tsx`              | `app/$year/$event.tsx` (layout with Outlet)                                          |
| `app/[year]/[event]/not-found.tsx`           | **`notFoundComponent`** on `app/$year/$event.tsx`.                                   |
| `app/[year]/[event]/[session]/page.tsx`      | `app/$year/$event/$session.tsx` (or index under $session)                            |
| `app/[year]/[event]/[session]/layout.tsx`    | Layout in same file or parent                                                        |
| `app/[year]/[event]/[session]/not-found.tsx` | **`notFoundComponent`** on `app/$year/$event/$session.tsx` (or parent).              |
| `app/constructor/[id]/page.tsx`              | `app/constructor/$id.tsx`                                                            |
| `app/countdown/page.tsx`                     | `app/countdown.tsx`                                                                  |

Use TanStack’s “layout route” pattern: a route file that exports a component rendering `<Outlet />` for nested segments. Nested layouts (e.g. year, event, session) become such layout routes with child routes underneath.

**Layout in route vs layout route** (for map, standings, etc.): In Next.js you have `page.tsx` + optional `layout.tsx` per segment. In TanStack there are no separate layout files per segment—only route files. Two approaches: **(1) Single route file**: Put everything in `app/$year/map.tsx`: the route’s `component` renders the full page (and any map-specific wrapper), and use the route’s `head` for title/description (replacing Next `generateMetadata`). No extra layout file. **(2) Layout route**: If you need a dedicated wrapper with its own `<Outlet />` and child routes (e.g. `/$year/map` and `/$year/map/something`), then `$year/map.tsx` becomes a layout-only file (component = sidebar + `<Outlet />`) and you add `$year/map/index.tsx` for the main map page. **Implemented for map and standings**: Use **(2)** — `$year/map/route.tsx` (or `$year/standings/route.tsx`) with `head` and `<Outlet />`, plus `$year/map/index.tsx` (or `$year/standings/index.tsx`) for the page. Import colocated components via `@/` path alias (see **Lessons from /map and /standings**).

### 4.1 File-based routing conventions (from [TanStack Router – File-Based Routing](https://tanstack.com/router/latest/docs/routing/file-based-routing))

- **Directories vs dots**: You can use **directories** for hierarchy (`$year/index.tsx`, `$year/map.tsx`) or **flat filenames with `.`** (`$year.index.tsx`, `$year.map.tsx`). Both can be mixed in the same app.
- **Special filenames**:
  - `__root.tsx` = root layout (no path).
  - `index.tsx` = exact path for that segment (e.g. `$year/index.tsx` → `/2024`).
  - `$param` = dynamic segment (`$year`, `$event`, `$session`).
  - `_name` = **pathless layout** (adds a layout component but no URL segment; e.g. `_pathlessLayout.tsx` then `_pathlessLayout.route-a.tsx` → `/route-a`).
  - `$.tsx` = **catch-all** (e.g. `files/$.tsx` → `/files/...`).
- **Directory routes**: A folder like `$year/` with `index.tsx` and `map.tsx` gives `/$year` and `/$year/map`. In this project: `$year/`, `$year/$event/`, `$year/$event/$session/`, `constructor/$id.tsx`.
- **Flat routes**: Same nesting with dots: `$year.index.tsx` = `/$year` (exact), `$year.$event.tsx` = `/$year/$event`, `$year_.$event.$session.tsx` = pathless layout + `/$year/$event/$session`.
- **Excluding files and folders** ([Routing Concepts](https://tanstack.com/router/latest/docs/routing/routing-concepts#excluding-files-and-folders-from-routes)): Prefix a **`-`** to exclude a file or folder from route generation. Excluded paths are **not** added to `routeTree.gen.ts` but can still be **imported** into route files—useful for colocating components, utils, or tables next to routes. Examples: `-components/`, `-schedule-table.tsx`. Your Next.js **`_components`** folders (e.g. `[year]/_components/nav.tsx`) are **not** route segments in Next; in TanStack, **`_`** means pathless layout. To keep colocated non-route code, use **`-components`** so those files/folders are ignored by the router. **Import gotcha**: Relative imports like `./-components/chart` can fail; use the `@/` alias instead (e.g. `@/app/$year/standings/-components/chart/chart`).
- **Pathless route group directories**: Use **`()`** (e.g. `(app)/`, `(auth)/`) to group route files for organization only; they do not affect the route tree or URL paths.
- **Source of truth**: The [File-Based Routing](https://tanstack.com/router/latest/docs/routing/file-based-routing) and [Routing Concepts](https://tanstack.com/router/latest/docs/routing/routing-concepts) docs define filename → route path, layout vs pathless, and exclusions.

---

## Phase 5: Per-File Code Replacements

### 5.1 Navigation and params

- **Link**: `import Link from 'next/link'` → `import { Link } from '@tanstack/react-router'`. Replace `href` with `to`.
- **Params** ([Dynamic and Catch-All Routes](https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js#dynamic-and-catch-all-routes), [useParams](https://tanstack.com/router/v1/docs/api/router/useParamsHook)):
  - Next: `params: Promise<{ year: string }>` + `use(params)` in the component.
  - TanStack: **`Route.useParams()`** in the component (e.g. `const { year } = Route.useParams()`). Same for `event`, `session`, `id`.
  - Alternative: **`useParams({ from: '/$year/$event/$session' })`** when you need params outside the route file; or **`getRouteApi('/$year/$event/$session').useParams()`**.
  - **`useParams` options**: `strict` (default true), `shouldThrow` (default true), `select` for derived values. Use **`strict: false`** in shared components that render across routes (sidebar, breadcrumbs, etc.) — returns partial params; see **Lessons from /map and /standings** for typing patterns.
- **Dynamic route migration pattern**: Use `createFileRoute('/$year/$event/$session')` and in the component `const { year, event, session } = Route.useParams()`. No `await params`.
- **Catch-all routes**: For `app/$year/$.tsx` (path `/$year/...`), access the splat via **`const { _splat } = Route.useParams()`**.
- **Search params**: `useSearchParams()` → **`Route.useSearch()`** (returns typed search object). Add `validateSearch` on the route for type safety.
- **Router**: `useRouter()` → `useRouter()` from `@tanstack/react-router` (e.g. `router.push()`, `router.navigate()`).
  - **`router.navigate()` to routes with `validateSearch`**: TanStack Router requires the **`search`** object when navigating to a route that defines `validateSearch`. TypeScript infers the search shape from `validateSearch`'s return type. You must pass a complete `search` object; optional keys still need to be present with `undefined` (e.g. `search: { chart: 'grid', drivers: undefined }`). Passing a raw string path to `navigate()` is not supported—use `{ to, params, search }` instead.
- **Pathname**: `usePathname()` → `Route.useLocation().pathname` or `useLocation().pathname`.
- **notFound()**: In loaders (or components), **throw notFound()** from `@tanstack/react-router` when a resource is missing; the nearest route with **`notFoundComponent`** (or root) will render. See §5.6 and [Not Found Errors](https://tanstack.com/router/latest/docs/guide/not-found-errors).

### 5.2 Images

- **next/image**: Replace with `@unpic/react` (or standard `<img>`) per migration guide.
  - `pnpm add @unpic/react`
  - Use `<Image src={...} width={...} height={...} alt={...} />` (numeric width/height). Remove Next-specific props; replicate `remotePatterns` via Unpic config or allowlist if needed.

### 5.3 Root layout and document head (metadata)

- **Root**: Already covered in Phase 3 (metadata → `head`, font → Fontsource + CSS).
- **Hydration mismatch (next-themes)**: Add **`suppressHydrationWarning`** to `<html>` in `__root.tsx`. ThemeProvider adds `className="dark"` and `style` to `<html>` on the client but not on server; without this, React logs hydration warnings.
- **Nested metadata** (e.g. `[year]/layout.tsx` `generateMetadata`): Use route **`head`** in the corresponding TanStack route file (e.g. `app/$year.tsx`) so each segment can set title/description. TanStack **dedupes** title and meta: nested routes override parent (last occurrence wins). See [Document Head Management](https://tanstack.com/router/v1/docs/guide/document-head-management).
- **Head shape**: `head: () => ({ meta: [...], links: [...], styles: [...], scripts: [...] })`. Title can be in `meta` as `{ title: 'Page Title' }`. Body scripts (e.g. analytics) use the `scripts` property and are rendered by `<Scripts />` in the root layout.
- **Theme / FOUC**: For theme (e.g. next-themes) that must apply before hydration, the guide recommends **`ScriptOnce`** from `@tanstack/react-router`: it runs once before React hydrates, then removes itself. Use with `suppressHydrationWarning` on `<html>` if the script mutates the document.

### 5.4 Cookies / server-only (e.g. `[year]/layout.tsx`)

- **`cookies()` from `next/headers`**: In TanStack Start use **Server Functions** or **environment/request context** to read cookies on the server and pass into layout. Example: create a server function that returns sidebar state, call it from the layout route’s loader or component (if SSR), and pass result as props or context. Alternatively use client-side cookie read for sidebar state to avoid server dependency.

- **TODO — Sidebar**: The year layout's `SidebarProvider` currently uses hardcoded `defaultOpen={true}`. Migrate from Next.js `cookies()` to one of: (1) client-side `document.cookie` parse in `useEffect`; (2) TanStack Server Function reading the `Cookie` header; or (3) `localStorage` instead of cookie.

### 5.5 Hooks that use Next APIs

- **`use-url-updater.ts`**: Replace `usePathname` / `useRouter` with TanStack’s `useRouter()` and path from `useLocation()` or route params; build the new path the same way and call `router.navigate(nextPath)` (or equivalent).

### 5.6 Not-found errors ([Not Found Errors](https://tanstack.com/router/latest/docs/guide/not-found-errors))

TanStack Router uses **`notFoundComponent`** on routes and **`notFound()`** (throw in loader or component)—**not** a separate `not-found` route file. The old `NotFoundRoute` API is deprecated.

- **Two cases**: (1) **Non-matching path** (no route for the URL, or extra path segments)—router throws automatically. (2) **Missing resource** (e.g. invalid year, event, session)—you **throw `notFound()`** in the route’s **loader** (or in a component; prefer loader to avoid flicker).
- **Handling**: Attach **`notFoundComponent`** to any route. The not-found UI is rendered by the **nearest parent route that has an `<Outlet />` and a `notFoundComponent`** (or by the root if none). **Root route** should have a `notFoundComponent` so there is always a fallback (otherwise you get TanStack’s minimal default).
- **`notFoundMode`** (in `createRouter`): **`'fuzzy'`** (default)—use nearest suitable parent’s `notFoundComponent`, keeping layout context. **`'root'`**—always use the root route’s `notFoundComponent`.
- **Migration**: Reuse your existing `NotFoundError` (and year-specific not-found UI) as the **component** you pass to **`notFoundComponent`** on `__root.tsx` and on `$year.tsx` (and optionally `$event`, `$session`). In loaders (e.g. `$year/index.tsx`, session page), call **`throw notFound()`** when data is missing; that will render the appropriate `notFoundComponent`. No separate `app/not-found.tsx` route—instead, in `__root.tsx`: `notFoundComponent: () => <YourGlobalNotFound />`.
- **Router-wide default**: Optionally pass **`defaultNotFoundComponent`** to `createRouter` so any route with children that doesn’t define its own `notFoundComponent` uses this default.
- **Targeting a specific route**: `throw notFound({ routeId: '/$year' })` to force the year layout’s `notFoundComponent` instead of bubbling. Throwing in **beforeLoad** always goes to the root `notFoundComponent`.

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

- **ESLint integration**: See **ESLint integration (TODO)** section below — explicit config path, `files` pattern for `$` paths, lint-staged workaround, TanStack ESLint config.
- **Trailing slashes**: If you relied on `skipTrailingSlashRedirect`, replicate with TanStack/Vite (router config or server).
- **Image domains**: If you add server-side or build-time image optimization, mirror previous `remotePatterns` (via Unpic or similar) for via.placeholder.com, media.formula1.com, www.formula1.com.
- **Cypress**: Update baseUrl or visit paths if dev server URL or structure changed. **TODO**: Update Cypress test config/workflow to support TanStack framework (component tests, e2e router interactions, etc.).
- **PostHog sourcemaps**: **TODO**: Re-enable sourcemap generation and upload to PostHog (e.g. build-time sourcemaps + upload step with `releaseVersion`, `deleteAfterUpload`) so production errors resolve to original source in PostHog.
- **PostHog CORS**: **TODO**: Configure CORS for error resolution on PostHog so the project’s production domain is allowed for error reporting.
- **Vercel**: If you deploy on Vercel, check TanStack Start’s Vercel adapter or deployment docs and adjust build/output.

---

## Phase 9: Deploy

**Current**: Site is hosted on **Vercel**. TanStack Start is [designed to work with any hosting provider](https://tanstack.com/start/latest/docs/framework/react/guide/hosting). Official hosting partners are **Cloudflare**, **Netlify**, and **Railway**. Use the [TanStack Start Hosting guide](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) as the source of truth; below is a condensed checklist plus env/deploy notes for this project.

### 9.1 Deployment options (from Hosting guide)

| Target                    | Approach                                                                                                  | Notes                                                                                                                                        |
| ------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vercel**                | [Nitro](https://tanstack.com/start/latest/docs/framework/react/guide/hosting#nitro) then Vercel one-click | Follow Nitro deployment instructions first.                                                                                                  |
| **Node.js / Docker**      | Nitro                                                                                                     | `pnpm build` → `pnpm start` → `node .output/server/index.mjs`. Scripts: `"build": "vite build"`, `"start": "node .output/server/index.mjs"`. |
| **Railway** ⭐            | Nitro then connect repo                                                                                   | Auto-detects build; follow Nitro then connect GitHub.                                                                                        |
| **Netlify** ⭐            | `@netlify/vite-plugin-tanstack-start`                                                                     | Add plugin to `vite.config.ts`; deploy with `npx netlify deploy`. Manual: `publish = "dist/client"`, build = `vite build`.                   |
| **Cloudflare Workers** ⭐ | `@cloudflare/vite-plugin` + Wrangler                                                                      | Different pipeline: no `start`; use `pnpm run deploy` (build + wrangler deploy). Requires `wrangler.jsonc` and plugin order as per docs.     |
| **Bun**                   | Nitro with `preset: 'bun'` or custom Bun server                                                           | React 19 required for Bun-specific path.                                                                                                     |

**Nitro (shared for Vercel / Node / Railway / Bun):** Install nightly and add to `vite.config.ts`:

```json
"nitro": "npm:nitro-nightly@latest"
```

```ts
import { nitro } from 'nitro/vite';
// plugins: [tanstackStart(), nitro(), viteReact()]
```

Build output with Nitro is under **`.output/`** (not `dist/`). For Appwrite with Nitro v2/v3, output dir is `./.output`; some hosts use `./dist` for client-only.

### 9.2 Build and start commands

- **Build**: `pnpm build` (Vite + Nitro if using Nitro). Output: `.output/` when using Nitro.
- **Start** (Node/Nitro): `pnpm start` → `node .output/server/index.mjs`. Set this as the start command on Vercel/Node/Railway when using the Node/Nitro path.
- **Cloudflare**: No `start`; use `pnpm run deploy` (build + `wrangler deploy`). See Hosting guide for script changes.

### 9.3 Environment variables (deploy checklist)

| Variable                         | Used by                     | Notes                                                                                                                                                  |
| -------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Client (browser)**             |                             |                                                                                                                                                        |
| `NEXT_PUBLIC_HASURA_GRAPHQL_URL` | Apollo `client.ts`          | If you switch to Vite env (Phase 2.5), rename to `VITE_HASURA_GRAPHQL_URL` in app code and in **every** host’s dashboard.                              |
| `NEXT_PUBLIC_HASURA_ROLE`        | Apollo `client.ts`          | Same: optional rename to `VITE_HASURA_ROLE`.                                                                                                           |
| PostHog / analytics              | PostHog script              | Keep existing keys; no change unless you rename.                                                                                                       |
| **Server / build only**          |                             |                                                                                                                                                        |
| `HASURA_GRAPHQL_ADMIN_ROLE`      | `codegen.ts` (schema fetch) | Only needed at **build time** if you run `pnpm run generate` on the host (e.g. in build step). If codegen runs locally only, not needed in deploy env. |
| `HASURA_GRAPHQL_ADMIN_SECRET`    | `codegen.ts`                | Same as above.                                                                                                                                         |
| **Optional**                     |                             |                                                                                                                                                        |
| Any other `NEXT_PUBLIC_*`        | App or libs                 | When moving off Next, decide: keep names and use Vite `define`, or migrate to `VITE_*` and update host env names everywhere.                           |

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

### 9.6 Vercel + Nitro troubleshooting

**Symptom**: After deploy, requests return `{"status":500,"unhandled":true,"message":"HTTPError"}`. Runtime logs show:

```
Error: Cannot find package '/var/task/node_modules/graphql/index' imported from /var/task/_libs/apollo__client.mjs
```

**Cause**: Apollo Client imports the `graphql` package. Nitro externalizes it by default, so it is not bundled into the serverless function. Vercel’s dependency tracing may not include it correctly, or ESM resolution fails for the external reference.

**Fix**: Bundle the `graphql` package into the Nitro server output by adding to `vite.config.ts`:

```ts
export default defineConfig({
  nitro: {
    noExternals: ['graphql'],
  },
  // ...rest
});
```

This ensures `graphql` is bundled (not externalized) so Apollo Client can resolve it at runtime. For Nitro v3, use `noExternals`; older Nitro versions may use `externals.inline`.

---

## Lessons from /map and /standings Migration

When migrating complex routes like `/map` and `/standings`, the following was discovered:

### Imports from `-components`

- **Avoid relative imports** like `./-components/chart` or `./-components/legend` — module resolution can fail (especially on Windows or when the path segment starts with `-`).
- **Use the `@/` alias** instead: `@/app/$year/standings/-components/chart/chart`, `@/app/$year/standings/-components/legend`, etc.

### notFoundComponent on parent routes

- When a **child** route (e.g. standings) throws `notFound()`, the **parent** route (`/$year`) must have **`notFoundComponent`** configured.
- Otherwise TanStack Router warns and falls back to a generic `<p>Not Found</p>`.
- Add `notFoundComponent: YearNotFound` to `$year.tsx` so child 404s render the year-specific “No Season Found” UI.

### Empty data vs. invalid year

- **Supported year, no data** (e.g. 2026 before events exist): Render an **in-page empty state**; do **not** throw `notFound()`. Show a message like “No standings data for {year} yet” and a link back to the season.
- **Unsupported year** (not in `SUPPORTED_SEASONS`): Throw `notFound()` so the parent’s `notFoundComponent` shows “No Season Found” with the supported years list.

### useParams with `strict: false`

- **Shared components** (sidebar, breadcrumbs, event-selector, etc.) that render across multiple routes need params from the current URL but may not be inside a specific route's component tree. Use **`useParams({ strict: false })`** so the hook returns whatever params exist for the matched route.
- With `strict: false`, TanStack returns **`Partial`** types — TypeScript can't guarantee which params exist (e.g. on `/$year` you get `{ year }`, on `/$year/$event` you get `{ year, event }`).
- **Proper typing options**:
  1. **Inside a route file**: Use **`Route.useParams()`** (or `createFileRoute('/$year/standings/')().useParams()`) — full type safety, no optional params.
  2. **Shared component, known route**: Use **`useParams({ from: '/$year/standings/' })`** — typed if the component is only ever used under that route.
  3. **Shared component, multiple routes**: Use **`strict: false`** plus a type assertion: `useParams({ strict: false }) as { year?: string | number; event?: string | number }`, then normalize: `const year = params.year != null ? String(params.year) : undefined`.

### DashParams type (shared components)

- When using `strict: false`, params are partial; align **`DashParams`** in `global.d.ts` with optional properties: `{ year?, event?, session? }`.
- In `formatLink` and similar helpers, guard for missing params and use `String(params?.year ?? '')` etc.

### Link type assertions

- Links to routes that may not yet exist in the generated route tree (or dynamic paths) can trigger TypeScript errors.
- Workaround: `to={path as '/'}` or `to={... as any}` until the route tree is regenerated via `pnpm dev`.

### Route layout structure

- Use **`route.tsx`** for the layout (head metadata, `<Outlet />`) and **`index.tsx`** for the page.
- Example: `$year/standings/route.tsx` + `$year/standings/index.tsx`.

### Search params

- Use **`validateSearch`** on the route for typed search (e.g. `chart: 'drivers' | 'constructors'`).
- In components, use **`Route.useSearch()`** instead of `useSearchParams()`.
- **`router.navigate()` requires `search`** when targeting a route with `validateSearch`. The router infers the search type from the validator, so `search` must be a full object. Optional params must be explicitly set to `undefined` (e.g. `search: { chart: 'grid', drivers: undefined }`); omitting them causes TypeScript errors.

### Cookies (still TODO)

- **Sidebar `defaultOpen`**: The year layout still needs to migrate from Next.js `cookies()` for sidebar state. See **Phase 5.4** for options (client-side read, Server Function, or `localStorage`).

---

## Lessons from /$year, /$year/$event, and /$year/$event/$session Migration

When migrating the season, event, and session routes, the following was discovered:

### Index route must use `createFileRoute`

- **Symptom**: The season page (`/$year`, e.g. `/2026`) renders blank — sidebar and layout appear, but main content is empty.
- **Cause**: The `$year/index.tsx` file used the Next.js pattern (`params: Promise<{ year }>`, `use(params)`) and did not call `createFileRoute`. TanStack Router only registers routes that export a Route from `createFileRoute`; without it, the index route is never added to the route tree, so the `Outlet` has nothing to render.
- **Fix**: Use `createFileRoute('/$year/')({ component: SeasonPage })` and `Route.useParams()` instead of the `params` prop and `use()`.

### `Link` also requires `search` for routes with `validateSearch`

- In addition to `router.navigate()`, **`<Link>` components** targeting a route with `validateSearch` must include the **`search`** prop.
- Example: `<Link to='/$year/$event/$session' params={{ year, event, session }} search={{ chart: 'grid', drivers: undefined }} />`
- Same rule applies for `/standings` (e.g. `search={{ chart: 'drivers' }}`) and `/map` (e.g. `search={{ event: undefined }}`).

### Param type inconsistency across routes

- **`/$year`**: Some `Link` usages (e.g. nav season dropdown) expect `params={{ year }}` with `year` as a **number**.
- **`/$year/$event`**, **`/$year/$event/$session`**: Expect `year`, `event`, `session` as **strings** in params.
- **Rule of thumb**: Use `String(...)` for path params when the route type expects string; omit it when the route type expects number. When in doubt, check the route's typed params.

### `-components` import resolution with deep dynamic paths

- The `@/` alias (`@/app/$year/$event/$session/-components/...`) can fail module resolution in some setups (TypeScript/IDE), causing "Cannot find module" even when the file exists.
- **Fallback**: Use **relative imports** from within the same `-components` tree: `../driver-filters/context`, `./bar-chart`, etc. This avoids the long `$year/$event/$session` path in the alias.
- Prefer `@/` when it works; use relative imports if resolution fails.

### Shared components: `useParams` and type guards

- Components used across routes (breadcrumbs, event-selector, session-selector, event-results-container) use `useParams({ strict: false })`, which returns `Partial` types.
- **Normalize before use**: `const yearStr = params.year != null ? String(params.year) : ''`; for GraphQL variables: `parseInt(String(year ?? ''), 10)`.
- Replace `next/navigation` `useParams` with TanStack `useParams` in all shared components.

### Programmatic navigation and `next/navigation` replacement

- **`SessionTime`**, **schedule-sessions**, and similar components: Replace `useRouter` from `next/navigation` with `useNavigate` from `@tanstack/react-router`.
- Use `navigate({ to, params, search })` instead of `router.push(pathString)`.
- Include `search` when the target route has `validateSearch`.

### `notFoundComponent` on event and session routes

- Add `notFoundComponent` to `$year/$event/route.tsx` and `$year/$event/$session/route.tsx` for event/session-specific 404 UI (e.g. "No Event Found", "No Session Found" with links back to season).

### Throw `notFound` with `routeId` to preserve layout

- **Symptom**: Invalid URLs (e.g. `/5646/standings`, `/68745/miami_gp`) show a generic "404 Page not found" with broken layout/theme — no sidebar, unstyled.
- **Cause**: Without `routeId`, `notFound()` bubbles to the root route. The root's `notFoundComponent` replaces the layout tree, so theme and sidebar are lost.
- **Fix**: Use **`throw notFound({ routeId: '/$year' })`** (or the appropriate parent route) so the parent's `notFoundComponent` renders within the layout:
  - Invalid year → `routeId: '/$year'` (YearNotFound with supported seasons list)
  - Invalid event → `routeId: '/$year/$event'` (EventNotFound)
  - Invalid session → `routeId: '/$year/$event/$session'` (SessionNotFound)

---

## ESLint integration (TODO)

ESLint flat config and lint-staged integration may need tuning:

- **Explicit config path**: Use `-c eslint.config.mjs` in lint scripts and lint-staged so the config is picked up reliably (e.g. when cwd differs in git hooks): `eslint -c eslint.config.mjs . --max-warnings=0`.
- **`files` in flat config**: Add explicit `files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx']` to the main ESLint config block so paths with `$` (e.g. `$year.tsx`) match and avoid "no matching configuration" warnings.
- **lint-staged + paths with `$`**: On Windows, lint-staged passes file paths to ESLint. Paths like `src/app/$year.tsx` can trigger shell variable expansion (`$year`). Workaround: run `eslint .` (lint the whole project) in lint-staged instead of passing individual file paths, so no path with `$` is passed through the shell.
- **TanStack ESLint config**: The `@tanstack/eslint-config` is commented out in `eslint.config.mjs` (`// ...tanstackConfig, // TODO!: here be dragons!`). Integrate when ready; verify compatibility with existing plugins.

---

## File-by-File Checklist (high level)

| Area                                                                                               | Action                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/app/__root.tsx`                                                                               | Root layout + head + font via CSS; add **`notFoundComponent`** (reuse `NotFoundError`). See §5.6.                                                                                                |
| `src/router.tsx`                                                                                   | Create router with routeTree; optional `defaultNotFoundComponent`, `notFoundMode`.                                                                                                               |
| `src/app/index.tsx`                                                                                | Home page: Link, Image → TanStack Link, Unpic                                                                                                                                                    |
| `src/app/$year.tsx`                                                                                | Year layout + head + **`notFoundComponent`** (e.g. “No Season Found”); **TODO**: sidebar `defaultOpen` from cookies (see §5.4)                                                                   |
| `src/app/$year/index.tsx`                                                                          | Season page: params, notFound, Link                                                                                                                                                              |
| `src/app/$year/map/route.tsx`                                                                      | Map layout: head, Outlet                                                                                                                                                                         |
| `src/app/$year/map/index.tsx`                                                                      | Map page: params, search, router                                                                                                                                                                 |
| `src/app/$year/standings/route.tsx`                                                                | Standings layout: head, Outlet                                                                                                                                                                   |
| `src/app/$year/standings/index.tsx`                                                                | Standings: params, search, Link; empty-state for no-data years                                                                                                                                   |
| `src/app/$year/$event.tsx`                                                                         | Event layout                                                                                                                                                                                     |
| `src/app/$year/$event/index.tsx` (or single file)                                                  | Event page                                                                                                                                                                                       |
| `src/app/$year/$event/$session.tsx`                                                                | Session page                                                                                                                                                                                     |
| `src/app/constructor/$id.tsx`                                                                      | Constructor page                                                                                                                                                                                 |
| `src/app/countdown.tsx`                                                                            | Countdown page                                                                                                                                                                                   |
| All shared components using `Link` / `useParams` / `useRouter` / `usePathname` / `useSearchParams` | Replace with TanStack Router APIs                                                                                                                                                                |
| `use-url-updater.ts`                                                                               | Use TanStack router and location                                                                                                                                                                 |
| GraphQL codegen (`codegen.ts`, `pnpm run generate`, `@/types`)                                     | Keep as-is; works with TanStack Start. Env vars: see Phase 2.5.                                                                                                                                  |
| Apollo Client (or optional TanStack Query + graphql-request)                                       | Keep Apollo in root; optionally migrate to TanStack Query + graphql-request using same codegen later ([TanStack Query GraphQL](https://tanstack.com/query/latest/docs/framework/react/graphql)). |
| PostHog, next-themes (`ThemeProvider`)                                                             | Keep; next-themes is framework-agnostic, not Next.js—use in root as today.                                                                                                                       |
| ESLint (`eslint.config.mjs`, lint-staged)                                                          | **TODO**: See ESLint integration section. Use `-c eslint.config.mjs`; add `files` pattern; consider `eslint .` in lint-staged to avoid `$` path expansion.                                       |

---

## References

- [Migrate from Next.js | TanStack Start](https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js)
- [File-Based Routing | TanStack Router](https://tanstack.com/router/latest/docs/routing/file-based-routing) — directories vs flat (dots), `__root`, `index`, `$param`, `_pathless`, `$.tsx` catch-all, mixed usage
- [Routing Concepts | TanStack Router](https://tanstack.com/router/latest/docs/routing/routing-concepts) — layout routes, pathless layouts, **excluding files/folders with `-`**, pathless groups `()`, optional params
- [Not Found Errors | TanStack Router](https://tanstack.com/router/latest/docs/guide/not-found-errors) — `notFoundComponent`, `notFound()`, `notFoundMode`, `defaultNotFoundComponent`, root vs fuzzy
- [Dynamic and Catch-All Routes | TanStack Start Migrate](https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js#dynamic-and-catch-all-routes) — `Route.useParams()`, `_splat` for catch-all
- [useParams hook | TanStack Router](https://tanstack.com/router/v1/docs/api/router/useParamsHook) — `useParams({ from, select, strict, shouldThrow })`, `getRouteApi().useParams()`
- [Document Head Management | TanStack Router](https://tanstack.com/router/v1/docs/guide/document-head-management) — `head`, `HeadContent`, `Scripts`, deduping, nested meta, `ScriptOnce`
- [Hosting | TanStack Start](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) — Nitro, Vercel, Node, Cloudflare, Netlify, Railway, Bun
- TanStack Start: Routing, Server Functions, Error Boundaries, Head/Meta
- Your existing codebase: `src/app`, `src/components`, `src/hooks`, `src/lib`

Good luck with the migration. Run Phase 1–2 first, then 3–4, then 5–7 in order; adjust file names if TanStack’s generator expects a slightly different convention (e.g. `$year.index.tsx` vs `$year/index.tsx`).
