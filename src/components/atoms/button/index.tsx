import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../../utils';
import IconOnly from './icon-only';

type ButtonType = 'primary' | 'secondary' | 'icon-only';
type IconType = 'back-dark' | 'back-light';

type PropsButton = {
  typeButton: ButtonType;
  title?: string;
  onPressButton?: () => void;
  typeIcon?: IconType;
};

export default function Button({ typeButton, typeIcon, title = '', onPressButton }: PropsButton) {
  // Render khusus untuk button ikon saja
  if (typeButton === 'icon-only') {
    if (!typeIcon) {
      console.warn('Button typeIcon is required when typeButton is "icon-only"');
      return null;
    }
    return <IconOnly typeIcon={typeIcon} onPressIconOnly={onPressButton} />;
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
