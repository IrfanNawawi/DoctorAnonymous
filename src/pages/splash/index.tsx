import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { IlLogo } from '../../assets/illustration';
import { getSessionAccount } from '../../services';
import { RootStackParamList } from '../../types/navigation';
import { colors, fonts } from '../../utils';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export default function Splash() {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const handleSessionAvailable = () => navigation.replace('MainApp');
    const handleSessionExpired = () => navigation.replace('Dashboard');

    const timer = setTimeout(() => {
      const unsubscribe = getSessionAccount(
        handleSessionAvailable,
        handleSessionExpired
      );

      return () => unsubscribe();
    }, 3000);

    return () => clearTimeout(timer);
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
