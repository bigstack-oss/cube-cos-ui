#### What type of PR is this?

<!--
Add one of the following kinds:
/kind bug
/kind cleanup
/kind documentation
/kind feature
-->

#### Review level

<!--
One of A, B, C, D, E. Ask in order and stop at the first "yes" (details and examples: .github/REVIEW_LEVELS.md).
A: Can a mistake lock someone out, expose credentials, change a cluster or its hardware the wrong way,
   mislead an operator about capacity or health, or break a build or release? (core logic)
B: Does it add or change a user flow, or code that many pages share?
C: Does it change logic (conditions, calculations, data mapping, polling, validation)?
D: Does it change only what the user sees or reads (style, text, translations)?
E: Nothing runs differently (docs, tests only, stories, mocks, dev scripts).
When in doubt, go higher.
-->

Review level:

#### What this PR does / why we need it

<!-- What changes for the user, in plain words. -->

#### Which issue(s) this PR fixes

Fixes #

#### How to verify

<!--
Steps a tester can repeat without reading the code.
Say which build or environment, which role, and which data (MSW mocks, a real cluster, seed data).
-->

| #   | Steps | Expected |
| --- | ----- | -------- |
| 1   |       |          |

#### Screenshots

<!--
Required when the PR changes what a user sees or does.
Capture "before" on the base branch and "after" on this branch, with the same steps, viewport, and data.
Upload the images here (drag and drop). Never paste a local file path.
No visible change: write `UI: no visible change`. Not a UI PR: write `N/A`.
-->

| Scenario | Before | After |
| -------- | ------ | ----- |
|          |        |       |

Verified on `<commit sha>`.

<!-- Level B and A with UI changes: add `Recording: <name, length>. <what it shows>` and upload the video. -->

<!--
UI change: the designer approves the "after" screenshots before review.
Write who approved and link the approval (a PR comment, a Figma comment, or a chat message).
No design change (bug fix back to the existing design, refactor): write `N/A` and say why.
-->

Design approval:

#### Checklist

<!-- Must: tick every box, or write why it does not apply. -->

- [ ] I met every requirement of the review level above (see .github/REVIEW_LEVELS.md)
- [ ] `pnpm lint` and `pnpm test` pass locally
- [ ] I ran the change in a browser and followed "How to verify" myself
- [ ] UI change: Before / After screenshots are attached and match the latest UI commit
- [ ] UI change: the designer approved the result ("Design approval" above), or N/A
- [ ] Screenshots show no tokens, passwords, customer names, or lab IPs
- [ ] No local paths (`/Users/...`, `~/...`) in this description
- [ ] New or changed i18n keys are in the translation sheet (or N/A)
- [ ] Related issues and tickets are updated, in every repo (e.g. cubecos): link to this PR, status, and a comment for QA with Before / After and how to test (or no issue)

#### Special notes for your reviewer

<!--
Why this approach, rejected alternatives, risks. For a bug: the root cause and how you confirmed it.
Nice to have: a longer test plan or recordings inside <details>.
-->

> Note

#### Additional documentation

```docs

```
