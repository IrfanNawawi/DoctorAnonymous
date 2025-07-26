import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Gap, Header, Input, Profile } from '../../components'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../router';
import { colors, useForm } from '../../utils';

type UpdateProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UpdateProfile'>;

export default function UpdateProfile() {
    const navigation = useNavigation<UpdateProfileScreenNavigationProp>();

    const [form, setForm] = useForm({
        fullname: '',
        profession: '',
        email: '',
        password: '',
    });

    const onSaveProfile = () => {
        navigation.navigate('UploadPhoto');
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Update Profile' onPressHeader={() => navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Profile typeProfile='photo-upload'/>
                    <Gap height={26}/>
                    <Input 
                        label="Full Name"
                        value={form.fullname}
                        onChangeTextInput={value => setForm('fullname', value)}
                    />
                    <Gap height={24} />

                    <Input 
                        label="Pekerjaan"
                        value={form.profession}
                        onChangeTextInput={value => setForm('profession', value)}
                    />
                    <Gap height={24} />

                    <Input 
                        label="Email Address"
                        value={form.email}
                        keyboardType='email-address'
                        onChangeTextInput={value => setForm('email', value)}
                    />
                    <Gap height={24} />

                    <Input 
                        label="Password"
                        value={form.password}
                        onChangeTextInput={value => setForm('password', value)}
                        secureTextEntry
                    />
                    <Gap height={40} />

                    <Button
                        typeButton="primary" 
                        title="Save Profile" 
                        onPressButton={onSaveProfile} 
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.white
    },
    content: {
        paddingHorizontal: 40,
        paddingBottom: 40
    }
})