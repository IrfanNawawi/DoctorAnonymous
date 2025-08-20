export type DataTypeHeader = 'dark' | 'light' | 'dark-profile';

export type HeaderProps = {
  title?: string;
  type?: DataTypeHeader;
  onPressHeader?: () => void;
  onPressProfileDoctor?: () => void;
};