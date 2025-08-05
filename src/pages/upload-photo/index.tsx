import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, Gap, Header, Link, Photo } from '../../components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { colors, constant, fonts, setItem } from '../../utils';
import { IlPhotoDefault } from '../../assets';
import { showMessage } from 'react-native-flash-message';
import { firebase } from '@react-native-firebase/database';

type UploadPhotoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UploadPhoto'>;

export default function UploadPhoto() {
  const navigation = useNavigation<UploadPhotoScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'UploadPhoto'>>();
  const { user } = route.params;

  const [sourcePhotoForDB, setSourcePhotoForDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [imageUri, setImageUri] = useState(IlPhotoDefault);

  const openImagePicker = () => {
    launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 200,
      maxWidth: 200,
      quality: 0.5,
      includeBase64: true,
      selectionLimit: 1,
    }, response => {
      if (response.didCancel) return showMessageError('User cancelled image picker');
      if (response.errorCode) return showMessageError(`Image picker error: ${response.errorMessage}`);
      const uri = response.assets?.[0]?.uri;
      if (uri) {
        setSourcePhotoForDB(`data:${response.assets?.[0]?.type};base64, ${response.assets?.[0]?.base64}`);
        setImageUri({ uri });
        setHasPhoto(true);
      }
    });
  };

  const submitUploadPhoto = async () => {
    await firebase
      .app()
      .database(constant.DATABASE_URL)
      .ref(`/users/${user.userId}`)
      .update({
        photo: sourcePhotoForDB,
      })
      .then(() => {
        const userData = { ...user, photo: sourcePhotoForDB };
        setItem('user', JSON.stringify(userData));
        navigation.replace('MainApp')
      })
      .catch(err => showMessageError(err));
  };

  const showMessageError = (message: string) => {
    showMessage({
      message,
      type: 'default',
      backgroundColor: colors.error,
      color: colors.white,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Upload Photo" onPressHeader={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <Photo
            typePhoto={hasPhoto ? 'photo-remove' : 'photo-upload'}
            sourcePhoto={imageUri}
            onPressPhoto={openImagePicker}
          />
          <Text style={styles.nameUser}>{user.fullname}</Text>
          <Text style={styles.professionalUser}>{user.profession}</Text>
        </View>

        <View>
          <Button
            title="Upload and Continue"
            typeButton="primary"
            onPressButton={submitUploadPhoto}
            disabledButton={!hasPhoto}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            fontSize={16}
            onPressLink={() => navigation.replace('MainApp')}
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
