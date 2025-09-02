import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IlCategoryDoctor, IlCategoryDoctorKids, IlCategoryMedicine, IlCategoryPsikiater } from '../../../assets';
import { DoctorData } from '../../../types/doctors';
import { colors, fonts } from '../../../utils';

export default function DoctorCategory({category, onPress}: DoctorData) {
  const renderIconDoctorCategory = () => {
    switch (category) {
      case 'General Practitioner':
        return <IlCategoryDoctor style={styles.illustration} />;
      case 'Psychiatrist':
        return <IlCategoryPsikiater style={styles.illustration} />;
      case 'Pharmacologist':
        return <IlCategoryMedicine style={styles.illustration} />;
      case 'Pediatrician':
        return <IlCategoryDoctorKids style={styles.illustration} />;
      default:
        return <IlCategoryDoctor style={styles.illustration} />;
    }
  };
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        {renderIconDoctorCategory()}
        <Text style={styles.label}>I need a</Text>
        <Text style={styles.category}>{category}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12, 
    backgroundColor: colors.cardLight,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginRight: 10,
    width: 115,
    height: 140
  },
  illustration: {
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary
  }
})