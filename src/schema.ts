import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { mergeTypeDefs } from '@graphql-tools/merge';

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.{js,ts}`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.{js,ts}`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
