import { gql } from 'apollo-server-core';

export default gql`
  type RemoveCategoryResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    removeCategory(id: Int!): RemoveCategoryResult!
  }
`;
