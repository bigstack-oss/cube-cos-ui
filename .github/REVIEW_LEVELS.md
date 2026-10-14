# PR review levels

## TL;DR

Every PR declares one review level in its description, from **A** (a mistake hurts a cluster, its data, or its users) to
**E** (nothing runs differently):

```
Review level: C
```

- **Which level:** answer the [five questions](#1-pick-the-level-five-questions) in order; the first "yes" is the level.
  The [area table](#2-levels-by-area) and the [examples](#3-examples-from-real-prs) show what that means in cube-cos-ui.
- **What it costs:** each level has its own [requirements](#5-what-each-level-requires) for the author and the reviewer.
  They add up: a level needs everything the levels below it need.
- **When in doubt, go higher.** A PR with several kinds of change takes the highest level.

## 1. Pick the level: five questions

Ask in order. Stop at the first "yes".

| #   | Question                                                                                                                                                                                                                       | Yes → |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| 1   | If this is wrong, can it **lock someone out, expose data or credentials, change a running cluster or its hardware the wrong way, lead an operator to a wrong decision about capacity or health, or break a build or release**? | **A** |
| 2   | Does it **add or change a user flow** (several steps, or a form that sends data), or change **code that many pages share** (routing, app shell, shared state, request hooks, how a shared component behaves)?                  | **B** |
| 3   | Does it change **logic**: a condition, calculation, data mapping, sorting or filtering, polling, error handling, or validation?                                                                                                | **C** |
| 4   | Does it change only **what the user sees or reads**: style, layout, text, translations, labels, icons?                                                                                                                         | **D** |
| 5   | Nothing runs differently: docs, comments, tests only, Storybook stories, MSW mocks, dev scripts, editor config, bot version bumps.                                                                                             | **E** |

### What "core logic" means here (always level A)

Core logic is code whose mistakes reach the cluster or mislead the person running it. In cube-cos-ui that is:

- **Login and identity:** the Keycloak login app and its image, tokens, SSO, session and sign-out behavior, the API interceptors.
- **Permissions:** what a role can see or do, including hiding or disabling a button for some roles.
- **Actions that change the cluster:** apply, install, roll back, delete, shut down, reboot, maintenance mode, upgrade, fixpack,
  license, Edit GPU Type, and the guards that decide **when** these actions are allowed.
- **Numbers an operator acts on:** capacity, GPU and vGPU sizing (MIG carves, SR-IOV profiles, remaining capacity),
  quotas, and health or alert states that decide whether someone takes action.
- **Settings that reach outside the cluster:** email sender, TLS, authentication, integrations with external systems.
- **API contract changes:** an SDK or OpenAPI update that removes or renames fields or endpoints.
- **Build and release:** RPM spec files, Vite config, CI workflows written by us, new runtime dependencies, major version bumps.

## 2. Levels by area

What usually puts a PR at each level, per area of the app. Use the five questions when a change is not listed.

| Area                            | A                                                                       | B                                              | C                                                     | D                                    |
| ------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------- | ------------------------------------ |
| **Login** (keycloak-login)      | Any change, including the theme: a broken login page locks everyone out | —                                              | —                                                     | —                                    |
| **Nodes and GPU**               | Edit GPU Type, carve sizing, apply or block rules, remaining capacity   | New GPU panel or modal flow                    | Polling, table data mapping, error shown in a modal   | Column order, padding, menu position |
| **Maintenance and fixpack**     | Install, roll back, node selection for either                           | —                                              | Status display logic                                  | Labels, layout                       |
| **Home and health**             | Health state that decides whether an operator acts                      | New dashboard panel with its own data flow     | Which roles or modules are listed, chart data         | Module display labels, chart colors  |
| **Events and notifications**    | Alert and trigger rules that decide who is notified                     | New trigger builder step                       | Which events appear in a list, filters                | Text, layout                         |
| **Settings and integrations**   | Email sender, TLS, auth, anything with credentials                      | New settings form                              | Form validation                                       | Labels, help text                    |
| **UI library**                  | —                                                                       | Changing how a component behaves on every page | New component, or new props without a behavior change | Look of one component                |
| **i18n**                        | —                                                                       | Wording of a confirmation for a cluster action | Plurals or placeholders (`{{count}}`)                 | Translations, typos, spacing         |
| **API SDK** (cube-frontend-api) | Removes or renames fields or endpoints                                  | —                                              | Adds fields only                                      | —                                    |
| **Repo and CI**                 | Workflows, RPM spec, Vite config, new runtime dependency, major bumps   | —                                              | Minor or patch bump of a runtime dependency           | —                                    |

Level E in every area: docs, comments, tests only, stories, MSW mocks, dev scripts, and version bumps from bots.

## 3. Examples from real PRs

Recent cube-cos-ui commits, with the level each one would get and why.

| Change                                                                     | Level | Why                                                                     |
| -------------------------------------------------------------------------- | ----- | ----------------------------------------------------------------------- |
| fix(nodes): size the MIG-backed carve against the card's nominal capacity  | **A** | Core logic: a wrong size leads to a wrong GPU configuration             |
| fix(nodes): block Edit GPU Type while a card is still changing             | **A** | Guard for an action that changes hardware                               |
| feat(fixpack): pick nodes for install and rollback, show per-node status   | **A** | Install and rollback change a running cluster                           |
| feat(settings): let the email sender skip auth and pick a TLS policy       | **A** | A wrong TLS or auth setting can expose credentials                      |
| fix(login): leave "Sign out from other devices" unchecked                  | **A** | Session behavior on login                                               |
| feat(login): base the keycloak image on 26.7.5                             | **A** | Login image and release                                                 |
| feat: add edit GPU resource type modal                                     | **A** | New flow that changes hardware: level A beats level B                   |
| feat: replace BarChart in web-app with CosColumnChart                      | **B** | Swaps a shared component on several pages                               |
| fix(nodes): warn that an SR-IOV vGPU combination can still fail to apply   | **C** | A condition that shows a warning; it does not block or change the apply |
| fix(nodes): poll GPU cards every 30s, and not at all in a hidden tab       | **C** | Polling logic                                                           |
| fix(home): show only the node roles that have registered nodes             | **C** | Filtering logic                                                         |
| fix(triggers): show every event the cluster reports in the trigger builder | **C** | Data mapping in a list                                                  |
| chore: regenerate the API SDK for a data center's registeredRoles          | **C** | Adds a field only                                                       |
| refactor: fetch GPU console link via useCosGetRequest                      | **C** | Refactor of non-core code; tests must show nothing changed              |
| fix(nodes): keep the GPU row menu inside the panel on wide screens         | **D** | Position only                                                           |
| fix(i18n): add the missing space in "Firmware List"                        | **D** | Translation text                                                        |
| feat(health): add display label for the advisor module                     | **D** | Label only                                                              |
| chore: deploy the dev build as one tar stream instead of scp files         | **E** | Dev script; nothing shipped changes                                     |
| chore: unregister the GPU MSW mock handlers                                | **E** | Mocks only                                                              |
| chore(deps): bump actions/checkout from 7.0.0 to 7.0.1 (Dependabot)        | **E** | Bot bump; the PR's own CI run is the check                              |
| docs: require PRs to follow the PR template                                | **E** | Docs only                                                               |

## 4. Looks like one level, is another

| Looks like                                  | Is    | Because                                                                                               |
| ------------------------------------------- | ----- | ----------------------------------------------------------------------------------------------------- |
| D: one line in a `.tsx` that hides a button | **A** | If the button is hidden for some roles, that is a permission change                                   |
| D: a label in a GPU table                   | **A** | If the label shows a capacity number an operator acts on, it is core logic                            |
| D: a translation                            | **B** | If it changes the meaning of a confirmation for a cluster action                                      |
| C: a refactor                               | **B** | A refactor of core logic: lower than A because behavior must not change, but the whole flow is re-run |
| E: "just tests"                             | **C** | If the PR also changes the code under test                                                            |
| A: a GitHub Actions version bump            | **E** | When Dependabot opens it and CI is green                                                              |
| C: the API SDK update                       | **A** | When a field the UI reads is removed or renamed                                                       |
| B: a new page                               | **A** | When the page can change the cluster                                                                  |

## 5. What each level requires

| Requirement                                                       | A   | B   | C   | D   | E   |
| ----------------------------------------------------------------- | --- | --- | --- | --- | --- |
| CI is green, and the author reviewed their own diff               | ✓   | ✓   | ✓   | ✓   | ✓   |
| Author ran the change in a browser; "How to verify" is filled in  | ✓   | ✓   | ✓   | ✓   |     |
| UI change: Before / After screenshots and `Verified on <sha>`     | ✓   | ✓   | ✓   | ✓   |     |
| UI change: the designer approved the result                       | ✓   | ✓   | ✓   | ✓   |     |
| Related issues and tickets updated (link, status, comment for QA) | ✓   | ✓   | ✓   | ✓   |     |
| Unit tests cover the changed logic and fail without the change    | ✓   | ✓   | ✓   |     |     |
| The whole user flow runs end to end, with a recording             | ✓   | ✓   |     |     |     |
| Empty, error, and permission-denied paths checked                 | ✓   | ✓   |     |     |     |
| Reviewer runs the change (local checkout or a dev host)           | ✓   |     |     |     |     |
| Rollback plan in "Special notes for your reviewer"                | ✓   |     |     |     |     |
| A second approval when the PR touches login, auth, CI, or release | ✓   |     |     |     |     |

How deep the reviewer looks:

| Level | Short name  | The reviewer...                                                       |
| ----- | ----------- | --------------------------------------------------------------------- |
| **A** | Human run   | runs the change themselves, reads every line, and checks the rollback |
| **B** | End-to-end  | watches the recording, reads the code, and spot-checks the tests      |
| **C** | Unit tested | reads the code and the tests                                          |
| **D** | Verified    | compares the screenshots with the issue and skims the code            |
| **E** | Skim        | skims the diff and confirms nothing runs differently                  |

"Skim" is the fastest review, not zero review: CI must pass and one approval is still required.

When a requirement cannot be met (for example, behavior that needs real GPU hardware), say so in
"Special notes for your reviewer" and say who will check it and where.

### End-to-end until we have automated e2e tests

cube-cos-ui has no automated e2e test runner yet. Until it has one, level B means: run the whole flow in a browser
(MSW mocks or a real cluster), follow every step in "How to verify", and attach a short recording (under 2 minutes) with a
`Recording:` line under Screenshots. Once automated e2e tests exist, level B will require a test for the flow.

### Design approval

Any PR that changes what a user sees needs the designer's approval of the "after" screenshots before review.
The author asks the designer with the Before / After table and writes `Design approval: <who>, <link>` in the PR.
Write `Design approval: N/A` with a reason only when there is no design decision: the change brings the UI back to the
existing design, or nothing visible changed. The reviewer may ask for an approval anyway.

### Keep issues and tickets up to date

The PR author owns the related issues and tickets, in this repo and in others (for example `cubecos`):

| When                      | Update                                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The PR opens              | Link the PR (`Fixes #<n>` or `Fixes bigstack-oss/<repo>#<n>`); post the comment for QA: what changed, Before / After, how to test, what is not covered |
| Review changes the PR     | Update the QA comment when the behavior, the screenshots, or the test steps change                                                                     |
| The PR merges             | Check the issue closed or moved to QA; update tickets that `Fixes` cannot close; say which build has the fix                                           |
| The PR is closed unmerged | Say so on the issue, and why                                                                                                                           |

## 6. Rules

1. **The author picks the level** and writes `Review level: <A–E>` in the PR description.
2. **Mixed PRs take the highest level.** If a small part makes the whole PR level A, think about splitting it out.
3. **The reviewer may raise the level** and ask for the missing evidence. Lowering the level needs the reviewer's agreement.
4. **New commits can change the level.** Check it again after every push that changes scope.
5. **Refactors:** a refactor of core logic is level B; other refactors are level C. Tests must show behavior did not change.
6. **Reverts:** a clean revert of a recent PR is level D. Name the PR it reverts.
7. **Bots:** version bumps from Dependabot are level E. A major bump of a runtime dependency is level A, and a person
   takes over the PR.
8. **Hotfixes on `release_*`:** keep the level. A level A hotfix may merge once a reviewer has run it on a dev host.
   The rest of the evidence follows within one working day. Write `Review level: A (hotfix)`.

## 7. How it is checked

The `PR description check` workflow reads the declared level and the changed files. It skips Dependabot PRs.
During the pilot it only **warns** when:

- the PR has no review level
- the changed paths need a higher level than the one declared (see the path floor below)
- the level is C or higher, source files changed, and no test file changed
- the level is B or higher, UI files changed, and there is no `Recording:` line
- a UI PR has no screenshots or no `Verified on <sha>`
- a UI PR has no `Design approval:` line filled in

The check cannot see issues in other repos, so updating them stays on the checklist.

### Path floor used by the check

Paths cannot see meaning, so the check only knows a **floor**. A `.tsx` change that hides a button for some roles has a
floor of D but is level A. The author and the reviewer decide the real level with the five questions.

| Floor | Paths                                                                                                                                                                                   |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A** | `packages/cube-frontend-keycloak-login/`, `packages/cube-frontend-web-app/src/api/`, `.github/workflows/`, `*.spec`, `vite.config.*`                                                    |
| **B** | In `packages/cube-frontend-web-app/src/`: `CosRoutes.tsx`, `App.tsx`, `main.tsx`, `layout/`, `context/`, `stores/`, `hooks/useCosRequest/`                                              |
| **C** | `packages/cube-frontend-api/`, `packages/cube-frontend-utils/src/`, and any non-test `.ts` file under `packages/cube-frontend-web-app/src/` or `packages/cube-frontend-ui-library/src/` |
| **D** | `.tsx`, `.css`, `.scss` under `packages/*/src/`, `packages/cube-frontend-i18n/`, `packages/cube-frontend-ui-theme/`                                                                     |
| **E** | `*.md`, `*.test.ts(x)`, `*.stories.tsx`, `src/mocks/`, everything else                                                                                                                  |

This policy does not change branch protection. The second approval for level A is a team rule, not a GitHub setting.
