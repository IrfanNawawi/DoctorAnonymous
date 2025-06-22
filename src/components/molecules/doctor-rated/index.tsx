import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DummyDoctorOne, IcRatedStar } from '../../../assets'
import { colors, fonts } from '../../../utils'

export default function DoctorRated() {
  return (
    <View style={styles.container}>
      <Image source={DummyDoctorOne} style={styles.avatar}/>
      <View style={styles.profile}>
        <Text style={styles.name}>Alexa Rachel</Text>
        <Text style={styles.profession}>Pediatrician</Text>
      </View>
      <View style={styles.rated}>
        <IcRatedStar/>
        <IcRatedStar/>
        <IcRatedStar/>
        <IcRatedStar/>
        <IcRatedStar/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16
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