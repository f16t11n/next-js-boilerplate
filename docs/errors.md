# Error Pages System Documentation

## Overview
This project implements a comprehensive, standardized, config-driven error page system for Next.js. All error pages are reusable components with consistent design, accessibility features, and centralized configuration.

## Architecture

### 1. Configuration (`/config/errors.ts`)
Centralized error configuration containing:
- Error messages and descriptions
- HTTP status code mappings
- Call-to-action buttons
- Icons and visual elements
- Helper functions for error resolution

### 2. Components Structure
```
/components/public/
├── ui/Button/           # Shared button component
├── errors/
    ├── BaseErrorPage/   # Base error component
    ├── NotFound/        # 404 specific component
    ├── Unauthorized/    # 401 specific component
    ├── InternalError/   # 500 specific component
    └── [Other errors]/  # Additional error components
```

### 3. Route Structure
```
/src/app/
├── not-found.tsx        # Root 404 handler
├── errors/
    ├── [code]/page.tsx  # Dynamic error code handler
    ├── not-found/       # Specific 404 route
    ├── unauthorized/    # Specific 401 route
    └── internal-error/  # Specific 500 route
```

## Available Error Pages

### Client Errors (4xx)
- **400** → Bad Request
- **401** → Unauthorized  
- **403** → Forbidden
- **404** → Not Found
- **408** → Request Timeout
- **409** → Conflict
- **410** → Gone
- **429** → Too Many Requests

### Server Errors (5xx)
- **500** → Internal Server Error
- **501** → Not Implemented
- **502** → Bad Gateway
- **503** → Service Unavailable
- **504** → Gateway Timeout

### System Errors
- **Maintenance** → Service temporarily offline
- **Network Error** → Failed to reach server
- **Unknown Error** → Fallback for undefined errors

## HTTP Status Code Mapping

The system automatically maps HTTP status codes to appropriate error pages:

```typescript
// Example usage in API error handling
import { getErrorConfigByCode } from '@/config/errors';

function handleApiError(statusCode: number) {
  const errorConfig = getErrorConfigByCode(statusCode);
  // Route to appropriate error page or display error UI
}
```

## Usage Examples

### Using Error Components Directly

```typescript
import { NotFound } from '@/components/public/errors/NotFound';

// Use with default config
<NotFound />

// Override specific props
<NotFound 
  title="Custom Title"
  description="Custom description"
  action={{ label: "Custom Action", href: "/custom" }}
/>
```

### Dynamic Error Routing

Visit `/errors/404` or `/errors/500` to see dynamic error pages based on status codes.

### API Integration

```typescript
// In API routes or error boundaries
import { getErrorConfigByCode, statusCodeMap } from '@/config/errors';

try {
  // API call
} catch (error) {
  const statusCode = error.response?.status || 500;
  const errorConfig = getErrorConfigByCode(statusCode);
  
  // Redirect to error page or show error UI
  router.push(\`/errors/\${statusCode}\`);
}
```

## Customization

### 1. Adding New Error Types

1. Add configuration to `/config/errors.ts`:
```typescript
export const errorConfig = {
  // ...existing errors
  customError: {
    code: 418,
    title: "I'm a teapot",
    description: "The server refuses to brew coffee because it is, permanently, a teapot.",
    action: { label: "Find Coffee", href: "/coffee" },
    icon: "🫖"
  }
};
```

2. Add status code mapping:
```typescript
export const statusCodeMap: Record<number, keyof typeof errorConfig> = {
  // ...existing mappings
  418: 'customError',
};
```

3. Create component (optional):
```typescript
// /components/public/errors/CustomError/index.tsx
export const CustomError: React.FC<CustomErrorProps> = (props) => {
  const config = errorConfig.customError;
  return <BaseErrorPage {...config} {...props} />;
};
```

### 2. Customizing Existing Errors

Modify the configuration in `/config/errors.ts`:

```typescript
export const errorConfig = {
  notFound: {
    code: 404,
    title: "Oops! Page Not Found",           // Custom title
    description: "We couldn't find that page.", // Custom description
    action: { label: "Go Back Home", href: "/" }, // Custom CTA
    icon: "🔍"                              // Custom icon
  }
};
```

### 3. Theming and Styling

Error pages support:
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Automatic detection via `prefers-color-scheme`
- **High Contrast**: Support for `prefers-contrast: high`
- **Reduced Motion**: Respects `prefers-reduced-motion`

Customize styles in component-specific `styles.module.css` files:

```css
/* /components/public/errors/BaseErrorPage/styles.module.css */
.errorPage {
  /* Custom styles */
}

@media (prefers-color-scheme: dark) {
  .errorPage {
    /* Dark mode styles */
  }
}
```

## Accessibility Features

