import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { JSONDataDoctor } from '../../assets';
import { Gap, Header, List, Profile } from '../../components';
import { RootStackParamList } from '../../types/navigation';
import { colors } from '../../utils';

type UserProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserProfile'>;

export default function UserProfile() {
    const navigation = useNavigation<UserProfileScreenNavigationProp>();

    const renderNavigateUserProfile = (name: string) => {
        switch (name) {
            case 'Edit Profile':
                return navigation.navigate('UpdateProfile');
            case 'Language':
                return navigation.navigate('Chatting');
            case 'Give Us Rate':
                return navigation.navigate('Chatting');
            case 'Help Center':
                return navigation.navigate('Chatting');
            default:
                return navigation.navigate('Chatting');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Profile" onPressHeader={() => navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Profile typeProfile='photo-detail' name='Shayna Melinda' profession='UI/UX Designer'/>
                <Gap height={26} />
                {
                    JSONDataDoctor['setting-profile'].map((item) => {
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