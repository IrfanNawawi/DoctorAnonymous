import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Gap, Header, Input, Profile } from '../../components'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { colors, constant, getItem, setItem } from '../../utils';
import { firebase } from '@react-native-firebase/database';
import { showMessage } from 'react-native-flash-message';
import { IlPhotoDefault } from '../../assets';
import { launchImageLibrary } from 'react-native-image-picker';

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
                updateProfile();
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

        await firebase
            .app()
            .database(constant.DATABASE_URL)
            .ref(`/users/${userId}`)
            .update(updatedProfile)
            .then(() => {
                const localUser = {
                    ...profile,
                    ...updatedProfile,
                    email,
                    userId,
                };

                setItem('user', JSON.stringify(localUser));
                navigation.replace('MainApp');
            })
            .catch(err => showMessageError(err));
    };

    const updatePassword = async() => {
        await firebase
        .auth()
        .currentUser?.updatePassword(password)
        .catch(err => showMessageError(err));
    };

    const openImagePicker = () => {
        launchImageLibrary({
          mediaType: 'photo',
          maxHeight: 200,
          maxWidth: 200,
          quality: 0.5,
          includeBase64: true,
          selectionLimit: 1,
        }, response => {
          if (response.didCancel) return showMessageError('User cancelled image picker');
          if (response.errorCode) return showMessageError(`Image picker error: ${response.errorMessage}`);
          const uri = response.assets?.[0]?.uri;
          if (uri) {
            setSourcePhotoForDB(`data:${response.assets?.[0]?.type};base64, ${response.assets?.[0]?.base64}`);
            setProfile({
              ...profile,
              photo: { uri },
            });
          }
        });
    };

    const changeProfileData = (key: string, value: string) => {
        setProfile({
          ...profile,
          [key]: value,
        });
      };

    const showMessageError = (message: string) => {
        showMessage({
          message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white
        })
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Update Profile' onPressHeader={() => navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Profile 
                        typeProfile='photo-remove'
                        photoProfileProps={profile.photo}
                        onPressPhotoProfileProps={openImagePicker}
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