import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils';

type InputProps = {
    label: string
};

export default function Input({label}: InputProps) {
  return (
    <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input}/>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1, 
        borderColor: colors.border, 
        borderRadius: 10, 
        padding: 12,
    },
    label: {
        fontSize: 16, 
        fontFamily: fonts.primary[400], 
        color: colors.text.secondary, 
        marginBottom: 6,
    }
})