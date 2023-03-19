import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const useBookEditAuthorSelectQuery = (): DocumentNode => gql`
  query AuthorsQuery($filter: AuthorFilterArgType, $limit: Int, $offset: Int) {
    authors(filter: $filter, limit: $limit, offset: $offset) {
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
