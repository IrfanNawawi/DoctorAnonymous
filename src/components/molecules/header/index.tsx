import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeaderProps } from '../../../types/header';
import { colors, fonts } from '../../../utils';
import { Button, Gap } from '../../atoms';
import DarkProfile from './dark-profile';

export default function Header({ onPressHeader, title, type = 'light', onPressProfileDoctor, profession, photo }: HeaderProps) {
  
  if (type === 'dark-profile') {
    return <DarkProfile onPressHeader={onPressHeader} onPressProfileDoctor={onPressProfileDoctor} title={title} profession={profession} photo={photo}/>
  }
  return (
    <View style={containerStyleHeader(type)}>
      <Button
        typeButton='icon-only'
        typeIcon={type === 'dark' ? 'back-light' : 'back-dark'}
        onPress={onPressHeader}
      />
      <Text style={containerTitleHeader(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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