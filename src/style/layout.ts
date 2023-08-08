import { StyleSheet } from 'react-native';

import { colors } from '@style';
import { dimensions } from '@constants';

/**
 *   Returns a scaled version of the given value based on screen width.
 *   Suggested to be used for all scale calculations.
 *
 *   Warning: This function doesn't do a 1-1 conversion based on height and instead uses a different algorithm to mat
 *   to have better looking components.
 *   Adjust the coefficient value to get different results or use the linear versions to get a
 *
 * size: The size value to be scaled
 * coefficient: The scale coefficient value that adjusts the resize rate
 */

export const scale = (size: number, coefficient: number = 1) =>
  size + (linearHorizontalScale(size) - size) * coefficient;

/**
 *   Returns a linearly scaled version of the given value based on screen height.
 *
 * size: The size value to be scaled
 * coefficient: The scale coefficient value that adjusts the resize rate
 */
export const linearVerticalScale = (size: number) =>
  (dimensions.windowHeight / dimensions.guidelineBaseHeight) * size;
export const linearHorizontalScale = (size: number) =>
  (dimensions.windowWidth / dimensions.guidelineBaseWidth) * size;
/**
 *  Imitates the rem value used to scale fonts in web
 *
 * fontSize: The font size to be scaled
 * coefficient: The scale coefficient value that adjusts the resize rate
 */
export const rem = (fontSize: number, coefficient: number = 0.7) =>
  scale(fontSize, coefficient);

export const shadow = StyleSheet.create({
  default: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    elevation: 6,
  },
});
