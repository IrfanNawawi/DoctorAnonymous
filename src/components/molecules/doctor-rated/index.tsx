import React from 'react'
import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IcRatedStar } from '../../../assets'
import { colors, fonts } from '../../../utils'

type DoctorRatedProps = {
  picture: ImageProps,
  name: string,
  profession: string,
  onPressDoctorRated?: () => void
}
export default function DoctorRated({picture, name, profession, onPressDoctorRated}: DoctorRatedProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressDoctorRated}>
      <Image source={picture} style={styles.avatar}/>
      <View style={styles.profile}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.profession}>{profession}</Text>
      </View>
      <View style={styles.rated}>
        <IcRatedStar/>
        <IcRatedStar/>
        <IcRatedStar/>
        <IcRatedStar/>
        <IcRatedStar/>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 12
  },
  rated: {
    flexDirection: 'row'
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary
  },
  profession: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginTop: 2,
  },
  profile: {
    flex: 1,
  }
})