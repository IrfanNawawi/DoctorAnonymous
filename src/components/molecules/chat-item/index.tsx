import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { colors, fonts } from '../../../utils';
import { ChatItemProps } from '../../../types/chat-item';

export default function ChatItem({ isSender = false, text, date, photoDoctor }: ChatItemProps) {
  return (
    <View style={containerStyle(isSender)}>
      {!isSender && <Image source={photoDoctor} style={styles.avatar} />}
      <View>
        <View style={chatContentStyle(isSender)}>
          <Text style={textStyle(isSender)}>{text}</Text>
        </View>
        <Text style={dateStyle(isSender)}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
    marginTop: 4,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignSelf: 'flex-end',
    marginRight: 12,
  },
});

// Style dinamis
const containerStyle = (isSender: boolean): ViewStyle => ({
  ...styles.container,
  flexDirection: isSender ? 'row-reverse' : 'row',
  alignItems: 'flex-end',
});

const chatContentStyle = (isSender: boolean): ViewStyle => ({
  ...styles.chatContent,
  backgroundColor: isSender ? colors.cardLight : colors.primary,
  borderBottomLeftRadius: isSender ? 10 : 0,
  borderBottomRightRadius: isSender ? 0 : 10,
});

const textStyle = (isSender: boolean): TextStyle => ({
  ...styles.text,
  color: isSender ? colors.text.primary : colors.white,
});

const dateStyle = (isSender: boolean): TextStyle => ({
  ...styles.date,
  alignSelf: isSender ? 'flex-end' : 'flex-start',
});