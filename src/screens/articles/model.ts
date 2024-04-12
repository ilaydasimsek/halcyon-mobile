type TArticleTextContentItem = {
  __typename: 'ArticleTextContentItemNode';
  content: string;
};
type TArticleImageContentItem = {
  __typename: 'ArticleImageContentItemNode';
  imageUrl: string;
};

type TArticleHeaderContentItem = {
  __typename: 'ArticleHeaderContentItemNode';
  title: string;
  subtitle: string;
  image_url: string;
};

export type TArticleContentItem =
  | TArticleTextContentItem
  | TArticleImageContentItem
  | TArticleHeaderContentItem;

export type TArticle = {
  id: string;
  title: string;
  isPinned: boolean;
  contentItems: TArticleContentItem[];
};
