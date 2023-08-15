import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@style';
const YogaPracticesScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>YogaPractices</Text>
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

export default YogaPracticesScreen;
