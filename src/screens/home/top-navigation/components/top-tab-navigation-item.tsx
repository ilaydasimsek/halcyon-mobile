import React from 'react';
import {
  View,
  Image,
  Text,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import { typography, colors, scale } from '@style';

type TTopTabNavigationItem = {
  selected?: boolean;
  icon: ImageSourcePropType;
  title: string;
};

const TopTabNavigationItem: React.FC<TTopTabNavigationItem> = ({
  selected = false,
  icon,
  title,
}) => {
  return (
    <View style={[styles.item, selected && styles.selectedItem]}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[
          styles.topNavigationItemImage,
          selected && styles.selectedTopNavigationItemImage,
        ]}
      />
      <Text
        style={[
          typography.h6,
          styles.topNavigationItemText,
          selected && styles.selectedTopNavigationItemText,
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    height: scale(81),
    width: scale(94),
    margin: 4,
    paddingVertical: 8,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: colors.darkPink,
  },
  topNavigationItemImage: {
    height: scale(22),
    width: scale(22),
    tintColor: colors.textGrayH2,
  },
  selectedTopNavigationItemImage: {
    tintColor: colors.white,
  },
  topNavigationItemText: {
    color: colors.textGrayH2,
  },
  selectedTopNavigationItemText: {
    color: colors.white,
  },
});

export default TopTabNavigationItem;
