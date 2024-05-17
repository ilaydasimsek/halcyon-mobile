import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TRootStackParamList, TStackNavigation } from '@navigation';
import YogaPracticePlayer from '../../yoga/yoga-practice-player/yoga-practice-player.tsx';
import { useYogaPractice } from '../../yoga/yoga-practices/yoga-practice-query.ts';
import { ActivityIndicator } from 'react-native';
import { BasicErrorView } from '@components/error';
import { TYogaLessonPracticeStep } from '../model.ts';
import { useCompleteYogaLessonStepMutation } from '../yoga-lessons-query.ts';

export type TYogaLessonPracticeScreen = TYogaLessonPracticeStep & {
  yogaLessonId: string;
};

type TYogaLessonPracticeScreenProps = RouteProp<
  TRootStackParamList,
  'YogaLessonPracticeScreen'
>;

const YogaLessonPracticeScreen = () => {
  const route = useRoute<TYogaLessonPracticeScreenProps>();
  const navigation = useNavigation<TStackNavigation>();
  const { data, loading, error, refetch } = useYogaPractice({
    id: route.params.yogaPractice.id,
  });
  const [completeYogaLessonStep] = useCompleteYogaLessonStepMutation();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <BasicErrorView onRefresh={refetch} />;
  }

  const yogaPractice = data!.yogaPractice;
  return (
    <YogaPracticePlayer
      yogaPractice={yogaPractice}
      onQueueEnded={() => {
        completeYogaLessonStep({
          variables: {
            id: route.params.yogaLessonId,
            stepId: route.params.id,
          },
        });
        navigation.replace('PracticeCompletionScreen');
      }}
    />
  );
};

export default YogaLessonPracticeScreen;
