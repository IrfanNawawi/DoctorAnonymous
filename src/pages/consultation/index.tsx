import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ListDoctor } from '../../components'
import { colors, fonts } from '../../utils'
import { DummyDoctorOne, DummyDoctorThree, DummyDoctorTwo } from '../../assets'

export default function Consultation() {
  const [doctors] = useState([
    {
      id: 1,
      name: 'Alexander Jannie',
      desc: 'Baik ibu, terima kasih banyak atas wakt...',
      picture: DummyDoctorOne
    },
    {
      id: 2,
      name: 'Nairobi Putri Hayza',
      desc: 'Oh tentu saja tidak karena jeruk it...',
      picture: DummyDoctorTwo
    },
    {
      id: 3,
      name: 'John McParker Steve',
      desc: 'Oke menurut pak dokter bagaimana unt...',
      picture: DummyDoctorThree 
    }
  ])
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Consultation</Text>
        {
          doctors.map((doctor) => {
            return (
              <ListDoctor 
                key={doctor.id} 
                name={doctor.name} 
                desc={doctor.desc} 
                picture={doctor.picture} 
              />
            )
          })
        }
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