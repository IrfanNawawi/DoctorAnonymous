import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type PropsButton = {
  type: 'primary' | 'secondary';
  title: string;
};

export default function Button({ type, title }: PropsButton) {
  return (
    <View style={containerStyle(type)}>
      <Text style={titleButtonStyle(type)}>{title}</Text>
    </View>
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
