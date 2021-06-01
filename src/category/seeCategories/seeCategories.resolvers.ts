import { Resolvers } from '../../type';

export default {
  Query: {
    seeCategories: (_, { lastId }, { client }) =>
      client.category.findMany({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
} as Resolvers;
