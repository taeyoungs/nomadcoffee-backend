import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    follow(username: String!): MutationResponse!
  }
`;
