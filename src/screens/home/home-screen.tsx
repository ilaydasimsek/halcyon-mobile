import React from 'react';
import HomeScreenTabNavigator from './top-navigation/home-screen-tab-navigator';
import { View, StyleSheet } from 'react-native';
import { colors } from '@style';
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HomeScreenTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 14,
    flex: 1,
    backgroundColor: colors.backgroundGray,
  },
});

export default HomeScreen;
