import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { colors, typography, scale } from '@style';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { TRootStackParamList, TStackNavigation } from '@navigation';
import { toTime } from '../../../../common/utils/time';
import FastImage from 'react-native-fast-image';
import TrackPlayerControls from './components/track-player-controls';
import { useYogaPracticeTrack } from './hooks/use-yoga-practice-track';
import TrackPlayer from 'react-native-track-player';
import { useCompleteYogaPracticeMutation } from '../yoga-practice-query';
import { useCompleteYogaChallengePracticeMutation } from '../../yoga-challenges/yoga-challenge-query';

type TYogaPracticeScreenProps = RouteProp<
  TRootStackParamList,
  'YogaPracticeScreen'
>;

const YogaPracticeScreen = () => {
  const route = useRoute<TYogaPracticeScreenProps>();
  const navigation = useNavigation<TStackNavigation>();
  const yogaPractice = route.params.yogaPractice;
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
  const [completeYogaPracticeMutation] = useCompleteYogaPracticeMutation();
  const [completeYogaChallengePracticeMutation] =
    useCompleteYogaChallengePracticeMutation();

  useEffect(() => {
    if (isPlayerReady) {
      TrackPlayer.play();
    }
  }, [isPlayerReady]);

  useEffect(() => {
    if (queueEnded) {
      if (route.params.challengeId) {
        completeYogaChallengePracticeMutation({
          variables: {
            challengeId: parseInt(route.params.challengeId, 10),
            practiceId: parseInt(yogaPractice.id, 10),
          },
        });
      } else {
        completeYogaPracticeMutation({
          variables: { id: parseInt(yogaPractice.id, 10) },
        });
      }
      navigation.replace('PracticeCompletionScreen');
    }
  }, [
    completeYogaChallengePracticeMutation,
    completeYogaPracticeMutation,
    navigation,
    queueEnded,
    route.params.challengeId,
    yogaPractice.id,
  ]);

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

export default YogaPracticeScreen;
