import React, { useEffect, useMemo, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { DummyHospitalOne, DummyHospitalThree, DummyHospitalTwo } from '../../assets/dummy-image';
import { IlHospitalBackground } from '../../assets/illustration';
import ListHospital from '../../components/molecules/list-hospital';
import { getDataDoctor } from '../../services/firebase/realtime-database';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

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
  const [hospitals, setHospitals] = useState([]);
  
  useEffect(() => {
    getDataDoctor('hospitals/').then(res => setHospitals(res));
  }, []);

  const processedHospitals = useMemo(() =>
    hospitals.map((item: any) => (
        <ListHospital 
          key={item.id} 
          type={item.type}
          name={item.name} 
          address={item.address}
          picture={renderImageHospitals(item.type)} 
        />
      )
    ), [hospitals]);

  return (
    <View style={styles.container}>
      <ImageBackground source={IlHospitalBackground} style={styles.background}>
        <Text style={styles.title}>Nearby hospitals</Text>
        <Text style={styles.availibility}>{hospitals.length} Availibility</Text>
      </ImageBackground>
      <View style={styles.content}>
        {processedHospitals}
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
    paddingTop: 50
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