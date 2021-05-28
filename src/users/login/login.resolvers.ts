import { Resolvers } from '../../type';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      const user = await client.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return {
          ok: false,
          error: 'Cannot find User',
        };
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        return {
          ok: false,
          error: 'Password does not match',
        };
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string);

      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
