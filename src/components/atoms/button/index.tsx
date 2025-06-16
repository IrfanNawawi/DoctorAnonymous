import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type PropsButton = {
  type: 'primary' | 'secondary';
  title: string;
  onPressButton?: () => void;
};

export default function Button({ type, title, onPressButton }: PropsButton) {
  return (
    <TouchableOpacity style={containerStyle(type)} onPress={onPressButton}>
      <Text style={titleButtonStyle(type)}>{title}</Text>
    </TouchableOpacity>
  );
}

// Style statis
const styles = StyleSheet.create({
  containerBase: {
    paddingVertical: 10,
    borderRadius: 10,
  },
  titleBase: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Nunito-SemiBold',
  },
});

// Style dinamis
const containerStyle = (type: 'primary' | 'secondary') => ({
  ...styles.containerBase,
  backgroundColor: type === 'secondary' ? 'white' : '#0BCAD4',
});

const titleButtonStyle = (type: 'primary' | 'secondary') => ({
  ...styles.titleBase,
  color: type === 'secondary' ? '#112340' : 'white',
});