### 1. Semantic HTML
- Uses `<main>` for page content
- Proper heading hierarchy with `<h1>`
- Descriptive text with `<p>`

### 2. ARIA Support
- `role="alert"` on error containers
- `aria-label` attributes for actions
- `aria-hidden="true"` for decorative icons

### 3. Keyboard Navigation
- Focus management for interactive elements
- Visible focus indicators
- Skip links where appropriate

### 4. Screen Reader Support
- Descriptive error messages
- Proper content structure
- Alternative text for visual elements

## Error Handling Integration

### 1. Error Boundaries

```typescript
// Example ErrorBoundary component
import { InternalError } from '@/components/public/errors/InternalError';

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log error
    console.error('Error caught by boundary:', error);
    
    // Show error page
    this.setState({ hasError: true });
  }
  
  render() {
    if (this.state.hasError) {
      return <InternalError />;
    }
    return this.props.children;
  }
}
```

### 2. API Error Handling

```typescript
// Axios interceptor example
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response?.status;
    
    if (statusCode && statusCodeMap[statusCode]) {
      // Redirect to appropriate error page
      window.location.href = \`/errors/\${statusCode}\`;
    }
    
    return Promise.reject(error);
  }
);
```

### 3. Network Error Handling

```typescript
// Service worker or network error detection
window.addEventListener('offline', () => {
  // Show network error page
  router.push('/errors/network');
});

// Fetch wrapper with error handling
async function apiCall(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      router.push('/errors/network');
    } else {
      // HTTP error
      const statusCode = parseInt(error.message.split(' ')[1]);
      router.push(\`/errors/\${statusCode}\`);
    }
  }
}
```

## Testing Strategy

### 1. Component Testing
Each error component includes:
- Unit tests for props handling
- Accessibility tests with axe-core
- Snapshot tests for UI consistency

### 2. Integration Testing
- API error simulation tests
- Route navigation tests
- Error boundary tests

### 3. E2E Testing
Playwright tests for:
- Visiting error routes directly
- Triggering errors through user actions
- Verifying correct error pages display
- Testing CTA button functionality

### 4. Accessibility Testing
- Automated a11y testing with axe-core
- Screen reader testing
- Keyboard navigation testing
- Color contrast validation

## Performance Considerations

### 1. Code Splitting
Error components are automatically code-split by Next.js when used in routes.

### 2. Bundle Size
- Shared BaseErrorPage component reduces duplication
- CSS modules provide scoped styles without bloat
- Icon fonts/SVGs optimized for minimal size

### 3. Loading Performance
- Error pages load instantly (no data fetching)
- Minimal JavaScript for basic functionality
- Optimized CSS for fast rendering

## Monitoring and Analytics

### 1. Error Tracking

```typescript
// Example error logging
import { errorConfig, getErrorConfigByCode } from '@/config/errors';

function logError(statusCode: number, context?: any) {
  const errorConfig = getErrorConfigByCode(statusCode);
  
  // Send to analytics/monitoring service
  analytics.track('error_page_viewed', {
    status_code: statusCode,
    error_type: errorConfig.title,
    timestamp: new Date().toISOString(),
    context
  });
}
```

### 2. User Experience Metrics
Track:
- Error page bounce rates
- CTA click-through rates
- Time spent on error pages
- Common error patterns

## Migration Guide

### From Existing Error Pages

1. **Audit Current Errors**: List all existing error pages and their usage
2. **Map to New System**: Match current errors to new error types
3. **Update Imports**: Replace old error page imports with new components
4. **Test Thoroughly**: Verify all error paths work correctly
5. **Update Documentation**: Ensure team knows new error system

### Breaking Changes
- Old error page components are deprecated
- Error page routes have moved to `/errors/*` structure
- Error configuration is now centralized

## Troubleshooting

### Common Issues

1. **Import Errors**
   - Verify component paths are correct
   - Check that all required types are exported

2. **Styling Issues**
   - Ensure CSS modules are working
   - Check that theme preferences are detected

3. **Routing Problems**
   - Verify Next.js App Router configuration
   - Check that dynamic routes are set up correctly

4. **Configuration Errors**
   - Validate error config structure
   - Ensure all required properties are present

### Debug Mode

Set `NODE_ENV=development` to enable:
- Detailed error information
- Development-only debugging tools
- Enhanced error logging

## Contributing

### Adding New Error Types
1. Add configuration to `/config/errors.ts`
2. Create component in `/components/public/errors/`
3. Add route in `/src/app/errors/`
4. Write tests
5. Update documentation

### Best Practices
- Keep error messages user-friendly
- Provide actionable CTAs when possible
- Test accessibility thoroughly
- Follow existing naming conventions
- Document breaking changes

## Support

For questions or issues with the error system:
1. Check this documentation
2. Review component source code
3. Check existing tests for examples
4. Create issue with reproduction steps