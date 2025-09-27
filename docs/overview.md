# Comprehensive Project Documentation

## Updates to Configuration and Breakpoints

### Centralized Device Sizes
- Device sizes are now hardcoded in `config.base.ts` under `imageConfig.deviceSizes`.
- All breakpoints in `/config/breakpoints.ts` dynamically derive their values from `config.base.ts`.
- This ensures a single source of truth for responsive design.

### Updated Breakpoints
- Breakpoints are defined in `/config/breakpoints.ts` and are dynamically linked to `deviceSizes` in `config.base.ts`.
- Example:
```ts
export const breakpoints = {
  mobile: `${baseConfig.imageConfig.deviceSizes[0]}px`,
  tablet: `${baseConfig.imageConfig.deviceSizes[2]}px`,
  laptop: `${baseConfig.imageConfig.deviceSizes[3]}px`,
  desktop: `${baseConfig.imageConfig.deviceSizes[4]}px`,
  wide: `${baseConfig.imageConfig.deviceSizes[4] + 336}px`,
} as const;
```

### Benefits
- Eliminates redundancy and ensures consistency across the project.
- Any updates to `deviceSizes` in `config.base.ts` automatically propagate to breakpoints.

### Enforcement
- Linting and build processes ensure that only defined breakpoints are used.
- Custom ESLint rules and build scripts prevent the use of hardcoded breakpoints outside the defined configuration.

---

For more details, refer to `/docs/responsive.md` and `/docs/developer.md`.

## 1. Project Overview
A production-ready, security-first, fully config-driven Next.js (App Router + TypeScript) frontend boilerplate. Goals:
- Eliminate hardcoded operational values via centralized `/config` system
- Enforce strict security (CSP, CORS, CSRF, rate limiting, secure cookies, JWT)
- Deliver responsive design with a single source of truth for breakpoints
- Provide extensibility through modular services & feature flags
- Automate quality gates: linting, testing, dependency hygiene
- Support future admin/dashboard management and i18n

Why Config-Driven:
- Consistency across environments (dev/stg/qa/prd)
- Zero code changes for operational tweaks
- Easier audits & testing: all runtime behavior introspectable
- Prevents config drift & shadow config

Core Principles:
- Security-first (prevent XSS, CSRF, CORS abuse, JWT misuse)
- Deterministic builds (config + code = behavior)
- Fail-fast (lint/build/test break on policy violations)
- Accessibility & responsiveness enforced by tooling
- Extensible: add services/config with minimal coupling

## 2. Dependencies & Packages
(Current workspace shows a minimal subset installed; documentation includes recommended optional packages.)

Runtime:
- next: Core React framework with hybrid rendering & routing
- react / react-dom: UI rendering
- winston (in code via `src/lib/logger.ts`): Structured logging
- jsonwebtoken (used in `api/auth`): JWT signing for authentication
- helmet: Security headers (CSP, HSTS, etc.)
- cors: CORS policy handling
- express-rate-limit: Rate limiting middleware
- csurf: CSRF token protection
- zod: Schema validation for input/data

Dev / Tooling:
- typescript: Strict typing & DX
- eslint: Code quality enforcement
- prettier: Consistent formatting
- eslint-plugin-security: Detect insecure patterns
- eslint-plugin-jsx-a11y: Accessibility rules
- unused-imports: Auto-detect unused imports
- @tailwindcss/postcss + tailwindcss: Utility-first styling + design tokens

Custom / Internal:
- eslint-rules/no-nonstandard-breakpoints: Ensures only approved breakpoints used

Recommended (not yet added but documented for completeness):
- jest / @testing-library/react: Unit/component testing
- playwright: E2E + cross-browser testing
- axe-core / jest-axe: Accessibility assertions
- lighthouse-ci: Performance & PWA metrics
- stryker: Mutation testing for test robustness
- msw: Mock API in tests/dev
- dompurify: Sanitize untrusted HTML
- sentry: Error tracking (optional, see monitoring)
- prom-client: Metrics export for Prometheus
- winston-loki / loki-stack: Centralized log aggregation
- commitlint, husky, lint-staged: Enforced commit & staged file quality
- renovate: Automated dependency update PRs

