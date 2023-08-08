import React, { PropsWithChildren } from 'react';
import {
  Animated,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

export type TAnimatedButton = PropsWithChildren &
  Pick<PressableProps, 'onPress' | 'disabled'> & {
    style?: StyleProp<ViewStyle>;
  };

const AnimatedButton: React.FC<TAnimatedButton> = ({
  children,
  onPress,
  disabled,
  style,
}) => {
  const animated = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.7,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[{ opacity: animated }, disabled && styles.disabled, style]}
    >
      <Pressable
        onPressIn={fadeIn}
        onPressOut={fadeOut}
        onPress={onPress}
        style={styles.pressable}
        disabled={disabled}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.3,
  },
});

export default AnimatedButton;
