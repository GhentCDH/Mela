export enum Size {
  xs = 'xs',
  sm = 'sm',
  lg = 'lg',
}

// Dictionary of button size classes
export const ButtonSize: Record<Size, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  lg: 'btn-sm',
};

// Dictionary of Badge size classes
export const BadgeSize: Record<Size, string> = {
  xs: 'badge-xs text-xxs',
  sm: 'badge-sm text-xs',
  lg: 'badge-sm text-xs',
};
