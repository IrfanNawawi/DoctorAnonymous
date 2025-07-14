import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DummyDoctorOne } from '../../../assets'
import { colors, fonts } from '../../../utils'
import { Button } from '../../atoms'

type DarkProfileProps = {
    onPressDarkProfile?: () => void,
    onPressProfileDoctor?: () => void
  };

export default function DarkProfile({onPressDarkProfile, onPressProfileDoctor}: DarkProfileProps) {
  return (
    <View style={styles.container}>
        <Button 
            typeButton='icon-only' 
            typeIconButton='back-light' 
            onPressButton={onPressDarkProfile}
        />
        <TouchableOpacity onPress={onPressProfileDoctor} style={styles.detailHeader}>
            <View style={styles.content}>
                <Text style={styles.name}>Nairobi Putri Hayza</Text>
                <Text style={styles.profession}>UI/UX Designer</Text>
            </View>
            <Image source={DummyDoctorOne} style={styles.avatar}/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary, 
        paddingVertical: 30,
        paddingLeft: 20,
        paddingRight: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        flex: 1,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 46 / 2,
        marginEnd: 16
    },
    name: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.white,
        textAlign: 'center'
    },
    profession: {
        fontSize: 14,
        fontFamily: fonts.primary[400],
        color: colors.text.subTitle,
        textAlign: 'center',
        marginTop: 6
    },
    detailHeader: {
        flexDirection: 'row',
    }
})