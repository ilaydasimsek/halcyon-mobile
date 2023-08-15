import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@style';
const YogaLessonsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>YogaLessonsScreen</Text>
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
