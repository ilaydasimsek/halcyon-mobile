import { RouteProp, useRoute } from '@react-navigation/native';
import { TRootStackParamList } from '@navigation';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { BasicErrorView } from '@components/error';
import React from 'react';
import { scale } from '@style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useArticle } from '../article-query.ts';
import ArticleContentItem from '../lesson-article-screen/components/article-content-item.tsx';

export type TSingleArticleScreen = {
  articleId: string;
};

type TArticleDetailsScreenProps = RouteProp<
  TRootStackParamList,
  'SingleArticleScreen'
>;
const SingleArticleScreen = () => {
  const route = useRoute<TArticleDetailsScreenProps>();
  const { bottom } = useSafeAreaInsets();

  const { data, loading, error, refetch } = useArticle({
    id: route.params.articleId,
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

export default SingleArticleScreen;
