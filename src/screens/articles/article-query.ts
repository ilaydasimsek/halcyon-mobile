import { gql, useQuery } from '@apollo/client';
import { TArticle } from './model.ts';

const ArticleTextFragment = gql`
  fragment ArticleTextFragment on ArticleTextContentItemNode {
    content
  }
`;
const ArticleImageFragment = gql`
  fragment ArticleImageFragment on ArticleImageContentItemNode {
    imageUrl
  }
`;
const ArticleHeaderFragment = gql`
  fragment ArticleHeaderFragment on ArticleHeaderContentItemNode {
    title
    subtitle
  }
`;

const ARTICLE_QUERY = gql`
  query article($id: String!) {
    article(id: $id) {
      id
      isPinned
      title
      contentItems {
        __typename
        ...ArticleTextFragment
        ...ArticleImageFragment
        ...ArticleHeaderFragment
      }
    }
  }
  ${ArticleTextFragment}
  ${ArticleImageFragment}
  ${ArticleHeaderFragment}
`;

export const useArticle = ({ id }: { id: string }) => {
  return useQuery<{
    article: TArticle;
  }>(ARTICLE_QUERY, {
    variables: {
      id: id,
    },
  });
};
