import React from 'react';
import { TYogaPracticeResponse } from '../../../yoga-practices/yoga-practice-query';
import { useNavigation } from '@react-navigation/native';
import { AnimatedButton } from '@components/buttons';
import { View, Text, StyleSheet } from 'react-native';
import { typography, colors, scale } from '@style';
import { toTime } from '../../../../../common/utils/time';

type TYogaPracticeListItem = {
  yogaPractice: TYogaPracticeResponse;
};
const YogaPracticeListItem: React.FC<TYogaPracticeListItem> = ({
  yogaPractice,
}) => {
  const navigation = useNavigation();
  return (
    <AnimatedButton
      onPress={() =>
        navigation.navigate('YogaPracticeDetailsScreen', {
          yogaPracticeId: yogaPractice.id,
        })
      }
    >
      <View style={styles.listItemContainer}>
        <View style={styles.listItemBody}>
          <Text style={[typography.h6, styles.title]} numberOfLines={1}>
            {yogaPractice.title}
          </Text>
          <Text style={typography.p4} numberOfLines={5}>
            {toTime(yogaPractice.duration)}
          </Text>
        </View>
      </View>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: colors.white,
    borderRadius: scale(10),
    marginVertical: scale(4),
    marginBottom: scale(12),
    padding: scale(12),
    flexDirection: 'row',
  },
  title: {
    paddingBottom: scale(8),
  },
  listItemBody: {
    flex: 1,
    paddingRight: scale(14),
  },
});
export default YogaPracticeListItem;
