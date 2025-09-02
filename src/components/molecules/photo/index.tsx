import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IcAddPhoto, IcGenderFemale, IcGenderMale, IcRemovePhoto } from '../../../assets';
import { DoctorData, ProfileType } from '../../../types/doctors';
import { colors } from '../../../utils';

const renderTypePhoto = (type: ProfileType) => {
  switch (type) {
    case 'photo-upload':
      return <IcAddPhoto style={styles.actionPhoto}/>
    case 'photo-remove':
      return <IcRemovePhoto style={styles.actionPhoto}/>
    case 'photo-gender-male':
      return <IcGenderMale style={styles.actionPhoto}/>
    case 'photo-gender-female':
      return <IcGenderFemale style={styles.actionPhoto}/>
    default:
      return null
  }
}


export default function Photo({typeProfile = 'photo-detail', photo, onPress}: DoctorData) {
  return (
    <TouchableOpacity style={styles.avatarWrapper} onPress={onPress}>
        <Image source={photo} style={styles.avatar}/>
        { renderTypePhoto(typeProfile) }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    avatarWrapper: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 130 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionPhoto: {
        position: 'absolute',
        bottom: 8,
        right: 6
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 110 / 2
    }
})