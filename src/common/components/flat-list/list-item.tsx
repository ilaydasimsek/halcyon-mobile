import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { colors, scale, shadow } from '@style';

const ListItem: React.FC<ViewProps> = ({ children, style }) => {
  return <View style={[styles.item, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: scale(10),
    marginBottom: scale(9),
    ...shadow.default,
  },
});

export default ListItem;
