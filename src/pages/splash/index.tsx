import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { IlLogo } from '../../assets/illustration'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SplashProps = {
  navigation: NativeStackNavigationProp<any, any>; // ganti dengan tipe stack kamu jika sudah pakai TypeScript Navigation
};

export default function Splash({ navigation }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Dashboard');
    }, 3000);

    // Clear timer jika komponen unmount (best practice)
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.page}>
      <IlLogo />
      <Text style={styles.title}>Doctor Anonymous</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#112340',
    marginTop: 20,
    fontFamily: 'Nunito-SemiBold',
  }
})