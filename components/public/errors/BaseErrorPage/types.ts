export interface ErrorAction {
  label: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export interface ErrorPageProps {
  title: string;
  description: string;
  action?: ErrorAction | null;
  icon?: string;
  className?: string;
}