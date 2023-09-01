import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, typography, scale } from '@style';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TRootStackParamList } from '@navigation';
import { toTime } from '../../../common/utils/time';
import FastImage from 'react-native-fast-image';
import TrackPlayerControls from './components/track-player-controls';
import { useYogaPracticeTrack } from './hooks/use-yoga-practice-track';

type TYogaPracticeScreenProps = RouteProp<
  TRootStackParamList,
  'YogaPracticeScreen'
>;

const YogaPracticeScreen = () => {
  const route = useRoute<TYogaPracticeScreenProps>();
  const yogaPractice = route.params.yogaPractice;
  const { currentPose, trackPlayerState, duration, position } =
    useYogaPracticeTrack(yogaPractice.yogaPoses);
  return (
    <View style={styles.container}>
      <Text style={[typography.h2, styles.header]}>{yogaPractice.title}</Text>
      <Text style={[typography.p4, styles.subHeader]}>
        {toTime(yogaPractice.duration)}
      </Text>
      <View style={styles.yogaPose}>
        <FastImage
          style={styles.imageView}
          source={{ uri: currentPose.imageUrl }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.trackPlayerControls}>
          <TrackPlayerControls
            trackPlayerState={trackPlayerState}
            duration={duration}
            currentProgress={position}
          />
        </View>
      </View>
      <Text style={typography.h5}>{currentPose.name}</Text>
      <Text style={typography.p4}>{currentPose.sanskritName}</Text>
      <Text style={typography.p4}>{currentPose.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(30),
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    textAlign: 'center',
    paddingTop: scale(12),
  },
  subHeader: {
    textAlign: 'center',
  },
  yogaPose: {
    backgroundColor: colors.lightPink,
    aspectRatio: 6 / 7,
    borderRadius: 10,
    marginTop: scale(12),
  },
  imageView: {
    aspectRatio: 1,
  },
  trackPlayerControls: {
    marginTop: -scale(60),
  },
});

export default YogaPracticeScreen;
