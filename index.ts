import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// types
import { typeDefs } from "./schema.graphql";

const server = new ApolloServer({
  typeDefs,
  // resolvers:
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server is running at: ${url}`);
