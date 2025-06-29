import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Gap, Header, Link } from '../../components'
import { colors, fonts } from '../../utils'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { IcAddPhoto, IlPhotoDefault } from '../../assets';

export default function UploadPhoto() {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Upload Photo" type='light' onPressHeader={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <View style={styles.avatarWrapper}>
            <Image source={IlPhotoDefault} style={styles.avatar}/>
            <IcAddPhoto style={styles.addPhoto}/>
          </View>
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
  avatar: {
    width: 110,
    height: 110,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6
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