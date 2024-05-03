import { gql, useMutation, useQuery } from '@apollo/client';
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
  query yogaLesson($id: String!) {
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
      activeYogaLesson {
        yogaLesson {
          id
        }
        completedLessonSteps {
          __typename
          ...YogaLessonArticleFragment
          ...YogaLessonPracticeFragment
        }
      }
    }
  }
  ${YogaLessonPracticeFragment}
  ${YogaLessonArticleFragment}
`;

export const START_YOGA_LESSON_MUTATION = gql`
  mutation startYogaLesson($id: String!) {
    startYogaLesson(yogaLessonId: $id) {
      ok
    }
  }
`;

export const COMPLETE_YOGA_LESSON_STEP_MUTATION = gql`
  mutation completeYogaLessonStep($id: String!, $stepId: String!) {
    completeYogaLessonStep(yogaLessonId: $id, yogaLessonStepId: $stepId) {
      ok
    }
  }
`;

type TPartialYogaLesson = Pick<
  TYogaLesson,
  'id' | 'title' | 'description' | 'coverImageUrl'
>;

type TCompletionResponse = {
  ok: boolean;
};

export type TStartYogaLessonMutationRequest = {
  id: string;
};

export type TCompleteYogaLessonStepRequest = {
  id: string;
  stepId: string;
};

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

export const useYogaLesson = ({ id }: { id: string }) => {
  return useQuery<{
    yogaLesson: TYogaLesson;
  }>(YOGA_LESSON_QUERY, {
    variables: {
      id: id,
    },
  });
};

export const useStartYogaLessonMutation = () => {
  return useMutation<
    { result: TCompletionResponse },
    TStartYogaLessonMutationRequest
  >(START_YOGA_LESSON_MUTATION);
};

export const useCompleteYogaLessonStepMutation = () => {
  return useMutation<
    { result: TCompletionResponse },
    TCompleteYogaLessonStepRequest
  >(COMPLETE_YOGA_LESSON_STEP_MUTATION);
};
