import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { useYogaChallenges } from '../yoga-practice-query';
import AllChallengesListItem from './components/all-challenges-list-item';
import { useYogaJourney } from '../yoga-journey-query';
import StartedChallengeListItem from './components/started-journey-list-item';
import { typography, scale } from '@style';
const YogaChallengesScreen = () => {
  const { data } = useYogaChallenges();
  const { data: yogaJourneyData } = useYogaJourney();

  return (
    <ScrollView>
      <Text style={[typography.h6, styles.startedHeader]}>Started</Text>
      <ScrollView horizontal={true}>
        {yogaJourneyData?.journey.activeYogaChallenges?.edges.map(
          ({ node }) => (
            <StartedChallengeListItem
              key={node.yogaChallenge.id}
              activeYogaChallengeNode={node}
            />
          ),
        )}
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
