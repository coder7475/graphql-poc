import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import db from "./_db";

// types
import { typeDefs } from "./schema.graphql";

const resolvers = {
  Query: {
    games: () => {
      return db.games;
    },
    game(_parent, args, _context, _info) {
      return db.games.find((game) => game.id === args.id);
    },
    reviews: () => {
      return db.reviews;
    },
    review(_parent, args, _context, _info) {
      return db.reviews.find((review) => review.id === args.id);
    },
    authors: () => {
      return db.authors;
    },
    author(_parent, args, _context, _info) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server is running at: ${url}`);
