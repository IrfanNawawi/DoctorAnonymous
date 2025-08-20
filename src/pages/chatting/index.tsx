import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { ChatItem, Header, InputChat } from '../../components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../../utils';
import { RootStackParamList } from '../../types/navigation';

type ChattingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chatting'>;

export default function Chatting() {
  const navigation = useNavigation<ChattingScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaTop} />
      <SafeAreaView style={styles.safeAreaBottom}>
        <Header 
          title="Nairobi Putri Hayza" 
          type='dark-profile' 
          onPressHeader={() => navigation.goBack()} 
          onPressProfileDoctor={() => navigation.navigate('DoctorProfile')} 
        />
        <View style={styles.chatContainer}>
          <ScrollView 
            contentContainerStyle={styles.chatWrapper}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.chatDate}>Senin, 21 Februari 2022</Text>
            <ChatItem isSender />
            <ChatItem />
            <ChatItem isSender />
          </ScrollView>
        </View>

        <InputChat />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary
  },
  safeAreaTop: {
    backgroundColor: colors.secondary,
  },
  safeAreaBottom: {
    flex: 1,
    backgroundColor: colors.white,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  chatWrapper: {
    paddingBottom: 20,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  }
});
