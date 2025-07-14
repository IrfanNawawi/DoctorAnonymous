import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { IcAddPhoto, IcGenderFemale, IcGenderMale, IcRemovePhoto, IlPhotoDefault } from '../../../assets'
import { colors } from '../../../utils'

type PhotoType = 'photo-upload' | 'photo-remove' | 'photo-detail' | 'photo-gender-male' | 'photo-gender-female';

type PhotoProps = {
  typePhoto: PhotoType;
};

const renderTypePhoto = (type: PhotoType) => {
  switch (type) {
    case 'photo-upload':
      return <IcAddPhoto style={styles.addPhoto}/>
    case 'photo-remove':
      return <IcRemovePhoto style={styles.addPhoto}/>
    case 'photo-gender-male':
      return <IcGenderMale style={styles.addPhoto}/>
    case 'photo-gender-female':
      return <IcGenderFemale style={styles.addPhoto}/>
    default:
      return null
  }
}


export default function Photo({typePhoto = 'photo-detail'}: PhotoProps) {
  return (
    <View style={styles.avatarWrapper}>
        <Image source={IlPhotoDefault} style={styles.avatar}/>
        { renderTypePhoto(typePhoto) }
    </View>
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
    addPhoto: {
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