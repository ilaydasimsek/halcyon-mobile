import { gql, useQuery } from '@apollo/client';
import { RelayNode } from '../../common/types/graphql';
import { TYogaLesson } from './model';

export const YOGA_LESSONS_QUERY = gql`
  query yogaLessons($first: Int) {
    yogaLessons(first: $first) {
      edges {
        node {
          title
          stepsCount
          description
        }
      }
    }
  }
`;

export const useYogaLessons = ({
  fetchFirst,
}: { fetchFirst?: number } = {}) => {
  return useQuery<{
    yogaLessons: RelayNode<TYogaLesson>;
  }>(YOGA_LESSONS_QUERY, {
    variables: {
      first: fetchFirst,
    },
    errorPolicy: 'all',
  });
};
