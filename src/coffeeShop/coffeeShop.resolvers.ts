import { Resolvers } from '../type';

export default {
  CoffeeShop: {
    user: ({ id }, _, { client }) =>
      client.user.findFirst({
        where: {
          shops: {
            some: {
              id,
            },
          },
        },
      }),
    categories: ({ id }, { lastId }, { client }) =>
      client.coffeeShop
        .findUnique({
          where: { id },
        })
        .categories({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
    photos: ({ id }, { lastId }, { client }) =>
      client.coffeeShop
        .findUnique({
          where: { id },
        })
        .photos({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
} as Resolvers;
