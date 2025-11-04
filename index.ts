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
  Game: {
    reviews: (parent) => {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews: (parent) => {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author: (parent) => {
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game: (parent) => {
      return db.games.find((game) => game.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_parent, args, _context, _info) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
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
