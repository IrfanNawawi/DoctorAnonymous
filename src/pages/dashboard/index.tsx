import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IlGetStarted, IlLogo } from '../../assets/illustration';
import Button from '../../components/atoms/button';
import Gap from '../../components/atoms/gap';
import { RootStackParamList } from '../../types/navigation';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export default function Dashboard() {
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    
    return (
        <ImageBackground source={IlGetStarted} style={styles.page}>
            <SafeAreaView style={styles.container}>
                <View>
                    <IlLogo />
                    <Text style={styles.title}>
                        {'Consultation with \na doctor becomes \neasier and more flexible'}
                    </Text>
                </View>
                <View>
                    <Button
                        typeButton='primary' 
                        title='Get Started' 
                        onPress={() => navigation.navigate('Register')}
                    />
                    <Gap height={16}/>
                    <Button 
                        typeButton='secondary' 
                        title='Sign In' 
                        onPress={() => navigation.replace('Login')}
                    />
                </View>
            </SafeAreaView>
        </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    page: {
        padding: 40, 
        flex: 1,
        height:Dimensions.get('window').height, 
        width:Dimensions.get('window').width,
        overflow:'hidden',
    },
    title: {
        fontSize: 24,
        color: colors.button.primary.text,
        marginTop: 91,
        fontFamily: fonts.primary[600],
    }
})