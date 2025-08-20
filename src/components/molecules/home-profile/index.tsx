import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IlPhotoDefault } from '../../../assets'
import { colors, fonts, getItem } from '../../../utils'
import { ListDoctorProfileProps } from '../../../types/profile';

export default function HomeProfile({onPress}: ListDoctorProfileProps) {
  const [profile, setProfile] = useState({
    photo: IlPhotoDefault,
    fullname: '',
    profession: ''
  });

  useEffect(() => {
    const userData = getItem('user');
    userData.photo = { uri: userData.photo };
    if (userData) {
      setProfile(userData);
    }
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={profile.photo} style={styles.avatar}/>
      <View>
        <Text style={styles.name}>{profile.fullname}</Text>
        <Text style={styles.profession}>{profile.profession}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textTransform: 'capitalize'
  },
  profession: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    textTransform: 'capitalize'
  }
})