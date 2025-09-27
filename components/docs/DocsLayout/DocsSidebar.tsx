// Documentation Sidebar Component
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { docsConfig, getDocsByCategory } from '../../../config/docs';
import styles from './styles.module.css';

interface DocsSidebarProps {
  currentPageId: string;
}

export const DocsSidebar: React.FC<DocsSidebarProps> = ({ currentPageId }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['getting-started', 'design-system', 'components'])
  );

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <nav className={styles.docsSidebar}>
      <div className={styles.sidebarHeader}>
        <Link href="/docs" className={styles.sidebarTitle}>
          📚 Documentation
        </Link>
      </div>
      
      <div className={styles.sidebarContent}>
        {docsConfig.categories.map(category => {
          const categoryId = category.name.toLowerCase().replace(/\s+/g, '-');
          const categoryDocs = getDocsByCategory(categoryId);
          const isExpanded = expandedCategories.has(categoryId);
          
          if (categoryDocs.length === 0) return null;
          
          return (
            <div key={categoryId} className={styles.categorySection}>
              <button
                className={styles.categoryButton}
                onClick={() => toggleCategory(categoryId)}
                aria-expanded={isExpanded}
              >
                <span className={styles.categoryName}>{category.name}</span>
                <span className={`${styles.categoryIcon} ${isExpanded ? styles.expanded : ''}`}>
                  ▶
                </span>
              </button>
              
              {isExpanded && (
                <ul className={styles.categoryList}>
                  {categoryDocs.map(doc => (
                    <li key={doc.id} className={styles.categoryItem}>
                      <Link
                        href={doc.path}
                        className={`${styles.docLink} ${
                          doc.id === currentPageId ? styles.active : ''
                        }`}
                      >
                        <span className={styles.docIcon}>{doc.icon}</span>
                        <span className={styles.docTitle}>{doc.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};