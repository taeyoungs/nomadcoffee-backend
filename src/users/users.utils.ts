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

  //   console.log(user);

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
  return function (root, args, ctx, info): Resolver | NotLoggedInResult {
    if (!ctx.loggedInUser) {
      return {
        ok: false,
        error: 'Please log in to perform this action',
      };
    }
    return resolver(root, args, ctx, info);
  };
}
