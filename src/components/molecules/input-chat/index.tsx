import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { InputProps } from '../../../types/input';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';
import Button from '../../atoms/button';

const InputChat = forwardRef<TextInput, InputProps>(({ label, value, onChangeTextInput, onPress }, ref) => {
  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
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
});

export default InputChat;

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