import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { typography, scale, colors } from '@style';
import CircularProgress from 'react-native-circular-progress-indicator';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TRootStackParamList } from '@navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TBenefitsScreenProps = RouteProp<TRootStackParamList, 'BenefitsScreen'>;

const BenefitsScreen = () => {
  const { params } = useRoute<TBenefitsScreenProps>();
  const { bottom } = useSafeAreaInsets();
  const yogaPractice = params.yogaPractice;
  const yogaPosesCount = yogaPractice.yogaPoses.length;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: bottom }}
    >
      <Text style={[typography.h2, styles.header]}>Benefits</Text>
      <Text style={[typography.p4, styles.body]}>
        {yogaPractice.benefitsDescription}
      </Text>
      <Text style={[typography.p1, styles.subHeader]}>
        Sequence Focus - Muscle Groups
      </Text>

      {yogaPractice.muscleGroupsDistribution.map((item) => {
        return (
          <View key={item.id} style={styles.muscleGroupItem}>
            <Text style={typography.h6}>{item.name}</Text>
            <CircularProgress
              progressValueColor={colors.darkPink}
              activeStrokeColor={colors.darkPink}
              inActiveStrokeColor={colors.backgroundGray}
              activeStrokeWidth={5}
              inActiveStrokeWidth={5}
              value={(item.count / yogaPosesCount) * 100}
              valueSuffix={'%'}
              radius={22}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  muscleGroupItem: {
    borderRadius: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
});

export default BenefitsScreen;
