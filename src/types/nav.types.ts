export interface NavChild {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  badge?: string;
}

export interface NavLink {
  label: string;
  href?: string;
  badge?: string;
  mega?: boolean;
  children?: NavChild[];
}