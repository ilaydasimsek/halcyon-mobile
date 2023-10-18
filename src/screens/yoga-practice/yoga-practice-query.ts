import { gql, useQuery } from '@apollo/client';
import { RelayNode } from '../../common/types/graphql';
import { YogaPose, YogaPractice, YogaChallenge, YogaStyle } from './model';
import { TActiveYogaChallengeNode } from './yoga-journey-query';

export const YOGA_PRACTICES_QUERY = gql`
  query yogaPractices($first: Int, $styleId: Int) {
    yogaPractices(first: $first, styleId: $styleId) {
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
        id
        name
        count
      }
      yogaPoses {
        id
        name
        sanskritName
        imageUrl
        description
        audioUrl
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

export const YOGA_CHALLENGE_QUERY = gql`
  query yogaChallenge($id: Int!) {
    yogaChallenge(id: $id) {
      id
      title
      createdBy
      description
      benefitsDescription
      coverImageUrl
      practices {
        id
        title
        duration
      }
      activeYogaChallenge {
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
`;

export const YOGA_STYLES_QUERY = gql`
  query yogaStyles {
    yogaStyles {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
`;

export type YogaPoseResponse = Pick<
  YogaPose,
  'id' | 'name' | 'sanskritName' | 'imageUrl' | 'description' | 'audioUrl'
>;

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
> & {
  practices: TYogaPracticeResponse[];
  activeYogaChallenge: TActiveYogaChallengeNode;
};

export type TYogaStyleResponse = YogaStyle;

export const useYogaPractices = ({
  styleId,
  fetchFirst,
}: { styleId?: string; fetchFirst?: number } = {}) => {
  return useQuery<{
    yogaPractices: RelayNode<TYogaPracticeResponse>;
  }>(YOGA_PRACTICES_QUERY, {
    variables: {
      first: fetchFirst,
      styleId: styleId ? parseInt(styleId, 10) : undefined,
    },
  });
};

export const useYogaStyles = () => {
  return useQuery<{
    yogaStyles: RelayNode<TYogaStyleResponse>;
  }>(YOGA_STYLES_QUERY);
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

export const useYogaChallenge = ({ id }: { id: number }) => {
  return useQuery<{
    yogaChallenge: TYogaChallengeResponse;
  }>(YOGA_CHALLENGE_QUERY, {
    variables: {
      id: id,
    },
  });
};
