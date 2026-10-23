---
name: pr-verify
description: Verify a cube-cos-ui change before a PR is opened, capture Before / After screenshots, get design approval when the UI tier needs it, and draft the PR description and the QA comment. Use when the code is done and before asking for review.
---

# Verify the change, then draft the PR

Policy: `.github/REVIEW_LEVELS.md`. Template: `.github/PULL_REQUEST_TEMPLATE.md`. When a step fails, fix it and redo the step.

1. **Pick the review level** with the policy, and say in one line why. When in doubt, go higher.
   **Take the UI tier from the tickets'** `ui:<tier>` labels; with several tickets, use the highest. If a ticket has
   none, propose a tier and ask the author to add the label to the ticket before you go on.
2. **Self-checks:** `pnpm lint` and `pnpm test`; also `pnpm ui-library:build` when the UI library changed.
   Report the results as a table. Never hide a failure.
3. **Run it in a browser:** `pnpm web-app:dev` (MSW mocks in `src/mocks/handlers.ts`) or a real cluster;
   `pnpm ui-library:dev` for components. Check every acceptance criterion, the console, keyboard focus, and long text.
   Level B and A: run the whole flow, including empty, error, and permission-denied paths.
4. **Screenshots** (UI tier low and up): "before" on the base branch, "after" on yours, with the same steps, viewport,
   and data. One pair per viewport and state. Critical and medium also show empty, error, and loading.
   Remove tokens, customer names, and lab IPs. Keep the files outside the repo. Retake them after any UI commit.
5. **Design approval** (UI tier critical and medium): ask the designer to review the PR with the Before / After table
   and the design or mockup link. Changes they ask for go back to step 3. Write `Design approval: @<designer>, <link>`.
6. **Draft the PR** from the template, in English. Keep its sections; put the review level, UI tier, how to verify,
   screenshots, `Verified on <sha>`, and design approval under "Special notes for your reviewer".
   Never write a local path. If you cannot upload images, write `[Screenshot pending upload: <file name>]` and tell the author.
7. **Write the documents** for level B and A when code changed: an E2E test plan (each case: steps, expected result,
   the before / after to compare) and an E2E test report (pass or fail per case, annotated screenshots). Level A: also an
   ELI5 explainer with pictures. Publish them where the whole team can open them, and link them in the "Read more"
   table under "Additional documentation".
8. **Draft the QA comment** for each related issue, in every repo: what changed, Before / After, how to test (steps
   and expected results), and what is not covered. The author posts it, and updates it after review and after merge.

Do not push or open the PR unless the author asks.
