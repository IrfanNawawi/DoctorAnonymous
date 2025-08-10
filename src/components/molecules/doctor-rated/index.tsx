import React, { useMemo } from 'react';
import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IcRatedStar } from '../../../assets';
import { colors, fonts } from '../../../utils';

type DoctorRatedProps = {
  picture: ImageProps;
  name: string;
  profession: string;
  rating: number;
  onPressDoctorRated?: () => void;
};

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
  picture,
  name,
  profession,
  rating,
  onPressDoctorRated,
}: DoctorRatedProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressDoctorRated}>
      <Image source={picture} style={styles.avatar} />
      <View style={styles.profile}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.profession}>{profession}</Text>
      </View>
      <StarRating rating={rating} />
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
