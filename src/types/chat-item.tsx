import { ImageProps } from "react-native";

export type ChatItemProps = {
  isSender?: boolean;
  text: string;
  date: string;
  photoDoctor?: ImageProps;
};