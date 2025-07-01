import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Gap, Header, ListDoctorProfile, Profile } from '../../components';
import { RootStackParamList } from '../../router';
import { JSONDataDoctor } from '../../assets';

type DoctorProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DoctorProfile'>;

export default function DoctorProfile() {
    const navigation = useNavigation<DoctorProfileScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Doctor Profile" onPressHeader={() => navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Profile typeProfile='photo-gender' name='Shayna Melinda' profession='UI/UX Designer'/>
                <Gap height={10} />
                {
                    JSONDataDoctor['doctor-profile'].map((item) => {
                        return (
                        <ListDoctorProfile
                            key={item.id} 
                            title={item.title} 
                            desc={item.desc}
                        />
                        )
                    })
                }
                <View style={styles.buttonWrapper}>
                    <Button
                        typeButton="primary" 
                        title="Start Consulting" 
                        onPressButton={() => navigation.navigate('Chatting') } 
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white'
    },
    buttonWrapper: {
        paddingHorizontal: 40,
        paddingTop: 23
    }
})