import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { typography, scale, colors } from '@style';
import CircularProgress from 'react-native-circular-progress-indicator';

const BenefitsScreen = () => {
  return (
    <View style={styles.safeArea}>
      <Text style={[typography.h2, styles.header]}>Benefits</Text>
      <Text style={[typography.p4, styles.body]}>
        Cras orci orci, egestas eu aliquam ac, faucibus sed nulla nulla sit amet
        orci vitae lectus bibendum tincidunt. Cras orci orci, egestas eu aliquam
        ac, faucibus sed nulla nulla sit amet orci vitae lectus bibendum
      </Text>
      <Text style={[typography.p1, styles.subHeader]}>
        Sequence Focus - Muscle Groups
      </Text>

      <View style={styles.musleGroupItem}>
        <View>
          <Text style={typography.h6}>Lower Back</Text>
          <Text style={typography.p4}>Lorem ipsum dolor sit amet</Text>
        </View>
        <CircularProgress
          progressValueColor={colors.darkPink}
          activeStrokeColor={colors.darkPink}
          inActiveStrokeColor={colors.backgroundGray}
          activeStrokeWidth={5}
          inActiveStrokeWidth={5}
          value={50}
          valueSuffix={'%'}
          radius={22}
        />
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
  subHeader: {
    paddingBottom: scale(16),
    color: colors.textGrayH2,
  },
  body: {
    paddingBottom: scale(18),
  },
  musleGroupItem: {
    borderRadius: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    justifyContent: 'space-between',
  },
});

export default BenefitsScreen;
