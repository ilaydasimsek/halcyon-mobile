import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
} from 'react-native';
import {
  useRoute,
  RouteProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { TRootStackParamList } from '@navigation';
import { colors, scale, typography } from '@style';
import { images } from '@constants';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import YogaPracticeListItem from './components/yoga-practice-list-item';
import { BasicErrorView } from '@components/error';
import {
  useYogaChallenge,
  useStartYogaChallengeMutation,
} from '../yoga-challenge-query';

export type TYogaChallengeDetailsScreen = {
  yogaChallengeId: string;
};

type TYogaChallengeDetailsScreenProps = RouteProp<
  TRootStackParamList,
  'YogaChallengeDetailsScreen'
>;

const YogaChallengeDetailsScreen = () => {
  const route = useRoute<TYogaChallengeDetailsScreenProps>();
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { data, loading, error, refetch } = useYogaChallenge({
    id: parseInt(route.params.yogaChallengeId, 10),
  });
  const [startYogaChallengeMutation] = useStartYogaChallengeMutation();

  useFocusEffect(() => {
    refetch();
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <BasicErrorView onRefresh={() => refetch()} />;
  }

  const yogaChallenge = data!.yogaChallenge;
  const completedChallengePractices =
    yogaChallenge.activeYogaChallenge?.completedYogaPractices?.map(
      (practice) => practice.id,
    ) ?? [];

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <FastImage
        style={styles.imageView}
        source={
          yogaChallenge.coverImageUrl
            ? { uri: yogaChallenge.coverImageUrl }
            : images.backupImage1
        }
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={[typography.h2, styles.header]}>{yogaChallenge.title}</Text>
      <Text style={[typography.p4, styles.body]}>
        {yogaChallenge.description}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {yogaChallenge.practices.map((practice) => (
          <YogaPracticeListItem
            key={practice.id}
            yogaPractice={practice}
            completed={completedChallengePractices.includes(practice.id)}
            onPress={async () => {
              if (!yogaChallenge.activeYogaChallenge) {
                await startYogaChallengeMutation({
                  variables: {
                    id: parseInt(yogaChallenge.id, 10),
                  },
                });
              }
              navigation.navigate('YogaPracticeDetailsScreen', {
                yogaPracticeId: practice.id,
                challengeId: yogaChallenge.id,
              });
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
    padding: scale(14),
  },
  imageView: {
    height: scale(220),
    marginHorizontal: scale(21),
    marginVertical: scale(16),
    borderRadius: 10,
  },
  header: {
    paddingBottom: scale(16),
  },
  body: {
    paddingBottom: scale(18),
  },
});

export default YogaChallengeDetailsScreen;
