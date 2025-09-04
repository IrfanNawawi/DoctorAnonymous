import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Button, Gap, Header, Input } from '../../components';
import { useForm, useLoading } from '../../hooks';
import { registerAccount, saveUserData } from '../../services';
import { RootStackParamList } from '../../types/navigation';
import { colors, fetchDeviceId, fetchDevicePlatform, setItem, showMessageError, useEmailValidation } from '../../utils';

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

  const fullnameRef = useRef<TextInput>(null);
  const professionRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const inputRefs = useMemo(
    () => ({
      fullname: fullnameRef,
      profession: professionRef,
      email: emailRef,
      password: passwordRef,
    }),
    []
  );

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

  const handleRegister = useCallback(async () => {
    const userCredential = await registerAccount(form.email, form.password);

    if (!userCredential) {
      throw new Error('Register failed');
    }

    const userData = {
      userId: userCredential.uid,
      fullname: form.fullname,
      profession: form.profession,
      email: form.email,
      deviceId,
      devicePlatform,
    };

    await saveUserData(userCredential.uid, userData).then(() => {
      setItem('user', userData);
      setForm('reset', '');
      navigation.navigate('UploadPhoto', { user: userData });
    }).catch(errorMessage => showMessageError(errorMessage));
  }, [form, deviceId, devicePlatform, navigation, setForm]);

  const onSignUp = useCallback(async () => {
    try {
      showLoading();
      await handleRegister();
    } catch (errorMessage: any) {
      showMessageError(errorMessage);
      setForm('reset', '');
    } finally {
      hideLoading();
    }
  }, [handleRegister, showLoading, hideLoading, setForm]);

  const isEmailValid = useEmailValidation(form.email);

  const renderForm = useMemo(
    () => (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          ref={inputRefs.fullname}
          label="Full Name"
          value={form.fullname}
          onChangeTextInput={(value) => setForm('fullname', value)}
        />
        <Gap height={24} />

        <Input
          ref={inputRefs.profession}
          label="Pekerjaan"
          value={form.profession}
          onChangeTextInput={(value) => setForm('profession', value)}
        />
        <Gap height={24} />

        <Input
          ref={inputRefs.email}
          label="Email Address"
          value={form.email}
          keyboardType="email-address"
          onChangeTextInput={(value) => setForm('email', value)}
        />
        <Gap height={24} />

        <Input
          ref={inputRefs.password}
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
          disabled={!isEmailValid || !form.fullname || !form.profession || !form.email || !form.password}
        />
      </ScrollView>
    ),
    [form, inputRefs,isEmailValid, setForm, onSignUp]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Daftar Akun" onPressHeader={() => navigation.goBack()} />
      <View style={styles.content}>{renderForm}</View>
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
