import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Gap, Header, Input } from '../../components';
import { RootStackParamList } from '../../router';
import { colors, useForm } from '../../utils';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [form, setForm] = useForm({
    fullname: '',
    profession: '',
    email: '',
    password: '',
  });

  const onContinue = () => {
    navigation.navigate('UploadPhoto');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Daftar Akun" onPressHeader={() => navigation.goBack()} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input 
            label="Full Name" 
            value={form.fullname} 
            onChangeTextInput={value => setForm('fullname', value)}
          />
          <Gap height={24} />

          <Input 
            label="Pekerjaan" 
            value={form.profession} 
            onChangeTextInput={value => setForm('profession', value)}
          />
          <Gap height={24} />

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
          <Gap height={40} />
          
          <Button 
            typeButton="primary" 
            title="Continue" 
            onPressButton={onContinue} 
          />
        </ScrollView>
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
