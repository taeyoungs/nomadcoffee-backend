import { Resolvers } from '../../type';

export default {
  Query: {
    seeCoffeeShops: (_, { lastId }, { client }) =>
      client.coffeeShop.findMany({
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
} as Resolvers;
