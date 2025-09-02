import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../utils';

export default function Loading() {
  return (
    <View style={styles.wrapper}>
        <ActivityIndicator size='large' color={colors.primary}/>
        <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: colors.loadingBackground
    },
    text: {
        fontSize: 18,
        color: colors.primary,
        fontFamily: fonts.primary[600],
        marginTop: 16
    }
})