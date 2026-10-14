---
name: pr-verify
description: Verify a change in cube-cos-ui before a PR is opened, capture Before / After screenshots for UI changes, and draft the PR description and the issue comment for QA. Use when the code is done and before asking for review.
---

# Verify the change, then draft the PR

The goal: the reviewer and QA can see that the change works without checking out the branch.
Do the steps in order. If a step fails, stop, fix it, and start that step again.

## 0. Pick the review level

Read `.github/REVIEW_LEVELS.md`. Answer its five questions in order for the whole PR; the first "yes" is the level.
Check the area table, the real examples, and "Looks like one level, is another". Judge by what the change can break,
not by its path. When in doubt, go higher, and say in one line why you picked the level.
Then do the steps that the level needs:

| Step                                  | A   | B   | C   | D   | E   |
| ------------------------------------- | --- | --- | --- | --- | --- |
| 1. Self-checks                        | ✓   | ✓   | ✓   | ✓   | ✓   |
| 2–4. Browser check and Before / After | ✓   | ✓   | ✓   | ✓   |     |
| Unit tests that fail without the fix  | ✓   | ✓   | ✓   |     |     |
| End-to-end run with a recording       | ✓   | ✓   |     |     |     |
| Rollback plan; ask reviewer to run it | ✓   |     |     |     |     |
| 5. PR description                     | ✓   | ✓   | ✓   | ✓   | ✓   |
| Designer approves the UI result       | ✓   | ✓   | ✓   | ✓   |     |
| 6. Update related issues and tickets  | ✓   | ✓   | ✓   | ✓   |     |

## 1. Self-checks

Run these from the repo root and report the results as a table (command, result).

| Change touches                                 | Run                                   |
| ---------------------------------------------- | ------------------------------------- |
| Anything                                       | `pnpm lint`, `pnpm test`              |
| `packages/cube-frontend-ui-library`            | `pnpm ui-library:build` (Storybook)   |
| `packages/cube-frontend-web-app` build or deps | `pnpm web-app:build`                  |
| `packages/cube-frontend-i18n`                  | Check the keys are in the i18n sheet. |

A failing check is reported, never hidden or skipped.

## 2. Is this a UI change?

A UI change is anything that changes what a user sees or does: layout, text, states, validation, navigation, or a component in
the UI library. A pure refactor of UI code counts as "no visible change", and it still needs one "after" screenshot.
Not a UI change: skip to step 5 and write `N/A` under Screenshots.

## 3. Verify in a real browser

1. Read the issue. List each acceptance criterion or expected behavior. That list is your test plan.
2. Run the app: `pnpm web-app:dev` (MSW mocks, see `src/mocks/handlers.ts`), or a real cluster when mocks cannot show the behavior.
   For UI library components, use Storybook: `pnpm ui-library:dev`.
3. Walk through every item on the list. Also check:
   - empty, loading, and error states, and long text
   - the browser console has no new errors or warnings
   - keyboard focus and tab order on anything you can click
   - each language, when you changed strings
4. Mark each item pass or fail. A fail goes back to the code, not into the PR.
5. Level B and A: run the whole flow from start to end, including the empty, error, and permission-denied paths,
   and record it (under 2 minutes).
6. Level C and above: make sure a unit test covers the changed logic and fails without your change.

## 4. Capture Before / After (UI changes only)

1. Capture **before** on the base branch (`develop`, or the release branch you target). Use the same steps, viewport, data, and
   language that you will use for "after". Never rebuild "before" from memory or by editing an image.
2. Capture **after** on your branch. Pair the files by number: `before_01_<what>.png` and `after_01_<what>.png`.
3. Add one short recording (under 2 minutes) when motion or interaction matters.
4. Look at every image before you keep it. Remove or retake anything that shows tokens, passwords, customer names, or lab IPs.
5. Keep the files **outside the repo**. Never commit them.
6. Take them again after any later commit that changes the UI. The PR says which commit you verified.
7. Ask the designer to approve the "after" screenshots, with the Before / After table and a link to the design.
   Record who approved and where in `Design approval:`. If the change only brings the UI back to the existing design,
   write `N/A` and why. Changes the designer asks for go back to step 3.

## 5. Draft the PR description

Fill `.github/PULL_REQUEST_TEMPLATE.md` and keep its sections in order (see "Pull Requests" in `CLAUDE.md`). Write in English.

- **Review level**: `Review level: <A–E>`, the level from step 0.
- **What this PR does**: what changes for the user, in plain words. Code detail goes under "Special notes".
- **How to verify**: steps a tester can repeat without reading the code: build or environment, role, data, expected result.
- **Screenshots**: one table row per scenario (viewport, state, role, or language). Add `Verified on <short sha>`.
  Add measured facts when you have them (sizes, counts, timings). Add capture notes: dev build or cluster, MSW or real data,
  anything hidden.
- **Checklist**: tick only what you really did.
- **Special notes for your reviewer**: why this approach, rejected alternatives, risks. For a bug: the root cause and how you confirmed it.
  Level A: add the rollback plan and ask the reviewer to run the change.
- **Recording** (level B and A with UI changes): `Recording: <name, length>. <what it shows>` under Screenshots.
- Never write a local path (`/Users/...`, `~/...`, your user or machine name). Show the image itself with a caption.
- If you cannot upload images (for example an AI tool drafted the PR), put `[Screenshot pending upload: <file name>]` in the
  table and tell the author to upload them by hand.

Do not push or open the PR unless the author asks.

## 6. Update related issues and tickets

Find every related issue, in this repo and in others (for example `cubecos`). Draft the comment for QA at the same time
as the PR; the author posts it. Also remind the author to:

- link the PR from each issue, and set its status
- update the comment when review changes the behavior, the screenshots, or the test steps
- after merge: check the issue closed or moved to QA, and say which build has the fix

```markdown
Fixed in bigstack-oss/cube-cos-ui#<PR number>. <One sentence: what changed for the user.>

### Before / After

| Scenario | Before | After |
| -------- | ------ | ----- |
|          |        |       |

### How to test

Build / version: <build>. Environment: <browser, viewport, role, test data>.

| #   | Steps | Expected |
| --- | ----- | -------- |
| 1   |       |          |

### Notes

- Capture setup: <dev build or cluster, MSW or real data, hidden elements>.
- Not covered: <what QA must check on real hardware or another environment>.
```

If the issue already has a QA verification section, match it and say what changed.

## 7. Last check

- [ ] Review level declared, and every requirement of that level met (step 0)
- [ ] Self-checks pass (step 1)
- [ ] Every test plan item passed in a browser (step 3)
- [ ] UI change: Before / After pairs use the same steps and viewport, and match the verified commit
- [ ] No secrets in the images, no local paths in the text
- [ ] UI change: designer approval recorded, or `N/A` with a reason
- [ ] PR description follows the template; related issues updated and QA comment drafted (or "no issue")
