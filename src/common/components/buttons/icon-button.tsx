import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  ImageStyle,
} from 'react-native';
import AnimatedButton, { TAnimatedButton } from './animated-button';

type TIconButtonProps = TAnimatedButton & {
  image: ImageSourcePropType;
  imageStyle: ImageStyle;
};

/**
 * The default button of the app that can display an image inside
 *
 * Note:
 *    The button stretches to fill its container by default, provide
 *    'align-self' prop to override this.
 */
const IconButton: React.FC<TIconButtonProps> = ({
  image,
  imageStyle,
  ...props
}) => {
  return (
    <AnimatedButton {...props}>
      <Image source={image} style={[styles.image, imageStyle]} />
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
});

export default IconButton;
