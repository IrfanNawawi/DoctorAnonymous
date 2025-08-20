import { ImageProps } from "react-native";

export type ProfileType = 'photo-upload' | 'photo-remove' | 'photo-detail' | 'photo-gender-male' | 'photo-gender-female';

export type DoctorData = {
  deviceId?: string;
  devicePlatform?: string;
  email?: string;
  fullname?: string;
  photo?: ImageProps;
  profession?: string;
  userId?: string;
  category?: string;
  gender?: string;
  hospital?: number;
  university?: string;
  strNumber?: string;
  rate?: number;
  desc?: string;
  typeProfile?: ProfileType;
  onPress?: () => void;
};

export type CategoryData = {
  id: string;
  name: string;
}
