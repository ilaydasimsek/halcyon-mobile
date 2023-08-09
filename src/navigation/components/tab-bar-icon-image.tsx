import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { colors } from '@style';

type TTabBarIconImageProps = {
  icon: ImageSourcePropType;
};

const TabBarIconImage: React.FC<TTabBarIconImageProps> = ({ icon }) => {
  return <Image source={icon} resizeMode="contain" style={styles.tabBarItem} />;
};

const styles = StyleSheet.create({
  tabBarItem: {
    width: 25,
    height: 25,
    tintColor: colors.darkPink,
  },
});

export default TabBarIconImage;
