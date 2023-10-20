import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { typography, scale } from '@style';
import { useNavigation } from '@react-navigation/native';
import { TStackNavigation } from '@navigation';
import { MainButton } from '@components/buttons';

const PracticeCompletionScreen = () => {
  const navigation = useNavigation<TStackNavigation>();
  return (
    <View style={styles.container}>
      <View>
        <Text style={[typography.h2]}>Congratulations!</Text>
        <Text style={[typography.p3]}>You completed a yoga practice</Text>
      </View>
      <MainButton title={'Continue'} onPress={() => navigation.pop()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: '25%',
    paddingHorizontal: scale(24),
  },
});
export default PracticeCompletionScreen;
