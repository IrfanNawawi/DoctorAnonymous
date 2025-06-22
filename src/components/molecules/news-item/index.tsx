import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DummyNewsOne } from '../../../assets'
import { colors, fonts } from '../../../utils'

export default function NewsItem() {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{`Is it safe to stay at home during\ncoronavirus?`}</Text>
        <Text style={styles.date}>Today</Text>
      </View>
      <Image source={DummyNewsOne} style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16
  },
  titleWrapper: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    maxWidth: '90%'
  },
  date: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginTop: 4
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 11
  }
})