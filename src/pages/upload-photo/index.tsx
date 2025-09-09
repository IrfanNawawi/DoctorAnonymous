import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IlPhotoDefault } from '../../assets/illustration';
import Button from '../../components/atoms/button';
import Gap from '../../components/atoms/gap';
import Link from '../../components/atoms/link';
import Header from '../../components/molecules/header';
import Photo from '../../components/molecules/photo';
import { updateUserData } from '../../services/firebase/realtime-database';
import { RootStackParamList } from '../../types/navigation';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { openImagePicker, showMessageError } from '../../utils/helper';
import { setItem } from '../../utils/storage/mmkvStorage';

type UploadPhotoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UploadPhoto'>;

export default function UploadPhoto() {
  const navigation = useNavigation<UploadPhotoScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'UploadPhoto'>>();
  const { user } = route.params;

  const [sourcePhotoForDB, setSourcePhotoForDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [imageUri, setImageUri] = useState(IlPhotoDefault);

  const handleGetImage = useCallback(() => {
    openImagePicker((uri, base64) => {
      setSourcePhotoForDB(base64);
      setImageUri({ uri });
      setHasPhoto(true);
    },
    (errorMessage) => showMessageError(errorMessage)
    );
  }, []);

  const submitUploadPhoto = useCallback(async () => {
    updateUserData(user.userId, { photo: sourcePhotoForDB }).then(() => {
      const localUser = {
        ...user,
        photo: sourcePhotoForDB,
      };
      setItem('user', localUser);
      navigation.replace('MainApp');
    }).catch(errorMessage => showMessageError(errorMessage));
  }, [user, sourcePhotoForDB, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Upload Photo" onPressHeader={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <Photo
            typeProfile={hasPhoto ? 'photo-remove' : 'photo-upload'}
            photo={imageUri}
            onPress={handleGetImage}
          />
          <Text style={styles.nameUser}>{user.fullname}</Text>
          <Text style={styles.professionalUser}>{user.profession}</Text>
        </View>

        <View>
          <Button
            title="Upload and Continue"
            typeButton="primary"
            onPress={submitUploadPhoto}
            disabled={!hasPhoto}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            fontSize={16}
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.button.secondary.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameUser: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  professionalUser: {
    fontSize: 18,
    color: colors.text.secondary,
    fontFamily: fonts.primary[400],
    textAlign: 'center',
  },
});
