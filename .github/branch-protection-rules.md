# Branch Protection Rules

- No one can push directly to `main`.
- All changes must go through Pull Requests.
- Require code owner review and approval.
- Only rebase merges are allowed (no squash/merge commits).
- CI, ESLint, Commit Lint, and CS must pass before merge.
- Renovate runs on all branches for dependency updates.
