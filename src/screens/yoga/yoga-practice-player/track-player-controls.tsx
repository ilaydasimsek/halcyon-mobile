import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontColor, scale, typography } from '@style';
import { State } from 'react-native-track-player';
import { IconButton } from '@components/buttons';
import { icons } from '@constants';
import { toTime } from '../../../common/utils/time.ts';
import Slider from '@react-native-community/slider';

type TTrackPlayerControls = {
  trackPlayerState: State;
  duration: number;
  currentProgress: number;
  hasNextTrack: boolean;
  hasPreviousTrack: boolean;
  onSkipToPrevious: () => void;
  onSkipToNext: () => void;
  onSkipToValue: (value: number) => void;
  onPlay: () => void;
  onPause: () => void;
};
const TrackPlayerControls = ({
  trackPlayerState,
  duration,
  currentProgress,
  onSkipToPrevious,
  onSkipToNext,
  onSkipToValue,
  onPlay,
  onPause,
  hasNextTrack,
  hasPreviousTrack,
}: TTrackPlayerControls) => {
  return (
    <View style={styles.trackPlayerContainer}>
      <View style={styles.trackPlayerButtons}>
        <IconButton
          image={icons.trackPlayerPrev}
          imageStyle={styles.trackPlayerButtonIcon}
          style={[
            styles.trackPlayerButton,
            !hasPreviousTrack && styles.hiddenIconButton,
          ]}
          onPress={() => onSkipToPrevious()}
        />
        <IconButton
          image={
            [State.Paused, State.Stopped].includes(trackPlayerState)
              ? icons.trackPlayerPlay
              : icons.trackPlayerPause
          }
          imageStyle={styles.trackPlayerPauseButtonIcon}
          style={styles.trackPlayerButton}
          onPress={() => {
            switch (trackPlayerState) {
              case State.Paused:
              case State.Ready:
              case State.Stopped:
                onPlay();
                break;
              case State.Playing:
                onPause();
                break;
              default:
                break;
            }
          }}
        />
        <IconButton
          image={icons.trackPlayerNext}
          imageStyle={styles.trackPlayerButtonIcon}
          style={[
            styles.trackPlayerButton,
            !hasNextTrack && styles.hiddenIconButton,
          ]}
          onPress={() => onSkipToNext()}
        />
      </View>
      <View style={styles.sliderContainer}>
        {duration > 0 && (
          <Text style={[styles.timerText, styles.durationText]}>
            {toTime(duration, 'colon')}
          </Text>
        )}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor={colors.darkPink}
          maximumTrackTintColor={colors.white}
          value={currentProgress}
          thumbImage={icons.thumb}
          tapToSeek={true}
          onSlidingComplete={(value) => onSkipToValue(value)}
        />
        {duration > 0 && (
          <Text style={styles.timerText}>
            {toTime(duration - currentProgress, 'colon')}
          </Text>
        )}
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
  hiddenIconButton: {
    opacity: 0,
  },
});

export default TrackPlayerControls;
