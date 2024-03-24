import { gql, useQuery } from '@apollo/client';
import { RelayNode } from '../../common/types/graphql';
import { TArticle } from './model';

export const ARTICLES_QUERY = gql`
  query articles($first: Int, $after: String) {
    articles(first: $first, after: $after) {
      edges {
        node {
          id
          title
          isPinned
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const useArticles = ({ fetchFirst }: { fetchFirst?: number } = {}) => {
  return useQuery<{
    articles: RelayNode<TArticle>;
  }>(ARTICLES_QUERY, {
    variables: {
      first: fetchFirst,
    },
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });
};
