import { gql } from 'apollo-server-express';

export const filesQuery = gql`
  query files(
    $entityIdentifiers: IdFilterArgType!
    $entityName: EntityNameFilterArgType!
    $fileCategory: StringFilterArgType!
    $order: FileOrderArgType
    $limit: Int
    $status: StatusFilterArgType
  ) {
    files(
      order: $order
      limit: $limit
      filter: {
        entityName: $entityName
        entityIdentifiers: $entityIdentifiers
        fileCategory: $fileCategory
        status: $status
      }
    ) {
      data {
        id
        createdByUserId
        url
        status
        name
        customMetaData
        fileCategory {
          key
          name
        }
        fileAssociations {
          data {
            entityIdentifier
            entityName
          }
        }
      }
    }
  }
`;
