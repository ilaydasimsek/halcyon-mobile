import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

import { colors } from '@style';
import AnimatedButton, { TAnimatedButton } from './animated-button';

type TImageButtonProps = TAnimatedButton & {
  image: ImageSourcePropType;
};

/**
 * The default button of the app that can display an image inside
 *
 * Note:
 *    The button stretches to fill its container by default, provide
 *    'align-self' prop to override this.
 */
const ImageButton: React.FC<TImageButtonProps> = ({ image, ...props }) => {
  return (
    <AnimatedButton {...props} style={[styles.button, props.style]}>
      <Image source={image} style={styles.image} />
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: colors.brightGray,
    borderWidth: 2,
  },
  image: {
    resizeMode: 'contain',
    aspectRatio: 1,
    height: '100%',
  },
});

export default ImageButton;
