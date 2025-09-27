// Documentation Layout Index - Export all components
export { DocsLayout } from './DocsLayout';
export { DocsHeader } from './DocsHeader';
export { DocsSidebar } from './DocsSidebar';
export { DocsNavigation } from './DocsNavigation';

// Types for the documentation system
export interface DocsLayoutProps {
  children: React.ReactNode;
  currentPageId?: string;
  showNavigation?: boolean;
}

export interface DocsHeaderProps {
  title?: string;
}

export interface DocsSidebarProps {
  currentPageId: string;
}

export interface DocsNavigationProps {
  currentPageId: string;
  showPrevNext?: boolean;
}