import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    unfollow(username: String!): MutationResponse!
  }
`;
