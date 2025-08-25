import { ImageProps } from "react-native";

export type DataTypeHeader = 'dark' | 'light' | 'dark-profile';

export type HeaderProps = {
  title?: string;
  profession?: string;
  photo?: ImageProps;
  type?: DataTypeHeader;
  onPressHeader?: () => void;
  onPressProfileDoctor?: () => void;
};