// Dynamic Documentation Pages Layout
import { DocsLayout } from '../../../../components/docs/DocsLayout';
import { docsConfig } from '../../../../config/docs';
import { notFound } from 'next/navigation';

interface DocsPageProps {
  params: {
    slug: string[];
  };
}

// Generate static params for all documentation pages
export function generateStaticParams() {
  return docsConfig.pages
    .filter(page => !page.path.endsWith('/docs')) // Exclude the main docs page
    .map(page => ({
      slug: page.path.replace('/docs/', '').split('/'),
    }));
}

// Generate metadata for each page
export function generateMetadata({ params }: DocsPageProps) {
  const pagePath = `/docs/${params.slug.join('/')}`;
  const currentDoc = docsConfig.pages.find(page => page.path === pagePath);
  
  if (!currentDoc) {
    return {
      title: 'Page Not Found | Documentation',
      description: 'The requested documentation page could not be found.',
    };
  }

  return {
    title: `${currentDoc.title} | Documentation`,
    description: currentDoc.description,
  };
}

export default function DocsSlugPage({ params }: DocsPageProps) {
  const pagePath = `/docs/${params.slug.join('/')}`;
  const currentDoc = docsConfig.pages.find(page => page.path === pagePath);
  
  if (!currentDoc) {
    notFound();
  }

  return (
    <DocsLayout currentPageId={currentDoc.id} title={currentDoc.title}>
      <div>
        <div className="flex items-start gap-4 mb-8">
          <span className="text-4xl flex-shrink-0">{currentDoc.icon}</span>
          <div className="flex-1 min-w-0">
            <h1>{currentDoc.title}</h1>
            <p className="text-lg">{currentDoc.description}</p>
          </div>
        </div>

        <div className="content-body">
          {getDocumentContent(currentDoc.id)}
        </div>
      </div>
    </DocsLayout>
  );
}

