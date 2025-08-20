import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import { NewsItemProps } from '../../../types/news'

export default function NewsItem({headline, date, picture}: NewsItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{headline}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Image source={picture} style={styles.image}/>
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