Why Chosen & Alternatives:
- Helmet vs manual headers: Faster, tested defaults
- Zod vs Yup: Better TypeScript inference
- Winston vs console: JSON logs, multiple transports
- Playwright vs Cypress: Cross-browser + modern API (Cypress viable alternative)
- Tailwind vs custom SCSS: Speed + consistency (Chakra/MUI possible alternatives)

## 3. Project Structure
```
/config
  breakpoints.ts         # Single source of truth for responsive breakpoints
  config.dev.ts          # Dev environment config
  config.stg.ts          # Staging config (placeholder)
  config.qa.ts           # QA config (placeholder)
  config.prd.ts          # Production config (placeholder)
  i18n.ts                # Centralized static UI text & translations
  index.ts               # (Assumed) exports selected config (not shown here)
  types.ts               # Strongly typed Config interface
/docs
  admin.md               # Isolated admin dashboard documentation
  API_CONTRACTS.md       # (Assumed) API schema/contracts
  developer.md           # Developer guide (setup, config, security)
  FEATURE_FLAGS.md       # Feature flag usage & definitions
  monitoring.md          # Open source monitoring integration
  ONBOARDING.md          # New developer onboarding steps
  responsive.md          # Responsive design system & rules
/eslint-rules
  no-nonstandard-breakpoints.js  # Custom ESLint rule enforcing breakpoint usage
/src
  app/
    admin/page.tsx       # Isolated admin dashboard (future management UI)
    api/...              # API route handlers (auth, security, config, etc.)
    config/              # (Likely UI to introspect config)
    errors/              # Error-related pages
    globals.css          # Tailwind & global styles (imports tailwindcss)
    global-error.tsx     # Global error boundary for App Router
    layout.tsx           # Root layout, fonts, error boundary wrapper
    not-found.tsx        # 404 handler
    page.tsx             # Landing/root page
    secure/              # Pages demonstrating security usage
  components/            # Reusable UI components (not fully shown)
  errors/                # Error helpers (e.g., corsErrorHandler)
  lib/
    logger.ts            # Winston logger configured via config
    featureFlags.ts      # Access helper for feature flags
  middleware.ts          # Security & validation middleware
/services/               # Placeholder for API/service layer
/scripts
  check-breakpoints.js   # Build-time blocker for non-standard breakpoints
/tailwind.config.js      # Tailwind integrating central breakpoints
.eslintrc.json           # Lint configuration (strict rules + custom rule)
package.json             # Scripts and dependency manifest
playwright.config.ts     # (Present) E2E configuration (parameterized)
```

Dependency Relationships:
- API routes depend on `/config` for all operational values
- `logger.ts` depends on config for log level
- `middleware.ts` composes security libraries referencing config
- Tailwind config consumes `/config/breakpoints.ts`
- ESLint custom rule imports the same breakpoint list
- i18n utilities consumed by UI (`admin/page.tsx` etc.)

## 4. Page ↔ Component / Service Connections
Examples (representative):
- `/app/admin/page.tsx` → uses `getMessage` (i18n) + config snapshot
- `/app/api/auth/route.ts` → uses `jsonwebtoken`, config.jwtSecret, cookieConfig
- `/app/layout.tsx` → wraps all pages in `<ErrorBoundary>` (from components folder)
- `/app/secure/*` (future) → will invoke services using centralized security config
- Feature flags: `featureFlags.ts` exposes helpers that UI components call to conditionally render blocks

Config Flow:
- `config/*.ts` → `import config from '../../config'` (index selects env) → used in API handlers, middleware, logger, build scripts, Tailwind
- Breakpoints → consumed in Tailwind + lint rule + (potential CSS-in-JS)
- i18n messages → `getMessage(key, lang)` per component

## 5. Config-Driven Architecture
Values centralization includes: API base URL, rate limits, JWT secret & algorithm, cookie attributes, CORS origins, CSRF enable flag, CSP directives, image optimization settings, breakpoints, feature flags, environments list, i18n message registry.

Environment Selection: Typically `index.ts` exports env-specific file based on `process.env.NODE_ENV` (pattern implied). All imports use that single entry.

Common Issues & Solutions:
- Wrong environment loaded → Add environment guard (Zod schema + allowed list) in `index.ts` (future improvement)
- Hardcoded values in code → Lint rule + review; CI blocks merges failing lint
- Divergent breakpoints → Build script + ESLint custom rule stop drift

