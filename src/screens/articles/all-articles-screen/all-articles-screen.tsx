import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { colors } from '@style';
import { useArticles } from '../articles-query';
import ArticleListItem from './components/article-list-item.tsx';
import { BasicActivityIndicator } from '@components/helper-views';

const PAGE_SIZE = 6;

const AllArticlesScreen = () => {
  const { data, loading, fetchMore } = useArticles({ fetchFirst: PAGE_SIZE });

  const handleOnEndReached = () => {
    if (data?.articles.pageInfo?.hasNextPage) {
      return fetchMore({
        variables: {
          after: data?.articles.pageInfo?.endCursor,
          first: PAGE_SIZE,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.articles.edges}
        renderItem={(renderItemInfo) => (
          <ArticleListItem article={renderItemInfo.item.node} />
        )}
        keyExtractor={(item) => item.node.id}
        onEndReached={handleOnEndReached}
        ListFooterComponent={() =>
          loading ? <BasicActivityIndicator /> : <View />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.backgroundGray,
  },
});

export default AllArticlesScreen;
