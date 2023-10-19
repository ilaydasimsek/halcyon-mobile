import { gql, useQuery, useMutation } from '@apollo/client';
import { YogaChallenge } from '../model';
import { TActiveYogaChallengeNode } from '../yoga-journey-query';
import { TYogaPracticeResponse } from '../yoga-practices/yoga-practice-query';
import { RelayNode } from '../../../common/types/graphql';

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

export const START_YOGA_CHALLENGE_MUTATION = gql`
  mutation startYogaChallenge($id: Int!) {
    startYogaChallenge(yogaChallengeId: $id) {
      ok
    }
  }
`;

export const COMPLETE_YOGA_CHALLENGE_PRACTICE_MUTATION = gql`
  mutation completeYogaChallengePractice(
    $challengeId: Int!
    $practiceId: Int!
  ) {
    completeYogaChallengePractice(
      yogaChallengeId: $challengeId
      yogaPracticeId: $practiceId
    ) {
      ok
    }
  }
`;

export type TStartYogaChallengeMutationRequest = {
  id: number;
};

export type TCompleteYogaChallengePracticeMutationRequest = {
  challengeId: number;
  practiceId: number;
};

export type TYogaChallengeResponse = Pick<
  YogaChallenge,
  'id' | 'title' | 'description' | 'coverImageUrl'
> & {
  practices: TYogaPracticeResponse[];
  activeYogaChallenge: TActiveYogaChallengeNode;
};

type TCompletionResponse = {
  ok: boolean;
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

export const useCompleteYogaChallengePracticeMutation = () => {
  return useMutation<
    { result: TCompletionResponse },
    TCompleteYogaChallengePracticeMutationRequest
  >(COMPLETE_YOGA_CHALLENGE_PRACTICE_MUTATION);
};

export const useStartYogaChallengeMutation = () => {
  return useMutation<
    { result: TCompletionResponse },
    TStartYogaChallengeMutationRequest
  >(START_YOGA_CHALLENGE_MUTATION);
};
