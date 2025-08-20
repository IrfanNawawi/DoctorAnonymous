export type InputProps = {
  label: string;
  value: string;
  onChangeTextInput?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  disabled?: boolean;
};