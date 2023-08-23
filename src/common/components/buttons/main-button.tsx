import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { colors, typography } from '@style';
import AnimatedButton, { TAnimatedButton } from './animated-button';
import { TextStyleProp } from '../../types/text';

type TMainButton = TAnimatedButton &
  TextStyleProp & {
    title: String;
  };

/**
 * The default button of the app that can display a text inside
 *
 * Note:
 *    The button stretches to fill its container by default, provide
 *    'align-self' prop to override this.
 */
const MainButton: React.FC<TMainButton> = ({ title, textStyle, ...props }) => {
  return (
    <AnimatedButton {...props} style={[styles.button, props.style]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkPink,
    borderRadius: 30,
    paddingVertical: 10,
  },
  buttonText: { ...typography.h4, color: colors.white },
});

export default MainButton;
