import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { TRootStackParamList } from '@navigation';
import { colors, scale } from '@style';
import { images } from '@constants';
import FastImage from 'react-native-fast-image';
import PracticeDetailsTabNavigator from './components/practice-details-tab-navigator';
import { useYogaPractice } from '../yoga-practice-query';
import { MainButton } from '@components/buttons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BasicErrorView } from '@components/error';

export type TYogaPracticeDetailsScreen = {
  yogaPracticeId: string;
  challengeId?: string;
};

type TYogaPracticeDetailsScreenProps = RouteProp<
  TRootStackParamList,
  'YogaPracticeDetailsScreen'
>;

const YogaPracticeDetailsScreen = () => {
  const route = useRoute<TYogaPracticeDetailsScreenProps>();
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const { data, loading, error, refetch } = useYogaPractice({
    id: parseInt(route.params.yogaPracticeId, 10),
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <BasicErrorView onRefresh={() => refetch()} />;
  }

  const yogaPractice = data!.yogaPractice;
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <FastImage
        style={styles.imageView}
        source={
          yogaPractice.coverImageUrl
            ? { uri: yogaPractice.coverImageUrl }
            : images.backupImage1
        }
        resizeMode={FastImage.resizeMode.cover}
      />
      <PracticeDetailsTabNavigator yogaPractice={yogaPractice} />
      <MainButton
        title={'Start Practice'}
        style={styles.startButton}
        onPress={() => {
          navigation.navigate('YogaPracticeScreen', {
            yogaPractice: yogaPractice,
            challengeId: route.params.challengeId,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
  },
  imageView: {
    height: scale(220),
    marginHorizontal: scale(35),
    marginVertical: scale(16),
    borderRadius: 10,
  },
  startButton: {
    marginHorizontal: scale(22),
    marginTop: scale(8),
  },
});

export default YogaPracticeDetailsScreen;
