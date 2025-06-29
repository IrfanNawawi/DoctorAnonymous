import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Gap, Header, Input } from '../../components';
import { colors } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../router';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Daftar Akun" type='light' onPressHeader={() => navigation.goBack()} />
      <View style={styles.content}>
        <Input label="Full Name" />
        <Gap height={24} />

        <Input label="Pekerjaan" />
        <Gap height={24} />

        <Input label="Email Address" />
        <Gap height={24} />

        <Input label="Password" />
        <Gap height={40} />
        
        <Button 
          typeButton="primary" 
          title="Continue" 
          onPressButton={() => navigation.navigate('UploadPhoto') } 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.button.secondary.background,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
});
