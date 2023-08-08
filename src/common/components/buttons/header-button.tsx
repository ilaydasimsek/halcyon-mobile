import React from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';

import { HeaderIcon } from '@navigation';
import AnimatedButton, { TAnimatedButton } from './animated-button';

type TIconButton = TAnimatedButton & {
  icon: ImageSourcePropType;
  iconSize?: {
    height: number;
    width: number;
  };
};

const HeaderButton: React.FC<TIconButton> = ({
  icon,
  iconSize = {
    height: 24,
    width: 24,
  },
  ...props
}) => {
  return (
    <AnimatedButton {...props} style={styles.button}>
      <HeaderIcon source={icon} size={iconSize} />
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 24,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});

export default HeaderButton;