// Content for each documentation page
function getDocumentContent(pageId: string) {
  const content: Record<string, React.ReactElement> = {
    'installation': (
      <div>
        <h2 id="overview">Installation Guide</h2>
        <p>Get started with the Next.js boilerplate by following these step-by-step instructions. This guide will help you set up a complete development environment.</p>
        
        <div className="alert alert-info">
          <strong>💡 Before you start:</strong> Make sure you have the prerequisites installed on your system.
        </div>

        <h2 id="prerequisites">Prerequisites</h2>
        <div className="steps">
          <div className="step">
            <h3>Node.js 18+</h3>
            <p>Download and install from <a href="https://nodejs.org/">nodejs.org</a></p>
            <div className="code-block">
              <div className="language-label">bash</div>
              <pre><code>{`# Verify installation
node --version
npm --version`}</code></pre>
            </div>
          </div>
          
          <div className="step">
            <h3>Package Manager</h3>
            <p>Choose your preferred package manager: npm, yarn, or pnpm</p>
          </div>
          
          <div className="step">
            <h3>Git</h3>
            <p>Version control system for cloning the repository</p>
          </div>
        </div>

        <h2 id="installation">Quick Setup</h2>
        <div className="steps">
          <div className="step">
            <h3>Clone the Repository</h3>
            <div className="code-block">
              <div className="language-label">bash</div>
              <pre><code>{`git clone <repository-url>
cd nextjs-boilerplate`}</code></pre>
            </div>
          </div>
          
          <div className="step">
            <h3>Install Dependencies</h3>
            <div className="code-block">
              <div className="language-label">bash</div>
              <pre><code>{`npm install
# or
yarn install
# or
pnpm install`}</code></pre>
            </div>
          </div>
          
          <div className="step">
            <h3>Environment Setup</h3>
            <p>Copy the example environment file and configure your settings:</p>
            <div className="code-block">
              <div className="language-label">bash</div>
              <pre><code>{`cp .env.example .env.local`}</code></pre>
            </div>
          </div>
          
          <div className="step">
            <h3>Start Development Server</h3>
            <div className="code-block">
              <div className="language-label">bash</div>
              <pre><code>{`npm run dev`}</code></pre>
            </div>
            <p>Open <a href="http://localhost:3000">http://localhost:3000</a> in your browser</p>
          </div>
        </div>

        <h2 id="structure">Directory Structure</h2>
        <p>Understanding the project organization:</p>
        <div className="code-block">
          <div className="language-label">tree</div>
          <pre><code>{`├── src/
│   ├── app/          # Next.js App Router pages
│   ├── components/   # Reusable React components
│   └── middleware.ts # Edge middleware
├── config/          # Configuration files
│   ├── config.base.js
│   └── config.dev.js
├── docs/           # Documentation files
├── public/         # Static assets
└── tests/          # Test files`}</code></pre>
        </div>

        <div className="alert alert-success">
          <strong>✅ Success!</strong> Your development environment is ready. Proceed to the <a href="/docs/getting-started/configuration">Configuration Guide</a>.
        </div>
      </div>
    ),

    'configuration': (
      <div>
        <h2 id="overview">Configuration System</h2>
        <p>The boilerplate uses a powerful config-driven architecture that provides flexibility, maintainability, and type safety. Learn how to customize your application settings.</p>

        <div className="alert alert-info">
          <strong>🏗️ Architecture:</strong> We use JavaScript runtime configs with TypeScript definitions for optimal Node.js compatibility.
        </div>

        <h2 id="structure">Configuration Structure</h2>
        <p>Configuration files are organized by environment and feature for clear separation:</p>

        <div className="steps">
          <div className="step">
            <h3>Base Configuration</h3>
            <p><code>config/config.base.js</code> - Common settings shared across all environments</p>
            <div className="code-block">
              <div className="language-label">javascript</div>
              <pre><code>{`module.exports = {
  app: {
    name: 'Next.js Boilerplate',
    version: '1.0.0'
  },
  security: {
    cors: {
      enabled: true,
      origin: ['http://localhost:3000']
    }
  }
}`}</code></pre>
            </div>
          </div>

          <div className="step">
            <h3>Environment Overrides</h3>
            <p>Environment-specific files override base settings:</p>
            <ul>
              <li><code>config.dev.js</code> - Development overrides</li>
              <li><code>config.prod.js</code> - Production overrides</li>
              <li><code>config.test.js</code> - Test environment</li>
            </ul>
          </div>

          <div className="step">
            <h3>Type Definitions</h3>
            <p><code>config/types.d.ts</code> - TypeScript interfaces for type safety</p>
          </div>
        </div>

        <h2 id="environment">Environment Variables</h2>
        <p>Sensitive configuration is handled through environment variables in <code>.env.local</code>:</p>

        <div className="code-block">
          <div className="language-label">bash</div>
          <pre><code>{`# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# Authentication
AUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# External API Integration
API_BASE_URL=https://api.example.com
API_KEY=your-api-key

# Feature Flags
FEATURE_ANALYTICS=true
FEATURE_PAYMENTS=false`}</code></pre>
        </div>

        <div className="alert alert-warning">
          <strong>🔒 Security:</strong> Never commit <code>.env.local</code> to version control. Use <code>.env.example</code> as a template.
        </div>

        <h2 id="usage">Using Configuration</h2>
        <div className="steps">
          <div className="step">
            <h3>Import Configuration</h3>
            <div className="code-block">
              <div className="language-label">typescript</div>
              <pre><code>{`import { getConfig } from '@/config';

const config = getConfig();
console.log(config.app.name);`}</code></pre>
            </div>
          </div>

          <div className="step">
            <h3>Environment-Specific Values</h3>
            <div className="code-block">
              <div className="language-label">typescript</div>
              <pre><code>{`// Automatically loads the right environment
const isDev = config.env === 'development';
const apiUrl = config.apiBaseUrl;`}</code></pre>
            </div>
          </div>

          <div className="step">
            <h3>Feature Flags</h3>
            <div className="code-block">
              <div className="language-label">typescript</div>
              <pre><code>{`import { isFeatureEnabled } from '@/config/features';

if (isFeatureEnabled('analytics')) {
  // Initialize analytics
}`}</code></pre>
            </div>
          </div>
        </div>

        <h2 id="examples">Common Patterns</h2>
        <p>Here are some common configuration patterns you can use:</p>

        <h3>Database Configuration</h3>
        <div className="code-block">
          <div className="language-label">javascript</div>
          <pre><code>{`// config/config.base.js
module.exports = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    ssl: process.env.NODE_ENV === 'production'
  }
}`}</code></pre>
        </div>

        <div className="alert alert-success">
          <strong>✅ Next Steps:</strong> Learn about <a href="/docs/components/button">Components</a> or explore <a href="/docs/patterns/security">Security Patterns</a>.
        </div>
      </div>
    ),

    'button': (
      <div>
        <h2>Button Component</h2>
        <p>A flexible, accessible button component with multiple variants and states.</p>

        <h3>Usage</h3>
        <pre><code>{`import { Button } from '@/components/ui/Button';

// Basic usage
<Button>Click me</Button>

// With variant
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>

// With size
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// Disabled state
<Button disabled>Disabled</Button>`}</code></pre>

        <h3>Props</h3>
        <ul>
          <li><code>variant</code> - Visual style (primary, secondary, danger)</li>
          <li><code>size</code> - Button size (sm, md, lg)</li>
          <li><code>disabled</code> - Disabled state</li>
          <li><code>loading</code> - Loading state with spinner</li>
        </ul>
      </div>
    ),

    'error-handling': (
      <div>
        <h2>Error Handling</h2>
        <p>Comprehensive error handling system with custom error pages and components.</p>

        <h3>Error Pages</h3>
        <p>Pre-built error pages for common HTTP status codes:</p>
        <ul>
          <li>404 - Page Not Found</li>
          <li>401 - Unauthorized</li>
          <li>403 - Forbidden</li>
          <li>500 - Internal Server Error</li>
        </ul>

        <h3>Custom Error Components</h3>
        <pre><code>{`import { BaseErrorPage } from '@/components/errors/BaseErrorPage';

<BaseErrorPage
  title="Custom Error"
  description="Something went wrong"
  statusCode={400}
  showRetry={true}
/>`}</code></pre>
      </div>
    ),

    'security': (
      <div>
        <h2>Security Features</h2>
        <p>Built-in security measures to protect your application.</p>

        <h3>Security Headers</h3>
        <ul>
          <li>Content Security Policy (CSP)</li>
          <li>X-Frame-Options</li>
          <li>X-Content-Type-Options</li>
          <li>Referrer-Policy</li>
        </ul>

        <h3>Input Validation</h3>
        <p>Server-side and client-side validation using Zod schemas.</p>

        <h3>Authentication</h3>
        <p>Secure authentication with NextAuth.js and proper session management.</p>
      </div>
    ),

    'deployment': (
      <div>
        <h2>Production Deployment</h2>
        <p>Deploy your application to production with confidence.</p>

        <h3>Build Process</h3>
        <pre><code>{`# Build for production
npm run build

# Start production server
npm start`}</code></pre>

        <h3>Environment Setup</h3>
        <ul>
          <li>Set NODE_ENV=production</li>
          <li>Configure production database</li>
          <li>Set up monitoring and logging</li>
        </ul>

        <h3>Performance Optimization</h3>
        <ul>
          <li>Image optimization with next/image</li>
          <li>Bundle analysis and splitting</li>
          <li>Caching strategies</li>
        </ul>
      </div>
    ),
  };

  return content[pageId] || (
    <div>
      <h2>Coming Soon</h2>
      <p>This documentation page is under development.</p>
    </div>
  );
}