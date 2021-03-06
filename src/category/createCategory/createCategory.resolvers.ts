import { createSlug } from '../../coffeeShop/coffeeShop.utiles';
import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    createCategory: protectedResolver(async (_, { category }, { client }) => {
      const existedCategory = await client.category.findUnique({
        where: {
          name: category,
        },
      });

      if (existedCategory) {
        return {
          ok: false,
          error: '이미 사용 중인 카테고리 이름입니다.',
        };
      }

      try {
        await client.category.create({
          data: {
            name: category,
            slug: createSlug(category),
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
