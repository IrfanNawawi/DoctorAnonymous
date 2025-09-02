import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { List } from '../../components';
import { getDataMessages } from '../../services';
import { RootStackParamList } from '../../types/navigation';
import { colors, fonts, getItem, showMessageError } from '../../utils';

type DoctorCategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Consultation'>;

export default function Consultation() {
  const navigation = useNavigation<DoctorCategoryScreenNavigationProp>();
  const [consultation, setConsultation] = useState([]);

  useEffect(() => {
    const data = getItem('user');
    if (data) {
      getDataMessages(`messages/${data.userId}/`).then((messageData: any) => {
        setConsultation(messageData);
      }).catch(errorMessage => {
        showMessageError(errorMessage);
      })
    }
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Consultation</Text>
        {
          consultation.map((item: any) => {
            return (
              <List 
                key={item.id} 
                name={item.doctorDetail.fullname} 
                desc={item.lastChatContent} 
                picture={item.doctorDetail.photo} 
                onPressList={() => navigation.navigate('Chatting', { doctor: item.doctorDetail })}
              />
            )
          })
        }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16
  }
})