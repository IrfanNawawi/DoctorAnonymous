import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IlGetStarted, IlLogo } from '../../assets/illustration'
import { Button, Gap } from '../../components'
import { colors, fonts } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export default function Dashboard() {
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    
    return (
    <SafeAreaView style={styles.container}>
        <ImageBackground source={IlGetStarted} style={styles.page}>
            <View>
                <IlLogo />
                <Text style={styles.title}>
                    {'Konsultasi dengan\ndokter jadi lebih\nmudah & fleksibel'}
                </Text>
            </View>
            <View>
                <Button typeButton='primary' title='Get Started' onPressButton={
                    () => navigation.navigate('Register')
                }/>
                <Gap height={16}/>
                <Button typeButton='secondary' title='Sign In' onPressButton={
                    () => navigation.navigate('Login')
                }/>
            </View>
        </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.button.secondary.background,
    },
    page: {
        padding: 40, 
        justifyContent: 'space-between',
        flex: 1
    },
    title: {
        fontSize: 24,
        color: colors.button.primary.text,
        marginTop: 91,
        fontFamily: fonts.primary[600],
    }
})