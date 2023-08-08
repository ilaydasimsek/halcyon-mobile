import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AnimatedButton, { TAnimatedButton } from './animated-button';
import { colors, typography } from '@style';

type TIconButtonProps = TAnimatedButton & {
  image: ImageSourcePropType;
  title: string;
};

/**
 * The default button of the app that can display an image inside
 *
 * Note:
 *    The button stretches to fill its container by default, provide
 *    'align-self' prop to override this.
 */
const IconButton: React.FC<TIconButtonProps> = ({ title, image, ...props }) => {
  return (
    <AnimatedButton {...props} style={[styles.button, props.style]}>
      <View style={styles.view}>
        <Image source={image} style={styles.image} />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  view: {
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 30,
    backgroundColor: colors.electricBlue,
  },
  image: {
    resizeMode: 'contain',
    width: 55,
    height: 55,
  },
  buttonText: { ...typography.h3, color: colors.white, marginRight: 10 },
});

export default IconButton;
