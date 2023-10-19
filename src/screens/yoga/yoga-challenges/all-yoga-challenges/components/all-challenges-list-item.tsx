import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography, colors, scale } from '@style';
import FastImage from 'react-native-fast-image';
import { images } from '@constants';
import { AnimatedButton } from '@components/buttons';
import { useNavigation } from '@react-navigation/native';
import { TYogaChallengeResponse } from '../../yoga-challenge-query';

type TAllPracticesListItem = {
  yogaChallenge: TYogaChallengeResponse;
};

const AllChallengesListItem: React.FC<TAllPracticesListItem> = ({
  yogaChallenge,
}) => {
  const navigation = useNavigation();
  return (
    <AnimatedButton
      onPress={() =>
        navigation.navigate('YogaChallengeDetailsScreen', {
          yogaChallengeId: yogaChallenge.id,
        })
      }
    >
      <View style={styles.listItemContainer}>
        <View style={styles.listItemBody}>
          <Text style={[typography.h6, styles.title]} numberOfLines={2}>
            {yogaChallenge.title}
          </Text>
          <Text style={typography.p4}>
            {yogaChallenge.practices.length + ' Days'}
          </Text>
        </View>
        <FastImage
          style={styles.imageView}
          source={
            yogaChallenge.coverImageUrl
              ? { uri: yogaChallenge.coverImageUrl }
              : images.backupImage1
          }
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </AnimatedButton>
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
    height: scale(98),
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

export default AllChallengesListItem;
