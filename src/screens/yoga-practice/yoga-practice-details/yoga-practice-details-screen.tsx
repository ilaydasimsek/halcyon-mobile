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

export type TYogaPracticeDetailsScreen = {
  yogaPracticeId: string;
};

type TYogaPracticeDetailsScreenProps = RouteProp<
  TRootStackParamList,
  'YogaPracticeDetailsScreen'
>;

const YogaPracticeDetailsScreen = () => {
  const route = useRoute<TYogaPracticeDetailsScreenProps>();
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const { data } = useYogaPractice({
    id: parseInt(route.params.yogaPracticeId, 10),
  });

  if (!data) {
    return <ActivityIndicator />;
  }

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <FastImage
        style={styles.imageView}
        source={
          data?.yogaPractice.coverImageUrl
            ? { uri: data.yogaPractice.coverImageUrl }
            : images.backupImage1
        }
        resizeMode={FastImage.resizeMode.cover}
      />
      {!data ? (
        <ActivityIndicator />
      ) : (
        <PracticeDetailsTabNavigator yogaPractice={data.yogaPractice} />
      )}
      <MainButton
        title={'Start Practice'}
        style={styles.startButton}
        onPress={() => {
          navigation.navigate('YogaPracticeScreen', {
            yogaPractice: data.yogaPractice,
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
