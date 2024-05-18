import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, scale, typography } from '@style';
import { AnimatedButton } from '@components/buttons';
import FastImage from 'react-native-fast-image';
import { icons } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { TActiveYogaLessonNode } from '../../../yoga/yoga-journey-query.ts';

type TStartedLessonListItem = {
  activeYogaLessonNode: TActiveYogaLessonNode;
};

const StartedLessonListItem: React.FC<TStartedLessonListItem> = ({
  activeYogaLessonNode,
}) => {
  const completedYogaLessonPercentage =
    (activeYogaLessonNode.completedLessonSteps.length /
      activeYogaLessonNode.yogaLesson.steps.length) *
    100;
  const navigation = useNavigation();
  return (
    <AnimatedButton
      onPress={() => {
        navigation.navigate('YogaLessonDetailsScreen', {
          yogaLessonId: activeYogaLessonNode.yogaLesson.id,
        });
      }}
    >
      <View style={styles.listItemContainer}>
        <View style={styles.header}>
          <Text style={[typography.h6, styles.text]}>
            {activeYogaLessonNode.yogaLesson.title}
          </Text>
          <FastImage
            source={icons.trackPlayerPlay}
            style={styles.startButton}
          />
        </View>
        <View style={styles.progress}>
          <View style={styles.stepsHeader}>
            <Text style={[typography.h7, styles.text]}>Steps</Text>
            <Text style={[typography.h7, styles.text]}>
              {activeYogaLessonNode.completedLessonSteps.length +
                '/' +
                activeYogaLessonNode.yogaLesson.steps.length}
            </Text>
          </View>
          <View
            style={[
              styles.completedSteps,
              {
                width: `${completedYogaLessonPercentage}%`,
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
    flexShrink: 1,
  },
  progress: {},
  stepsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(6),
  },

  completedSteps: {
    height: 8,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
});

export default StartedLessonListItem;
