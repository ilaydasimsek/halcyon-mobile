import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { scale, colors, typography } from '@style';
import { AnimatedButton } from '@components/buttons';
import { TYogaLesson } from '../model';

type TYogaLessonListItem = {
  yogaLesson: TYogaLesson;
};

const YogaLessonListItem = ({ yogaLesson }: TYogaLessonListItem) => {
  return (
    <AnimatedButton onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <View style={styles.textContainer}>
              <Text style={typography.h6} numberOfLines={1}>
                {yogaLesson.title}
              </Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={[typography.p4]} numberOfLines={6}>
              {yogaLesson.description}
            </Text>
          </View>
        </View>
      </View>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(291),
    height: scale(211),
    backgroundColor: colors.white,
    marginLeft: scale(16),
    borderRadius: 10,
  },
  innerContainer: {
    backgroundColor: colors.lightPink,
    margin: scale(16),
    padding: scale(16),
    borderRadius: 10,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scale(6),
  },
  textContainer: {
    flex: 1,
  },
});

export default YogaLessonListItem;
