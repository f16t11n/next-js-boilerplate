// Documentation Main Page
import { DocsLayout } from '../../../components/docs/DocsLayout';
import Link from 'next/link';
import { docsConfig } from '../../../config/docs';
import styles from './styles.module.css';

export default function DocsPage() {
  return (
    <DocsLayout currentPageId="introduction" title="Documentation">
      <div className={styles.docsHome}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroIcon}>📚</span>
              Welcome to Documentation
            </h1>
            <p className={styles.heroDescription}>
              Complete guide to building secure, scalable applications with our Next.js boilerplate.
              Everything you need to get started, from installation to deployment.
            </p>
          </div>
        </div>

        {/* Categories Overview Grid */}
        <div className={styles.categoriesSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🗂️</span>
            Explore by Category
          </h2>
          <div className={styles.categoriesGrid}>
            {docsConfig.categories.map(category => {
              const categoryId = category.id;
              const categoryDocs = docsConfig.pages.filter(page => 
                page.category === categoryId
              );
              
              if (categoryDocs.length === 0) return null;
              
              return (
                <div key={categoryId} className={styles.categoryCard}>
                  <div className={styles.categoryHeader}>
                    <h3 className={styles.categoryTitle}>{category.name}</h3>
                    <div className={styles.categoryCount}>{categoryDocs.length} guides</div>
                  </div>
                  <p className={styles.categoryDescription}>{category.description}</p>
                  <div className={styles.categoryLinks}>
                    {categoryDocs.slice(0, 3).map(doc => (
                      <Link
                        key={doc.id}
                        href={doc.path}
                        className={styles.categoryLink}
                      >
                        <span className={styles.categoryLinkIcon}>{doc.icon}</span>
                        <span className={styles.categoryLinkTitle}>{doc.title}</span>
                      </Link>
                    ))}
                    {categoryDocs.length > 3 && (
                      <div className={styles.categoryMore}>
                        +{categoryDocs.length - 3} more guides
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Start Section */}
        <div className={styles.quickStartSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🚀</span>
            Quick Start
          </h2>
          <p className={styles.sectionDescription}>
            Get up and running in minutes with these essential guides
          </p>
          <div className={styles.quickStartGrid}>
            <Link
              href="/docs/getting-started/installation"
              className={styles.quickStartCard}
            >
              <div className={styles.quickStartIcon}>🛠️</div>
              <div className={styles.quickStartContent}>
                <h3 className={styles.quickStartTitle}>Installation</h3>
                <p className={styles.quickStartDesc}>Set up the boilerplate in your development environment</p>
                <div className={styles.quickStartMeta}>5 min read</div>
              </div>
            </Link>
            <Link
              href="/docs/getting-started/configuration"
              className={styles.quickStartCard}
            >
              <div className={styles.quickStartIcon}>⚙️</div>
              <div className={styles.quickStartContent}>
                <h3 className={styles.quickStartTitle}>Configuration</h3>
                <p className={styles.quickStartDesc}>Learn about the config-driven architecture</p>
                <div className={styles.quickStartMeta}>10 min read</div>
              </div>
            </Link>
            <Link
              href="/docs/components/button"
              className={styles.quickStartCard}
            >
              <div className={styles.quickStartIcon}>🧩</div>
              <div className={styles.quickStartContent}>
                <h3 className={styles.quickStartTitle}>Components</h3>
                <p className={styles.quickStartDesc}>Explore reusable UI components and patterns</p>
                <div className={styles.quickStartMeta}>8 min read</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Popular Pages */}
        <div className={styles.popularSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>⭐</span>
            Popular Pages
          </h2>
          <div className={styles.popularGrid}>
            {docsConfig.pages.slice(0, 6).map(page => (
              <Link key={page.id} href={page.path} className={styles.popularCard}>
                <span className={styles.popularIcon}>{page.icon}</span>
                <span className={styles.popularTitle}>{page.title}</span>
                <span className={styles.popularArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

export const metadata = {
  title: 'Documentation | Next.js Boilerplate',
  description: 'Complete documentation for the secure Next.js boilerplate',
};