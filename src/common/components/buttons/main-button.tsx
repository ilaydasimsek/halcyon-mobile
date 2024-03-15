import React from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';

import { colors, typography, scale } from '@style';
import AnimatedButton, { TAnimatedButton } from './animated-button';
import { TextStyleProp } from '../../types/text';

type TMainButton = TAnimatedButton &
  TextStyleProp & {
    title: String;
    loading?: boolean;
  };

/**
 * The default button of the app that can display a text inside
 *
 * Note:
 *    The button stretches to fill its container by default, provide
 *    'align-self' prop to override this.
 */
const MainButton: React.FC<TMainButton> = ({
  title,
  loading,
  textStyle,
  ...props
}) => {
  return (
    <AnimatedButton
      {...props}
      disabled={loading || props.disabled}
      style={[styles.button, props.style]}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} size="small" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
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
    height: scale(44),
  },
  buttonText: { ...typography.h4, color: colors.white },
});

export default MainButton;
