import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { 
  DummyDoctorOne, 
  DummyDoctorThree, 
  DummyDoctorTwo, 
  JSONDataDoctor 
} from '../../assets'
import { List } from '../../components'
import { colors, fonts } from '../../utils'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../router'
import { useNavigation } from '@react-navigation/native'

type DoctorCategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Consultation'>;

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

export default function Consultation() {
  const navigation = useNavigation<DoctorCategoryScreenNavigationProp>();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Consultation</Text>
        {
          JSONDataDoctor.consultation.map((item) => {
            return (
              <List 
                key={item.id} 
                name={item.name} 
                desc={item.desc} 
                picture={renderImageConsultation(item.name)} 
                onPressList={() => navigation.navigate('Chatting')}
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