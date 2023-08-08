import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

type TTabBarIconImageProps = {
  icon: ImageSourcePropType;
  focused: boolean;
};

const TabBarIconImage: React.FC<TTabBarIconImageProps> = ({
  icon,
  focused,
}) => {
  return (
    <Image
      source={icon}
      resizeMode="contain"
      style={focused ? styles.focusedTabBarItem : styles.unfocusedTabBarItem}
    />
  );
};

const styles = StyleSheet.create({
  focusedTabBarItem: {
    width: 65,
    height: 34,
    borderRadius: 20,
  },
  unfocusedTabBarItem: {
    width: 25,
    height: 25,
  },
});

export default TabBarIconImage;
