import { gql } from 'apollo-server';

export default gql`
  type User {
    id: Int!
    email: String!
    name: String
  }
  type Query {
    user(id: Int!): User
  }
  type Mutation {
    createUser(email: String!, name: String): User
  }
`;
