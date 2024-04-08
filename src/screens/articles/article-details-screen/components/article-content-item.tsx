import { TArticleContentItem } from 'src/screens/articles/model.ts';
import { Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale, typography, fontFamily } from '@style';
import React from 'react';
import { FastImageWithAutoHeight } from '@components/helper-views';

type TArticleContentItemProp = {
  contentItem: TArticleContentItem;
};

const ArticleContentItem = ({ contentItem }: TArticleContentItemProp) => {
  switch (contentItem.__typename) {
    case 'ArticleTextContentItemNode':
      return (
        <Text
          style={[styles.textContentItem, typography.p2, fontFamily.secondary]}
        >
          {contentItem.content}
        </Text>
      );
    case 'ArticleImageContentItemNode':
      return (
        <FastImageWithAutoHeight
          style={styles.imageContentItem}
          source={{ uri: contentItem.imageUrl }}
          resizeMode={FastImage.resizeMode.cover}
        />
      );
  }
};

const styles = StyleSheet.create({
  textContentItem: {
    marginBottom: scale(20),
    textAlign: 'justify',
  },
  imageContentItem: {
    width: '100%',
    height: undefined,
    marginBottom: scale(20),
  },
});
export default ArticleContentItem;
