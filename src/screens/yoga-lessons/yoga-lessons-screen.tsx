import React from 'react';
import { StyleSheet, ScrollView, View, Text, Button } from 'react-native';

import { colors, typography, scale } from '@style';
import { useYogaLessons } from './yoga-lessons-query';
import YogaLessonListItem from './components/yoga-lesson-list-item';
import { TextButton } from '@components/buttons';
import { useLogoutMutation } from '../auth/auth-query';

const YogaLessonsScreen = () => {
  const { data } = useYogaLessons({ fetchFirst: 4 });
  const { logout } = useLogoutMutation();
  return (
    <View style={styles.container}>
      <Button title={'Logout'} onPress={() => logout()} />
      <View style={styles.header}>
        <Text style={typography.h5}>Lessons</Text>
        <TextButton
          text={
            <Text style={typography.p4} onPress={() => {}}>
              View all
            </Text>
          }
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.yogaLessons.edges.map(({ node }) => (
          <YogaLessonListItem yogaLesson={node} />
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
