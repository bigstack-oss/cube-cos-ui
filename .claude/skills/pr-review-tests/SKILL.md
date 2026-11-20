---
name: pr-review-tests
description: Review a cube-cos-ui PR against its review level, UI tier, and E2E test plan. Find missing test cases, weak evidence, and things to change, then draft review comments for the reviewer to post. Use when asked to review a PR or its test plan.
---

# Review a PR and its test plan

Policy: `.github/REVIEW_LEVELS.md`. **Read-only:** use `gh` read commands only (`gh pr view`, `gh pr diff`, `gh pr checks`,
`gh issue view`). Do not check out, run, comment, approve, request changes, or push unless the reviewer asks.

1. **Gather.** The PR description, diff, and checks; every linked issue (including `bigstack-oss/cubecos`) with its
   acceptance criteria and `ui:<tier>` label; the E2E test plan, E2E test report, and ELI5 explainer, from the "Read
   more" table or from issue comments. Open claude.ai artifact links with the Artifact `read` action; if you cannot,
   mark the link `(unverified)` and ask the reviewer to paste it. Never guess what a link says.
2. **Level and tier.** Work out the level from the diff with the policy's five questions, and the tier from the
   tickets' labels (the highest if several). Flag a declared level or tier that is lower. If none is declared, propose
   one, name the question that decided it, and draft a comment asking the author to add it (and the ticket label).
3. **Requirements.** For that level and tier, check each requirement: tests in the diff, Before / After screenshots,
   `Verified on <sha>` equal to the PR head, design approval, the documents, related issues updated.
4. **Test plan coverage.** Map each acceptance criterion and each behavior change in the diff to its test plan cases.
   Report what has no case, especially:
   - empty, error, loading, and permission-denied states; long text; each language and viewport the page supports
   - edge values in changed logic: zero, max, null, boundaries, units; polling and timing; two users at once
   - other pages that use the changed shared code (regressions). Find the callers with `gh api search/code` or a grep
     of a checkout, and say which ref you searched
   - tests that depend on the environment (time zone, locale, clock, viewport): check that CI sets it, or the tests
     prove nothing in CI
   - unit tests that would still pass without the change
5. **Test report.** Every plan case has a result and evidence. Failures are explained or fixed. The screenshots match
   the plan's expected results, and the report was made on the PR head.
6. **Report to the reviewer** in chat:
   - Verdict: ready, or needs changes.
   - A table: gap, why it matters, the suggested test case (steps and expected result), must or nice to have.
     At most 7 rows, must-haves first; merge similar regressions into one row.
   - At most 5 review comments drafted in English, each tied to a `file:line` or a test plan case.
   - Mark anything you did not confirm as `(unverified)`.

The reviewer decides and posts. You never approve or request changes.
