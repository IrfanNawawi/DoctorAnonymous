import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts } from '../../../utils';

type InputProps = {
  label: string;
  value: string;
  onChangeTextInput: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
};

export default function Input({ label, value, onChangeTextInput, secureTextEntry = false, keyboardType = 'default' }: InputProps) {
  const [borderColor, setBorderColor] = useState(colors.border);

  const handleFocus = () => setBorderColor(colors.primary);
  const handleBlur = () => setBorderColor(colors.border);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.input, { borderColor }]}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeTextInput}
        secureTextEntry={secureTextEntry}
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
