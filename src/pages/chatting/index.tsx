import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChatItem, Header, InputChat } from '../../components'
import { RootStackParamList } from '../../router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../../utils';

type ChattingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chatting'>;

export default function Chatting() {
  const navigation = useNavigation<ChattingScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
        <Header 
          title="Nairobi Putri Hayza" 
          type='dark-profile' 
          onPressHeader={() => navigation.goBack()} 
          onPressProfileDoctor={() => navigation.navigate('DoctorProfile')} 
        />
        <View style={styles.content}>
          <Text style={styles.chatDate}>Senin, 21 Februari 2022</Text>
          <ChatItem isSender/>
          <ChatItem />
          <ChatItem isSender/>
        </View>
        <InputChat />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: colors.white
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  }
})