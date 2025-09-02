import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Header, List } from '../../components';
import { getDataDoctorById } from '../../services';
import { DoctorData } from '../../types/doctors';
import { RootStackParamList } from '../../types/navigation';
import { colors } from '../../utils';

type ChooseDoctorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChooseDoctor'>;

export default function ChooseDoctor() {
    const navigation = useNavigation<ChooseDoctorScreenNavigationProp>();
    const route = useRoute<RouteProp<RootStackParamList, 'ChooseDoctor'>>();
    const { category } = route.params;

    const [consultation, setConsultation] = useState<DoctorData[]>([]);
   
    useEffect(() => {
      getDataDoctorById(`doctors/`, 'category', category.id).then(resultDoctor => {
        resultDoctor.forEach((doctorData: any) => {
          doctorData.photo = { uri: doctorData.photo };
        })
        setConsultation(resultDoctor);
      });
    }, [category.id]);
    
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaTop} />
        <SafeAreaView style={styles.safeAreaBottom}>
          <Header 
            title={`Choose a ${category.name}`} 
            type='dark' 
            onPressHeader={() => navigation.goBack()} 
          />
          <View style={styles.chatContainer}>
            {
              consultation.map((item: any) => {
                return (
                <List 
                    key={item.id} 
                    name={item.fullname} 
                    desc={item.gender} 
                    picture={item.photo}
                    type='next'
                    onPressList={() => navigation.navigate('DoctorProfile', { doctor: item })}
                />
                )
              })
            }
          </View>
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
  },
})