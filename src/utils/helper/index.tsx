import { Platform } from "react-native";

export const Helper = {
  fetchDevicePlatform: () => {
    const platformName = Platform.OS.toUpperCase();
    const platformVersion =
      Platform.OS === 'ios'
        ? Platform.Version
        : Platform.constants?.reactNativeVersion;

    return `${platformName}^${platformVersion}`;
  },
};