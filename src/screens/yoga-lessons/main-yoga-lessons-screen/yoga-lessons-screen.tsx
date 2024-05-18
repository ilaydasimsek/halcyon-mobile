import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, scale, typography } from '@style';
import { useYogaLessons } from '../yoga-lessons-query';
import YogaLessonListItem from './components/yoga-lesson-list-item';
import { useArticles } from '../../articles/articles-query.ts';
import { BasicActivityIndicator } from '@components/helper-views';
import ArticleListItem from './components/article-list-item.tsx';
import { useNavigation } from '@react-navigation/native';
import { useYogaJourney } from '../../yoga/yoga-journey-query.ts';
import StartedLessonListItem from './components/started-lesson-list-item.tsx';
import { BasicErrorView } from '@components/error';

const YogaLessonsScreen = () => {
  const { data, loading, error, refetch } = useYogaLessons({ fetchFirst: 4 });
  const { data: articleData, loading: articlesLoading } = useArticles({
    fetchFirst: 4,
  });
  const {
    data: yogaJourneyData,
    loading: journeyLoading,
    error: journeyError,
    refetch: refetchJourney,
  } = useYogaJourney();
  const navigation = useNavigation();

  if (loading || articlesLoading || journeyLoading) {
    return <BasicActivityIndicator />;
  }

  if (error || journeyError) {
    return (
      <BasicErrorView
        onRefresh={() => {
          refetch();
          refetchJourney();
        }}
      />
    );
  }

  const activeYogaLessons =
    yogaJourneyData!.journey.activeYogaLessons.edges ?? [];

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header]}>
        <Text style={typography.h6}>In Progress</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {activeYogaLessons.map(({ node }) => (
          <StartedLessonListItem
            key={node.yogaLesson.id}
            activeYogaLessonNode={node}
          />
        ))}
      </ScrollView>
      <View style={styles.header}>
        <Text style={typography.h6}>Lessons</Text>
        <Text style={typography.p4}>View all</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.yogaLessons.edges.map(({ node: yogaLesson }) => (
          <YogaLessonListItem key={yogaLesson.id} {...yogaLesson} />
        ))}
      </ScrollView>
      <View style={styles.header}>
        <Text style={typography.h6}>Articles</Text>
        <Text
          style={typography.p4}
          onPress={() => {
            navigation.navigate('AllArticlesScreen');
          }}
        >
          View all
        </Text>
      </View>
      {articleData?.articles.edges.map(({ node }) => (
        <ArticleListItem key={node.id} article={node} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: scale(16),
    marginHorizontal: scale(16),
    paddingTop: scale(18),
  },
});

export default YogaLessonsScreen;
