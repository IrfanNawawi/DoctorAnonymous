import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IlPhotoDefault } from '../../assets/illustration';
import Gap from '../../components/atoms/gap';
import Header from '../../components/molecules/header';
import List from '../../components/molecules/list';
import Profile from '../../components/molecules/profile';
import { logoutAccount } from '../../services/firebase/authentication';
import { getDataDoctor } from '../../services/firebase/realtime-database';
import { RootStackParamList } from '../../types/navigation';
import { colors } from '../../utils/colors';
import { showMessageError, timeFormatting } from '../../utils/helper';
import { getItem, removeItem } from '../../utils/storage/mmkvStorage';

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
          getDataDoctor('setting-profile/').then(settings => {
            if (userData.lastUpdate) {
                settings.map((item: any) => {
                    item.id === 1 && (item.desc = `Last update ${timeFormatting(userData.lastUpdate)}`);
                })
            }
            setSettingProfile(settings)
        });
        }
    }, []);

    const signOutAccount = useCallback(() => {
        logoutAccount().then(() => {
            removeItem('user');
            navigation.replace('Dashboard');
        }).catch(errorMessage => showMessageError(errorMessage));
    }, [navigation]);

    const renderNavigateUserProfile = useCallback((name: string) => {
        switch (name) {
            case 'Edit Profile':
            case 'Language':
            case 'Give Us Rate':
                return navigation.navigate('UpdateProfile');
            case 'Sign Out':
                return signOutAccount();
            default:
                return navigation.navigate('UpdateProfile');
        }
    }, [navigation, signOutAccount]);

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Profile" onPressHeader={() => navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Profile
                    typeProfile='photo-detail'
                    fullname={profile.fullname}
                    profession={profile.profession}
                    photo={profile.photo}
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