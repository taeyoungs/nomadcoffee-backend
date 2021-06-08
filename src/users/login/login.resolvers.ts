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
          error: '입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다.',
        };
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        return {
          ok: false,
          error: '비밀번호가 일치하지 않습니다.',
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
