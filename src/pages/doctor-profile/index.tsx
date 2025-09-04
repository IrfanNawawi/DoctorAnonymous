import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Gap, Header, ListDoctorProfile, Profile } from '../../components';
import { getDataDoctorById } from '../../services';
import { doctorProfileMap } from '../../types/doctors';
import { RootStackParamList } from '../../types/navigation';
import { colors, FormattedItem, formatToArray } from '../../utils';

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

  useEffect(() => {
    if (!doctor?.hospital) return;

    getDataDoctorById(`hospitals/`, 'id', doctor.hospital).then(resultHospital => {
      resultHospital.forEach((hospitalData: any) => {
        setHospital(hospitalData.name);
      })
    });
  }, [doctor?.hospital]);

  useEffect(() => {
    if (!doctor) return;

    const profileData = {
      university: doctor.university ?? '-',
      hospital: hospital || '-',
      str: doctor.strNumber ?? '-',
    };

    const reformatProfileDoctor = formatToArray(profileData, doctorProfileMap);
    setDoctorProfile(reformatProfileDoctor);
  }, [doctor, hospital]);

  const processedDoctorProfile = useMemo(() =>
    doctorProfile.map((item) => (
      <ListDoctorProfile
        key={item.id}
        title={item.title}
        desc={item.desc}
      />
    ))
  , [doctorProfile]);

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
        {processedDoctorProfile}
        <View style={styles.buttonWrapper}>
          <Button
            typeButton="primary"
            title="Start Consulting"
            onPress={() => navigation.navigate('Chatting', { doctor })}
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
