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

export const timeFormatting = (dateString: string): string => {
  // Parsing "08/08/2025" → Date
  const [day, month, year] = dateString.split("/").map(Number);
  const targetDate = new Date(year, month - 1, day);
  const targetTime = targetDate.getTime();
  const nowTime = Date.now();

  // Kalau tanggal di masa depan, langsung tampilkan format normal
  if (targetTime > nowTime) {
    return targetDate.toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" });
  }

  const diffMs = nowTime - targetTime;
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);
  const weeks = Math.floor(diffMs / 604800000);
  const months = Math.floor(diffMs / 2600640000);
  const years = Math.floor(diffMs / 31207680000);

  const now = new Date();
  const thisDay = now.getDate();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const agoDay = targetDate.getDate();
  const agoMonth = targetDate.getMonth();
  const agoYear = targetDate.getFullYear();

  if (thisYear - agoYear >= 1) {
    return targetDate.toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" });
  }
  if (thisMonth - agoMonth >= 1) {
    return targetDate.toLocaleDateString("default", { month: "short", day: "numeric" });
  }
  if (thisMonth === agoMonth && thisDay - agoDay === 1) {
    return "Yesterday";
  }
  if (minutes < 1) {
    return "just now";
  }
  if (minutes < 60) {
    return minutes === 1 ? "one minute ago" : `${minutes} minutes ago`;
  }
  if (hours < 24) {
    return hours === 1
      ? `an hour and ${minutes - 60} minutes ago`
      : `${hours} hrs ago`;
  }
  if (days < 7) {
    return days === 1
      ? `${days} day and ${hours - 24} hrs ago`
      : `${days} days ago`;
  }
  if (weeks < 5) {
    return weeks === 1 ? "a week ago" : `${weeks} weeks ago`;
  }
  if (months < 12) {
    return months === 1 ? "a month ago" : `${months} months ago`;
  }
  return years === 1 ? "a year ago" : `${years} years ago`;
};
