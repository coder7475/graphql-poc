// int, float, string, boolean, ID
export const typeDefs = `#graphql
    type Game {
        id: ID!,
        title: String!,
        platform: [String!]!,
        reviews: [Review!],
    }

    type Review {
        id: ID!,
        gameId: ID!,
        content: String!,
        rating: Int!,
        game: Game!,
        author: Author!
    }

    type Author {
        id: ID!,
        name: String!,
        verified: Boolean!,
        reviews: [Review!],
    }

    type Query {
        reviews: [Review],
        review(id: ID!): Review,
        games: [Game],
        game(id: ID!): Game,
        authors: [Author],
        author(id: ID!): Author,
    }

    type Mutation {
        addGame(game: NewGameInput!): Game,
        deleteGame(id: ID!): [Game],
    }

    input NewGameInput {
        title: String!,
        platform: [String!]!,
    }
`;
