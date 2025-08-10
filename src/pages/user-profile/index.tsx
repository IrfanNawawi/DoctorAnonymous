import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { IlPhotoDefault } from '../../assets';
import { Gap, Header, List, Profile } from '../../components';
import { RootStackParamList } from '../../types/navigation';
import { colors, getItem, removeItem, showMessageError } from '../../utils';
import { getDataDoctor, logoutAccount } from '../../services';

type UserProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserProfile'>;

export default function UserProfile() {
    const navigation = useNavigation<UserProfileScreenNavigationProp>();
    const [profile, setProfile] = useState({
        photo: IlPhotoDefault,
        fullname: '',
        profession: ''
    });
    const [settingProfile, setSettingProfile] = useState([]);
    
    useEffect(() => {
        const userData = getItem('user');
        userData.photo = { uri: userData.photo };
        if (userData) {
          setProfile(userData);
          getDataDoctor('setting-profile/').then(res => setSettingProfile(res));
        }
    }, []);

    const signOutAccount = () => {
        logoutAccount().then(() => {
            removeItem('user');
            navigation.replace('Dashboard');
        }).catch(errorMessage => showMessageError(errorMessage));
    };

    const renderNavigateUserProfile = (name: string) => {
        switch (name) {
            case 'Edit Profile':
                return navigation.navigate('UpdateProfile');
            case 'Language':
                return navigation.navigate('Chatting');
            case 'Give Us Rate':
                return navigation.navigate('Chatting');
            case 'Sign Out':
                return signOutAccount();
            default:
                return navigation.navigate('Chatting');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Profile" onPressHeader={() => navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Profile 
                    typeProfile='photo-detail'
                    name={profile.fullname}
                    profession={profile.profession}
                    photoProfileProps={profile.photo}
                />
                <Gap height={26} />
                {
                    settingProfile.map((item: any) => {
                        return (
                        <List
                            key={item.id} 
                            name={item.name} 
                            desc={item.desc}
                            type='next'
                            icon='setting'
                            onPressList={() => renderNavigateUserProfile(item.name)}
                        />
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.white
    },
})