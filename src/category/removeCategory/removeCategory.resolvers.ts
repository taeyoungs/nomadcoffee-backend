import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    removeCategory: protectedResolver(async (_, { id }, { client }) => {
      const category = await client.category.findUnique({
        where: {
          id,
        },
      });

      if (!category) {
        return {
          ok: false,
          error: '존재하지 않는 카테고리입니다.',
        };
      }

      try {
        await client.category.delete({
          where: {
            id,
          },
        });

        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: `${error}`,
        };
      }
    }),
  },
} as Resolvers;
