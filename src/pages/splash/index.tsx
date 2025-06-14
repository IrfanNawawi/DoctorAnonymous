import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IlLogo } from '../../assets/illustration'

export default function Splash() {
  return (
    <View style={styles.page}>
      <IlLogo />
      <Text style={styles.title}>Doctor Anonymous</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#112340',
    marginTop: 20,
    fontFamily: 'Nunito-SemiBold',
  }
})