import { gql, useQuery } from '@apollo/client';
import { TArticle } from './model';

const ARTICLE_QUERY = gql`
  query article($id: String!) {
    article(id: $id) {
      id
      isPinned
      title
      contentItems {
        __typename
        ... on ArticleTextContentItemNode {
          content
        }
        ... on ArticleImageContentItemNode {
          imageUrl
        }
      }
    }
  }
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
