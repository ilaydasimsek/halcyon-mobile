import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { colors } from '@style';

type TLineHeight = Omit<ViewStyle, 'height'> & {
  lineHeight?: ViewStyle['height'];
};
type TSeparator = ViewProps & TLineHeight;

const Separator: React.FC<TSeparator> = ({ lineHeight = 2, ...props }) => {
  return (
    <View
      {...props}
      style={[props.style, styles.separator, { height: lineHeight }]}
    />
  );
};

const styles = StyleSheet.create({
  separator: { backgroundColor: colors.brightGray },
});

export default Separator;
