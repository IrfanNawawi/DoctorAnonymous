import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IlLogo } from '../../assets/illustration';
import { getSessionAccount } from '../../services/firebase/authentication';
import { RootStackParamList } from '../../types/navigation';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export default function Splash() {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const handleSessionAvailable = () => navigation.replace('MainApp');
    const handleSessionExpired = () => navigation.replace('Dashboard');
    let unsubscribeAuth: (() => void);

    const timer = setTimeout(() => {
      unsubscribeAuth = getSessionAccount(
        handleSessionAvailable,
        handleSessionExpired
      );
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (unsubscribeAuth) unsubscribeAuth();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.page}>
      <IlLogo />
      <Text style={styles.title}>Doctor Anonymous</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: colors.text.primary,
    marginTop: 20,
    fontFamily: fonts.primary[600],
  },
});
