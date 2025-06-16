import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IlGetStarted, IlLogo } from '../../assets/illustration'
import { Button, Gap } from '../../components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type DashboardProps = {
  navigation: NativeStackNavigationProp<any, any>; // ganti dengan tipe stack kamu jika sudah pakai TypeScript Navigation
};

export default function Dashboard({ navigation }: DashboardProps) {
  return (
    <ImageBackground source={IlGetStarted} style={styles.page}>
        <View>
            <IlLogo />
            <Text style={styles.title}>
                {'Konsultasi dengan\ndokter jadi lebih\nmudah & fleksibel'}
            </Text>
        </View>
        <View>
            <Button type='primary' title='Get Started' onPressButton={() => {
                navigation.navigate('Register');
                }}/>
            <Gap height={16} width={0}/>
            <Button type='secondary' title='Sign In' onPressButton={() => {
                navigation.replace('Login');
                }}/>
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