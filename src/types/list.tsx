import { ImageProps } from "react-native";

export type ListProps = {
    name: string;
    desc: string;
    picture?: ImageProps;
    type?: 'next';
    icon?: string;
    onPressList?: () => void;
}