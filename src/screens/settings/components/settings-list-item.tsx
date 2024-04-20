import React from 'react';
import { AnimatedButton } from '@components/buttons';
import { StyleSheet, Text, View } from 'react-native';
import { colors, scale, typography } from '@style';

type TSettingsListItem = {
  title: string;
  onPress: () => void;
};

const SettingsListItem: React.FC<TSettingsListItem> = ({ title, onPress }) => {
  return (
    <AnimatedButton onPress={onPress}>
      <View style={styles.listItemContainer}>
        <Text style={typography.h6} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: colors.white,
    borderRadius: scale(10),
    marginBottom: scale(6),
    paddingHorizontal: scale(18),
    paddingVertical: scale(12),
    width: '100%',
  },
});
export default SettingsListItem;
