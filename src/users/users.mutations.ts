import { Resolvers } from '../type';
import client from '../client';
import bcrypt from 'bcrypt';

interface IUserArgs {
  username: string;
  email: string;
  password: string;
  name?: string;
  location?: string;
}

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { email, name, username, password, location }: IUserArgs
    ) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });

      if (existingUser) {
        return {
          ok: false,
          error: 'username or email is already taken',
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await client.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          name,
          location,
        },
      });
      // console.log(user);

      return {
        ok: true,
      };
    },
  },
};

export default resolvers;
