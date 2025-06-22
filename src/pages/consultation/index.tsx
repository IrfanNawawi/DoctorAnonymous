import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListDoctor } from '../../components'
import { colors, fonts } from '../../utils'

export default function Consultation() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Consultation</Text>
        <ListDoctor/>
        <ListDoctor/>
        <ListDoctor/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16
  }
})