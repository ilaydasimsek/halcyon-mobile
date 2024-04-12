import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, scale, typography } from '@style';
import { useYogaLessons } from '../yoga-lessons-query';
import YogaLessonListItem from './components/yoga-lesson-list-item';
import { useArticles } from '../../articles/articles-query.ts';
import { BasicActivityIndicator } from '@components/helper-views';
import ArticleListItem from './components/article-list-item.tsx';
import { useNavigation } from '@react-navigation/native';

const YogaLessonsScreen = () => {
  const { data, loading } = useYogaLessons({ fetchFirst: 4 });
  const { data: articleData, loading: articlesLoading } = useArticles({
    fetchFirst: 4,
  });
  const navigation = useNavigation();

  if (loading || articlesLoading) {
    return <BasicActivityIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.header}>
        <Text style={typography.h5}>Articles</Text>
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
    paddingTop: scale(8),
  },
});

export default YogaLessonsScreen;
