import { gql, useQuery } from '@apollo/client';
import { RelayNode } from '../../common/types/graphql';
import { TYogaLesson } from './model';

const YogaLessonPracticeFragment = gql`
  fragment YogaLessonPracticeFragment on YogaLessonPracticeStepNode {
    id
    yogaPractice {
      id
      title
    }
  }
`;

const YogaLessonArticleFragment = gql`
  fragment YogaLessonArticleFragment on YogaLessonArticleStepNode {
    id
    article {
      id
      title
    }
  }
`;

export const YOGA_LESSONS_QUERY = gql`
  query yogaLessons($first: Int) {
    yogaLessons(first: $first) {
      edges {
        node {
          id
          title
          coverImageUrl
          description
        }
      }
    }
  }
`;

export const YOGA_LESSON_QUERY = gql`
  query yogaLesson($id: Int!) {
    yogaLesson(id: $id) {
      id
      title
      coverImageUrl
      description
      stepsCount
      steps {
        __typename
        ...YogaLessonArticleFragment
        ...YogaLessonPracticeFragment
      }
    }
  }
  ${YogaLessonPracticeFragment}
  ${YogaLessonArticleFragment}
`;

type TPartialYogaLesson = Pick<
  TYogaLesson,
  'id' | 'title' | 'description' | 'coverImageUrl'
>;

export const useYogaLessons = ({
  fetchFirst,
}: { fetchFirst?: number } = {}) => {
  return useQuery<{
    yogaLessons: RelayNode<TPartialYogaLesson>;
  }>(YOGA_LESSONS_QUERY, {
    variables: {
      first: fetchFirst,
    },
    errorPolicy: 'all',
  });
};

export const useYogaLesson = ({ id }: { id: number }) => {
  return useQuery<{
    yogaLesson: TYogaLesson;
  }>(YOGA_LESSON_QUERY, {
    variables: {
      id: id,
    },
  });
};
