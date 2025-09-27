# Responsive Design Standards

## Updates to Breakpoints

### Centralized Device Sizes
- Device sizes are now defined in `config.base.ts` under `imageConfig.deviceSizes`.
- Breakpoints in `/config/breakpoints.ts` dynamically derive their values from `deviceSizes`.

### Example
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
- Ensures consistency and eliminates redundancy.
- Any updates to `deviceSizes` in `config.base.ts` automatically propagate to breakpoints.

### Enforcement
- Linting and build processes ensure that only defined breakpoints are used.
- Custom ESLint rules prevent the use of hardcoded breakpoints.

## Allowed Breakpoints (Single Source of Truth)

All responsive behavior must use only the breakpoints defined in `/config/breakpoints.ts`:

```ts
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px',
  wide: '1536px',
} as const;
```

## How to Use Breakpoints

- **Import the breakpoints object** from `/config/breakpoints.ts` in any file (JS, TS, CSS-in-JS, Tailwind config, etc.) where you need responsive values.
- **Do not hardcode** any media query or container width. Always reference the centralized breakpoints.

### Example: CSS-in-JS (styled-components, stitches, etc.)
```ts
import { breakpoints } from '@/config/breakpoints';

const Container = styled.div`
  width: 100%;
  @media (max-width: ${breakpoints.tablet}) {
    padding: 1rem;
  }
`;
```

### Example: Tailwind CSS
- In your `tailwind.config.js`, import and spread the breakpoints:
```js
const { breakpoints } = require('./config/breakpoints');

module.exports = {
  theme: {
    screens: breakpoints,
    // ...other theme config
  },
};
```

### Example: SCSS
- Use a build step to inject or import the breakpoints from TypeScript, or maintain a generated SCSS map.

## Common Mistakes
- ❌ `@media (max-width: 600px) { ... }` (Not allowed)
- ❌ `theme.screens = { sm: '640px', ... }` (Do not define breakpoints in multiple places)
- ✅ `@media (max-width: ${breakpoints.mobile}) { ... }`

## Enforcement
- **ESLint custom rule**: Lints for any non-standard breakpoint usage in code, styles, or media queries.
- **Build process**: Fails if any undefined breakpoints are referenced.
- **Adding new breakpoints**: Only via `/config/breakpoints.ts` and must be documented here.

## Summary
- All responsive logic is parameterized and consistent across environments.
- Breakpoints are a single source of truth.
- No hardcoded values allowed for breakpoints anywhere in the project.
