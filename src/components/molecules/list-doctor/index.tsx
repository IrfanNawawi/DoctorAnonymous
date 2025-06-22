import React from 'react'
import { Image, ImageProps, StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'

type PropsListDoctor = {
    name: string;
    desc: string;
    picture: ImageProps
}

export default function ListDoctor({name, desc, picture}: PropsListDoctor) {
  return (
    <View style={styles.container}>
        <Image source={picture} style={styles.avatar}/>
        <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.desc}>{desc}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        alignItems: 'center'
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 46 / 2,
        marginRight: 12
    },
    name: {
        fontSize: 16,
        fontFamily: fonts.primary[400],
        color: colors.text.primary
    },
    desc: {
        fontSize: 12,
        fontFamily: fonts.primary[300],
        color: colors.text.secondary
    },
    wrapperContent: {
        flexDirection: 'row',
    }
})