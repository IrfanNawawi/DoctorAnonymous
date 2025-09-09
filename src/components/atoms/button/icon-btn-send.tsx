import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IcSendActive, IcSendNonactive } from '../../../assets/icon';
import { ButtonProps } from '../../../types/button';
import { colors } from '../../../utils/colors';

export default function IconBtnSend({disabled, onPress}: ButtonProps) {
  if (disabled) {
    return (
      <View style={containerStyle(disabled)}>
        <IcSendNonactive/>
      </View>
    )
  }

  return (
    <TouchableOpacity style={containerStyle(disabled)} onPress={onPress}>
      <IcSendActive/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    borderRadius: 10,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 8,
    paddingLeft: 8
  }
})

const containerStyle = (disable?: boolean) => ({
  ...styles.container,
  backgroundColor: disable ? colors.disable : colors.button.primary.background
});