import { useState, useEffect } from 'react';
import { YogaPoseResponse } from '../../yoga-practice-query';
import TrackPlayer, {
  usePlaybackState,
  Event,
} from 'react-native-track-player';
import { useProgress } from 'react-native-track-player/lib/hooks';
import { setupPlayer, addTracks } from '../../../../common/utils/track-player';

export const useYogaPracticeTrack = (yogaPoses: YogaPoseResponse[]) => {
  const [currentPose, setCurrentPose] = useState(yogaPoses[0]);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const trackPlayerState = usePlaybackState();
  const { duration, position } = useProgress(20);
  const [hasNextTrack, setHasNextTrack] = useState(yogaPoses.length > 1);
  const [hasPreviousTrack, setHasPreviousTrack] = useState(false);

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

  useEffect(() => {
    TrackPlayer.addEventListener(Event.PlaybackTrackChanged, (event) => {
      if (event.nextTrack) {
        setCurrentPose(yogaPoses[event.nextTrack]);
        setHasNextTrack(event.nextTrack < yogaPoses.length - 1);
      }

      setHasPreviousTrack(event.nextTrack !== 0);
    });
    return () => {
      TrackPlayer.reset();
    };
  }, [yogaPoses]);

  return {
    isPlayerReady,
    currentPose,
    trackPlayerState,
    setCurrentPose,
    duration,
    position,
    hasNextTrack,
    hasPreviousTrack,
  };
};
