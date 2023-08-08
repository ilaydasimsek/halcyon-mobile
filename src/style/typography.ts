import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { rem } from './layout';

export const fontColor = StyleSheet.create({
  white: {
    color: colors.white,
  },
  warningRed: {
    color: colors.warningRed,
  },
  textGray: {
    color: colors.textGray,
  },
  textGrayH2: {
    color: colors.textGrayH2,
  },
});

export const typography = StyleSheet.create({
  h1: {
    fontSize: rem(30),
    ...fontColor.textGray,
  },
  h2: {
    fontSize: rem(24),
    ...fontColor.textGray,
  },
  h3: {
    fontSize: rem(21),
    ...fontColor.textGray,
  },
  h4: {
    fontSize: rem(18),
    ...fontColor.textGray,
  },
  h5: {
    fontSize: rem(18),
    ...fontColor.textGray,
  },
  h6: {
    fontSize: rem(12),
    ...fontColor.textGray,
  },
  p1: {
    fontSize: rem(18),
    ...fontColor.textGray,
  },
  p2: {
    fontSize: rem(16),
    ...fontColor.textGray,
  },
  p3: {
    fontSize: rem(14),
    ...fontColor.textGray,
  },
  p4: {
    fontSize: rem(12),
    ...fontColor.textGray,
  },
  p5: {
    fontSize: rem(10),
    ...fontColor.textGray,
  },
});
