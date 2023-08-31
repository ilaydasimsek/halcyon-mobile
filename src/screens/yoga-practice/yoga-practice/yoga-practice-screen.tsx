import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, typography, scale } from '@style';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TRootStackParamList } from '@navigation';
import { toTime } from '../../../common/utils/time';
import FastImage from 'react-native-fast-image';
import { IconButton } from '@components/buttons';
import { icons } from '@constants';
import { YogaPoseResponse } from '../yoga-practice-query';
import { setupPlayer, addTracks } from '../../../common/utils/track-player';
import TrackPlayer, {
  usePlaybackState,
  State,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';

type TYogaPracticeScreenProps = RouteProp<
  TRootStackParamList,
  'YogaPracticeScreen'
>;

type TTrackPlayerControls = {
  trackPlayerState: State;
};
const TrackPlayerControls = ({ trackPlayerState }: TTrackPlayerControls) => {
  return (
    <View style={styles.trackPlayerContainer}>
      <View style={styles.trackPlayerButtons}>
        <IconButton
          image={icons.trackPlayerPrev}
          imageStyle={styles.trackPlayerButtonIcon}
          style={styles.trackPlayerButton}
          onPress={() => TrackPlayer.skipToPrevious()}
        />
        <IconButton
          image={
            trackPlayerState === State.Paused
              ? icons.trackPlayerPlay
              : icons.trackPlayerPause
          }
          imageStyle={styles.trackPlayerPauseButtonIcon}
          style={styles.trackPlayerButton}
          onPress={() => {
            switch (trackPlayerState) {
              case State.Paused:
              case State.Ready:
                TrackPlayer.play();
                break;
              case State.Playing:
                TrackPlayer.pause();
                break;
              default:
                break;
            }
          }}
        />
        <IconButton
          image={icons.trackPlayerNext}
          imageStyle={styles.trackPlayerButtonIcon}
          style={styles.trackPlayerButton}
          onPress={() => TrackPlayer.skipToNext()}
        />
      </View>
    </View>
  );
};

const useYogaPracticeTrack = (yogaPoses: YogaPoseResponse[]) => {
  const [currentPose, setCurrentPose] = useState(yogaPoses[0]);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const trackPlayerState = usePlaybackState();
  const events = [Event.PlaybackTrackChanged];
  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks(yogaPoses.map((pose) => pose.audioUrl));
      }

      setIsPlayerReady(isSetup);
    }

    if (yogaPoses) {
      setup();
    }
  }, [yogaPoses]);

  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackTrackChanged) {
      if (event.nextTrack) {
        setCurrentPose(yogaPoses[event.nextTrack]);
      }
    }
  });

  return {
    isPlayerReady,
    currentPose,
    trackPlayerState,
    setCurrentPose,
  };
};

const YogaPracticeScreen = () => {
  const route = useRoute<TYogaPracticeScreenProps>();
  const yogaPractice = route.params.yogaPractice;
  const { currentPose, trackPlayerState } = useYogaPracticeTrack(
    yogaPractice.yogaPoses,
  );
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
        <TrackPlayerControls trackPlayerState={trackPlayerState} />
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
  trackPlayerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackPlayerButtonIcon: {
    width: scale(25),
    height: scale(18),
  },
  trackPlayerPauseButtonIcon: {
    width: scale(50),
    height: scale(50),
  },
  trackPlayerButton: {
    paddingHorizontal: scale(12),
  },
  trackPlayerContainer: {},
});

export default YogaPracticeScreen;
