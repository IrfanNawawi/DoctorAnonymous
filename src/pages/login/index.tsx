import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IlLogo } from '../../assets/illustration';
import Button from '../../components/atoms/button';
import Gap from '../../components/atoms/gap';
import Input from '../../components/atoms/input';
import Link from '../../components/atoms/link';
import { useForm } from '../../hooks/useForm';
import { useLoading } from '../../hooks/useLoading';
import { loginAccount } from '../../services/firebase/authentication';
import { getUserData } from '../../services/firebase/realtime-database';
import { RootStackParamList } from '../../types/navigation';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { showMessageError, useEmailValidation } from '../../utils/helper';
import { setItem } from '../../utils/storage/mmkvStorage';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const { showLoading, hideLoading } = useLoading();
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const inputRefs = useMemo(
    () => ({
      email: emailRef,
      password: passwordRef,
    }),
    []
  );

  const onSignIn = useCallback(async () => {
    try {
      showLoading();

      const user = await loginAccount(form.email, form.password);

      if (!user) {
        throw new Error('Login failed, user not found');
      }

      const userData = await getUserData(user.uid);

      if (userData) {
        setItem('user', userData);
        setForm('reset', '');
        navigation.replace('MainApp');
      }
    } catch (errorMessage: any) {
      setForm('reset', '');
      showMessageError(errorMessage);
    } finally {
      hideLoading();
    }
  }, [form, hideLoading, navigation, setForm, showLoading]);

  const onSignUp = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  const isEmailValid = useEmailValidation(form.email);

  const renderForm = useMemo(() => (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <IlLogo />
      <Text style={styles.title}>{'Come in and start consultation'}</Text>

      <Input
        ref={inputRefs.email}
        label="Email Address"
        value={form.email}
        keyboardType='email-address'
        onChangeTextInput={value => setForm('email', value)}
      />
      <Gap height={24} />
      <Input
        ref={inputRefs.password}
        label="Password"
        value={form.password}
        onChangeTextInput={value => setForm('password', value)}
        secureTextEntry
      />
      <Gap height={10} />

      <Link title="Forgot My Password" fontSize={12} align="left" onPress={() => {}} />
      <Gap height={40} />

      <Button
        typeButton="primary"
        title="Sign In"
        onPress={onSignIn}
        disabled={!isEmailValid || !form.password}
      />
      <Gap height={30} />

      <Link
        title="Create New Account"
        fontSize={16}
        align="center"
        onPress={onSignUp}
      />
    </ScrollView>
  ), [form, setForm, inputRefs, isEmailValid, onSignIn, onSignUp]);

  return (
    <SafeAreaView style={styles.container}>
      {renderForm}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.button.secondary.background,
  },
  scroll: {
    flexGrow: 1,
    padding: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: 153,
  },
});
