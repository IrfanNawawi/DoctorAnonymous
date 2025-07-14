import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import Photo from '../photo'

type ProfileType = 'photo-upload' | 'photo-remove' | 'photo-detail' | 'photo-gender-male' | 'photo-gender-female';

type ProfileProps = {
  typeProfile: ProfileType;
  name?: string;
  profession?: string
};

export default function Profile({typeProfile = 'photo-detail', name, profession}: ProfileProps) {
  return (
    <View style={styles.container}>
      <Photo typePhoto={typeProfile}/>
      {typeProfile === 'photo-detail' || typeProfile === 'photo-gender-male' || typeProfile === 'photo-gender-female' && (
        <>
          <Text style={styles.name}>{name}</Text>
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