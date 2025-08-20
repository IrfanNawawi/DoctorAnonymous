export type ButtonType = 'primary' | 'secondary' | 'icon-only' | 'icon-btn-send';
export type IconType = 'back-dark' | 'back-light';

export type ButtonProps = {
  typeButton?: ButtonType;
  title?: string;
  onPress?: () => void;
  typeIcon?: IconType;
  disabled?: boolean;
};