import { gql, useQuery } from '@apollo/client';
import { RelayNode } from '../../common/types/graphql';
import { YogaPose, YogaPractice } from './model';

export const YOGA_PRACTICES_QUERY = gql`
  query yogaPractices {
    yogaPractices {
      edges {
        node {
          createdBy
          benefitsDescription
          yogaPoses {
            name
            chakras
            muscleGroups {
              name
            }
          }
        }
      }
    }
  }
`;
type YogaPoseResponse = Pick<YogaPose, 'name' | 'chakras' | 'muscleGroups'>;
type TYogaPracticeResponse = Pick<
  YogaPractice,
  'createdBy' | 'benefitsDescription'
> & { yogaPoses: YogaPoseResponse };

export const useYogaPractices = () => {
  return useQuery<{
    yogaPractices: RelayNode<TYogaPracticeResponse>;
  }>(YOGA_PRACTICES_QUERY);
};
