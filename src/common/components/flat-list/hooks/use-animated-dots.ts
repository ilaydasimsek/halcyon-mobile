import { Animated } from 'react-native';
import { useCallback, useEffect, useRef } from 'react';

const initializeAnimatedDotValues = (
  numberOfDots: number,
  minOpacity: number,
) => {
  let opacities = [];

  for (let i = 0; i < numberOfDots; i++) {
    let dot = new Animated.Value(minOpacity);
    opacities.push(dot);
  }

  return opacities;
};

export const useAnimatedDots = (numberOfDots: number) => {
  const minOpacity = 0;
  const animatedDots = useRef(
    initializeAnimatedDotValues(numberOfDots, minOpacity),
  );
  const targetOpacity = useRef(1);
  const dotToAnimate = useRef(0);
  const clearAnimations = useRef(false);

  const animateDots = useCallback((recursiveCall: boolean = false) => {
    // Return if component unmounts to stop the animation loop
    if (recursiveCall && clearAnimations.current) {
      clearAnimations.current = false;
      return;
    }
    // swap fade direction when we hit end of list
    if (dotToAnimate.current >= animatedDots.current.length) {
      dotToAnimate.current = 0;
      targetOpacity.current =
        targetOpacity.current === minOpacity ? 1 : minOpacity;
    }

    Animated.timing(animatedDots.current[dotToAnimate.current], {
      toValue: targetOpacity.current,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      if (dotToAnimate.current !== null) {
        dotToAnimate.current = dotToAnimate.current + 1;
        animateDots(true);
      }
    });
  }, []);

  useEffect(() => {
    animateDots();
    return () => {
      clearAnimations.current = true;
    };
  }, [animateDots]);

  return animatedDots;
};
