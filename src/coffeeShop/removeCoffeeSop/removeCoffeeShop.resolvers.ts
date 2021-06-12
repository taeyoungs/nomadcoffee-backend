import { deleteUploadedFile } from '../../shared/shared.utils';
import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    removeCoffeeShop: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const shop = await client.coffeeShop.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!shop) {
          return {
            ok: false,
            error: '존재하지 않는 커피숍입니다.',
          };
        } else if (shop.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: '권한이 없습니다.',
          };
        } else {
          // cascade delete 미지원 => photo부터 삭제
          const deletedPhotos = await client.coffeeShopPhoto.findMany({
            where: {
              shop: {
                id,
              },
            },
            select: {
              url: true,
            },
          });

          deletedPhotos.forEach(
            async (photo) => await deleteUploadedFile(photo.url, 'uploads')
          );

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
        }
      }
    ),
  },
} as Resolvers;
