import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IcBackDark, IcBackLight } from '../../../assets'; // Replace with correct import path

type IconType = 'back-dark' | 'back-light';
type IconOnlyProps = {
  typeIcon: IconType;
  onPressIconOnly?: () => void;
};

const Icon = ({ typeIcon }: { typeIcon: IconType }) => {
  switch (typeIcon) {
    case 'back-dark':
      return <IcBackDark />;
    case 'back-light':
      return <IcBackLight />;
    default:
      return <IcBackDark />;
  }
};

export default function IconOnly({ typeIcon, onPressIconOnly }: IconOnlyProps) {
  return (
    <TouchableOpacity onPress={onPressIconOnly}>
      <Icon typeIcon={typeIcon} />
    </TouchableOpacity>
  );
}
