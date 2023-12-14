import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import AllChallengesListItem from './components/all-challenges-list-item';
import { useYogaJourney } from '../../yoga-journey-query';
import StartedChallengeListItem from './components/started-journey-list-item';
import { typography, scale } from '@style';
import { useYogaChallenges } from '../yoga-challenge-query';
import { BasicErrorView } from '@components/error';
import { BasicActivityIndicator } from '@components/helper-views';
const YogaChallengesScreen = () => {
  const { data, loading, error, refetch } = useYogaChallenges();
  const {
    data: yogaJourneyData,
    loading: journeyLoading,
    error: journeyError,
    refetch: refetchJourney,
  } = useYogaJourney();

  if (loading || journeyLoading) {
    return <BasicActivityIndicator />;
  }

  if (error || journeyError) {
    return (
      <BasicErrorView
        onRefresh={() => {
          refetch();
          refetchJourney();
        }}
      />
    );
  }

  const activeYogaChallenges =
    yogaJourneyData!.journey.activeYogaChallenges?.edges ?? [];

  return (
    <ScrollView>
      <Text style={[typography.h6, styles.startedHeader]}>Started</Text>
      <ScrollView horizontal={true}>
        {activeYogaChallenges.map(({ node }) => (
          <StartedChallengeListItem
            key={node.yogaChallenge.id}
            activeYogaChallengeNode={node}
          />
        ))}
      </ScrollView>
      {data?.yogaChallenges.edges.map(({ node }) => (
        <AllChallengesListItem key={node.id} yogaChallenge={node} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  startedHeader: {
    marginHorizontal: scale(16),
    marginTop: scale(12),
    marginBottom: scale(8),
  },
});

export default YogaChallengesScreen;
