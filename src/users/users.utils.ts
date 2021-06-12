import jwt from 'jsonwebtoken';
import client from '../client';
import { Resolver, TokenType } from '../type';

export const getUser = async (token: string | null) => {
  if (!token) return null;
  const { id } = jwt.verify(
    token,
    process.env.SECRET_KEY as string
  ) as TokenType;

  const user = await client.user.findUnique({
    where: {
      id,
    },
  });

  if (user) {
    return user;
  } else {
    return null;
  }
};

type NotLoggedInResult = {
  ok: boolean;
  error: string;
};

export function protectedResolver(resolver: Resolver): Resolver {
  return function (root, args, ctx, info): Resolver | NotLoggedInResult | null {
    if (!ctx.loggedInUser) {
      if (info.operation.operation === 'query') {
        return null;
      } else {
        return {
          ok: false,
          error: '로그인이 필요한 작업입니다. 로그인 후 이용해주세요.',
        };
      }
    }
    return resolver(root, args, ctx, info);
  };
}
