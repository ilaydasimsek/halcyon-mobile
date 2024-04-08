type TYogaLessonStep = {
  id: string;
};

export type TYogaLessonArticleStep = TYogaLessonStep & {
  __typename: 'YogaLessonArticleStepNode';
  article: {
    id: string;
    title: string;
  };
};

export type TYogaLessonPracticeStep = TYogaLessonStep & {
  __typename: 'YogaLessonPracticeStepNode';
  yogaPractice: {
    id: string;
    title: string;
  };
};

export type TYogaLesson = {
  id: string;
  title: string;
  stepsCount: number;
  description: string;
  coverImageUrl: string;
  steps: (TYogaLessonArticleStep | TYogaLessonPracticeStep)[];
};
