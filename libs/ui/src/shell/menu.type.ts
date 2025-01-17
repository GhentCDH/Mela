export type MenuItem = {
  label: string;
  routerLink: string;
  params?: Record<string, string>;
};

export type Menu = MenuItem[];
