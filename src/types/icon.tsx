export type IconTitleType = 'Doctor' | 'Consultation' | 'Hospitals';

export type IconProps = {
  title: IconTitleType;
  active?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
};