import { gql, useQuery } from '@apollo/client';
import { RelayNode } from '../../common/types/graphql';
import { YogaPractice, YogaChallenge } from './model';

export const YOGA_JOURNEY_QUERY = gql`
  query yogaJourney {
    journey {
      activeYogaChallenges {
        edges {
          node {
            yogaChallenge {
              id
              title
              description
              coverImageUrl
              practices {
                id
                title
              }
            }
            completedYogaPractices {
              id
              title
            }
          }
        }
      }
    }
  }
`;

type TYogaChallengeResponse = Pick<
  YogaChallenge,
  'id' | 'title' | 'description' | 'coverImageUrl'
> & { practices: TYogaPracticeResponse[] };

type TYogaPracticeResponse = Pick<YogaPractice, 'id' | 'title'>;

export type TActiveYogaChallengeNode = {
  yogaChallenge: TYogaChallengeResponse;
  completedYogaPractices: TYogaPracticeResponse[];
};

export type TYogaJourneyResponse = {
  activeYogaChallenges: RelayNode<TActiveYogaChallengeNode>;
};

export const useYogaJourney = () => {
  return useQuery<{
    journey: TYogaJourneyResponse;
  }>(YOGA_JOURNEY_QUERY, {
    errorPolicy: 'all',
  });
};
