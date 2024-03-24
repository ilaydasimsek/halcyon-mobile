import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { colors, typography, scale } from '@style';
import { TextButton } from '@components/buttons';
import { useArticles } from '../articles-query';

const PAGE_SIZE = 1;

const YogaLessonsScreen = () => {
  const { data, loading, fetchMore } = useArticles({ fetchFirst: PAGE_SIZE });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.h5}>Articles</Text>
        <TextButton
          text={
            <Text style={typography.p4} onPress={() => {}}>
              View all
            </Text>
          }
        />
      </View>
      <TextButton
        text={<Text>Fetch More</Text>}
        onPress={() =>
          fetchMore({
            variables: {
              after: data?.articles.pageInfo?.endCursor,
              first: PAGE_SIZE + 1,
            },
          })
        }
        disabled={loading || !data?.articles.pageInfo?.hasNextPage}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.itemContainer}>
          {data?.articles.edges.map(({ node }) => (
            <View style={styles.item} key={node.id}>
              <Text>{`${node.id} ${node.title} ${node.isPinned}`}</Text>
            </View>
          ))}
        </View>
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
  item: {
    paddingVertical: scale(20),
  },
  itemContainer: {
    flexDirection: 'column',
    paddingHorizontal: scale(8),
  },
});

export default YogaLessonsScreen;
