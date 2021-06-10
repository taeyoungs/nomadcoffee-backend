import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';
import { handleFile, processCategory } from '../coffeeShop.utiles';

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, category, file },
        { client, loggedInUser }
      ) => {
        let photoUrl: string | null = null;
        if (file) {
          photoUrl = await handleFile(file, loggedInUser.id);
        }
        try {
          const newShop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(category && {
                categories: {
                  connectOrCreate: processCategory(category),
                },
              }),
              ...(photoUrl && {
                photos: {
                  create: {
                    url: photoUrl,
                  },
                },
              }),
            },
          });

          return {
            ok: true,
            coffeeShop: newShop,
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
