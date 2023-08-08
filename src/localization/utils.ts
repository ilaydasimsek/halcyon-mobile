import { NativeModules, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next, { LanguageDetectorAsyncModule } from 'i18next';
import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';

import { en } from './languages';

countries.registerLocale(english);
export const phoneLocale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

/**
 * A language detector for i18next
 * Uses preferred language if there's any
 * Otherwise returns the phone's locale
 */
export const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    const userLanguage = await AsyncStorage.getItem('user-language');
    callback(userLanguage ?? phoneLocale);
    return userLanguage ?? phoneLocale;
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    await AsyncStorage.setItem('user-language', language);
  },
};

/**
 * Shortcut for localizing the text using i18next
 * Added to the global to be easily accessible from anywhere
 */
type TKeys = keyof typeof en;
export const localized = <K extends TKeys>(key: K, options?: Object) => {
  return i18next.t(key, options);
};
