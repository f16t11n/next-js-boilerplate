// Documentation Navigation for Related Pages
'use client';

import React from 'react';
import Link from 'next/link';
import { docsConfig, getRelatedDocs } from '../../../config/docs';
import styles from './styles.module.css';

interface DocsNavigationProps {
  currentPageId: string;
  showPrevNext?: boolean;
}

export const DocsNavigation: React.FC<DocsNavigationProps> = ({ 
  currentPageId, 
  showPrevNext = true 
}) => {
  const relatedDocs = getRelatedDocs(currentPageId);
  const currentDoc = docsConfig.pages.find(page => page.id === currentPageId);
  
  if (!currentDoc) return null;

  // Find previous and next docs in the same category
  const sameCategoryDocs = docsConfig.pages.filter(page => 
    page.category === currentDoc.category
  );
  const currentIndex = sameCategoryDocs.findIndex(page => page.id === currentPageId);
  const prevDoc = currentIndex > 0 ? sameCategoryDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < sameCategoryDocs.length - 1 ? sameCategoryDocs[currentIndex + 1] : null;

  return (
    <div className={styles.docsNavigation}>
      {/* Previous/Next Navigation */}
      {showPrevNext && (prevDoc || nextDoc) && (
        <div className={styles.prevNextNavigation}>
          {prevDoc && (
            <Link href={prevDoc.path} className={`${styles.navButton} ${styles.prevButton}`}>
              <span className={styles.navDirection}>← Previous</span>
              <span className={styles.navTitle}>{prevDoc.title}</span>
            </Link>
          )}
          
          {nextDoc && (
            <Link href={nextDoc.path} className={`${styles.navButton} ${styles.nextButton}`}>
              <span className={styles.navDirection}>Next →</span>
              <span className={styles.navTitle}>{nextDoc.title}</span>
            </Link>
          )}
        </div>
      )}

      {/* Related Pages Section */}
      {relatedDocs.length > 0 && (
        <div className={styles.relatedSection}>
          <h3 className={styles.relatedTitle}>Related Pages</h3>
          <div className={styles.relatedGrid}>
            {relatedDocs.map(doc => (
              <Link key={doc.id} href={doc.path} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>{doc.icon}</div>
                <div className={styles.relatedContent}>
                  <h4 className={styles.relatedCardTitle}>{doc.title}</h4>
                  <p className={styles.relatedDescription}>
                    {doc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className={styles.quickLinks}>
        <h3 className={styles.quickLinksTitle}>Quick Links</h3>
        <div className={styles.quickLinksGrid}>
          <Link href="/docs/getting-started/installation" className={styles.quickLink}>
            🚀 Get Started
          </Link>
          <Link href="/docs/components/button" className={styles.quickLink}>
            🧩 Components
          </Link>
          <Link href="/docs/patterns/configuration" className={styles.quickLink}>
            ⚙️ Configuration
          </Link>
          <Link href="/docs/deployment/production" className={styles.quickLink}>
            🌐 Deploy
          </Link>
        </div>
      </div>
    </div>
  );
};