// Shared Button component for consistent CTAs across error pages
'use client';

import React from 'react';
import styles from './styles.module.css';

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const baseClasses = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;
  
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    if (href && href.startsWith('javascript:')) {
      e.preventDefault();
      // Execute the JavaScript code safely
      if (href === 'javascript:history.back()') {
        window.history.back();
      } else if (href === 'javascript:location.reload()') {
        window.location.reload();
      }
      return;
    }
    
    if (onClick) {
      onClick();
    }
  };

  if (href && !href.startsWith('javascript:')) {
    return (
      <a
        href={href}
        className={baseClasses}
        aria-label={ariaLabel}
        onClick={handleClick}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};