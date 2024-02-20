import React from 'react';
import { TYogaPracticeResponse } from '../../../yoga-practices/yoga-practice-query';
import { AnimatedButton } from '@components/buttons';
import { View, Text, StyleSheet } from 'react-native';
import { typography, colors, scale } from '@style';
import { toTime } from '../../../../../common/utils/time';
import { icons } from '@constants';
import FastImage from 'react-native-fast-image';

type TYogaPracticeListItem = {
  yogaPractice: TYogaPracticeResponse;
  completed: boolean;
  onPress: () => void;
};
const YogaPracticeListItem: React.FC<TYogaPracticeListItem> = ({
  yogaPractice,
  completed,
  onPress,
}) => {
  return (
    <AnimatedButton onPress={onPress}>
      <View style={styles.listItemContainer}>
        <View style={styles.listItemBody}>
          <Text style={[typography.h6, styles.title]} numberOfLines={1}>
            {yogaPractice.title}
          </Text>
          <Text style={typography.p4} numberOfLines={5}>
            {toTime(yogaPractice.duration)}
          </Text>
        </View>
        <FastImage
          source={
            completed ? icons.completedChallenge : icons.incompleteChallenge
          }
          style={styles.challengeStateIcon}
        />
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
    paddingHorizontal: scale(18),
    paddingVertical: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingBottom: scale(8),
  },
  listItemBody: {
    flex: 1,
    paddingRight: scale(14),
  },
  challengeStateIcon: {
    width: scale(28),
    height: scale(28),
  },
});
export default YogaPracticeListItem;
