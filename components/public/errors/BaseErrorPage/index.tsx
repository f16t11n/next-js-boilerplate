// Base Error Page Component - reusable for all error types
'use client';

import React from 'react';
import { Button } from '../../ui/Button';
import styles from './styles.module.css';
import { ErrorPageProps } from './types';

export const BaseErrorPage: React.FC<ErrorPageProps> = ({
  title,
  description,
  action,
  icon,
  className = '',
}) => {
  return (
    <main className={`${styles.errorPage} ${className}`} role="alert">
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        </div>
        
        <h1 className={styles.title}>
          {title}
        </h1>
        
        <p className={styles.description}>
          {description}
        </p>
        
        {action && (
          <div className={styles.actionWrapper}>
            <Button
              href={action.href}
              onClick={action.onClick}
              variant="primary"
              size="medium"
              aria-label={action.ariaLabel || action.label}
            >
              {action.label}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};