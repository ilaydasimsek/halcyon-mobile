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

type TArticleTextContentItem = {
  __typename: 'ArticleTextContentItemNode';
  content: string;
};
type TArticleImageContentItem = {
  __typename: 'ArticleImageContentItemNode';
  imageUrl: string;
};

export type TArticleContentItem =
  | TArticleTextContentItem
  | TArticleImageContentItem;

export type TArticle = {
  id: string;
  title: string;
  isPinned: boolean;
  contentItems: TArticleContentItem[];
};
