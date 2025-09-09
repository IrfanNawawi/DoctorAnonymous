import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import List from '../../components/molecules/list';
import { RootStackParamList } from '../../types/navigation';
import { getDataMessages } from '../../services/firebase/realtime-database';
import { getItem } from '../../utils/storage/mmkvStorage';
import { showMessageError } from '../../utils/helper';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

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

  const renderedConsultation = useMemo(
    () =>
      consultation.map((item: any) => (
          <List
            key={item.id} 
            name={item.doctorDetail.fullname} 
            desc={item.lastChatContent} 
            picture={item.doctorDetail.photo} 
            onPressList={() => navigation.navigate('Chatting', { doctor: item.doctorDetail })}
          />
        )
      ),
    [consultation, navigation]
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Consultation</Text>
        {renderedConsultation}
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