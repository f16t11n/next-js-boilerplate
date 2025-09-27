# Next.js Production Boilerplate

A secure, stable, production-ready Next.js boilerplate with modular config, security, testing, and documentation.

## Features
- Next.js (App Router, TypeScript, ESLint, Prettier)
- Modular config per environment (`/config/config.{env}.ts`)
- Centralized error handling and pluggable logger
- Security: Helmet, rate limiting, CSRF, CORS, CSP, input validation, secure cookies/JWT
- Testing: Jest (unit/integration), Playwright/Cypress (E2E), GitHub Actions CI, high coverage
- Auto-generated docs (typedoc)
- Husky pre-commit hooks, linting, static analysis
- Error boundaries, fallback UI, feature flags

## Setup Guide
1. Clone this repo
2. Run `npm install`
3. Update `/config` for your environments
4. `npm run dev` to start

## Config Management
- All config in `/config` folder
- Add new environments by copying a config file and updating `index.ts`

## Security Standards
- See `/secure` route for active security middleware
- Helmet, rate limiting, CSRF, CORS, CSP, input validation, secure cookies/JWT

## Testing Guide
- `npm run test` for unit/integration
- `npm run test:e2e` for E2E (Playwright/Cypress)
- Coverage reports in `/coverage`

## Deployment Best Practices
- Use environment configs
- Enable all security middleware
- Run tests and coverage in CI

## Docs
- `/docs` for onboarding, API contracts, etc.
- `/localhost/config` for active config
- `/errors` for error logs (dev only)

---

See `/docs` for extended documentation.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Branch Protection & Code Quality
- No direct push to `main` branch; only rebase merge via Pull Request
- Code owner approval required (see .github/CODEOWNERS)
- Commit lint, ESLint, and code standard (CS) checks enforced in CI on all branches
- Renovate runs for dependency updates
- All logs are written to `/logs` for error handling and traceability
