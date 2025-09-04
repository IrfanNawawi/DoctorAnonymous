import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  DummyNewsOne,
  DummyNewsThree,
  DummyNewsTwo
} from '../../assets';
import { DoctorCategory, DoctorRated, Gap, HomeProfile, NewsItem } from '../../components';
import { getDataDoctor, getFilterDataDoctor } from '../../services';
import { DoctorData } from '../../types/doctors';
import { RootStackParamList } from '../../types/navigation';
import { colors, fonts, objectToArray, timeFormatting } from '../../utils';

type DoctorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Doctor'>;

const renderImageNews = (id: number) => {
  switch (id) {
    case 1:
      return DummyNewsOne;
    case 2:
      return DummyNewsTwo;
    case 3:
      return DummyNewsThree;
    default:
      return DummyNewsOne;
  }
};

export default function Doctor() {
  const navigation = useNavigation<DoctorScreenNavigationProp>();
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [rated, setRated] = useState<DoctorData[]>([]);  

  useEffect(() => {
    getDataDoctor('category/').then(res => setCategory(res));
    getFilterDataDoctor('doctors/', 'rate', 3).then(res => {
      const doctorsArray = objectToArray<DoctorData>(res);
      setRated(doctorsArray);
    });
    getDataDoctor('news/').then(res => setNews(res));
  }, []);

  const processedCategory = useMemo(() =>
    category.map((item: any) => (
        <DoctorCategory 
          key={item.id} 
          category={item.name}
          onPress={() => navigation.navigate('ChooseDoctor', { category: item })}
        />
      )
    ), [category, navigation]);

  const processedRated = useMemo(() =>
    rated.map((doctorData: any) => ({
        ...doctorData,
        photo: { uri: doctorData.photo },
      }))
      .sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0)), [rated]);
  
  const processedNews = useMemo(() =>
    news.map((item: any) => (
        <NewsItem 
          key={item.id} 
          headline={item.title} 
          date={timeFormatting(item.date)} 
          picture={renderImageNews(item.id)}
        />
      )
    ), [news]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30}/>
            <HomeProfile onPress={() => navigation.navigate('UserProfile')}/>
            <Text style={styles.welcome}>
              {`Who would you like\nto consult with today?`}
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {processedCategory}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {
              processedRated.map((item: any) => {
                return (
                  <DoctorRated 
                    key={item.id}
                    photo={item.photo} 
                    fullname={item.fullname}
                    profession={item.profession}
                    rate={item.rate}
                    onPress={() => navigation.navigate('DoctorProfile', { doctor: item })}
                  />
                )
              })
            }
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {processedNews}
          <Gap height={30}/>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    flex: 1
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {
    paddingHorizontal: 16
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperScroll: {
    marginHorizontal: -16
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 24,
    marginBottom: 16,
  },
})