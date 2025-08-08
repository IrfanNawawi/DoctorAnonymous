import React from 'react'
import { Image, ImageProps, StyleSheet, TouchableOpacity } from 'react-native'
import { IcAddPhoto, IcGenderFemale, IcGenderMale, IcRemovePhoto } from '../../../assets'
import { colors } from '../../../utils'

type PhotoType = 'photo-upload' | 'photo-remove' | 'photo-detail' | 'photo-gender-male' | 'photo-gender-female';

type PhotoProps = {
  typePhoto: PhotoType;
  sourcePhoto?: ImageProps;
  onPressPhoto?: () => void;
};

const renderTypePhoto = (type: PhotoType) => {
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


export default function Photo({typePhoto = 'photo-detail', sourcePhoto, onPressPhoto}: PhotoProps) {
  return (
    <TouchableOpacity style={styles.avatarWrapper} onPress={onPressPhoto}>
        <Image source={sourcePhoto} style={styles.avatar}/>
        { renderTypePhoto(typePhoto) }
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