# @cube-frontend/advisor-ui

The Cube AI Advisor SaaS web UI, built on `@cube-frontend/ui-library`.

## Why it lives in this monorepo

The Advisor's UI is drawn from the same design language as CubeCOS, and the
[UI brief](https://github.com/bigstack-oss/bigstack-handbook/blob/develop/kb/cube-ai-advisor/blueprints/cube-ai-advisor-ui-brief.md)
says the same core is later embedded into the CubeCOS product for customers.
Living beside the component library is what makes that embedding cheap.

## Keeping the exit door open

The Advisor may one day need its own repository, with a dedicated frontend team.
That extraction stays a few days of work rather than a rewrite **only if four
things stay true**, so they are rules here rather than intentions:

1. **Import through package names, never sibling source paths.** `@cube-frontend/ui-library`,
   never `../cube-frontend-ui-library/src/...`. Deep imports are what actually weld
   a package into a monorepo. Enforced by `no-restricted-imports` in the root
   eslint config — a violation fails lint, so it cannot rot quietly.
2. **Every dependency declared here**, never borrowed from the workspace root.
3. **The backend boundary is an artifact, not shared types** — an OpenAPI
   document, the way `cube-cos-api` consumes `cube-cos-openapi`. Nothing here
   imports SaaS internals.
4. **The dependency edge points one way**: `advisor-ui → ui-library`. Never the
   reverse, and never to or from another app.

What extraction would still cost, so it is not a surprise: `@cube-frontend/ui-library`
and `@cube-frontend/ui-theme` are `private`, unversioned, and export raw
TypeScript (`main: ./src/index.ts`). A second repository cannot consume them as
source, so they would need a build, a version and an `exports` map — work owed
the moment _any_ second repository wants those components, not created by this
package.
