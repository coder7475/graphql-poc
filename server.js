const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { books } = require("./sample_data");

// Graphql Schema
const schema = buildSchema(
  `
    type Book {
    id: ID!
    title: String!
    author: String!
    year: Int
    genre: String
  }

  # The "Query" type is the root of all GraphQL queries
  type Query {
    # Get all books
    books: [Book!]!
    # Get a specific book by ID
    book(id: ID!): Book
    # Search books by title or author
    searchBooks(query: String!): [Book!]!
  }
`
);

// Resolvers
const root = {
  // fetch all books
  books: () => books,

  // fetch a single book
  book: ({ id }) => books.find((book) => book.id === id),

  // Resolver for searching queries
  searchBooks: ({ query }) => {
    const searchTerm = query.toLowerCase();

    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
  },
};

// express app
const app = express();

// Grapql Endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // interface for testing
  })
);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
