import React from 'react'
import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import { IcNextLight, IcProfileEdit, IcProfileHelpCenter, IcProfileLanguage, IcProfileRated } from '../../../assets';

type ListProps = {
    name: string;
    desc: string;
    picture?: ImageProps
    type?: 'next'
    icon?: string
    onPressList?: () => void
}

const renderSettingUserProfile = (name: string) => {
    switch (name) {
        case 'Edit Profile':
            return <IcProfileEdit />
        case 'Language':
            return <IcProfileLanguage />
        case 'Give Us Rate':
            return <IcProfileRated />
        case 'Help Center':
            return <IcProfileHelpCenter />
        default:
            return <IcProfileEdit />
    }
}

export default function List({name, desc, picture, type, icon, onPressList}: ListProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressList}>
        {icon ? renderSettingUserProfile(name) : <Image source={picture} style={styles.avatar}/>}
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
        flex: 1,
        marginLeft: 16
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 46 / 2,
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