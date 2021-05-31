import { Resolvers } from '../../type';

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, lastId }, { client }) => {
      const users = await client.user.findMany({
        where: {
          username: {
            contains: keyword.toLowerCase(),
          },
        },
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });

      return users;
    },
  },
};

export default resolvers;
