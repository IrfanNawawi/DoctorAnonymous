import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import { ListHospitalProps } from '../../../types/hospital'

export default function ListHospital({type, name, address, picture}: ListHospitalProps) {
  return (
    <View style={styles.container}>
        <Image source={picture} style={styles.picture}/>
        <View>
            <Text style={styles.title}>{type}</Text>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.address}>{address}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container :{
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    picture: {
        width: 80,
        height: 60,
        borderRadius: 11,
        marginRight: 16
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.primary[400],
        color: colors.text.primary
    },
    address: {
        fontSize: 12,
        fontFamily: fonts.primary[300],
        color: colors.text.secondary,
        marginTop: 6
    }
})