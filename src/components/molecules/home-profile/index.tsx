import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DummyUser } from '../../../assets'
import { colors, fonts } from '../../../utils'

type HomeProfileProps = {
  onPressHomeProfile: () => void
}
export default function HomeProfile({onPressHomeProfile}: HomeProfileProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressHomeProfile}>
      <Image source={DummyUser} style={styles.avatar}/>
      <View>
        <Text style={styles.name}>Shayna Melinda</Text>
        <Text style={styles.profession}>Product Designer</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary
  },
  profession: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary
  }
})