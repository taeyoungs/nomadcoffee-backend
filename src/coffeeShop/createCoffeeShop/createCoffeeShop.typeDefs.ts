import { gql } from 'apollo-server-core';

export default gql`
  type CreateCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String!
      longitude: String!
      category: String
      file: Upload
    ): CreateCoffeeShopResult!
  }
`;
