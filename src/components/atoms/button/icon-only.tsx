import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IcBackDark, IcBackLight } from '../../../assets'; // Replace with correct import path

type IconType = 'back-dark' | 'back-light';
type IconOnlyProps = {
  typeIcon?: IconType;
  onPressIconOnly?: () => void;
};

export default function IconOnly({ typeIcon, onPressIconOnly }: IconOnlyProps) {
  const renderIconBack = () => {
    switch (typeIcon) {
      case 'back-dark':
        return <IcBackDark />;
      case 'back-light':
        return <IcBackLight />;
      default:
        return <IcBackDark />;
    }
  };

  return (
    <TouchableOpacity onPress={onPressIconOnly}>
      {renderIconBack()}
    </TouchableOpacity>
  );
}
