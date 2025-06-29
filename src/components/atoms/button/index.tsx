import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../../utils';
import IconOnly from './icon-only';
import IconBtnSend from './icon-btn-send';

type ButtonType = 'primary' | 'secondary' | 'icon-only' | 'icon-btn-send';
type IconType = 'back-dark' | 'back-light';

type ButtonProps = {
  typeButton: ButtonType;
  title?: string;
  onPressButton?: () => void;
  typeIconButton?: IconType;
  disabledButton?: boolean;
};

export default function Button({ typeButton, typeIconButton, title = '', onPressButton, disabledButton = false }: ButtonProps) {
  switch (typeButton) {
    case 'icon-only':
      return <IconOnly typeIcon={typeIconButton} onPressIconOnly={onPressButton} />;
    case 'icon-btn-send':
      return <IconBtnSend disabledIcon={disabledButton}/>;
  }

  return (
    <TouchableOpacity
      style={containerStyle(typeButton)}
      onPress={onPressButton}
      accessibilityRole="button"
    >
      <Text style={titleButtonStyle(typeButton)}>{title}</Text>
    </TouchableOpacity>
  );
}

// Style statis
const styles = StyleSheet.create({
  containerBase: {
    paddingVertical: 10,
    borderRadius: 10,
  },
  titleBase: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.primary[600],
  },
});

// Style dinamis
const containerStyle = (type: 'primary' | 'secondary') => ({
  ...styles.containerBase,
  backgroundColor: type === 'secondary'
      ? colors.button.secondary.background
      : colors.button.primary.background, 
});

const titleButtonStyle = (type: 'primary' | 'secondary') => ({
  ...styles.titleBase,
  color: type === 'secondary'
      ? colors.button.secondary.text
      : colors.button.primary.text,
});
