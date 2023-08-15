import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { rem } from './layout';

const FONT_FAMILY = {
  poppinsRegular: 'Poppins-Regular',
  poppinsSemiBold: 'Poppins-SemiBold',
  poppinsMedium: 'Poppins-Medium',
  poppinsBold: 'Poppins-Bold',
};

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
    fontFamily: FONT_FAMILY.poppinsBold,
    ...fontColor.textGray,
  },
  h2: {
    fontSize: rem(24),
    fontFamily: FONT_FAMILY.poppinsBold,
    ...fontColor.textGray,
  },
  h3: {
    fontSize: rem(21),
    fontFamily: FONT_FAMILY.poppinsBold,
    ...fontColor.textGray,
  },
  h4: {
    fontSize: rem(18),
    fontFamily: FONT_FAMILY.poppinsBold,
    ...fontColor.textGray,
  },
  h5: {
    fontSize: rem(18),
    fontFamily: FONT_FAMILY.poppinsSemiBold,
    ...fontColor.textGray,
  },
  h6: {
    fontSize: rem(12),
    fontFamily: FONT_FAMILY.poppinsMedium,
    ...fontColor.textGray,
  },
  p1: {
    fontSize: rem(18),
    fontFamily: FONT_FAMILY.poppinsRegular,
    ...fontColor.textGray,
  },
  p2: {
    fontSize: rem(16),
    fontFamily: FONT_FAMILY.poppinsRegular,
    ...fontColor.textGray,
  },
  p3: {
    fontSize: rem(14),
    fontFamily: FONT_FAMILY.poppinsRegular,
    ...fontColor.textGray,
  },
  p4: {
    fontSize: rem(12),
    fontFamily: FONT_FAMILY.poppinsRegular,
    ...fontColor.textGray,
  },
  p5: {
    fontSize: rem(10),
    fontFamily: FONT_FAMILY.poppinsRegular,
    ...fontColor.textGray,
  },
});
