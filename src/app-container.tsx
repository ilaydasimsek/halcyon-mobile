import React, { PropsWithChildren } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useSetupCredentialsFromKeychain } from '@keychain';
import { useSetupLocalization } from '@localization';

const AppContainer: React.FC<PropsWithChildren> = ({ children }) => {
  // All hooks that need to be run initially should be called here
  useSetupCredentialsFromKeychain();
  useSetupLocalization();

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {children}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
export default AppContainer;
