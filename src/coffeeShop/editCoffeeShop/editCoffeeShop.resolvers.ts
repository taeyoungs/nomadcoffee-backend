import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';
import { handleFile, processCategory } from '../coffeeShop.utiles';

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, file, category },
        { client, loggedInUser }
      ) => {
        const shop = await client.coffeeShop.findUnique({
          where: {
            id,
          },
          include: {
            categories: {
              select: {
                id: true,
              },
            },
          },
        });

        if (!shop) {
          return {
            ok: false,
            error: 'Cannot find coffee shop.',
          };
        }

        try {
          let photoUrl: string | null = null;
          if (file) {
            photoUrl = await handleFile(file, loggedInUser.id);
            await client.coffeeShopPhoto.deleteMany({
              where: {
                shop: {
                  id,
                },
              },
            });
          }

          await client.coffeeShop.update({
            where: {
              id,
            },
            data: {
              name,
              latitude,
              longitude,
              ...(photoUrl && {
                photos: {
                  create: {
                    url: photoUrl,
                  },
                },
              }),
              ...(category && {
                categories: {
                  disconnect: shop.categories,
                  connectOrCreate: processCategory(category),
                },
              }),
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
      }
    ),
  },
} as Resolvers;
