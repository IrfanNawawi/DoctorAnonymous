import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Gap, Header, Link, Photo } from '../../components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { colors, fonts, openImagePicker, setItem, showMessageError } from '../../utils';
import { IlPhotoDefault } from '../../assets';
import { updateUserData } from '../../services';

type UploadPhotoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UploadPhoto'>;

export default function UploadPhoto() {
  const navigation = useNavigation<UploadPhotoScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'UploadPhoto'>>();
  const { user } = route.params;

  const [sourcePhotoForDB, setSourcePhotoForDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [imageUri, setImageUri] = useState(IlPhotoDefault);

  const handleGetImage = () => {
    openImagePicker((uri, base64) => {
      setSourcePhotoForDB(base64);
      setImageUri({ uri });
      setHasPhoto(true);
    },
    (errorMessage) => showMessageError(errorMessage)
    );
  };

  const submitUploadPhoto = async () => {
    updateUserData(user.userId, { photo: sourcePhotoForDB }).then(() => {
      const localUser = {
        ...user,
        photo: sourcePhotoForDB,
      };
      setItem('user', localUser);
      navigation.replace('MainApp');
    }).catch(errorMessage => showMessageError(errorMessage));
  };

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
