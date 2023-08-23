import { gql, useQuery } from '@apollo/client';
import { RelayNode } from '../../common/types/graphql';
import { YogaPose, YogaPractice, YogaChallenge } from './model';

export const YOGA_PRACTICES_QUERY = gql`
  query yogaPractices($first: Int) {
    yogaPractices(first: $first) {
      edges {
        node {
          id
          title
          createdBy
          description
          benefitsDescription
          coverImageUrl
          duration
          yogaPoses {
            name
            chakras
            muscleGroups {
              name
            }
          }
        }
      }
    }
  }
`;

export const YOGA_PRACTICE_QUERY = gql`
  query yogaPractice($id: Int!) {
    yogaPractice(id: $id) {
      id
      title
      createdBy
      description
      benefitsDescription
      coverImageUrl
      duration
      muscleGroupsDistribution {
        name
        count
      }
      yogaPoses {
        name
        sanskritName
        imageUrl
      }
    }
  }
`;

export const YOGA_CHALLENGES_QUERY = gql`
  query yogaChallenges($first: Int) {
    yogaChallenges(first: $first) {
      edges {
        node {
          id
          title
          createdBy
          description
          benefitsDescription
          coverImageUrl
          practices {
            id
            title
          }
        }
      }
    }
  }
`;

type YogaPoseResponse = Pick<YogaPose, 'name' | 'sanskritName' | 'imageUrl'>;

export type TYogaPracticeResponse = Pick<
  YogaPractice,
  | 'id'
  | 'title'
  | 'description'
  | 'createdBy'
  | 'benefitsDescription'
  | 'coverImageUrl'
  | 'duration'
  | 'muscleGroupsDistribution'
> & { yogaPoses: YogaPoseResponse[] };

export type TYogaChallengeResponse = Pick<
  YogaChallenge,
  'id' | 'title' | 'description' | 'coverImageUrl'
> & { practices: TYogaPracticeResponse };

export const useYogaPractices = ({
  fetchFirst,
}: { fetchFirst?: number } = {}) => {
  return useQuery<{
    yogaPractices: RelayNode<TYogaPracticeResponse>;
  }>(YOGA_PRACTICES_QUERY, {
    variables: {
      first: fetchFirst,
    },
  });
};

export const useYogaPractice = ({ id }: { id: number }) => {
  return useQuery<{
    yogaPractice: TYogaPracticeResponse;
  }>(YOGA_PRACTICE_QUERY, {
    variables: {
      id: id,
    },
  });
};

export const useYogaChallenges = ({
  fetchFirst,
}: { fetchFirst?: number } = {}) => {
  return useQuery<{
    yogaChallenges: RelayNode<TYogaChallengeResponse>;
  }>(YOGA_CHALLENGES_QUERY, {
    variables: {
      first: fetchFirst,
    },
    errorPolicy: 'all',
  });
};
