export type MenuLinkItem = {
  label: string;
  routerLink: string;
  params?: Record<string, string>;
};

export type MenuClickItem = {
  label: string;
  onClick: () => void;
};
