import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@style';
import { useYogaPractices } from './yoga-practice-query';
const YogaPracticesScreen = () => {
  const response = useYogaPractices();
  if (!response.data) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>YogaPractices</Text>
      {response.data.yogaPractices.edges.map(({ node }) => (
        <Text>{node.benefitsDescription}</Text>
      ))}
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
