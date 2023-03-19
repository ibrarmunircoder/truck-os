import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const useBookCreateAuthorSelectQuery = (): DocumentNode => gql`
  query AuthorsQuery($limit: Int, $offset: Int) {
    authors(limit: $limit, offset: $offset) {
      totalCount
      data {
        id
        name
        surname
        email
        birthDate
        gender
        age
        address
      }
    }
  }
`;
