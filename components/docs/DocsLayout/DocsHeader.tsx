// Documentation Header Component
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { docsConfig } from '../../../config/docs';
import styles from './styles.module.css';

interface DocsHeaderProps {
  title?: string;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
  category: string;
}

export const DocsHeader: React.FC<DocsHeaderProps> = ({ 
  title = 'Documentation' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search functionality
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results = docsConfig.pages.filter(page => 
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6);

    setSearchResults(results);
    setShowResults(results.length > 0);
    setSelectedIndex(-1);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          window.location.href = searchResults[selectedIndex].path;
        }
        break;
      case 'Escape':
        setShowResults(false);
        inputRef.current?.blur();
        break;
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'getting-started': '#00875a',
      'components': '#0052cc',
      'features': '#ff8b00',
      'patterns': '#de350b',
      'deployment': '#5243aa'
    };
    return colors[category as keyof typeof colors] || '#97a0af';
  };

  return (
    <header className={styles.docsHeader}>
      <div className={styles.headerLeft}>
        <Link href="/docs" className={styles.headerTitle}>
          Documentation
        </Link>
        <div className={styles.headerBreadcrumb}>
          {title !== 'Documentation' && (
            <>
              <span className={styles.breadcrumbSeparator}>›</span>
              <span className={styles.breadcrumbCurrent}>{title}</span>
            </>
          )}
        </div>
      </div>
      
      <div className={styles.headerRight}>
        <div className={styles.searchBox} ref={searchRef}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation... (⌘K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.searchInput}
            onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
          />
          <span className={styles.searchIcon}>🔍</span>
          
          {/* Search Results Dropdown */}
          {showResults && (
            <div className={styles.searchResults}>
              <div className={styles.searchResultsHeader}>
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </div>
              {searchResults.map((result, index) => (
                <Link
                  key={result.id}
                  href={result.path}
                  className={`${styles.searchResult} ${
                    index === selectedIndex ? styles.searchResultSelected : ''
                  }`}
                  onClick={() => {
                    setShowResults(false);
                    setSearchQuery('');
                  }}
                >
                  <div className={styles.searchResultIcon}>{result.icon}</div>
                  <div className={styles.searchResultContent}>
                    <div className={styles.searchResultTitle}>{result.title}</div>
                    <div className={styles.searchResultDesc}>{result.description}</div>
                  </div>
                  <div 
                    className={styles.searchResultCategory}
                    style={{ backgroundColor: getCategoryColor(result.category) }}
                  >
                    {result.category.replace('-', ' ')}
                  </div>
                </Link>
              ))}
              <div className={styles.searchResultsFooter}>
                Use ↑↓ to navigate, ↵ to select, ESC to close
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label="Toggle theme"
          title="Toggle dark/light theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};