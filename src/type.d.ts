import { PrismaClient, User } from '.prisma/client';

export type Context = {
  client: PrismaClient;
  loggedInUser: User;
};

export type TokenType = {
  id: number;
  lat: number;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
