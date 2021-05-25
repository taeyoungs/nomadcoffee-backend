import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const typeDefs = mergeTypeDefs(loadedTypes);

const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.{queries,mutations}.ts`
);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
