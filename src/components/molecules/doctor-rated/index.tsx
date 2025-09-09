import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IcRatedStar } from '../../../assets/icon';
import { DoctorData } from '../../../types/doctors';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

const StarRating = ({rating}: {rating: number}) => {
  const stars = useMemo(() => {
    const result = [];
    for (let i = 0; i < rating; i++) {
      result.push(<IcRatedStar key={i} />);
    }
    return result;
  }, [rating]);

  return <View style={styles.rated}>{stars}</View>;
};

export default function DoctorRated({
  photo,
  fullname,
  profession,
  rate = 0,
  onPress,
}: DoctorData) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={photo} style={styles.avatar} />
      <View style={styles.profile}>
        <Text style={styles.name}>{fullname}</Text>
        <Text style={styles.profession}>{profession}</Text>
      </View>
      <StarRating rating={rate} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  rated: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  profession: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginTop: 2,
  },
  profile: {
    flex: 1,
  },
});
