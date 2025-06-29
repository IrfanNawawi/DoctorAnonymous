import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IlCategoryDoctor, IlCategoryDoctorKids, IlCategoryMedicine, IlCategoryPsikiater } from '../../../assets';
import { colors, fonts } from '../../../utils';

type DoctorCategoryProps = {
  category: string,
  onPressDoctorCategory?: () => void
}

export default function DoctorCategory({category, onPressDoctorCategory}: DoctorCategoryProps) {
  const renderIconDoctorCategory = () => {
    switch (category) {
      case 'dokterumum':
        return <IlCategoryDoctor style={styles.illustration} />;
      case 'psikiater':
        return <IlCategoryPsikiater style={styles.illustration} />;
      case 'dokter obat':
        return <IlCategoryMedicine style={styles.illustration} />;
      case 'dokter anak':
        return <IlCategoryDoctorKids style={styles.illustration} />;
      default:
        return <IlCategoryDoctor style={styles.illustration} />;
    }
  };
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPressDoctorCategory}>
        {renderIconDoctorCategory()}
        <Text style={styles.label}>Saya butuh</Text>
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
    width: 100,
    height: 130
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