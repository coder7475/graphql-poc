// int, float, string, boolean, ID
export const typeDefs = `#graphql
    type Game {
        id: ID!,
        title: String!,
        platform: [String!]!,
    }

    type Review {
        id: ID!,
        gameId: ID!,
        content: String!,
        rating: Int!,
    }

    type Author {
        id: ID!,
        name: String!,
        verified: Boolean!,
    }

    type Query {
        reviews: [Review],
        review(id: ID!): Review,
        games: [Game],
        game(id: ID!): Game,
        authors: [Author],
        author(id: ID!): Author,
    }
`;
