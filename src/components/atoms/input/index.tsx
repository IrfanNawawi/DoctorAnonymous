import React, { forwardRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { InputProps } from '../../../types/input';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const Input = forwardRef<TextInput, InputProps>(({
  label, 
  value, 
  onChangeTextInput, 
  secureTextEntry = false, 
  keyboardType = 'default', 
  disabled = false
}, ref) => {
  const [borderColor, setBorderColor] = useState(colors.border);

  const handleFocus = () => setBorderColor(colors.primary);
  const handleBlur = () => setBorderColor(colors.border);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ ...inputStyle(disabled), borderColor }}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeTextInput}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        selectTextOnFocus={!disabled}
      />
    </View>
  );
});

export default Input;

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

const inputStyle = (disabled: boolean) => ({
  ...styles.input,
  color: disabled ? colors.disabled.text : colors.text.primary,
});
