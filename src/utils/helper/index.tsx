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
  const [datePart, timePart = "00:00:00"] = dateString.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);

  const targetDate = new Date(year, month - 1, day, hour, minute, second);
  const now = new Date();
  const diffMs = now.getTime() - targetDate.getTime();

  const formatDate = (withYear = false) =>
    new Intl.DateTimeFormat("default", {
      month: "short",
      day: "numeric",
      ...(withYear && { year: "numeric" }),
    }).format(targetDate);

  // Future date
  if (diffMs < 0) return formatDate(true);

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);
  const weeks = Math.floor(diffMs / 604800000);
  const months = Math.floor(diffMs / 2600640000);
  const years = Math.floor(diffMs / 31207680000);

  // Different year
  if (now.getFullYear() !== targetDate.getFullYear()) return formatDate(true);
  // Different month in same year
  if (now.getMonth() !== targetDate.getMonth()) return formatDate();
  // Yesterday
  if (days === 1) return "Yesterday";

  // Dynamic rules
  if (minutes < 1) return "just now";
  if (minutes < 60) return minutes === 1 ? "one minute ago" : `${minutes} minutes ago`;
  if (hours < 24) return hours === 1 ? "an hour ago" : `${hours} hrs ago`;
  if (days < 7) return days === 1 ? "1 day ago" : `${days} days ago`;
  if (weeks < 5) return weeks === 1 ? "a week ago" : `${weeks} weeks ago`;
  if (months < 12) return months === 1 ? "a month ago" : `${months} months ago`;
  return years === 1 ? "a year ago" : `${years} years ago`;
};


export const objectToArray = <T extends object>(
  data: Record<string, T>
): (T & { id: string })[] => {
  if (!data) return [];
  return Object.keys(data).map((key) => ({
    ...data[key],
    id: key
  }));
};

type DataRecord = Record<string, string | number>;

interface Mapping {
  [key: string]: string;
}

export interface FormattedItem {
  id: number;
  title: string;
  desc: string | number;
}

export const formatToArray = (
  data: DataRecord,
  mapping: Mapping = {}
): FormattedItem[] => {
  return Object.entries(data).map(([key, value], index) => ({
    id: index + 1,
    title: mapping[key] ?? key,
    desc: value,
  }));
};


export const getDateTimeIndonesia = () => {
  const now = new Date();

  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const wib = new Date(utc + 7 * 60 * 60 * 1000);

  const year = wib.getFullYear();
  const month = String(wib.getMonth() + 1).padStart(2, '0');
  const day = String(wib.getDate()).padStart(2, '0');

  const hours = String(wib.getHours()).padStart(2, '0');
  const minutes = String(wib.getMinutes()).padStart(2, '0');
  const seconds = String(wib.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};


