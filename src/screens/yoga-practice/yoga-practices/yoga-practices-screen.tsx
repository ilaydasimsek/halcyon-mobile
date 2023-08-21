import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { typography, scale } from '@style';
import { useYogaPractices, useYogaChallenges } from '../yoga-practice-query';
import { TextButton } from '@components/buttons';
import YogaPracticeListItem from './components/yoga-practice-list-item';
import YogaChallengeListItem from './components/yoga-challenge-list-item';
import { useNavigation } from '@react-navigation/native';
import { TStackNavigation } from '@navigation';

const YogaPracticesScreen = () => {
  const { data: yogaPracticeData } = useYogaPractices({ fetchFirst: 4 });
  const { data: yogaChallengeData } = useYogaChallenges({ fetchFirst: 4 });
  const navigation = useNavigation<TStackNavigation>();

  if (!yogaPracticeData || !yogaChallengeData) {
    return <Text>Loading...</Text>;
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

export default YogaPracticesScreen;
