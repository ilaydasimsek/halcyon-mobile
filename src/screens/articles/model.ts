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
