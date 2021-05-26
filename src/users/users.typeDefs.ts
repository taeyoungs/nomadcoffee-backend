import { gql } from 'apollo-server';

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String
    location: String
    password: String!
    avatarUrl: String
    githubUsername: String
    createAt: String!
    updateAt: String!
  }
  type ReturnObj {
    ok: Boolean!
    error: String
  }
  type Query {
    user(id: Int!): User
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String
      location: String
      password: String!
    ): ReturnObj
  }
`;
