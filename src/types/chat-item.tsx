import { ImageProps } from "react-native";

export type ChatItemProps = {
  isSender?: boolean;
  text: string;
  date: string;
  photoDoctor?: ImageProps;
};

interface ChatItemData {
  id: string;
  data: {
    chatDelivery: string;
    chatContent: string;
    sentBy: string;
  };
};
  
export interface ChatGroup {
  id: string;
  data: ChatItemData[];
};