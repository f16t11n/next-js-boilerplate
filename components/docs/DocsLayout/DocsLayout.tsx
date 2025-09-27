// Documentation Layout Component
'use client';

import React from 'react';
import { DocsHeader } from './DocsHeader';
import { DocsSidebar } from './DocsSidebar';
import { DocsNavigation } from './DocsNavigation';
import styles from './styles.module.css';

interface DocsLayoutProps {
  children: React.ReactNode;
  currentPageId?: string;
  showNavigation?: boolean;
  showSidebar?: boolean;
  title?: string;
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({
  children,
  currentPageId = '',
  showNavigation = true,
  showSidebar = true,
  title = 'Documentation'
}) => {
  return (
    <div className={styles.docsLayout}>
      {/* Sidebar */}
      {showSidebar && currentPageId && (
        <DocsSidebar currentPageId={currentPageId} />
      )}
      
      {/* Main Content Area */}
      <div className={styles.docsMainContent}>
        <DocsHeader title={title} />
        
        <div className={styles.contentWrapper}>
          <main className={styles.docsContent}>
            {/* Page Header */}
            <div className={styles.pageHeader}>
              {title !== 'Documentation' && (
                <nav className={styles.breadcrumb}>
                  <a href="/docs" className={styles.breadcrumbLink}>Documentation</a>
                  <span className={styles.breadcrumbSeparator}>›</span>
                  <span className={styles.breadcrumbCurrent}>{title}</span>
                </nav>
              )}
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
              {children}
            </div>
            
            {/* Navigation for related pages */}
            {showNavigation && currentPageId && (
              <DocsNavigation currentPageId={currentPageId} />
            )}
          </main>

          {/* Table of Contents - For individual pages */}
          {currentPageId && currentPageId !== 'introduction' && (
            <aside className={styles.tableOfContents}>
              <div className={styles.tocHeader}>
                <h4>On this page</h4>
              </div>
              <nav className={styles.tocNav}>
                {/* This will be populated by JavaScript or server-side */}
                <a href="#overview" className={styles.tocLink}>Overview</a>
                <a href="#installation" className={styles.tocLink}>Installation</a>
                <a href="#configuration" className={styles.tocLink}>Configuration</a>
                <a href="#examples" className={styles.tocLink}>Examples</a>
              </nav>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};