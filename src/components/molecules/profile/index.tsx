import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DoctorData } from '../../../types/doctors';
import { colors, fonts } from '../../../utils';
import Photo from '../photo';

export default function Profile({typeProfile = 'photo-detail', fullname, profession, photo, onPress}: DoctorData) {
  return (
    <View style={styles.container}>
      <Photo typeProfile={typeProfile} photo={photo} onPress={onPress} />
      {['photo-detail', 'photo-gender-male', 'photo-gender-female'].includes(typeProfile) && (
        <>
          <Text style={styles.name}>{fullname}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: { 
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16
  },
  profession: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginTop: 2
  }
})