import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { colors, typography, scale } from '@style';
import { useYogaLessons } from '../yoga-lessons-query';
import YogaLessonListItem from './components/yoga-lesson-list-item';

const YogaLessonsScreen = () => {
  const { data } = useYogaLessons({ fetchFirst: 4 });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.h5}>Lessons</Text>
        <Text style={typography.p4} onPress={() => {}}>
          View all
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.yogaLessons.edges.map(({ node: yogaLesson }) => (
          <YogaLessonListItem key={yogaLesson.id} {...yogaLesson} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.backgroundGray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: scale(16),
    marginHorizontal: scale(16),
    paddingTop: scale(8),
  },
});

export default YogaLessonsScreen;
