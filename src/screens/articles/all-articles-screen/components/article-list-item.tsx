import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '@style';
import { AnimatedButton } from '@components/buttons';
import { useNavigation } from '@react-navigation/native';
import { TArticle } from '../../model.ts';

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
    padding: 24,
    flexDirection: 'row',
  },
  listItemBody: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default ArticleListItem;
