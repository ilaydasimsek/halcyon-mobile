import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TRootStackParamList, TStackNavigation } from '@navigation';
import { useCompleteYogaPracticeMutation } from '../yoga-practice-query';
import { useCompleteYogaChallengePracticeMutation } from '../../yoga-challenges/yoga-challenge-query';
import YogaPracticePlayer from '../../yoga-practice-player/yoga-practice-player.tsx';

type TYogaPracticeScreenProps = RouteProp<
  TRootStackParamList,
  'YogaPracticeScreen'
>;

const YogaPracticeScreen = () => {
  const route = useRoute<TYogaPracticeScreenProps>();
  const navigation = useNavigation<TStackNavigation>();
  const yogaPractice = route.params.yogaPractice;
  const [completeYogaPracticeMutation] = useCompleteYogaPracticeMutation();
  const [completeYogaChallengePracticeMutation] =
    useCompleteYogaChallengePracticeMutation();

  return (
    <YogaPracticePlayer
      yogaPractice={yogaPractice}
      onQueueEnded={() => {
        if (route.params.challengeId) {
          completeYogaChallengePracticeMutation({
            variables: {
              challengeId: route.params.challengeId,
              practiceId: yogaPractice.id,
            },
          });
        } else {
          completeYogaPracticeMutation({
            variables: { id: yogaPractice.id },
          });
        }
        navigation.replace('PracticeCompletionScreen');
      }}
    />
  );
};

export default YogaPracticeScreen;
