import client from '../client';

export default {
  Query: {
    user: (_: any, { id }: { id: number }) =>
      client.user.findUnique({ where: { id } }),
  },
};
