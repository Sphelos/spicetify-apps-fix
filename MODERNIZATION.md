# Modernization Roadmap

This is a practical modernization note for the `spicetify-apps-fix` fork.
It follows a T3-style bias toward:

- simplicity
- modularity
- strong TypeScript hygiene
- faster feedback in local dev and CI
- avoiding tool churn unless it clearly pays off

## Do Now

### 1. Align shared dependency versions

What:
- Standardize versions for packages used across multiple workspaces.
- Start with `lucide-react`, `tailwindcss`, and `use-debounce`.

Why:
- Reduces lockfile noise.
- Makes builds and bug reports easier to reason about.
- Low risk, high cleanup value.

Type:
- Compatibility / maintenance cleanup

### 2. Add a root CI validation workflow

What:
- Add one GitHub Actions workflow that runs on pull requests and key pushes.
- Run repo-wide install, lint, typecheck, and tests where available.

Why:
- Current workflows mostly publish builds.
- A central validation pass catches regressions before shipping.
- This is one of the highest-value “modern repo” improvements.

Type:
- Quality / confidence improvement

### 3. Reduce duplicated workspace scripts

What:
- Replace repeated workspace script patterns with shared conventions or thin root helpers.
- Keep package-local commands where Spicetify-specific behavior differs.

Why:
- Many workspaces repeat nearly identical `build`, `build-local`, `lint`, and `format` scripts.
- Duplication is manageable now, but it scales badly.

Type:
- Behavior-preserving refactor

### 4. Expand compatibility-focused tests

What:
- Add tests around Spotify/Spicetify runtime seams:
- storage parsing
- missing helper fallbacks
- modal wrappers
- settings migration paths

Why:
- The biggest breakage risk in this repo is upstream runtime drift.
- These tests protect the areas that actually fail in real installs.

Type:
- Crash prevention / compatibility hardening

## Do Next

### 5. Centralize settings and storage validation

What:
- Reuse the `playlist-maker` style of validating stored values before trusting them.
- Apply the same pattern to other apps and extensions using `Spicetify.LocalStorage`.

Why:
- This improves resilience without changing user-facing behavior.
- It matches a “typesafe at the edges” philosophy well.

Type:
- Compatibility / safety improvement

### 6. Add a small repo-level task runner only if task volume grows

What:
- Consider Turborepo if builds, checks, and CI become noticeably slower or more repetitive.

Why:
- Useful once the monorepo grows.
- Probably premature for the repo’s current size.

Type:
- Optional infrastructure upgrade

## Skip For Now

### 7. Do not switch to Bun first

Why not yet:
- The repo already works with `npm` workspaces and `npm ci` in GitHub Actions.
- Switching package managers would create churn before solving the highest-value problems.
- This is better treated as an optimization later, not a first modernization step.

### 8. Do not replace ESLint + Prettier with Biome yet

Why not yet:
- The current lint/format stack is already modern enough and working.
- Replacing it would be a tooling migration, not a product or compatibility win.
- Better to spend effort on CI, deduplication, and runtime safety first.

## Suggested Order

1. Align shared dependency versions
2. Add root CI validation
3. Reduce duplicated workspace scripts
4. Expand compatibility-focused tests
5. Centralize settings/storage validation
6. Reassess Turborepo later
7. Reassess Bun much later

## Notes

- This repo does not need to become a clone of Theo’s exact stack to benefit from the same philosophy.
- The best fit here is selective modernization, not a full tooling makeover.
- The main goal should stay the same: keep Spicetify apps working across changing Spotify internals with less maintenance pain.
