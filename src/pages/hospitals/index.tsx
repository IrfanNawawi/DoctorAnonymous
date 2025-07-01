import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { 
  DummyHospitalOne, 
  DummyHospitalThree, 
  DummyHospitalTwo, 
  IlHospitalBackground, 
  JSONDataDoctor 
} from '../../assets'
import { ListHospital } from '../../components'

const renderImageHospitals = (type: string) => {
  switch (type) {
    case 'Rumah Sakit':
      return DummyHospitalOne;
    case 'Rumah Sakit Anak':
      return DummyHospitalTwo;
    case 'Rumah Sakit Jiwa':
      return DummyHospitalThree;
    default:
      return DummyHospitalOne;
  }
};

export default function Hospitals() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={IlHospitalBackground} style={styles.background}>
        <Text style={styles.title}>Nearby hospitals</Text>
        <Text style={styles.availibility}>{JSONDataDoctor.hospitals.length} Tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        {
          JSONDataDoctor.hospitals.map(item => {
            return (
              <ListHospital 
                key={item.id} 
                type={item.type}
                name={item.name} 
                address={item.address}
                picture={renderImageHospitals(item.type)} 
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
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14
  },
  background: {
    height: 240,
    paddingTop: 30
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  availibility: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    textAlign: 'center',
    marginTop: 6
  }
})