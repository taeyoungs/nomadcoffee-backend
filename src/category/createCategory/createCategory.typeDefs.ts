import { gql } from 'apollo-server-core';

export default gql`
  type CreateCategoryResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createCategory(category: String!): CreateCategoryResult!
  }
`;
