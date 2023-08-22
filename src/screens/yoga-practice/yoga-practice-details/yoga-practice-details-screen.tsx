import React from 'react';
import { StyleSheet, View } from 'react-native';
// import { useRoute, RouteProp } from '@react-navigation/native';
// import { TRootStackParamList } from '@navigation';
import { colors, scale } from '@style';
import { images } from '@constants';
import FastImage from 'react-native-fast-image';
import PracticeDetailsTabNavigator from './components/practice-details-tab-navigator';

export type TYogaPracticeDetailsScreen = {
  yogaPracticeId: string;
};

// type TYogaPracticeDetailsScreenProps = RouteProp<
//   TRootStackParamList,
//   'YogaPracticeDetailsScreen'
// >;

const YogaPracticeDetailsScreen = () => {
  // const route = useRoute<TYogaPracticeDetailsScreenProps>();
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.imageView}
        source={images.backupImage1}
        resizeMode={FastImage.resizeMode.cover}
      />
      <PracticeDetailsTabNavigator />
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
});

export default YogaPracticeDetailsScreen;
