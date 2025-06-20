import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Gap } from '../../atoms'
import { colors, fonts } from '../../../utils'

type HeaderProps = {
  title: string
  onPressHeader?: () => void
};

export default function Header({ onPressHeader, title }: HeaderProps) {
  
  return (
    <View style={styles.container}>
      <Button
        typeButton="icon-only"
        typeIcon="back-dark" // ✅ Gunakan string sesuai yang diterima komponen IconOnly
        onPressButton={onPressHeader}
      />
      <Text style={styles.text}>{title}</Text>
      <Gap width={24} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: colors.button.secondary.background,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center', 
    flex: 1, 
    fontSize: 20, 
    fontFamily: fonts.primary[600], 
    color: colors.button.secondary.text
  }
})