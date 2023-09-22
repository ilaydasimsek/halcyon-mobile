import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, scale, typography } from '@style';
import { AnimatedButton } from '@components/buttons';
import { TActiveYogaChallengeNode } from '../../yoga-journey-query';
import FastImage from 'react-native-fast-image';
import { icons } from '@constants';

type TAllPracticesListItem = {
  activeYogaChallengeNode: TActiveYogaChallengeNode;
};

const StartedChallengeListItem: React.FC<TAllPracticesListItem> = ({
  activeYogaChallengeNode,
}) => {
  const completedYogaPracticePercentage =
    (activeYogaChallengeNode.completedYogaPractices.length /
      activeYogaChallengeNode.yogaChallenge.practices.length) *
    100;
  return (
    <AnimatedButton onPress={() => {}}>
      <View style={styles.listItemContainer}>
        <View style={styles.header}>
          <View>
            <Text style={[typography.h6, styles.text]}>
              {activeYogaChallengeNode.yogaChallenge.title}
            </Text>
          </View>
          <FastImage
            source={icons.trackPlayerPlay}
            style={styles.startButton}
          />
        </View>
        <View style={styles.progress}>
          <View style={styles.daysHeader}>
            <Text style={[typography.h7, styles.text]}>Days</Text>
            <Text style={[typography.h7, styles.text]}>
              {activeYogaChallengeNode.completedYogaPractices.length +
                '/' +
                activeYogaChallengeNode.yogaChallenge.practices.length}
            </Text>
          </View>
          <View
            style={[
              styles.completedDays,
              {
                width: completedYogaPracticePercentage + '%',
              },
            ]}
          />
        </View>
      </View>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: colors.darkPink,
    width: scale(240),
    height: scale(140),
    borderRadius: scale(10),
    marginVertical: scale(4),
    marginBottom: scale(12),
    marginHorizontal: scale(16),
    padding: scale(12),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  startButton: {
    height: scale(24),
    aspectRatio: 1,
  },
  text: {
    color: colors.white,
  },
  progress: {},
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(6),
  },

  completedDays: {
    height: 8,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
});

export default StartedChallengeListItem;
