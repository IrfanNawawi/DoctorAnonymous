import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { IcDoctorActive, IcDoctorNonactive, IcHospitalsActive, IcHospitalsNonactive, IcMessagesActive, IcMessagesNonactive } from '../../../assets/icon';
import { IconProps } from '../../../types/icon';
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils/fonts';

export default function TabItem({ title, active = false, onPress, onLongPress }: IconProps) {
  // shared values scale and opacity
  const scale = useSharedValue(active ? 1 : 0.8);
  const opacity = useSharedValue(active ? 1 : 0.6);

  // update animation on active change
  useEffect(() => {
    scale.value = withSpring(active ? 1 : 0.8, {
      damping: 10,
      stiffness: 120,
    });
    opacity.value = withTiming(active ? 1 : 0.6, { duration: 250 });
  }, [active, opacity, scale]);

  // animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const renderIcon = () => {
    switch (title) {
      case 'Doctor':
        return active ? <IcDoctorActive /> : <IcDoctorNonactive />;
      case 'Consultation':
        return active ? <IcMessagesActive /> : <IcMessagesNonactive />;
      case 'Hospitals':
        return active ? <IcHospitalsActive /> : <IcHospitalsNonactive />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {renderIcon()}
        <Text style={textStyle(active)}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    fontFamily: fonts.primary[600],
    marginTop: 4,
  },
});

const textStyle = (active: boolean) => ({
  ...styles.text,
  color: active ? colors.text.menuActive : colors.text.menuInactive,
});
