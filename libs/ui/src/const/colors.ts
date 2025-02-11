export enum Color {
  blank = 'blank',
  primary = 'primary',
  secondary = 'secondary',
  error = 'error',
}

export const ButtonColor: Record<Color, string> = {
  blank: 'btn-ghost',
  primary: 'btn-primary',
  secondary: 'btn-soft btn-primary',
  error: 'btn-error text-white',
};

export const BadgeColor: Record<Color, string> = {
  blank: 'badge-ghost',
  primary: 'badge-primary',
  secondary: 'badge-soft badge-primary',
  error: 'badge-error',
};
