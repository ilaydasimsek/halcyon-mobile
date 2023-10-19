import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, typography, scale } from '@style';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TRootStackParamList } from '@navigation';

type TOverviewScreenProps = RouteProp<TRootStackParamList, 'OverviewScreen'>;

const OverviewScreen = () => {
  const { params } = useRoute<TOverviewScreenProps>();
  const yogaPractice = params.yogaPractice;
  return (
    <View style={styles.safeArea}>
      <Text style={[typography.h2, styles.header]}>{yogaPractice.title}</Text>
      <Text style={[typography.p4, styles.body]}>
        {yogaPractice.description}
      </Text>
      <Text style={[typography.h2, styles.header]}>Difficulty</Text>
      <View style={styles.difficultyBackground}>
        <View style={styles.difficulty} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: scale(14),
  },
  header: {
    paddingBottom: scale(16),
  },
  body: {
    paddingBottom: scale(18),
  },
  difficultyBackground: {
    height: 8,
    backgroundColor: colors.lightPink,
    borderRadius: 10,
  },
  difficulty: {
    position: 'absolute',
    height: 8,
    backgroundColor: colors.darkPink,
    borderRadius: 10,
    width: '80%',
  },
});

export default OverviewScreen;
