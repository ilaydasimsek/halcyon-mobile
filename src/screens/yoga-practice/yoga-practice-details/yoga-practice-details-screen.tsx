import React from 'react';
import { Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { TRootStackParamList } from '@navigation';

export type TYogaPracticeDetailsScreen = {
  yogaPracticeId: string;
};

type TYogaPracticeDetailsScreenProps = RouteProp<
  TRootStackParamList,
  'YogaPracticeDetailsScreen'
>;

const YogaPracticeDetailsScreen = () => {
  const route = useRoute<TYogaPracticeDetailsScreenProps>();
  return <Text>{route.params.yogaPracticeId}</Text>;
};

export default YogaPracticeDetailsScreen;
