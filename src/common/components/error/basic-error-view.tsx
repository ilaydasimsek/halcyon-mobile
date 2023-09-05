import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '@constants';
import { scale, typography, fontColor } from '@style';
import { MainButton } from '@components/buttons';
import { localized } from '@localization';

type TBasicErrorView = {
  onRefresh: () => void;
};
const BasicErrorView = ({ onRefresh }: TBasicErrorView) => {
  return (
    <View style={styles.container}>
      <FastImage source={images.error} style={styles.errorImage} />
      <Text style={[typography.h5, fontColor.textGrayH2, styles.errorText]}>
        {localized('somethingWentWrong')}
      </Text>
      <MainButton
        style={styles.refreshButton}
        title={'Refresh'}
        onPress={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorImage: {
    height: scale(120),
    aspectRatio: 1,
  },
  refreshButton: {
    paddingHorizontal: scale(24),
  },
  errorText: {
    paddingVertical: scale(16),
  },
});
export default BasicErrorView;
