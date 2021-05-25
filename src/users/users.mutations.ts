import client from '../client';

export default {
  Mutation: {
    createUser: (_: any, { email, name }: { email: string; name?: string }) =>
      client.user.create({
        data: {
          email,
          name,
        },
      }),
  },
};
