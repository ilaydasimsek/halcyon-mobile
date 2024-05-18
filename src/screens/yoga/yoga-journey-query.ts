import { gql, useQuery } from '@apollo/client';
import { RelayNode } from '../../common/types/graphql';
import { YogaChallenge, YogaPractice } from './model';
import { TYogaLesson } from '../yoga-lessons/model.ts';

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
      activeYogaLessons {
        edges {
          node {
            yogaLesson {
              id
              title
              description
              coverImageUrl
              steps {
                __typename
              }
            }
            completedLessonSteps {
              __typename
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

type TPartialYogaLessonStep = {
  __typename: string;
};

type TYogaLessonResponse = Pick<
  TYogaLesson,
  'id' | 'title' | 'description' | 'coverImageUrl'
> & { steps: TPartialYogaLessonStep[] };

export type TActiveYogaLessonNode = {
  yogaLesson: TYogaLessonResponse;
  completedLessonSteps: TPartialYogaLessonStep[];
};

export type TYogaJourneyResponse = {
  activeYogaChallenges: RelayNode<TActiveYogaChallengeNode>;
  activeYogaLessons: RelayNode<TActiveYogaLessonNode>;
};

export const useYogaJourney = () => {
  return useQuery<{
    journey: TYogaJourneyResponse;
  }>(YOGA_JOURNEY_QUERY, {
    errorPolicy: 'all',
  });
};