## 6. Responsive Design & Accessibility
- `breakpoints.ts` single canonical source; any pixel breakpoint outside set triggers lint/build failure.
- Tailwind `screens` = imported breakpoints ensures design tokens unify.
- Accessibility: ESLint `jsx-a11y` rules enforce alt text, roles, aria-* validity, no noninteractive interactions misuse.
- Future: Add axe-core automated tests + jest-axe for CI gating.

Issues & Enforcement:
- Added custom `@media (max-width: 600px)` → Fails ESLint & build via `check-breakpoints.js`.
- Missing alt text → `jsx-a11y/alt-text` error.

## 7. Security & Auth
Implemented / documented layers:
- Headers: Helmet (CSP from config, can extend to HSTS, X-Frame-Options, etc.)
- Rate limiting: express-rate-limit using config.rateLimit
- CORS: Configurable origin / credentials; friendly error via `corsErrorMiddleware`
- CSRF: `csurf` middleware (cookie-based)
- JWT Auth: `api/auth/route.ts` signs token using `config.jwtSecret` & `jwtConfig.expiresIn`
- Secure Cookies: HttpOnly, SameSite, secure flag configurable; prevents XSS token theft
- Input Validation: Zod helper `validate(schema, data)` throws early

Issues & Solutions:
- Attempt to persist token in localStorage → Reject in code review, document cookie enforcement
- CORS mismatch → Adjust `config.cors.origin`; error handler returns structured message
- Weak secret / missing env → Add secret validation (future improvement)

## 8. Testing Strategy (Pluggable Design)
Present state: Playwright config scaffolded. Recommended expansions:
- Unit: Jest + Testing Library
- Integration: Jest hitting mock services / MSW
- E2E: Playwright (multi-browser), run in CI matrix
- Accessibility: axe-core scans integrated into Jest or Playwright steps
- Mutation: Stryker to ensure test quality
- Performance: Lighthouse CI budgets
- Visual Regression: Percy or Playwright screenshot diffs

Key Policies:
- Coverage thresholds enforced (e.g., 85%+ lines/branches) – configure in `jest.config.js`
- Pre-push hook runs full unit + lint to prevent CI churn
- E2E smoke run on PR; full regression on main nightly

Failure Handling:
- Coverage dip → CI fail
- Flaky E2E → quarantine tag + retry logic + tracking doc

## 9. CI/CD & Automation
- GitHub Actions (assumed) run: install → lint → test → build → (optional) deploy
- Husky hooks: pre-commit (lint-staged runs ESLint + Prettier on staged files) & commit-msg (commitlint)
- Renovate: Opens PRs for dependency updates; policy: patch/minor may auto-merge after green CI; major = manual review
- Branch Protection: No direct pushes to main; approvals + status checks required

Risk Mitigation:
- Build reproducibility: Lockfile committed
- Dependency risk: Security scanning (future add: `npm audit` gating)

## 10. Monitoring & Logging
- Logging: Winston JSON logs with timestamp; log level from config.logger.level
- Optional Integrations (documented in `monitoring.md`):
  - Sentry → error tracking + tracing
  - Prometheus (prom-client) + Grafana → metrics & dashboards
  - Loki (winston-loki) → centralized logging
- Log Enrichment: Add request IDs / user context (future)

Issues & Solutions:
- Missing prod logs → Add file / remote transport
- Exposed /metrics publicly → Gate behind auth/reverse proxy

## 11. i18n & Static Text
- `/config/i18n.ts` defines multilingual message map (en, bn) with type-safe keys
- `getMessage(key, lang)` API centralizes textual content
- Future: Add dynamic locale detection + Next.js middleware

Issues & Solutions:
- Hardcoded string in component → Future rule can grep & block; retroactively move to i18n file
- Missing translation → Fallback to English; optional build-time script to diff keys

## 12. Documentation Standards
Docs Inventory:
- `developer.md`: Setup, config, security, responsive, monitoring, i18n
- `responsive.md`: Breakpoint policy & usage examples
- `monitoring.md`: Open source stack (Sentry, Prometheus, Loki, Grafana)
- `admin.md`: Isolated dashboard operation & security
- `API_CONTRACTS.md`: API shapes (expand with OpenAPI/Typedoc generation)
- `FEATURE_FLAGS.md`: Definition, rollout pattern
- `ONBOARDING.md`: New engineer checklist

Drift Prevention:
- Future: Script to diff `/config` against docs & raise CI warning

