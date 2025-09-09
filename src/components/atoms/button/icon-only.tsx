import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IcBackDark, IcBackLight } from '../../../assets/icon';
import { ButtonProps } from '../../../types/button';

export default function IconOnly({ typeIcon, onPress }: ButtonProps) {
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
    <TouchableOpacity onPress={onPress}>
      {renderIconBack()}
    </TouchableOpacity>
  );
}
