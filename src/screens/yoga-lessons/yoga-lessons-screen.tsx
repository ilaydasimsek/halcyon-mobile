import React from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@style';
import { useLogoutMutation } from '../auth/auth-query';
const YogaLessonsScreen = () => {
  const { logout } = useLogoutMutation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>YogaLessonsScreen</Text>
      <Button title={'Logout'} onPress={() => logout()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.backgroundGray,
  },
});

export default YogaLessonsScreen;
