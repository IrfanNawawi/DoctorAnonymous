import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChatItem, Header, InputChat } from '../../components';
import { getChatData, saveChatData } from '../../services';
import { RootStackParamList } from '../../types/navigation';
import { colors, fonts, formatChatDate, formatChatTime, getDateFormat, getDateTimeFormat, getItem, showMessageError } from '../../utils';

type ChattingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chatting'>;

interface ChatItemData {
  id: string;
  data: {
    chatDelivery: string;
    chatContent: string;
    sentBy: string;
  };
};
  
interface ChatGroup {
  id: string;
  data: ChatItemData[];
};

export default function Chatting() {
  const navigation = useNavigation<ChattingScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Chatting'>>();
  const { doctor } = route.params;

  const [userId, setUserId] = useState('');
  const [chatData, setChatData] = useState<ChatGroup[]>([]);
  const [chatContent, setChatContent] = useState('');

  useEffect(() => {
    getLocalDataUser();
  }, []);

  const getLocalDataUser = () => {
    try {
      const data = getItem('user');
      if (data) {
        setUserId(data.userId);
        getDataChat(data.userId);
      }
    } catch (error: any) {
      showMessageError(error);
    }
  };

  const getDataChat = (userId: string) => {
    getChatData(`${userId}-${doctor.userId}`).then((data) => {
      if (data) {
        setChatData(data);
      }
    }).catch((errorMessage) => {
      showMessageError(errorMessage);
    });
  };

  const chatPress = () => {
    if (!chatContent.trim() || !userId) return;

    const dataChat = {
      sentBy: userId,
      chatDelivery: getDateTimeFormat(),
      chatContent,
    };

    saveChatData(`${userId}-${doctor.userId}`, getDateFormat(), dataChat)
      .then(() => setChatContent(''))
      .catch((errorMessage) => showMessageError(errorMessage));
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
