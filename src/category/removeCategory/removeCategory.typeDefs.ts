import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    removeCategory(id: Int!): MutationResponse!
  }
`;
