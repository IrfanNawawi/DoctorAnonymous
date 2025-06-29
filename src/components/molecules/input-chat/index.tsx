import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import { Button } from '../../atoms'

export default function InputChat() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='Tulis Pesan Untuk Nairobi' />
      <Button 
        title='send' 
        typeButton='icon-btn-send'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: colors.disable,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    fontFamily: fonts.primary[400],
    maxHeight: 45
  }
})