# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

CubeCOS UI is a **pnpm monorepo** (no Turborepo) powering the CubeCOS v3 management UI. The main deliverable is an RPM package built from `cube-frontend-web-app`. Node ≥24.15 and pnpm ≥10.33 are required.

## Packages

| Package                        | npm name                        | Purpose                                                                            |
| ------------------------------ | ------------------------------- | ---------------------------------------------------------------------------------- |
| `cube-frontend-web-app`        | `@cube-frontend/web-app`        | Main Vite + React app (ships as RPM)                                               |
| `cube-frontend-ui-library`     | `@cube-frontend/ui-library`     | Shared component library, developed in Storybook                                   |
| `cube-frontend-ui-theme`       | `@cube-frontend/ui-theme`       | Tailwind preset (`cubePreset`) shared by all packages                              |
| `cube-frontend-api`            | `@cube-frontend/api`            | Auto-generated TypeScript SDK from OpenAPI via openapi-generator (Docker required) |
| `cube-frontend-i18n`           | `@cube-frontend/i18n`           | i18n JSON synced from Google Sheets                                                |
| `cube-frontend-utils`          | `@cube-frontend/utils`          | Shared utility functions                                                           |
| `cube-frontend-keycloak-login` | `@cube-frontend/keycloak-login` | Keycloak SSO login app (separate RPM)                                              |

## Common Commands

```bash
# Install all dependencies
pnpm install

# Develop main web app
pnpm web-app:dev

# Develop UI component library (Storybook on port 6006)
pnpm ui-library:dev

# Run all tests
pnpm test

# Run web-app tests only
pnpm web-app:test

# Type-check all packages
pnpm tsc

# Lint (tsc + eslint + prettier check)
pnpm lint

# Format (prettier + eslint --fix)
pnpm format

# Regenerate API SDK (requires Docker)
pnpm api:generate

# Update API SDK submodule + regenerate
pnpm api:update

# Sync i18n translations from Google Sheets
pnpm i18n:sync

# Deploy built web-app to a remote dev host via scp
pnpm web-app:build && pnpm --filter @cube-frontend/web-app deploy-dev
```

## Architecture: Web App

The web app is a React 19 + Vite SPA using react-router v7, Zustand, Tailwind CSS, i18next, and Axios.

### Provider Tree (`App.tsx`)

```
I18nProvider
  DataCenterProvider         ← selected datacenter context
    UserContextProvider      ← logged-in user / roles
      ApplicationIntegrationsContextProvider
        CosTimeZoneProvider
          CosToastProvider
            NotificationsContextProvider
              Layout > CosRoutes
```

### Routing (`CosRoutes.tsx`)

Routes map to page directories under `src/pages/`. Layout routes (e.g., `HomeLayout`, `MaintenanceLayout`, `EventsLayout`, `IntegrationsLayout`) render shared tab bars; create/edit routes are defined **outside** their layout so the shared tabs are hidden on those pages.

### API Layer

- **`src/api/cosApi.ts`** — creates a single Axios instance with base URL `/`, exports one pre-bound instance per OpenAPI resource (e.g., `nodesApi`, `eventsApi`). In dev mode, attaches `devAccessTokenInterceptor`; in prod, attaches `samlAuthErrorInterceptor`.
- **`@cube-frontend/api`** — the generated SDK lives in `packages/cube-frontend-api/sdk/`. Never edit those files manually; regenerate with `pnpm api:generate`.
- All API methods are **bound to their class instance** in `bindMethods()` so they can be passed as callbacks to hooks.

### Request Hooks (`src/hooks/useCosRequest/`)

Three purpose-built hooks replace raw `useEffect`/`fetch` patterns:

| Hook                    | Use case                                                   |
| ----------------------- | ---------------------------------------------------------- |
| `useCosGetRequest`      | GET requests; auto-fetches on mount and when params change |
| `useCosStreamRequest`   | Streaming GET (`?watch=true`) for dashboards/monitoring    |
| `useCosMutationRequest` | POST / PUT / DELETE                                        |

Pass an API method reference and an optional `getParam` factory. Return `null`/`undefined` from `getParam` to suppress the request.

### MSW Mocking (`src/mocks/`)

Mock Service Worker is used in dev to stub API endpoints. Handlers are registered in `src/mocks/handlers.ts`. MSW service worker is served from `public/`.

### State Management

Zustand is used sparingly for cross-page state (e.g., `editTuningsStore`, `topLicenseNaggingStore`). Most state is local or passed via context.

## Architecture: UI Library

Components live in `packages/cube-frontend-ui-library/src/components/`, each in its own directory (e.g., `CosButton/`, `CosModal/`). The library has no build step — `main` points directly to `src/index.ts` and the web app consumes it via workspace symlink. Storybook is the development environment.

All components use the shared Tailwind theme from `@cube-frontend/ui-theme` (the `cubePreset` Tailwind plugin).

## i18n Conventions

Translation keys follow the pattern `page.context.label` for web-app strings and `component.name.label` for UI library strings. Translations are managed in Google Sheets and pulled with `pnpm i18n:sync` (requires `gcloud` ADC with a Bigstack workspace account). For plurals, define both `key` and `key_{other}` with `{{count}}` as the placeholder name.

## Local Dev Setup

1. Copy `packages/cube-frontend-web-app/.env.local.example` to `.env.local` and fill in credentials.
2. For API regeneration: initialize the submodule first (`git submodule update --init`), ensure Docker Desktop is running, then run `pnpm api:generate`.
3. For i18n sync: authenticate with `gcloud auth application-default login`, then run `pnpm i18n:sync`.

## Commit Convention

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint). All commits to the open-source repo must include a DCO sign-off:

```bash
git commit -s -m "feat: add new thing"
```

## Pull Requests

Every PR description must follow the repository PR template at
`.github/PULL_REQUEST_TEMPLATE.md`. Keep all of its sections in order:

- **What type of PR is this?** — one `/kind` line (`bug` / `cleanup` / `documentation` / `feature`).
- **What this PR does / why we need it**
- **Which issue(s) this PR fixes** — `Fixes #<n>` (leave `Fixes #` if none).
- **Special notes for your reviewer**
- **Additional documentation** — inside the `docs` block.

The templates under `.github/ISSUE_TEMPLATE/` (`bug_report.md`, `feature_request.md`)
are for GitHub Issues, not PRs — do not use them for PR descriptions.
