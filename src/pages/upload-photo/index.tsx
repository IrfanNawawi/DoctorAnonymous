import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, Gap, Header, Link, Photo } from '../../components';
import { RootStackParamList } from '../../router';
import { colors, fonts } from '../../utils';
import { IlPhotoDefault } from '../../assets';
import { showMessage } from 'react-native-flash-message';

type UploadPhotoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UploadPhoto'>;

export default function UploadPhoto() {
  const navigation = useNavigation<UploadPhotoScreenNavigationProp>();

  const [hasPhoto, setHasPhoto] = useState(false);
  const [imageUri, setImageUri] = useState(IlPhotoDefault);

  const openImagePicker = () => {
    launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 2000,
      maxWidth: 2000,
    }, response => {
      if (response.didCancel) {
        showMessageError('User cancelled image picker');
      } else if (response.errorCode) {
        showMessageError(`Image picker error: ${response.errorMessage}`);
      } else {
        const source = { uri: response.assets?.[0]?.uri };
        if (source) {
          setImageUri(source);
          setHasPhoto(true);
        }
      }
    });
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
          <Text style={styles.nameUser}>Shayna Melinda</Text>
          <Text style={styles.professionalUser}>UI/UX Designer</Text>
        </View>

        <View>
          <Button
            title="Upload and Continue"
            typeButton="primary"
            onPressButton={() => navigation.replace('Login')}
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
