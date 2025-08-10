import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { 
  DummyDoctorOne, 
  DummyDoctorThree, 
  DummyDoctorTwo, 
  DummyNewsOne, 
  DummyNewsThree, 
  DummyNewsTwo 
} from '../../assets'
import { DoctorCategory, DoctorRated, Gap, HomeProfile, NewsItem } from '../../components'
import { colors, fonts, timeFormatting } from '../../utils'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../types/navigation'
import { getDataDoctor, getFilterDataDoctor } from '../../services'

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

const renderImageRated = (name: string) => {
  switch (name) {
    case 'Alexander Jannie':
      return DummyDoctorOne;
    case 'Sunny Frank':
      return DummyDoctorTwo;
    case 'Poe Minn':
      return DummyDoctorThree;
    default:
      return DummyDoctorOne;
  }
};

export default function Doctor() {
  const navigation = useNavigation<DoctorScreenNavigationProp>();
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [rated, setRated] = useState([]);

  useEffect(() => {
    getDataDoctor('category/').then(res => setCategory(res));
    getFilterDataDoctor('rated/').then(res => setRated(res));
    getDataDoctor('news/').then(res => setNews(res));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30}/>
            <HomeProfile onPressHomeProfile={() => navigation.navigate('UserProfile')}/>
            <Text style={styles.welcome}>
              {`Who would you like\nto consult with today?`}
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {
                  category.map((item: any) => {
                    return (
                      <DoctorCategory 
                        key={item.id} 
                        category={item.name}
                        onPressDoctorCategory={() => navigation.navigate('ChooseDoctor')}
                      />
                    )
                  })
                }
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {
              rated.map((item: any) => {
                return (
                  <DoctorRated 
                    key={item.id}
                    picture={renderImageRated(item.name)} 
                    name={item.name} 
                    profession={item.profession}
                    rating={item.rate}
                    onPressDoctorRated={() => navigation.navigate('DoctorProfile')}
                  />
                )
              })
            }
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {
            news.map((item: any) => {
              return (
                <NewsItem 
                  key={item.id} 
                  headline={item.title} 
                  date={timeFormatting(item.date)} 
                  picture={renderImageNews(item.id)}
                />
              )
            })
          }
          <Gap height={30}/>
        </ScrollView>
      </View>
    </SafeAreaView>
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