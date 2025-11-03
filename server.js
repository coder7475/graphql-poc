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

  # Input type for adding/updating books
  input BookInput {
    title: String
    author: String
    year: Int
    genre: String
  }

  type Mutation {
    # Add a new book
    addBook(input: BookInput!): Book!
    # Update an existing book
    updateBook(id: ID!, input: BookInput!): Book
    # Delete a book
    deleteBook(id: ID!): Boolean
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

  // Mutation resolvers
  addBook: ({ input }) => {
    const newBook = {
      id: String(books.length + 1),
      ...input,
    };
    books.push(newBook);
    return newBook;
  },

  updateBook: ({ id, input }) => {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) return null;

    const updatedBook = {
      ...books[bookIndex],
      ...input,
    };
    books[bookIndex] = updatedBook;
    return updatedBook;
  },

  deleteBook: ({ id }) => {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) return false;

    books.splice(bookIndex, 1);
    return true;
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
