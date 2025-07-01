import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Gap, Header, Input, Profile } from '../../components'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../router';

type UpdateProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UpdateProfile'>;

export default function UpdateProfile() {
    const navigation = useNavigation<UpdateProfileScreenNavigationProp>();
    
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Update Profile' onPressHeader={() => navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Profile typeProfile='photo-upload'/>
                    <Gap height={26}/>
                    <Input label="Full Name" />
                    <Gap height={24} />

                    <Input label="Pekerjaan" />
                    <Gap height={24} />

                    <Input label="Email Address" />
                    <Gap height={24} />

                    <Input label="Password" />
                    <Gap height={40} />

                    <Button
                        typeButton="primary" 
                        title="Save Profile" 
                        onPressButton={() => navigation.navigate('UploadPhoto') } 
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
    content: {
        paddingHorizontal: 40,
        paddingBottom: 40
    }
})