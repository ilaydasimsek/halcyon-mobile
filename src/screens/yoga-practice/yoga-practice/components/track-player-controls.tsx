import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { scale, colors, typography, fontColor } from '@style';
import TrackPlayer, { State } from 'react-native-track-player';
import { IconButton } from '@components/buttons';
import { icons } from '@constants';
import { toTime } from '../../../../common/utils/time';
import Slider from '@react-native-community/slider';

type TTrackPlayerControls = {
  trackPlayerState: State;
  duration: number;
  currentProgress: number;
};
const TrackPlayerControls = ({
  trackPlayerState,
  duration,
  currentProgress,
}: TTrackPlayerControls) => {
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
            trackPlayerState === State.Playing
              ? icons.trackPlayerPause
              : icons.trackPlayerPlay
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
      <View style={styles.sliderContainer}>
        <Text style={[styles.timerText, styles.durationText]}>
          {toTime(duration, 'colon')}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor={colors.darkPink}
          maximumTrackTintColor={colors.white}
          value={currentProgress}
          thumbImage={icons.thumb}
        />
        <Text style={styles.timerText}>
          {toTime(duration - currentProgress, 'colon')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    marginHorizontal: scale(8),
    flex: 4,
  },
  timerText: {
    ...typography.h6,
    ...fontColor.textGrayH2,
    flex: 1,
  },
  durationText: {
    textAlign: 'right',
  },
});

export default TrackPlayerControls;
