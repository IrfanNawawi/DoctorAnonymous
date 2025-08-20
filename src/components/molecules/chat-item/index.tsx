import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../../utils';
import { DummyDoctorOne } from '../../../assets';
import { ChatItemProps } from '../../../types/chat-item';

export default function ChatItem({ isSender = false }: ChatItemProps) {
  return (
    <View style={containerStyle(isSender)}>
      {!isSender && <Image source={DummyDoctorOne} style={styles.avatar}/>}
      <View>
        <View style={chatContentStyle(isSender)}>
          <Text style={textStyle(isSender)}>
            Ibu dokter, apakah memakan jeruk tiap hari itu buruk?
          </Text>
        </View>
        <Text style={dateStyle(isSender)}>4.20 AM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  chatContent: {
    padding: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginTop: 4
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary[400]
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    alignSelf: 'flex-end',
    marginRight: 12
  },
});

// Style dinamis
const containerStyle = (isSender: boolean) => ({
  ...styles.container,
  alignItems: isSender ? 'flex-end' : 'flex-start',
  paddingRight: isSender ? 16 : 0,
  paddingLeft: isSender ? 0 : 16,
  flexDirection: !isSender && 'row'
});

const chatContentStyle = (isSender: boolean) => ({
  ...styles.chatContent,
  maxWidth: isSender ? '70%' : '80%',
  backgroundColor: isSender ? colors.cardLight : colors.primary,
  borderBottomLeftRadius: isSender ? 10 : 0,
  borderBottomRightRadius: isSender ? 0 : 10
});

const textStyle = (isSender: boolean) => ({
  ...styles.text,
  color: isSender ? colors.text.primary : colors.white,
});

const dateStyle = (isSender: boolean) => ({
  ...styles.date,
  alignSelf: isSender ? 'flex-end' : 'flex-start'
});