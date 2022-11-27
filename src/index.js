import path, { join } from 'path';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import resolvers from './resolvers/resolvers.js';
import prisma from './client.js';

const typeDefs = loadSchemaSync(join(path.dirname('schema.graphql')), { loaders: [new GraphQLFileLoader()] })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 5050 },
  context: async ({ req, res }) => ({
    prisma
  })
});

console.log(`🚀  Server ready at: ${url}`);