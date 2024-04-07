import { RouteProp, useRoute } from '@react-navigation/native';
import { TRootStackParamList } from '@navigation';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { BasicErrorView } from '@components/error';
import React from 'react';
import { useArticle } from '../article-query';
import FastImage from 'react-native-fast-image';
import { scale } from '@style';
import { TArticleContentItem } from '../model';

export type TArticleDetailsScreen = {
  articleId: string;
};

type TArticleDetailsScreenProps = RouteProp<
  TRootStackParamList,
  'ArticleDetailsScreen'
>;

const ArticleDetailsScreen = () => {
  const route = useRoute<TArticleDetailsScreenProps>();

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
    <View>
      <Text>Title: {article.title}</Text>
      <Text>Pinned? {article.isPinned ? 'YES' : 'NO'}</Text>
      <ScrollView>
        {article.contentItems.map((contentItem, index) => (
          <View key={index} style={{ padding: scale(12) }}>
            <ArticleContentItem contentItem={contentItem} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
type TArticleContentItemProp = {
  contentItem: TArticleContentItem;
};

const ArticleContentItem = ({ contentItem }: TArticleContentItemProp) => {
  switch (contentItem.__typename) {
    case 'ArticleTextContentItemNode':
      return <Text>{contentItem.content}</Text>;
    case 'ArticleImageContentItemNode':
      return (
        <FastImage
          style={{ height: scale(300) }}
          source={{ uri: contentItem.imageUrl }}
          resizeMode={FastImage.resizeMode.cover}
        />
      );
  }
};

export default ArticleDetailsScreen;
