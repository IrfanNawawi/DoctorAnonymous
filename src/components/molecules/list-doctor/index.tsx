import React from 'react'
import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import { IcNextLight } from '../../../assets';

type ListDoctorProps = {
    name: string;
    desc: string;
    picture: ImageProps
    type?: 'next'
    onPressListDoctor?: () => void
}

export default function ListDoctor({name, desc, picture, type, onPressListDoctor}: ListDoctorProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressListDoctor}>
        <Image source={picture} style={styles.avatar}/>
        <View style={styles.content}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.desc}>{desc}</Text>
        </View>
        {type === 'next' && <IcNextLight />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content: {
        flex: 1
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