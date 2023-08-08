import { TextProps } from 'react-native';

export type TextStyleProp = Omit<TextProps, 'style'> & {
  textStyle?: TextProps['style'];
};
