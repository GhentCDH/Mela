export enum Color {
  blank = 'blank',
  primary = 'primary',
  secondary = 'secondary',
}

export const ButtonColor: Record<Color, string> = {
  blank: 'btn-ghost',
  primary: 'btn-primary',
  secondary: 'btn-soft btn-primary',
};

export const BadgeColor: Record<Color, string> = {
  blank: 'badge-ghost',
  primary: 'badge-primary',
  secondary: 'badge-soft badge-primary',
};
