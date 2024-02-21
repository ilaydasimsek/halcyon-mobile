import { gql, useQuery, useMutation } from '@apollo/client';
import { RelayNode } from '../../../common/types/graphql';
import { YogaPose, YogaPractice, YogaStyle } from '../model';

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
          style {
            id
            name
            description
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
      style {
        id
        name
        description
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

export const COMPLETE_YOGA_PRACTICE_MUTATION = gql`
  mutation completeYogaPractice($id: Int!) {
    completeYogaPractice(yogaPracticeId: $id) {
      ok
    }
  }
`;

export type TCompleteYogaPracticeMutationRequest = {
  id: number;
};

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
  | 'style'
> & { yogaPoses: YogaPoseResponse[] };

export type TYogaStyleResponse = YogaStyle;

type TCompletionResponse = {
  ok: boolean;
};

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

export const useCompleteYogaPracticeMutation = () => {
  return useMutation<
    { result: TCompletionResponse },
    TCompleteYogaPracticeMutationRequest
  >(COMPLETE_YOGA_PRACTICE_MUTATION);
};
