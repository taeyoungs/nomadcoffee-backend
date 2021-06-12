import { PrismaClient, User } from '.prisma/client';
import { ReadStream } from 'fs-capacitor';

export type Context = {
  client: PrismaClient;
  loggedInUser: User;
};

export type TokenType = {
  id: number;
  lat: number;
};

export interface GraphQLFileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(options?: {
    encoding?: string;
    highWaterMark?: number;
  }): ReadStream;
}

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
