import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DoctorCategory, DoctorRated, Gap, HomeProfile, NewsItem } from '../../components'
import { colors, fonts } from '../../utils'
import { DummyDoctorOne, DummyDoctorThree, DummyDoctorTwo, DummyNewsOne, DummyNewsThree, DummyNewsTwo, IlCategoryDoctor, IlCategoryDoctorKids, IlCategoryMedicine, IlCategoryPsikiater } from '../../assets'
import { JSONCategoryDoctor } from '../../assets'

export default function Doctor() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30}/>
            <HomeProfile />
            <Text style={styles.welcome}>
              {`Mau konsultasi dengan\nsiapa hari ini ?`}
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {
                  JSONCategoryDoctor.data.map(item => {
                    return (
                      <DoctorCategory key={item.id} category={item.name} />
                    )
                  })
                }
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            <DoctorRated picture={DummyDoctorOne} name='Alexander Jannie' profession='Pediatrician'/>
            <DoctorRated picture={DummyDoctorTwo} name='Sunny Frank' profession='Dentist'/>
            <DoctorRated picture={DummyDoctorThree} name='Poe Minn' profession='Podiatrist'/>
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          <NewsItem headline={`Is it safe to stay at home\nduring coronavirus?`} date='Today' picture={DummyNewsOne}/>
          <NewsItem headline={`Consume yellow citrus\nhelps you healthier`} date='Today' picture={DummyNewsTwo}/>
          <NewsItem headline={`Learn how to make a\nproper orange juice at home`} date='Today' picture={DummyNewsThree}/>
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
    maxWidth: 209
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