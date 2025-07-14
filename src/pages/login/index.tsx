import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { IlLogo } from '../../assets';
import { Button, Gap, Input, Link } from '../../components';
import { colors, fonts, useForm } from '../../utils';
import { RootStackParamList } from '../../router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const onSignIn = () => {
    navigation.replace('MainApp')
  };

  const onSignUp = () => {
    navigation.navigate('Register')
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <IlLogo />
        <Text style={styles.title}>{'Masuk dan mulai\nberkonsultasi'}</Text>

        <Input 
          label="Email Address"
          value={form.email}
          onChangeTextInput={value => setForm('email', value)}
        />
        <Gap height={24} />
        <Input 
          label="Password"
          value={form.password}
          onChangeTextInput={value => setForm('password', value)}
          secureTextEntry
        />
        <Gap height={10} />

        <Link title="Forgot My Password" fontSize={12} align="left" onPressLink={() => {}} />
        <Gap height={40} />

        <Button
          typeButton="primary"
          title="Sign In"
          onPressButton={onSignIn}
        />
        <Gap height={30} />

        <Link
          title="Create New Account"
          fontSize={16}
          align="center"
          onPressLink={onSignUp}
        />
      </ScrollView>
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
