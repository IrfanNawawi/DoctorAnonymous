import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Gap, Header, ListDoctorProfile, Profile } from '../../components';
import { RootStackParamList } from '../../types/navigation';
import { colors, FormattedItem, formatToArray } from '../../utils';
import { getDataDoctorById } from '../../services';

type DoctorProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DoctorProfile'
>;

export default function DoctorProfile() {
  const navigation = useNavigation<DoctorProfileScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'DoctorProfile'>>();
  const { doctor } = route.params;

  const [doctorProfile, setDoctorProfile] = useState<FormattedItem[]>([]);
  const [hospital, setHospital] = useState('');

  // Fetch hospital detail by ID
  useEffect(() => {
    if (!doctor?.hospital) return;

    getDataDoctorById(`hospitals/`, 'id', doctor.hospital).then(
      (responseHospital) => {
        responseHospital.map((item) => setHospital(item.name))
      }
    );
  }, [doctor?.hospital]);

  // Format doctor profile data
  useEffect(() => {
    if (!doctor) return;

    const mapping = {
      university: 'Alumnus',
      hospital: 'Tempat Praktik',
      str: 'No. STR',
    };

    const profileData = {
      university: doctor.university ?? '-',
      hospital: hospital || '-',
      str: doctor.strNumber ?? '-',
    };

    const formatted = formatToArray(profileData, mapping);
    setDoctorProfile(formatted);
  }, [doctor, hospital]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Doctor Profile" onPressHeader={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile
          typeProfile={
            doctor.gender === 'Pria' ? 'photo-gender-male' : 'photo-gender-female'
          }
          fullname={doctor.fullname}
          profession={doctor.profession}
          photo={doctor.photo}
        />
        <Gap height={10} />
        {doctorProfile.map((item) => (
          <ListDoctorProfile
            key={item.id}
            title={item.title}
            desc={item.desc}
          />
        ))}
        <View style={styles.buttonWrapper}>
          <Button
            typeButton="primary"
            title="Start Consulting"
            onPress={() => navigation.navigate('Chatting')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonWrapper: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});
