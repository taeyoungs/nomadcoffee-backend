import { protectedResolver } from '../users.utils';
import bcrypt from 'bcrypt';
import { deleteUploadedFile, uploadToS3 } from '../../shared/shared.utils';

const resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { username, email, name, location, password, avatar },
        { client, loggedInUser }
      ) => {
        let hashedPassword = null;
        if (password) {
          hashedPassword = await bcrypt.hash(password, 10);
        }

        let avatarURL = null;
        if (avatar) {
          const user = await client.user.findUnique({
            where: {
              id: loggedInUser.id,
            },
            select: {
              avatarURL: true,
            },
          });

          if (user?.avatarURL) {
            await deleteUploadedFile(user.avatarURL, 'avatar');
          }
          avatarURL = await uploadToS3(avatar, loggedInUser.id, 'avatar');
        }

        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
            email,
            name,
            location,
            ...(avatarURL && { avatarURL }),
            ...(hashedPassword && { password: hashedPassword }),
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
