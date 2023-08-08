import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import AnimatedButton, { TAnimatedButton } from './animated-button';

type TTextButton = TAnimatedButton & {
  text: ReactElement<Text>;
};

/**
 * The default button of the app that can display a text inside
 *
 * Note:
 *    The button stretches to fill its container by default, provide
 *    'align-self' prop to override this.
 */
const TextButton: React.FC<TTextButton> = ({ text, ...props }) => {
  return (
    <AnimatedButton {...props} style={[styles.button, props.style]}>
      {text}
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TextButton;
