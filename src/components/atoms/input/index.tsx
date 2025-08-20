import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts } from '../../../utils';
import { InputProps } from '../../../types/input';

export default function Input({ label, value, onChangeTextInput, secureTextEntry = false, keyboardType = 'default', disabled = false }: InputProps) {
  const [borderColor, setBorderColor] = useState(colors.border);

  const handleFocus = () => setBorderColor(colors.primary);
  const handleBlur = () => setBorderColor(colors.border);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.input, { borderColor, color: disabled ? colors.disabled.text : colors.text.primary }]}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeTextInput}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        selectTextOnFocus={!disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
});
