[![CodeQL](https://github.com/SlickTelemetry/frontend/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/SlickTelemetry/frontend/actions/workflows/codeql.yml)

# Frontwing (Frontend) <!-- omit from toc -->

Table of Contents:

- [Setting up the project](#setting-up-the-project)
  - [What you'll need](#what-youll-need)
  - [Install dependencies](#install-dependencies)
  - [Connecting to the backend](#connecting-to-the-backend)
  - [Run the development server](#run-the-development-server)
- [Contributions](#contributions)
  - [Working with GraphQL](#working-with-graphql)
  - [Commit Message Convention](#commit-message-convention)
- [Tests](#tests)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
  - [Folder Structure](#folder-structure)
- [Resources](#resources)

## Setting up the project

### What you'll need

- [VS Code](https://code.visualstudio.com/) / [Intellij WebStorm](https://www.jetbrains.com/webstorm/)
- [Node.js](https://nodejs.org/en) (LTS)
- [pnpm](https://pnpm.io/)

### Install dependencies

```bash
pnpm i
```

### Connecting to the backend

Copy the contents of `.env.example` into `.env` with:

```bash
cp .env.example .env
```

### Run the development server

You can start the server using this command:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Contributions

### Working with GraphQL

We are utilizing GraphQL fragments, recommended with [Codegen](https://the-guild.dev/graphql/codegen), to keep our data, types and components close together. This allows for stricter typing when fetching data, with [Apollo Client](https://www.apollographql.com/docs/react), in our components.

_Generate graphql types after adding or updating a query_

- `pnpm generate`

> **_NOTE:_** We are still exploring advanced features of GraphQL and Apollo Client to enhance efficiency.

### Commit Message Convention

This project is using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), it is mandatory to use it to commit changes.

## Tests

```sh
pnpm cypress install # if you dont have cypress installed
pnpm cy:open
```

## Deployment

The site is deployed at https://slicktelemetry.com using Vercel.

## Project Structure

We are...

- Using NextJs [App Router](https://nextjs.org/docs/app)
- Hosting on [Vercel](https://vercel.com/)
- Monitoring with [Posthog](https://posthog.com/)
- Designing in [Figma](https://www.figma.com/design/4OauoAtraVKgcJaeYB6Qjq/Dashboard-Trial?node-id=0-1&t=WlqH6kA06RgqCWcy-1)

### Folder Structure

```
src/
├── app/ (App Router understanding required)
    ├── ... (Landing page, Not Found, Root Layout)
    ├── _components (Page specific components)
    ├── constructors/ (To Be Removed)
    ├── countdown/ (countdown to next season)
    └── [year]/ (Season page)
        ├── ...
        ├── map/ (Map of season)
        ├── standings/ (season standings)
        └── [event]/ -> (Results, FIA Docs, Event Winners)
            ├── ...
            └── [session]/ -> (WIP)
├── components
    ├── ... (Global components)
    └── ui/ -> Components imported from shadcn
├── hooks
├── lib/ ->
    ├── client.ts (Apollo Client connection)
    ├── constants.ts (Global project values)
    ├── queries.ts (Graphql queries)
    └── utils.ts (All project utils)
├── type/
    ├── global.d.ts (Custom types)
    └── * (Graphql types generated with Codegen)
├── state-mgmt/
```

## Resources

Key tools in use: `shadcn`, `tailwindcss`, `react`, `nextjs`, `pnpm`, `cypress`
