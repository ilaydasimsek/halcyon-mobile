import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fontColor } from '@style';
import { MainButton } from '@components/buttons';
import { localized } from '@localization';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const onPressLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const onPressRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.sectionContainer}>
        <MainButton
          onPress={onPressRegister}
          title={'Register'}
          style={styles.registerButton}
        />
        <MainButton
          onPress={onPressLogin}
          title={localized('alreadyHaveAnAccount')}
          style={styles.loginButton}
          textStyle={fontColor.textGray}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 29,
    paddingVertical: '15%',
  },
  registerButton: {
    backgroundColor: colors.electricBlue,
    borderWidth: 0,
    marginBottom: 20,
  },
  loginButton: {
    borderWidth: 2,
    borderColor: colors.brightGray,
    backgroundColor: colors.white,
  },
});

export default WelcomeScreen;
