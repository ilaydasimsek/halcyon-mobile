import { TYogaChallengeResponse } from '../yoga-practice-query';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '@constants';
import { typography, scale, colors } from '@style';
import React from 'react';

type TYogaChallengeListItem = {
  yogaChallenge: TYogaChallengeResponse;
};

const YogaChallengeListItem = ({ yogaChallenge }: TYogaChallengeListItem) => {
  return (
    <View style={styles.yogaChallengeItem}>
      <View style={styles.yogaChallengeInnerItem}>
        <View style={styles.yogaChallengeItemHeader}>
          <FastImage
            style={styles.imageView}
            source={
              yogaChallenge.coverImageUrl
                ? { uri: yogaChallenge.coverImageUrl }
                : images.backupImage1
            }
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.textContainer}>
            <Text style={typography.h6} numberOfLines={1}>
              {yogaChallenge.title}
            </Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={[typography.p4]} numberOfLines={6}>
            {yogaChallenge.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  yogaChallengeItem: {
    width: scale(291),
    height: scale(211),
    backgroundColor: colors.white,
    marginLeft: scale(16),
    borderRadius: 10,
  },

  yogaChallengeInnerItem: {
    backgroundColor: colors.lightPink,
    margin: scale(16),
    padding: scale(16),
    borderRadius: 10,
    flex: 1,
  },
  imageView: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundGray,
    marginRight: 12,
  },
  yogaChallengeItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scale(6),
  },
  textContainer: {
    flex: 1,
  },
});

export default YogaChallengeListItem;
