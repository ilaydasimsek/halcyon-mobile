import React, { useEffect, useRef, PropsWithChildren } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  PanGestureHandler,
  PanGestureHandlerProps,
  State,
} from 'react-native-gesture-handler';

import { colors } from '@style';
import { dimensions } from '@constants';

type TOnHandlerStateChange = Pick<
  PanGestureHandlerProps,
  'onHandlerStateChange'
>['onHandlerStateChange'];

type TOnGestureEvent = Pick<
  PanGestureHandlerProps,
  'onGestureEvent'
>['onGestureEvent'];

type TBaseModalScreenWrapper = PropsWithChildren & {
  onDismiss?: () => void;
};

/***
 * A base modal screen that provides the basic modal functionality
 * - Animates the modal as it appears and disappears
 * - Can slide down to dismiss
 * - Has a backdrop that will dismiss the modal on tap
 *
 * @param children The views to be rendered inside the modal view. If not
 * provided modal won't ve visible
 * @constructor
 */
const BaseModalScreenWrapper: React.FC<TBaseModalScreenWrapper> = ({
  onDismiss,
  children,
}) => {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();
  // Hide modal initially to animate it to the screen
  const translateY = new Animated.Value(dimensions.windowHeight);

  const resetAnimation = Animated.timing(translateY, {
    toValue: 0,
    duration: 400,
    useNativeDriver: true,
  });

  const swipeDownAnimation = Animated.timing(translateY, {
    toValue: dimensions.windowHeight,
    duration: 300,
    useNativeDriver: true,
  });

  // Move the modal across screen as user swipes down
  const handlePan: TOnGestureEvent = ({ nativeEvent }) => {
    if (nativeEvent.translationY > 0) {
      translateY.setValue(nativeEvent.translationY);
    }
  };

  const dismissModal = () =>
    swipeDownAnimation.start(() =>
      onDismiss !== undefined ? onDismiss() : navigation.goBack(),
    );

  const modalHeightRef = useRef<number>(0);
  // Automatically swipe down the modal and go back to the previous screen
  const handleStateChange: TOnHandlerStateChange = ({ nativeEvent }) => {
    const { state } = nativeEvent;
    const dismissThreshold = modalHeightRef.current / 3;
    if (state === State.END) {
      if (nativeEvent.translationY > dismissThreshold) {
        dismissModal();
      } else {
        // Reset modal to the initial state
        resetAnimation.start();
      }
    }
  };

  useEffect(() => {
    // On initial render, modal is resetted to original position to create a modal presentation effect manually
    resetAnimation.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PanGestureHandler
      onHandlerStateChange={handleStateChange}
      onGestureEvent={handlePan}
    >
      <Animated.View style={styles.container}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => dismissModal()}
        />
        <Animated.View
          style={[
            {
              transform: [{ translateY: translateY }],
            },
            styles.modal,
            { paddingBottom: bottom + 16 },
          ]}
          onLayout={({ nativeEvent }) => {
            modalHeightRef.current = nativeEvent.layout.height;
          }}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  modal: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: 22,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
});

export default BaseModalScreenWrapper;
