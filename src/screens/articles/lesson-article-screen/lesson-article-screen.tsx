import { RouteProp, useRoute } from '@react-navigation/native';
import { TRootStackParamList } from '@navigation';
import {
  ActivityIndicator,
  NativeScrollEvent,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { BasicErrorView } from '@components/error';
import React from 'react';
import ArticleContentItem from './components/article-content-item.tsx';
import { scale } from '@style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useArticle } from '../article-query.ts';
import { useCompleteYogaLessonStepMutation } from '../../yoga-lessons/yoga-lessons-query.ts';
import { TYogaLessonArticleStep } from '../../yoga-lessons/model.ts';

export type TLessonArticleScreen = TYogaLessonArticleStep & {
  yogaLessonId: string;
};

type TArticleDetailsScreenProps = RouteProp<
  TRootStackParamList,
  'LessonArticleScreen'
>;

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const LessonArticleScreen = () => {
  const route = useRoute<TArticleDetailsScreenProps>();
  const { bottom } = useSafeAreaInsets();
  const [completeYogaLessonStep] = useCompleteYogaLessonStepMutation();

  const { data, loading, error, refetch } = useArticle({
    id: route.params.article.id,
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <BasicErrorView onRefresh={refetch} />;
  }
  const article = data!.article;

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingBottom: bottom }]}
      showsVerticalScrollIndicator={false}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          completeYogaLessonStep({
            variables: {
              id: route.params.yogaLessonId,
              stepId: route.params.id,
            },
          });
        }
      }}
    >
      {article.contentItems.map((contentItem, index) => (
        <ArticleContentItem key={index} contentItem={contentItem} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
  },
});

export default LessonArticleScreen;
