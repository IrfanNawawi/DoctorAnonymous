import { Platform } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { showMessage } from "react-native-flash-message";
import { colors } from "../colors";
import { launchImageLibrary } from "react-native-image-picker";

export const fetchDevicePlatform = () => {
  const platformName = Platform.OS.toUpperCase();
  const platformVersion =
    Platform.OS === 'ios'
      ? Platform.Version
      : Platform.constants?.reactNativeVersion;

  return `${platformName}^${platformVersion}`;
}

export const fetchDeviceId = async () => {
  const id = await getUniqueId();
  return id;
}

export const showMessageError = (message: string) => {
  showMessage({
    message,
    type: 'default',
    backgroundColor: colors.error,
    color: colors.white
  });
}

export const openImagePicker = (onSuccess: (uri: string, base64: string) => void,
  onError: (message: string) => void
) => {
  launchImageLibrary({
    mediaType: 'photo',
    maxHeight: 200,
    maxWidth: 200,
    quality: 0.5,
    includeBase64: true,
    selectionLimit: 1,
  }, response => {
    if (response.didCancel) return onError('User cancelled image picker');
    if (response.errorCode) return onError(`Image picker error: ${response.errorMessage}`);
    const uri = response.assets?.[0]?.uri;
    if (uri) {
      onSuccess(uri, `data:${response.assets?.[0]?.type};base64, ${response.assets?.[0]?.base64}`);
    }
  });
};