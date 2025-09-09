import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IlPhotoDefault } from '../../assets/illustration';
import Button from '../../components/atoms/button';
import Gap from '../../components/atoms/gap';
import Input from '../../components/atoms/input';
import Header from '../../components/molecules/header';
import Profile from '../../components/molecules/profile';
import { changePassword } from '../../services/firebase/authentication';
import { updateUserData } from '../../services/firebase/realtime-database';
import { RootStackParamList } from '../../types/navigation';
import { colors } from '../../utils/colors';
import { getDateTimeFormat, openImagePicker, showMessageError } from '../../utils/helper';
import { getItem, setItem } from '../../utils/storage/mmkvStorage';

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

    const fullnameRef = useRef<TextInput>(null);
    const professionRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    const inputRefs = useMemo(
        () => ({
          fullname: fullnameRef,
          profession: professionRef,
          email: emailRef,
          password: passwordRef,  
        }),
        []
    );
    
    useEffect(() => {
        const userData = getItem('user');
        userData.photo = { uri: userData.photo };
        if (userData) {
            setEmail(userData.email);
            setUserId(userData.userId);
            setProfile(userData);
        }
    }, []);

    const updateProfile = useCallback(async() => {
        const updatedProfile = {
            fullname: profile.fullname,
            profession: profile.profession,
            photo: sourcePhotoForDB || profile.photo.uri,
            lastUpdate: getDateTimeFormat(),
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
    }, [userId, email, profile, sourcePhotoForDB, navigation]);

    const updatePassword = useCallback(async() => {
        changePassword(password)
        .then(() => updateProfile())
        .catch(errorMessage => showMessageError(errorMessage));
    }, [password, updateProfile]);

    const onSaveProfile = useCallback(async() => {
        if (password.length > 0) {
            if (password.length < 6) {
                return showMessageError('Password minimal 6 karakter');
            } else {
                updatePassword();
            }
        } else {
            updateProfile();
        }
    }, [password, updatePassword, updateProfile]);

    const handleGetImage = useCallback(() => {
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
    }, [profile]);

    const changeProfileData = useCallback((key: string, value: string) => {
        setProfile({
          ...profile,
          [key]: value,
        });
    }, [profile]);

    const renderForm = useMemo(() => (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <Profile
                    typeProfile='photo-remove'
                    photo={profile.photo}
                    onPress={handleGetImage}
                />
                <Gap height={26}/>
                <Input
                    ref={inputRefs.fullname}
                    label="Full Name"
                    value={profile.fullname}
                    onChangeTextInput={(value) => changeProfileData('fullname', value)}
                />
                <Gap height={24} />

                <Input 
                    ref={inputRefs.profession}
                    label="Pekerjaan"
                    value={profile.profession}
                    onChangeTextInput={(value) => changeProfileData('profession', value)}
                />
                <Gap height={24} />

                <Input 
                    ref={inputRefs.email}
                    label="Email Address"
                    value={email}
                    keyboardType='email-address'
                    disabled
                />
                <Gap height={24} />

                <Input 
                    ref={inputRefs.password}
                    label="Password"
                    value={password}
                    secureTextEntry
                    onChangeTextInput={(value) => setPassword(value)}
                />
                <Gap height={40} />

                <Button
                    typeButton="primary" 
                    title="Save Profile" 
                    onPress={onSaveProfile} 
                />
            </View>
        </ScrollView>
    ), [profile, inputRefs, email, password, handleGetImage, onSaveProfile, changeProfileData]);
    
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Update Profile' onPressHeader={() => navigation.goBack()}/>
            {renderForm}
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