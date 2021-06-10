import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    removeCoffeeShop: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const shop = await client.coffeeShop.findUnique({
          where: { id },
        });
        if (!shop) {
          return {
            ok: false,
            error: '존재하지 않는 커피숍입니다.',
          };
        }

        // cascade delete 미지원 => photo부터 삭제
        try {
          await client.coffeeShopPhoto.deleteMany({
            where: {
              shop: {
                id,
              },
            },
          });
          const removedShop = await client.coffeeShop.delete({
            where: {
              id,
            },
          });

          return {
            ok: true,
            coffeeShop: removedShop,
          };
        } catch (error) {
          return {
            ok: false,
            error: `${error}`,
          };
        }
      }
    ),
  },
} as Resolvers;
