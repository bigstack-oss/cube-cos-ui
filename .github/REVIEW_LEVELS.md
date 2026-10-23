# PR review levels and UI tiers

## TL;DR

Every PR declares two things under "Special notes for your reviewer":

```
Review level: C    (risk: what the author proves, how deep the reviewer looks)
UI tier: low       (design: copied from the ticket)
```

They are separate: a level A fix can be UI tier none, and a level D change can be UI tier medium.
When in doubt, pick the higher one. A PR with several kinds of change takes the highest.

## 1. Review level

Ask in order. The first "yes" is the level.

| Level             | Question                                                                                                                                                              | Examples                                                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **A** Human run   | Can a mistake lock someone out, expose credentials, change a cluster or its hardware the wrong way, mislead an operator about capacity or health, or break a release? | MIG carve sizing, fixpack install and rollback, email TLS, the login theme, hiding a button for some roles, removing an API field |
| **B** End-to-end  | Does it add or change a user flow, or code that many pages share?                                                                                                     | A new page or form, routing, shared hooks and state, replacing a shared chart, a refactor of level A code                         |
| **C** Unit tested | Does it change logic: a condition, calculation, data mapping, polling, or validation?                                                                                 | GPU polling, filtering node roles, an SDK update that only adds fields, other refactors                                           |
| **D** Verified    | Does it change only what the user sees or reads?                                                                                                                      | Menu position, padding, labels, translations                                                                                      |
| **E** Skim        | Nothing runs differently.                                                                                                                                             | Docs, tests only, stories, MSW mocks, dev scripts, Dependabot                                                                     |

Judge by what the change can break, not by the file path.

Requirements add up: each level needs everything the levels below it need.

| Level | Author, before review                                                                                               | Reviewer                                                        |
| ----- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| E     | CI is green; you reviewed your own diff                                                                             | Skims the diff (one approval is still required)                 |
| D     | + ran it in a browser; steps to verify in the PR; related issues updated (section 3)                                | Checks the screenshots                                          |
| C     | + unit tests that fail without the change                                                                           | Reads the code and the tests                                    |
| B     | + the whole flow end to end, including empty, error, and permission-denied paths; link the E2E test plan and report | Reads the test plan and report                                  |
| A     | + a rollback plan in the PR; link an ELI5 explainer                                                                 | Runs the change; a second approval for login, auth, CI, release |

cube-cos-ui has no automated e2e tests yet, so level B means a run in a browser for now.

The documents go in the "Read more" table under "Additional documentation", for PRs that change code. Use links the
whole team can open; share Claude artifacts with the organization.

| Document        | What it holds                                                    | Required for |
| --------------- | ---------------------------------------------------------------- | ------------ |
| ELI5 explainer  | The change in plain words and pictures, for reviewers new to it  | A            |
| E2E test plan   | Each case: steps, expected result, the before / after to compare | A, B         |
| E2E test report | Each case passed or failed, with annotated screenshots           | A, B         |

## 2. UI tier

The UI tier lives on the ticket: the ticket owner sets a `ui:<tier>` label. The PR copies it:

- **One ticket:** use its tier.
- **Several tickets:** use the highest.
- **A ticket without a tier:** add the label to the ticket first, then copy it.
- **No ticket:** the PR author picks the tier.

The reviewer may change the tier. If it changes, update the ticket label too.

| Tier         | When                                                                                        | Before you build                                                                          | Designer review                                |
| ------------ | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **critical** | A new page, feature, or flow; a shared component; a major change to a flow                  | The designer designs it and signs it off. Link it in the issue                            | Before you build, and at the PR (blocks merge) |
| **medium**   | A new element on an existing page (field, column, variant, token); a small change to a flow | Build a mockup with Claude Code from existing components and tokens. Link it in the issue | At the PR (blocks merge)                       |
| **low**      | Adjust existing UI: spacing, missing states, responsive fixes, aligning to the design, copy | Same as medium                                                                            | No gate; checked at the sprint-end sync        |
| **none**     | The screen does not change                                                                  | —                                                                                         | —                                              |

For every tier except none:

- Reuse existing components and tokens; no hard-coded px or colors. If the change grows, change the tier.
- Screenshots in the PR: Before / After for each viewport the page supports and each state the acceptance criteria
  name. Critical and medium also show empty, error, and loading.
- Critical and medium: request the designer as a PR reviewer, then write `Design approval: @<designer>, <link>`.
- At sprint end, the sync owner syncs merged UI to the team design system. The designer checks low changes and files
  follow-up issues.

## 3. Issues and tickets

The PR author keeps the related issues up to date, in every repo. Issues often live in `cubecos`:
`Fixes bigstack-oss/cubecos#<n>`.

- **PR opens:** link it, and post a comment for QA: what changed, Before / After, how to test, what is not covered.
- **Review changes the behavior or the screenshots:** update that comment.
- **After merge:** check that the issue closed or moved to QA, and say which build has the fix.

## 4. Rules

- The reviewer may raise the level or the tier. Lowering either needs the reviewer's agreement. Check both again after
  a push that changes the scope.
- A clean revert is level D. Dependabot PRs are level E; a major bump of a runtime dependency is level A.
- A hotfix on `release_*` keeps its level. A level A hotfix may merge once a reviewer has run it on a dev host; the rest
  of the evidence follows within one working day.
- If you cannot meet a requirement (for example, it needs real GPU hardware), say so in "Special notes" and name who
  checks it, and where.

## 5. CI check

The `PR description check` workflow warns, and never blocks during the pilot, when:

- the review level or the UI tier is missing, or the level is below the floor of the changed paths
- level C or higher changes source files and no test file
- level B or higher changes code and the E2E test plan or report has no link; level A also needs the ELI5 explainer
- UI files change, the tier is not none, and there are no screenshots or no `Verified on <sha>`
- the UI tier is critical or medium and `Design approval:` names no designer
- the description contains a local file path

Path floors (a floor, not the answer):

| Floor | Paths                                                                                                               |
| ----- | ------------------------------------------------------------------------------------------------------------------- |
| A     | `cube-frontend-keycloak-login/`, `web-app/src/api/`, `.github/workflows/`, `*.spec`, `vite.config.*`                |
| B     | In `web-app/src/`: `CosRoutes.tsx`, `App.tsx`, `main.tsx`, `layout/`, `context/`, `stores/`, `hooks/useCosRequest/` |
| C     | `cube-frontend-api/`, `cube-frontend-utils/src/`, non-test `.ts` in `web-app/src/` and `ui-library/src/`            |
| D     | `.tsx`, `.css`, `.scss` in `packages/*/src/`, `cube-frontend-i18n/`, `cube-frontend-ui-theme/`                      |
| E     | Everything else, including `*.md`, tests, stories, and `src/mocks/`                                                 |
