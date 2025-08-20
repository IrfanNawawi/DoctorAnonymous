import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  IcDoctorActive,
  IcDoctorNonactive,
  IcHospitalsActive,
  IcHospitalsNonactive,
  IcMessagesActive,
  IcMessagesNonactive,
} from '../../../assets';
import { colors, fonts } from '../../../utils';
import { IconProps } from '../../../types/icon';

export default function TabItem({ title, active = false, onPress, onLongPress }: IconProps) {
  // shared values
  const scale = useSharedValue(active ? 1 : 0.8);
  const opacity = useSharedValue(active ? 1 : 0.6);

  // update animation on active change
  useEffect(() => {
    scale.value = withSpring(active ? 1 : 0.8, {
      damping: 10,
      stiffness: 120,
    });
    opacity.value = withTiming(active ? 1 : 0.6, { duration: 250 });
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

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
        <Text
          style={[
            styles.text,
            {
              color: active
                ? colors.text.menuActive
                : colors.text.menuInactive,
            },
          ]}
        >
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
