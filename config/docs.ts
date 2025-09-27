// Documentation configuration
export const docsConfig = {
  title: "Project Documentation",
  description: "Complete guide to the Next.js boilerplate project",
  
  // Available documentation pages
  pages: [
    {
      id: "introduction",
      title: "Introduction",
      description: "Welcome to the Next.js boilerplate documentation",
      path: "/docs",
      file: "introduction.md",
      icon: "�",
      category: "getting-started"
    },
    {
      id: "installation",
      title: "Installation",
      description: "Set up the boilerplate in your development environment",
      path: "/docs/getting-started/installation",
      file: "installation.md",
      icon: "�",
      category: "getting-started"
    },
    {
      id: "configuration",
      title: "Configuration",
      description: "Learn about the config-driven architecture",
      path: "/docs/getting-started/configuration",
      file: "configuration.md",
      icon: "⚙️",
      category: "getting-started"
    },
    {
      id: "button",
      title: "Button Component",
      description: "Flexible, accessible button component with variants",
      path: "/docs/components/button",
      file: "button.md",
      icon: "�",
      category: "components"
    },
    {
      id: "error-handling",
      title: "Error Handling",
      description: "Error pages system, configuration, and customization",
      path: "/docs/features/error-handling",
      file: "error-handling.md",
      icon: "⚠️",
      category: "features"
    },
    {
      id: "security",
      title: "Security",
      description: "Security features and best practices",
      path: "/docs/patterns/security",
      file: "security.md",
      icon: "�",
      category: "patterns"
    },
    {
      id: "deployment",
      title: "Deployment",
      description: "Production deployment guide and best practices",
      path: "/docs/deployment/production",
      file: "deployment.md",
      icon: "�",
      category: "deployment"
    }
  ],

  // Categories for organizing docs
  categories: [
    {
      id: "getting-started",
      name: "Getting Started",
      description: "Essential guides to get you up and running"
    },
    {
      id: "components",
      name: "Components",
      description: "Reusable components and their usage"
    },
    {
      id: "features",
      name: "Features",
      description: "Application features and functionality"
    },
    {
      id: "patterns",
      name: "Patterns",
      description: "Architecture patterns and best practices"
    },
    {
      id: "deployment",
      name: "Deployment",
      description: "Deployment and production guides"
    }
  ]
} as const;

// Helper functions
export function getDocPageById(id: string) {
  return docsConfig.pages.find(page => page.id === id);
}

export function getDocsByCategory(categoryId: string) {
  const normalizedCategoryId = categoryId.toLowerCase().replace(/\s+/g, '-');
  return docsConfig.pages.filter(page => 
    page.category.toLowerCase().replace(/\s+/g, '-') === normalizedCategoryId
  );
}

export function getRelatedDocs(currentPageId: string) {
  return docsConfig.pages.filter(page => page.id !== currentPageId);
}

export function getCategoryInfo(categoryName: string) {
  const normalizedCategoryName = categoryName.toLowerCase().replace(/\s+/g, '-');
  return docsConfig.categories.find(cat => 
    cat.name.toLowerCase().replace(/\s+/g, '-') === normalizedCategoryName
  );
}

export type DocPage = typeof docsConfig.pages[0];
export type DocCategory = typeof docsConfig.categories[0];