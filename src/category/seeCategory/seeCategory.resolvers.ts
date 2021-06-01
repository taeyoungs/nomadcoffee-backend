import { Resolvers } from '../../type';

export default {
  Query: {
    seeCategory: (_, { id, lastId }, { client }) =>
      client.category
        .findUnique({
          where: { id },
        })
        .shops({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
} as Resolvers;
