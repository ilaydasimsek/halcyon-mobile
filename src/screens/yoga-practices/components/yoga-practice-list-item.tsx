import React from 'react';
import { TYogaPracticeResponse } from '../yoga-practice-query';
import { View, Text, StyleSheet } from 'react-native';
import { typography, colors } from '@style';
import FastImage from 'react-native-fast-image';
import { images } from '@constants';
import { toTime } from '../../../common/utils/time';

type TYogaPracticeListItem = {
  yogaPractice: TYogaPracticeResponse;
};

const YogaPracticeListItem: React.FC<TYogaPracticeListItem> = ({
  yogaPractice,
}) => {
  return (
    <View style={styles.listItemContainer}>
      <FastImage
        style={styles.imageView}
        source={
          yogaPractice.coverImageUrl
            ? { uri: yogaPractice.coverImageUrl }
            : images.backupImage1
        }
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.listItemBody}>
        <Text style={typography.h6}>{yogaPractice.title}</Text>
        <View style={styles.listItemDetails}>
          <Text style={[typography.p4, styles.listItemTitle]}>Hatha Yoga</Text>
          <Text style={[typography.p4, styles.listItemTitle]}>
            {toTime(yogaPractice.duration)}
          </Text>
        </View>
      </View>
    </View>
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
  imageView: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundGray,
    marginRight: 12,
  },
  listItemTitle: {
    color: colors.textGrayH2,
  },
  listItemBody: {
    flex: 1,
    justifyContent: 'space-between',
  },
  listItemDetails: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default YogaPracticeListItem;
