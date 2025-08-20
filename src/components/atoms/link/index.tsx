import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { LinkProps } from '../../../types/link'

export default function Link({title, fontSize, align, onPress}: LinkProps) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={fontSizeStyle(fontSize, align)}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
      fontFamily: fonts.primary[400], 
      color: colors.text.secondary, 
      textDecorationLine: 'underline'
    }
})

// Style dinamis
const fontSizeStyle = (fontSize: number, align: 'left' | 'center' | 'right') => ({
    ...styles.text,
    fontSize: fontSize,
    textAlign: align
});