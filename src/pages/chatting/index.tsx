import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChatItem, Header, InputChat } from '../../components';
import { getChatData, saveChatData, saveLastChatData } from '../../services';
import { ChatGroup } from '../../types/chat-item';
import { RootStackParamList } from '../../types/navigation';
import { colors, fonts, formatChatDate, formatChatTime, getDateFormat, getDateTimeFormat, getItem, showMessageError } from '../../utils';

type ChattingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chatting'>;

export default function Chatting() {
  const navigation = useNavigation<ChattingScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Chatting'>>();
  const scrollViewRef = useRef<ScrollView>(null!);
  const { doctor } = route.params;

  const [userId, setUserId] = useState('');
  const [chatData, setChatData] = useState<ChatGroup[]>([]);
  const [chatContent, setChatContent] = useState('');

  useEffect(() => {
    const data = getItem('user');
    if (data) {
      setUserId(data.userId);
      const unsubscribe = getChatData(`${data.userId}-${doctor.userId}`, (dataChat) => {
        setChatData(dataChat);
      });

      return () => unsubscribe();
    }
  }, [doctor.userId]);

  useEffect(() => {
    if (chatData.length > 0) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [chatData]);

  const chatPress = () => {
    if (!chatContent.trim() || !userId) return;

    const dataChat = {
      sentBy: userId,
      chatDelivery: getDateTimeFormat(),
      chatContent,
    };

    const lastDataChatDoctor = {
      lastChatContent: chatContent,
      lastChatDelivery: getDateTimeFormat(),
      uidPartner: userId,
    }

    const lastDataChatUser = {
      lastChatContent: chatContent,
      lastChatDelivery: getDateTimeFormat(),
      uidPartner: doctor.userId,
    }

    saveChatData(`${userId}-${doctor.userId}`, getDateFormat(), dataChat)
      .then(() => {
        setChatContent('');
        saveLastChatData(true, `${userId}-${doctor.userId}`, lastDataChatUser);
        saveLastChatData(false, `${userId}-${doctor.userId}`, lastDataChatDoctor);
      }).catch((errorMessage) => showMessageError(errorMessage));
    };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaTop} />
      <SafeAreaView style={styles.safeAreaBottom}>
        <Header 
          title={doctor.fullname} 
          type="dark-profile" 
          onPressHeader={() => navigation.goBack()} 
          onPressProfileDoctor={() => navigation.navigate('DoctorProfile', { doctor })}
          profession={doctor.profession}
          photo={doctor.photo}
        />
        <View style={styles.chatContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.chatWrapper}
            showsVerticalScrollIndicator={false}
            >
            {chatData.map((chatGroup) => (
              <View key={chatGroup.id}>
                <Text style={styles.chatDate}>{formatChatDate(chatGroup.id)}</Text>

                {chatGroup.data.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    isSender={chat.data.sentBy === userId}
                    text={chat.data.chatContent}
                    date={formatChatTime(chat.data.chatDelivery)}
                    photoDoctor={doctor.photo}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>

        <InputChat
          label={doctor.fullname}
          value={chatContent}
          onChangeTextInput={setChatContent}
          onPress={chatPress}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
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
  },
});
