import { Resolvers } from '../../type';

export default {
  Query: {
    seeCoffeeShop: (_, { id }, { client }) =>
      client.coffeeShop.findUnique({
        where: {
          id,
        },
      }),
  },
} as Resolvers;
