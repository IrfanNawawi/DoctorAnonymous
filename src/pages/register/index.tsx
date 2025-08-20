import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Gap, Header, Input } from '../../components';
import { RootStackParamList } from '../../types/navigation';
import { colors, fetchDeviceId, fetchDevicePlatform, setItem, showMessageError } from '../../utils';
import { useForm, useLoading } from '../../hooks';
import { registerAccount, saveUserData } from '../../services';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

export default function Register() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const { showLoading, hideLoading } = useLoading();
  const [form, setForm] = useForm({
    fullname: '',
    profession: '',
    email: '',
    password: '',
  });

  const [deviceId, setDeviceId] = useState('');
  const [devicePlatform, setDevicePlatform] = useState('');

  useEffect(() => {
    initializeDeviceInfo();
  }, []);

  const initializeDeviceInfo = async () => {
    const id = await fetchDeviceId();
    const platform = fetchDevicePlatform();
    setDeviceId(id);
    setDevicePlatform(platform);
  };

  const onSignUp = async () => {
    try {
      showLoading();
      handleRegister();
    } catch (errorMessage: any) {
      showMessageError(errorMessage);
      setForm('reset', '');
    } finally {
      hideLoading();
    }
  };

  const handleRegister = async () => {
    const userCredential = await registerAccount(form.email, form.password);

    const userData = {
      userId: userCredential.uid,
      fullname: form.fullname,
      profession: form.profession,
      email: form.email,
      deviceId,
      devicePlatform,
    };

    saveUserData(userCredential.uid, userData)
    .then(() => {
      setItem('user', userData);
      setForm('reset', '');
      navigation.navigate('UploadPhoto', { user: userData });
    }).catch(errorMessage => showMessageError(errorMessage));
  }

  const renderForm = () => (
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
        onPress={onSignUp}
      />
    </ScrollView>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header title="Daftar Akun" onPressHeader={() => navigation.goBack()} />
        <View style={styles.content}>{renderForm()}</View>
      </SafeAreaView>
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
