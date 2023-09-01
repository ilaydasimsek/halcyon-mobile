import { useState, useEffect } from 'react';
import { YogaPoseResponse } from '../../yoga-practice-query';
import TrackPlayer, {
  usePlaybackState,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { useProgress } from 'react-native-track-player/lib/hooks';
import { setupPlayer, addTracks } from '../../../../common/utils/track-player';

export const useYogaPracticeTrack = (yogaPoses: YogaPoseResponse[]) => {
  const [currentPose, setCurrentPose] = useState(yogaPoses[0]);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const trackPlayerState = usePlaybackState();
  const { duration, position } = useProgress(20);
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
    duration,
    position,
  };
};
