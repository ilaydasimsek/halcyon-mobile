import React, { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { TRootStackParamList } from '@navigation';
import { colors, scale, typography } from '@style';
import { BasicErrorView } from '@components/error';
import {
  useStartYogaLessonMutation,
  useYogaLesson,
} from '../yoga-lessons-query';
import FastImage from 'react-native-fast-image';
import { images } from '@constants';
import ArticleListItem from './components/article-list-item';
import PracticeListItem from './components/practice-list-item';

export type TYogaLessonDetailsScreen = {
  yogaLessonId: string;
};

type TYogaLessonDetailsScreenProps = RouteProp<
  TRootStackParamList,
  'YogaLessonDetailsScreen'
>;

const YogaChallengeDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<TYogaLessonDetailsScreenProps>();

  const { data, loading, error, refetch } = useYogaLesson({
    id: route.params.yogaLessonId,
  });
  const [startYogaLessonMutation] = useStartYogaLessonMutation();

  const startYogaLessonIfNeeded = useCallback(() => {
    if (data?.yogaLesson && !data.yogaLesson.activeYogaLesson) {
      startYogaLessonMutation({
        variables: {
          id: data.yogaLesson.id,
        },
      });
    }
  }, [data, startYogaLessonMutation]);

  useFocusEffect(() => {
    refetch();
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <BasicErrorView onRefresh={() => refetch()} />;
  }

  const yogaLesson = data!.yogaLesson;
  const completedArticleSteps =
    yogaLesson.activeYogaLesson?.completedLessonSteps
      .filter((step) => step.__typename === 'YogaLessonArticleStepNode')
      .map((step) => step.id);
  const completedPracticeSteps =
    yogaLesson.activeYogaLesson?.completedLessonSteps
      .filter((step) => step.__typename === 'YogaLessonPracticeStepNode')
      .map((step) => step.id);

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.imageView}
        source={
          yogaLesson.coverImageUrl
            ? { uri: yogaLesson.coverImageUrl }
            : images.backupImage1
        }
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={[typography.h2, styles.header]}>{yogaLesson.title}</Text>
      <Text style={[typography.p4, styles.body]}>{yogaLesson.description}</Text>
      {yogaLesson.steps.map((step) => {
        switch (step.__typename) {
          case 'YogaLessonArticleStepNode':
            return (
              <ArticleListItem
                key={step.id}
                lessonStep={step}
                completed={completedArticleSteps?.includes(step.id) ?? false}
                onPress={() => {
                  startYogaLessonIfNeeded();
                  navigation.navigate('LessonArticleScreen', {
                    ...step,
                    yogaLessonId: yogaLesson.id,
                  });
                }}
              />
            );
          case 'YogaLessonPracticeStepNode':
            return (
              <PracticeListItem
                key={step.id}
                lessonStep={step}
                completed={completedPracticeSteps?.includes(step.id) ?? false}
                onPress={() => {
                  startYogaLessonIfNeeded();
                  navigation.navigate('YogaLessonPracticeScreen', {
                    ...step,
                    yogaLessonId: yogaLesson.id,
                  });
                }}
              />
            );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
    padding: scale(14),
  },
  imageView: {
    height: scale(220),
    marginHorizontal: scale(21),
    marginVertical: scale(16),
    borderRadius: 10,
  },
  header: {
    paddingBottom: scale(16),
  },
  body: {
    paddingBottom: scale(18),
  },
});

export default YogaChallengeDetailsScreen;
