import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IlGetStarted, IlLogo } from '../../assets/illustration'
import { Button, Gap } from '../../components'

export default function Dashboard() {
  return (
    <ImageBackground source={IlGetStarted} style={styles.page}>
        <View>
            <IlLogo />
            <Text style={styles.title}>
                {'Konsultasi dengan\ndokter jadi lebih\nmudah & fleksibel'}
            </Text>
        </View>
        <View>
            <Button type='primary' title='Get Started' />
            <Gap height={16} width={0}/>
            <Button type='secondary' title='Sign In'/>
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    page: {
        padding: 40, 
        justifyContent: 'space-between',
        backgroundColor: 'white',
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
        marginTop: 91,
        fontFamily: 'Nunito-SemiBold',
    }
})