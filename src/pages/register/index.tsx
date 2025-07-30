import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword, getAuth } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { getUniqueId } from 'react-native-device-info';
import { showMessage } from 'react-native-flash-message';

import { Button, Gap, Header, Input, Loading } from '../../components';
import { RootStackParamList } from '../../router';
import { colors, constant, Helper, setItem, useForm } from '../../utils';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

export default function Register() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const auth = getAuth();

  const [form, setForm] = useForm({
    fullname: '',
    profession: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [devicePlatform, setDevicePlatform] = useState('');

  useEffect(() => {
    getUniqueId().then(setDeviceId);
    setDevicePlatform(Helper.fetchDevicePlatform());
  }, []);

  const onContinue = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const dataRegister = {
          fullname: form.fullname,
          profession: form.profession,
          email: form.email,
          deviceId,
          devicePlatform,
        };

        setItem('user', JSON.stringify(dataRegister));

        return firebase
          .app()
          .database(constant.DATABASE_URL)
          .ref(`/users/${userCredential.user.uid}`)
          .set(dataRegister);
      })
      .then(() => {
        setLoading(false);
        setForm('reset', '');
        navigation.navigate('UploadPhoto');
      })
      .catch((error) => {
        setLoading(false);
        setForm('reset', '');
        showMessageError(error.message);
      });
  };

  const showMessageError = (message: string) => {
    showMessage({
      message,
      type: 'default',
      backgroundColor: colors.error,
      color: colors.white,
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header title="Daftar Akun" onPressHeader={() => navigation.goBack()} />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              value={form.fullname}
              onChangeTextInput={(value) => setForm('fullname', value)}
            />
            <Gap height={24} />

            <Input
              label="Pekerjaan"
              value={form.profession}
              onChangeTextInput={(value) => setForm('profession', value)}
            />
            <Gap height={24} />

            <Input
              label="Email Address"
              value={form.email}
              keyboardType="email-address"
              onChangeTextInput={(value) => setForm('email', value)}
            />
            <Gap height={24} />

            <Input
              label="Password"
              value={form.password}
              secureTextEntry
              onChangeTextInput={(value) => setForm('password', value)}
            />
            <Gap height={40} />

            <Button
              typeButton="primary"
              title="Continue"
              onPressButton={onContinue}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
      {loading && <Loading />}
    </>
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
