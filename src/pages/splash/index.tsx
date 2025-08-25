import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { IlLogo } from '../../assets/illustration';
import { RootStackParamList } from '../../types/navigation';
import { colors, fonts } from '../../utils';
import { getSessionAccount } from '../../services';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export default function Splash() {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    let unsubscribeAuth: (() => void);
    const timer = setTimeout(() => {
      unsubscribeAuth = getSessionAccount(
        () => navigation.replace('MainApp'),
        () => navigation.replace('Dashboard')
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
