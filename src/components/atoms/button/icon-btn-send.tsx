import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IcSendActive, IcSendNonactive } from '../../../assets'
import { colors } from '../../../utils'

type IconBtnSendProps = {
  disabledIcon?: boolean
}

export default function IconBtnSend({disabledIcon}: IconBtnSendProps) {
  return (
    <View style={containerStyle(disabledIcon)}>
      {disabledIcon ? <IcSendNonactive/> : <IcSendActive/>}
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