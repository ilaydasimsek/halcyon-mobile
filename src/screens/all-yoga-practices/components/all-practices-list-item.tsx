import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography, colors, scale } from '@style';
import FastImage from 'react-native-fast-image';
import { images } from '@constants';
import { TYogaPracticeResponse } from '../../yoga-practices/yoga-practice-query';

type TAllPracticesListItem = {
  yogaPractice: TYogaPracticeResponse;
};

const AllPracticesListItem: React.FC<TAllPracticesListItem> = ({
  yogaPractice,
}) => {
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemBody}>
        <Text style={[typography.h6, styles.title]} numberOfLines={1}>
          {yogaPractice.title}
        </Text>
        <Text style={typography.p4} numberOfLines={5}>
          {yogaPractice.description}
        </Text>
      </View>
      <FastImage
        style={styles.imageView}
        source={
          yogaPractice.coverImageUrl
            ? { uri: yogaPractice.coverImageUrl }
            : images.backupImage1
        }
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: colors.white,
    borderRadius: scale(10),
    marginVertical: scale(4),
    marginBottom: scale(12),
    marginHorizontal: scale(16),
    padding: scale(12),
    flexDirection: 'row',
  },
  imageView: {
    width: scale(160),
    borderRadius: 20,
    backgroundColor: colors.backgroundGray,
  },
  title: {
    paddingBottom: scale(8),
  },
  listItemBody: {
    flex: 1,
    paddingRight: scale(14),
  },
});

export default AllPracticesListItem;
