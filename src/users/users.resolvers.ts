import { Resolvers } from '../type';

const resolvers: Resolvers = {
  User: {
    following: ({ id }, { lastId }, { client }) =>
      client.user.findMany({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
    followers: ({ id }, { lastId }, { client }) =>
      client.user.findMany({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
