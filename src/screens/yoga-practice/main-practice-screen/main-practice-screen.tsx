import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { typography, scale } from '@style';
import { useYogaPractices, useYogaChallenges } from '../yoga-practice-query';
import { TextButton } from '@components/buttons';
import YogaPracticeListItem from './components/yoga-practice-list-item';
import YogaChallengeListItem from './components/yoga-challenge-list-item';
import { useNavigation } from '@react-navigation/native';
import { TStackNavigation } from '@navigation';
import { BasicActivityIndicator } from '@components/helper-views';
import { BasicErrorView } from '@components/error';

const MainPracticeScreen = () => {
  const {
    data: yogaPracticeData,
    loading: practicesLoading,
    error: practiceError,
    refetch: refetchPractices,
  } = useYogaPractices({ fetchFirst: 4 });
  const {
    data: yogaChallengeData,
    loading: challengesLoading,
    error: challengeError,
    refetch: refetchChallenges,
  } = useYogaChallenges({ fetchFirst: 4 });
  const navigation = useNavigation<TStackNavigation>();

  if (practicesLoading || challengesLoading) {
    return <BasicActivityIndicator />;
  }

  if (
    practiceError ||
    challengeError ||
    !yogaPracticeData ||
    !yogaChallengeData
  ) {
    return (
      <BasicErrorView
        onRefresh={() => {
          refetchPractices();
          refetchChallenges();
        }}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={typography.h5}>Classes</Text>
        <TextButton
          text={
            <Text
              style={typography.p4}
              onPress={() => navigation.navigate('AllYogaPracticesScreen')}
            >
              View all
            </Text>
          }
        />
      </View>
      {yogaPracticeData.yogaPractices.edges.map(({ node }) => (
        <YogaPracticeListItem key={node.id} yogaPractice={node} />
      ))}
      <View style={styles.header}>
        <Text style={typography.h5}>Challenges</Text>
        <TextButton text={<Text style={typography.p4}>View all</Text>} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {yogaChallengeData.yogaChallenges.edges.map(({ node }) => (
          <YogaChallengeListItem key={node.id} yogaChallenge={node} />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: scale(16),
    marginHorizontal: scale(16),
    paddingTop: scale(8),
  },
});

export default MainPracticeScreen;
