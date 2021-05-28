import { protectedResolver } from '../users.utils';
import bcrypt from 'bcrypt';

const resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { username, email, name, location, password, avatarURL },
        { client, loggedInUser }
      ) => {
        let hashedPassword = null;
        if (password) {
          hashedPassword = await bcrypt.hash(password, 10);
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
