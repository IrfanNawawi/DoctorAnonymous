import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DummyDoctorOne, DummyDoctorThree, DummyDoctorTwo, JSONDataDoctor } from '../../assets';
import { Header, ListDoctor } from '../../components';
import { colors } from '../../utils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../router';
import { useNavigation } from '@react-navigation/native';

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
        <View style={styles.container}>
            <Header title="Pilih Dokter Anak" type='dark' onPressHeader={() => navigation.goBack()} />
            {
            JSONDataDoctor.consultation.map((item) => {
                return (
                <ListDoctor 
                    key={item.id} 
                    name={item.name} 
                    desc={item.gender} 
                    picture={renderImageConsultation(item.name)}
                    type='next'
                    onPressListDoctor={() => navigation.navigate('Chatting')}
                />
                )
            })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})