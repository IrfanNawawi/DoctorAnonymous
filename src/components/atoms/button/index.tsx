import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ButtonProps, ButtonType } from '../../../types/button';
import { colors, fonts } from '../../../utils';
import IconBtnSend from './icon-btn-send';
import IconOnly from './icon-only';

export default function Button({
  typeButton = 'primary',
  typeIcon,
  title = '',
  onPress,
  disabled = false
}: ButtonProps) {
  
  if (typeButton === 'icon-only') {
    return <IconOnly typeIcon={typeIcon} onPress={onPress} />;
  }

  if (typeButton === 'icon-btn-send') {
    return <IconBtnSend onPress={onPress} disabled={disabled} />;
  }

  return (
    <TouchableOpacity
      style={disabled ? styles.disableButton : containerStyle(typeButton)}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
    >
      <Text style={disabled ? styles.disableTextButton : titleButtonStyle(typeButton)}>
        {title}
      </Text>
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
  disableButton: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.disable,
  },
  disableTextButton: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    color: colors.disabled.text
  }
});

// Style dinamis
const containerStyle = (type: ButtonType) => ({
  ...styles.containerBase,
  backgroundColor: type === 'secondary'
    ? colors.button.secondary.background
    : colors.button.primary.background, 
});

const titleButtonStyle = (type: ButtonType) => ({
  ...styles.titleBase,
  color: type === 'secondary'
    ? colors.button.secondary.text
    : colors.button.primary.text,
});
