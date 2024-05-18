import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, scale, typography } from '@style';
import FastImage from 'react-native-fast-image';
import TrackPlayer from 'react-native-track-player';
import { TYogaPracticeResponse } from '../yoga-practices/yoga-practice-query.ts';
import { useYogaPracticeTrack } from '../yoga-practices/yoga-practice/hooks/use-yoga-practice-track.ts';
import TrackPlayerControls from './track-player-controls.tsx';
import { toTime } from '../../../common/utils/time.ts';

type TYogaPracticePlayer = {
  yogaPractice: TYogaPracticeResponse;
  onQueueEnded: () => void;
};
const YogaPracticePlayer: React.FC<TYogaPracticePlayer> = ({
  yogaPractice,
  onQueueEnded,
}) => {
  const {
    isPlayerReady,
    hasNextTrack,
    hasPreviousTrack,
    currentPose,
    trackPlayerState,
    duration,
    position,
    queueEnded,
  } = useYogaPracticeTrack(yogaPractice.yogaPoses);

  useEffect(() => {
    if (isPlayerReady) {
      TrackPlayer.play();
    }
  }, [isPlayerReady]);

  useEffect(() => {
    if (queueEnded) {
      onQueueEnded();
    }
  }, [onQueueEnded, queueEnded]);

  if (!isPlayerReady) {
    return <ActivityIndicator />;
  }
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
            onSkipToPrevious={() => TrackPlayer.skipToPrevious()}
            onSkipToNext={() => TrackPlayer.skipToNext()}
            onSkipToValue={(value) => TrackPlayer.seekTo(value)}
            onPause={() => TrackPlayer.pause()}
            onPlay={() => TrackPlayer.play()}
            hasNextTrack={hasNextTrack}
            hasPreviousTrack={hasPreviousTrack}
          />
        </View>
      </View>
      <View style={styles.poseHeader}>
        <Text style={typography.h5}>{currentPose.name}</Text>
        <Text style={typography.p4}>{currentPose.sanskritName}</Text>
      </View>
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
  poseHeader: {
    paddingVertical: scale(14),
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

export default YogaPracticePlayer;
