import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';

export default {
  Query: {
    seeCoffeeShops: protectedResolver(
      async (_, { cursor }, { client, loggedInUser }) => {
        const shops = await client.coffeeShop.findMany({
          where: {
            user: {
              id: loggedInUser.id,
            },
          },
          orderBy: {
            id: 'desc',
          },
          take: 10,
          skip: cursor ? 1 : 0,
          ...(cursor && { cursor: { id: cursor } }),
        });

        const endCursor = shops[shops.length - 1].id;

        return {
          coffeeShops: shops,
          pageInfo: {
            lastCursor: endCursor,
            hasNextPage: Boolean(shops.length >= 10),
          },
        };
      }
    ),
  },
} as Resolvers;
