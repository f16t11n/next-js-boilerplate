export interface NotFoundProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    ariaLabel?: string;
  } | null;
  icon?: string;
  className?: string;
}