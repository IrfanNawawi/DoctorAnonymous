import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DummyDoctorOne, DummyDoctorThree, DummyDoctorTwo, JSONDataDoctor } from '../../assets';
import { Header, List } from '../../components';
import { RootStackParamList } from '../../router';
import { colors } from '../../utils';

type ChooseDoctorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChooseDoctor'>;

const renderImageConsultation = (name: string) => {
  switch (name) {
    case 'Alexander Jannie':
      return DummyDoctorOne;
    case 'Nairobi Putri Hayza':
      return DummyDoctorTwo;
    case 'John McParker Steve':
      return DummyDoctorThree;
    default:
      return DummyDoctorOne;
  }
};

export default function ChooseDoctor() {
    const navigation = useNavigation<ChooseDoctorScreenNavigationProp>();
    
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Pilih Dokter Anak" type='dark' onPressHeader={() => navigation.goBack()} />
            {
            JSONDataDoctor.consultation.map((item) => {
                return (
                <List 
                    key={item.id} 
                    name={item.name} 
                    desc={item.gender} 
                    picture={renderImageConsultation(item.name)}
                    type='next'
                    onPressList={() => navigation.navigate('Chatting')}
                />
                )
            })
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})