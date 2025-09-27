# Developer Documentation

## 1. Project Setup
- Clone the repo
- Install dependencies: `npm install`
- Environment config: All operational values are in `/config` (see `/config/types.ts`)
- Start dev server: `npm run dev`
- Build: `npm run build` (enforces lint, test, breakpoint checks)

## 2. Configuration
- All environment, API, cookie, JWT, image, and responsive breakpoints are in `/config`.
- No hardcoded values—update config files for any operational change.
- Responsive breakpoints: `/config/breakpoints.ts` (single source of truth)

### Centralized Device Sizes
- Device sizes are now defined in `config.base.ts` under `imageConfig.deviceSizes`.
- Breakpoints in `/config/breakpoints.ts` dynamically derive their values from `deviceSizes`.

### Example Usage
- Import breakpoints in your components or styles:
```ts
import { breakpoints } from '@/config/breakpoints';

const Container = styled.div`
  @media (max-width: ${breakpoints.tablet}) {
    padding: 1rem;
  }
`;
```

### Enforcement
- Linting and build processes ensure that only defined breakpoints are used.
- Custom ESLint rules prevent the use of hardcoded breakpoints.

## 3. Security
- Helmet, rate limiting, CSRF, CORS, CSP, input validation (Zod) middleware enabled.
- All secrets and sensitive values are in config, never hardcoded.
- Strict ESLint rules for security, accessibility, and code quality.

## 4. Responsive Design
- Only use breakpoints from `/config/breakpoints.ts`.
- Tailwind/screens, CSS-in-JS, SCSS—all must import from config.
- Lint/build will fail if non-standard breakpoints are used.

## 5. Linting, Testing, CI/CD
- Lint: `npm run lint` (strict rules enforced)
- Test: Playwright config is parameterized
- CI: GitHub Actions, commitlint, Renovate, Husky, lint-staged

## 6. Dependency Updates (Renovate/Dependabot)
- Patch/minor updates: Auto PR, CI build/lint/test pass হলে merge করা যাবে
- Major updates: Manual review & test ছাড়া merge করা যাবে না
- Auto-merge policy: Blind auto-merge নিষিদ্ধ, সব update-এ automated test & human review enforced
- Production deploy-এর আগে staging/test environment-এ smoke test করা বাধ্যতামূলক

**নোট:** Auto-update system site ভাঙার ঝুঁকি কমাতে test, lint, build, এবং manual review enforced রাখা হয়েছে।

## 6. Monitoring & Logging (Open Source)
- Winston logger is default.
- For advanced monitoring, integrate:
  - **Sentry (Open Source plan):** Error tracking. See `/docs/monitoring.md` for setup.
  - **Prometheus + Grafana:** Metrics and dashboarding.
  - **Loki:** Log aggregation.
- All monitoring config is in `/config` and can be toggled per environment.

## 7. Extensibility
- All services are modular and parameterized.
- Add new config or features by extending `/config` and documenting in `/docs`.

## 8. Documentation
- `/docs/responsive.md`: Responsive standards
- `/docs/monitoring.md`: Open source monitoring setup
- `/docs/*`: All standards, config, and usage

## 9. Static UI Text & i18n
- All static UI text, error messages, এবং user-facing string `/config/i18n.ts` ফাইলে config-driven.
- Multi-language (i18n) support: `messages` object-এ language-wise key-value, type-safe access।
- Usage:
  ```ts
  import { getMessage } from '@/config/i18n';
  // Example: getMessage('welcome', 'bn')
  ```
- নতুন UI text বা error message যোগ করতে হলে `/config/i18n.ts`-এ key/value যোগ করুন এবং সব usage-এ config থেকে নিন।
- ভবিষ্যতে language switch, dynamic content, বা translation সহজ হবে।

---

For any new feature, always:
- Add config to `/config`
- Document usage in `/docs`
- Enforce via lint/build/test
