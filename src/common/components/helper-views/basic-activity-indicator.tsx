import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { colors, scale } from '@style';

const BasicActivityIndicator = () => {
  return (
    <ActivityIndicator
      color={colors.darkPink}
      size="small"
      style={styles.indicator}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    padding: scale(16),
  },
});

export default BasicActivityIndicator;
