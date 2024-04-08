import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { rem } from './layout';

const FONT_FAMILY = {
  poppinsRegular: 'Poppins-Regular',
  poppinsSemiBold: 'Poppins-SemiBold',
  poppinsMedium: 'Poppins-Medium',
  poppinsBold: 'Poppins-Bold',
  nunitoSansRegular: 'NunitoSans-Regular',
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

export const fontFamily = StyleSheet.create({
  primary: {
    fontFamily: FONT_FAMILY.poppinsRegular,
  },
  primarySemiBold: {
    fontFamily: FONT_FAMILY.poppinsSemiBold,
  },
  primaryMedium: {
    fontFamily: FONT_FAMILY.poppinsMedium,
  },
  primaryBold: {
    fontFamily: FONT_FAMILY.poppinsBold,
  },
  secondary: {
    fontFamily: FONT_FAMILY.nunitoSansRegular,
  },
});

export const typography = StyleSheet.create({
  h1: {
    fontSize: rem(30),
    ...fontFamily.primaryBold,
    ...fontColor.textGray,
  },
  h2: {
    fontSize: rem(24),
    ...fontFamily.primaryMedium,
    ...fontColor.textGray,
  },
  h3: {
    fontSize: rem(21),
    ...fontFamily.primaryBold,
    ...fontColor.textGray,
  },
  h4: {
    fontSize: rem(18),
    ...fontFamily.primaryBold,
    ...fontColor.textGray,
  },
  h5: {
    fontSize: rem(16),
    ...fontFamily.primaryMedium,
    ...fontColor.textGray,
  },
  h6: {
    fontSize: rem(14),
    ...fontFamily.primaryMedium,
    ...fontColor.textGray,
  },
  h7: {
    fontSize: rem(8),
    ...fontFamily.primaryMedium,
    ...fontColor.textGray,
  },
  p1: {
    fontSize: rem(18),
    ...fontFamily.primary,
    ...fontColor.textGray,
  },
  p2: {
    fontSize: rem(16),
    lineHeight: 22,
    ...fontFamily.primary,
    ...fontColor.textGray,
  },
  p3: {
    fontSize: rem(14),
    ...fontFamily.primary,
    ...fontColor.textGray,
  },
  p4: {
    fontSize: rem(12),
    ...fontFamily.primary,
    ...fontColor.textGrayH2,
  },
  p5: {
    fontSize: rem(10),
    ...fontFamily.primary,
    ...fontColor.textGray,
  },
});
