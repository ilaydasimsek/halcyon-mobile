import React, { useEffect } from 'react';
import HomeScreenTabNavigator from './top-navigation/home-screen-tab-navigator';
import { StyleSheet, View } from 'react-native';
import { colors } from '@style';
import { useNavigation } from '@react-navigation/native';
import { HeaderButton } from '@components/buttons';
import { icons } from '@constants';

const HomeScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          icon={icons.settings}
          onPress={() => navigation.navigate('SettingsScreen')}
        />
      ),
    });
  }, [navigation]);
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
