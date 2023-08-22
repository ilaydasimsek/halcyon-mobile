import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, typography, scale } from '@style';
const OverviewScreen = () => {
  return (
    <View style={styles.safeArea}>
      <Text style={[typography.h2, styles.header]}>Healthy Back</Text>
      <Text style={[typography.p4, styles.body]}>
        Cras orci orci, egestas eu aliquam ac, faucibus sed nulla nulla sit amet
        orci vitae lectus bibendum tincidunt. Cras orci orci, egestas eu aliquam
        ac, faucibus sed nulla nulla sit amet orci vitae lectus bibendum
        tincidunt.Cras orci orci, egestas eu aliquam ac, faucibus sed nulla
        nulla sit amet orci vitae lectus bibendum tincidunt.Cras orci orci,
        egestas eu aliquam
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
