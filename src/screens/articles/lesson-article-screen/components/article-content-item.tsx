import { TArticleContentItem } from 'src/screens/articles/model.ts';
import { StyleSheet, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { fontFamily, scale, typography } from '@style';
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
    case 'ArticleHeaderContentItemNode':
      return (
        <Text style={[styles.header, typography.h3]}>{contentItem.title}</Text>
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
  header: {
    paddingVertical: scale(18),
  },
});
export default ArticleContentItem;
