import { Resolvers } from '../type';

const resolvers: Resolvers = {
  User: {
    following: ({ id }, { lastId }, { client }) =>
      client.user
        .findUnique({
          where: {
            id,
          },
        })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
    followers: ({ id }, { lastId }, { client }) =>
      client.user
        .findUnique({
          where: {
            id,
          },
        })
        .followers({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
};

export default resolvers;
