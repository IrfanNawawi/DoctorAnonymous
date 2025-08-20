import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { ListDoctorProfileProps } from '../../../types/profile'

export default function ListDoctorProfile({title, desc}: ListDoctorProfileProps) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        fontSize: 14,
        fontFamily: fonts.primary[400],
        color: colors.text.secondary,
        marginBottom: 6
    },
    desc: {
        fontSize: 14,
        fontFamily: fonts.primary[400],
        color: colors.text.primary
    },
})