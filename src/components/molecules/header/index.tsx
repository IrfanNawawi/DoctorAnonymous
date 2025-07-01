import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Gap } from '../../atoms'
import { colors, fonts } from '../../../utils'
import DarkProfile from './dark-profile'

type DataTypeHeader = 'dark' | 'light' | 'dark-profile'

type HeaderProps = {
  title: string
  type?: DataTypeHeader
  onPressHeader?: () => void
  onPressProfileDoctor?: () => void
};

export default function Header({ onPressHeader, title, type = 'light', onPressProfileDoctor }: HeaderProps) {
  
  if (type === 'dark-profile') {
    return <DarkProfile onPressDarkProfile={onPressHeader} onPressProfileDoctor={onPressProfileDoctor}/>
  }
  return (
    <View style={containerStyleHeader(type)}>
      <Button
        typeButton='icon-only'
        typeIconButton={type === 'dark' ? 'back-light' : 'back-dark'}
        onPressButton={onPressHeader}
      />
      <Text style={containerTitleHeader(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center', 
    flex: 1, 
    fontSize: 20, 
    fontFamily: fonts.primary[600],
  }
})

// Style dinamis
const containerStyleHeader = (type: 'dark' | 'light') => ({
  ...styles.container,
  backgroundColor: type === 'light'
  ? colors.button.secondary.background
  : colors.secondary,
  borderBottomLeftRadius: type === 'dark' ? 20 : 0,
  borderBottomRightRadius: type === 'dark' ? 20 : 0,
});

const containerTitleHeader = (type: 'dark' | 'light') => ({
  ...styles.text,
  color: type === 'light' 
  ? colors.button.secondary.text 
  : colors.button.primary.text,
});