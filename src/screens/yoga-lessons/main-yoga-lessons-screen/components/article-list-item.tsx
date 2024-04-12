import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography, colors } from '@style';
import { AnimatedButton } from '@components/buttons';
import { useNavigation } from '@react-navigation/native';
import { TArticle } from '../../../articles/model.ts';

type TArticleListItem = {
  article: TArticle;
};

const ArticleListItem: React.FC<TArticleListItem> = ({ article }) => {
  const navigation = useNavigation();
  return (
    <AnimatedButton
      onPress={() =>
        navigation.navigate('YogaPracticeDetailsScreen', {
          yogaPracticeId: article.id,
        })
      }
    >
      <View style={styles.listItemContainer}>
        <View style={styles.listItemBody}>
          <Text style={typography.h6}>{article.title}</Text>
        </View>
      </View>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: 12,
    padding: 12,
    flexDirection: 'row',
  },
  listItemBody: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default ArticleListItem;