## 13. Admin Dashboard
- Route: `/admin` (isolated, unlinked)
- Current Capability: Read-only config JSON snapshot & placeholders
- Security: MUST add auth (RBAC), IP allowlist, audit logging pre-production
- Roadmap: Editable feature flags, live config proposal queue, metrics panel embed

## 14. Extensibility
Patterns:
- Add new service → create `/services/<name>.ts` using shared `apiBaseUrl` + logger
- Add feature flag → update `config.*.ts` + document in `FEATURE_FLAGS.md`
- Add breakpoint → modify `breakpoints.ts` + update `responsive.md`
- Add language → extend `i18n.ts` + translation diff script

Guard Rails:
- ESLint & custom rules block drift
- Build script enforces design system consistency
- Central config ensures zero duplication

## 15. Change Impact Analysis
| Change Target | Impact Scope | Risk | Mitigation |
|---------------|-------------|------|------------|
| `/config/config.*.ts` | All runtime behavior (API URLs, security, flags) | High | PR review + env validation |
| `types.ts` | Compile-time contract for config users | Medium | Add versioning & schema tests |
| `breakpoints.ts` | All responsive styling | High | Lint + build guard |
| `i18n.ts` | UI text, translation completeness | Low | Add diff script + fallback |
| `middleware.ts` | Security posture (CSP, rate limiting) | High | Add integration tests |
| `logger.ts` | Observability & incident response | Medium | Provide fallback transport |
| `api/auth/route.ts` | Authentication & sessions | High | Security review + tests |
| `scripts/check-breakpoints.js` | Build enforcement | Medium | Unit test script logic |
| `eslint-rules/no-nonstandard-breakpoints.js` | Lint reliability | Medium | Add rule tests with ESLint RuleTester |
| `tailwind.config.js` | Design token propagation | Medium | Visual regression tests |

Failure Scenarios:
- Removing a breakpoint → Build fails; update dependent styles then proceed
- Weak JWT secret in prod config → Add secret strength validator
- Adding unvalidated input path → Must add Zod schema + test

## 16. Issues & Solutions Summary
| Issue | Detection | Resolution |
|-------|-----------|-----------|
| Hardcoded breakpoint | ESLint + build script | Replace with import from `breakpoints.ts` |
| Missing alt text | ESLint a11y rule | Add meaningful alt or `role="presentation"` if decorative |
| CORS failure | CORS middleware error & handler | Update `config.cors.origin` |
| Token leakage risk | Code review / security scan | Use HttpOnly cookie, no localStorage |
| Config drift | Manual review | Future: config-doc sync script |
| Coverage drop | CI coverage gate | Improve or justify exclusions |
| Dependency major break | CI fail | Manual review + changelog audit |
| Missing translation | Runtime fallback | Add key to all languages |

## 17. Operational Playbook (Quick Reference)
- Add Environment: Copy `config.dev.ts` → `config.stg.ts` + adjust; update `index.ts`
- Add Secure Header: Extend helmet config or custom middleware in `middleware.ts`
- Add Feature Flag: Add to each env config + document
- Add Admin Tool: Extend `/admin/page.tsx` + secure behind auth
- Rotate Secret: Update config + redeploy; invalidate sessions if JWT secret rotated

## 18. Future Enhancements
- Add OpenAPI generation + contract tests
- Add i18n build validator script
- Add Prometheus /metrics endpoint + secured access
- Add Sentry initialization wrapper with dynamic sampling
- Implement rule to block hardcoded user-facing strings outside i18n
- Add mutation testing baseline (Stryker) & Lighthouse CI budgets

## 19. Appendix
Suggested Scripts (future):
- `npm run test:coverage` → jest --coverage
- `npm run lint:strict` → eslint --max-warnings=0
- `npm run audit` → npm audit --audit-level=moderate

Configuration Checklist Before Production:
- ✅ CSP hardened (script-src, object-src, frame-ancestors)
- ✅ Strict-Transport-Security at edge (reverse proxy or custom header)
- ✅ Secure cookies (secure=true in non-dev)
- ✅ JWT secret strong & rotated
- ✅ CORS origin restricted
- ✅ Rate limit tuned to traffic profile
- ✅ Logs shipped to central system

---
This document provides an end-to-end technical map for developers, QA, operations, and future administrators to safely evolve and operate the system.
