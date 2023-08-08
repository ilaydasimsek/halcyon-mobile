import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

import { colors } from '@style';

type THeaderIcon = {
  source: ImageSourcePropType;
  size?: {
    height: number;
    width: number;
  };
};

const HeaderIcon: React.FC<THeaderIcon> = ({
  source,
  size = {
    height: 24,
    width: 24,
  },
}) => {
  return (
    <Image
      source={source}
      style={[styles.icon, { height: size.height, width: size.width }]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    tintColor: colors.black,
  },
});

export default HeaderIcon;
