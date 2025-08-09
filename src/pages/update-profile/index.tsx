import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Gap, Header, Input, Profile } from '../../components'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { colors, getItem, openImagePicker, setItem, showMessageError } from '../../utils';
import { IlPhotoDefault } from '../../assets';
import { changePassword, updateUserData } from '../../services';

type UpdateProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UpdateProfile'>;

export default function UpdateProfile() {
    const navigation = useNavigation<UpdateProfileScreenNavigationProp>();
    const [profile, setProfile] = useState({
        fullname: '',
        profession: '',
        photo: IlPhotoDefault,
    });
    const [sourcePhotoForDB, setSourcePhotoForDB] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        const userData = getItem('user');
        userData.photo = { uri: userData.photo };
        if (userData) {
            setEmail(userData.email);
            setUserId(userData.userId);
            setProfile(userData);
        }
    }, []);

    const onSaveProfile = async() => {
        if (password.length > 0) {
            if (password.length < 6) {
                return showMessageError('Password minimal 6 karakter');
            } else {
                updatePassword();
            }
        } else {
            updateProfile();
        }
    };

    const updateProfile = async() => {
        const updatedProfile = {
            fullname: profile.fullname,
            profession: profile.profession,
            photo: sourcePhotoForDB || profile.photo.uri,
        };

        updateUserData(userId, updatedProfile).then(() => {
            const localUser = {
                ...profile,
                ...updatedProfile,
                email,
                userId,
            };
            setItem('user', localUser);
            navigation.replace('MainApp');
        }).catch(errorMessage => showMessageError(errorMessage));
    };

    const updatePassword = async() => {
        changePassword(password)
        .then(() => updateProfile())
        .catch(errorMessage => showMessageError(errorMessage));
    };

    const handleGetImage = () => {
        openImagePicker((uri, base64) => {
            setSourcePhotoForDB(base64);
            setProfile({
                ...profile,
                photo: { uri },
            });
        },
        (errorMessage) => {
            showMessageError(errorMessage);
        })
    };

    const changeProfileData = (key: string, value: string) => {
        setProfile({
          ...profile,
          [key]: value,
        });
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Update Profile' onPressHeader={() => navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Profile 
                        typeProfile='photo-remove'
                        photoProfileProps={profile.photo}
                        onPressPhotoProfileProps={handleGetImage}
                    />
                    <Gap height={26}/>
                    <Input 
                        label="Full Name"
                        value={profile.fullname}
                        onChangeTextInput={(value) => changeProfileData('fullname', value)}
                    />
                    <Gap height={24} />

                    <Input 
                        label="Pekerjaan"
                        value={profile.profession}
                        onChangeTextInput={(value) => changeProfileData('profession', value)}
                    />
                    <Gap height={24} />

                    <Input 
                        label="Email Address"
                        value={email}
                        keyboardType='email-address'
                        disabled
                    />
                    <Gap height={24} />

                    <Input 
                        label="Password"
                        value={password}
                        secureTextEntry
                        onChangeTextInput={(value) => setPassword(value)}
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