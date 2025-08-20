import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IcSendActive, IcSendNonactive } from '../../../assets'
import { colors } from '../../../utils'
import { ButtonProps } from '../../../types/button'

export default function IconBtnSend({disabled}: ButtonProps) {
  return (
    <View style={containerStyle(disabled)}>
      {disabled ? <IcSendNonactive/> : <IcSendActive/>}
    </View>
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