import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { DummyHospitalOne, DummyHospitalThree, DummyHospitalTwo, IlHospitalBackground } from '../../assets'
import { ListHospital } from '../../components'

export default function Hospitals() {
  return (
    <View style={styles.container}>
      <ImageBackground source={IlHospitalBackground} style={styles.background}>
        <Text style={styles.title}>Nearby hospitals</Text>
        <Text style={styles.availibility}>3 Tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListHospital type='Rumah Sakit' name='RSUD Dr. Soeprapto' address='Jln. Surya Sejahtera 20' picture={DummyHospitalOne} />
        <ListHospital type='Rumah Sakit Anak' name='Happy Family & Kids' address='Jln. Surya Sejahtera 20' picture={DummyHospitalTwo} />
        <ListHospital type='Rumah Sakit Jiwa' name='Tingkatan Paling Atas' address='Jln. Surya Sejahtera 20' picture={DummyHospitalThree} />
      </View>
    </View>
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