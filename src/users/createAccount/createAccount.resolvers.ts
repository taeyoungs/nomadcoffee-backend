import { Resolvers } from '../../type';
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
      { email, name, username, password, location }: IUserArgs,
      { client }
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
          error: '이미 사용 중인 사용자 이름 또는 이메일입니다.',
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await client.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          name,
          location,
        },
      });

      return {
        ok: true,
      };
    },
  },
};

export default resolvers;
