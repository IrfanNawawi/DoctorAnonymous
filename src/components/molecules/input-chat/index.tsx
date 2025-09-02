import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { InputProps } from '../../../types/input';
import { colors, fonts } from '../../../utils';
import { Button } from '../../atoms';

export default function InputChat({ label, value, onChangeTextInput, onPress }: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={`Tulis Pesan Untuk ${label}`}
        value={value}
        onChangeText={onChangeTextInput}
        keyboardType="default"
      />
      <Button 
        title='send' 
        typeButton='icon-btn-send'
        disabled={!value}
        onPress={onPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.white
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