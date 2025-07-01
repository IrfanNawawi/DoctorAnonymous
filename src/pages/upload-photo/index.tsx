import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, Gap, Header, Link, Photo } from '../../components';
import { colors, fonts } from '../../utils';

export default function UploadPhoto() {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Upload Photo" onPressHeader={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <Photo typePhoto='photo-upload'/>
          <Text style={styles.nameUser}>Shayna Melinda</Text>
          <Text style={styles.professionalUser}>UI/UX Designer</Text>
        </View>
        <View>
          <Button 
            title='Upload and Continue' 
            typeButton='primary' 
            onPressButton={() => navigation.navigate('Login')}
          />
          <Gap height={30}/>
          <Link title='Skip for this' align='center' fontSize={16} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.button.secondary.background
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    flex: 1,
    justifyContent: 'space-between'
  },
  nameUser: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center'
  },
  professionalUser: {
    fontSize: 18,
    color: colors.text.secondary,
    fontFamily: fonts.primary[400],
    textAlign: 'center'
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})