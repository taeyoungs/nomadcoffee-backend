import { deleteUploadedFile, uploadToS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';
import { processCategory } from '../coffeeShop.utiles';

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
            error: '존재하지 않는 커피숍입니다.',
          };
        }

        try {
          let photoUrl: string | null = null;
          if (file) {
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

            if (deletedPhotos.length > 0) {
              deletedPhotos.forEach(
                async (photo) => await deleteUploadedFile(photo.url, 'uploads')
              );
            }

            photoUrl = await uploadToS3(file, loggedInUser.id, 'uploads');
            await client.coffeeShopPhoto.deleteMany({
              where: {
                shop: {
                  id,
                },
              },
            });
          }

          const updatedShop = await client.coffeeShop.update({
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
            coffeeShop: updatedShop,
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
