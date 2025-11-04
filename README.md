# GraphQL Proof of Concept (POC)

This repository demonstrates a simple **GraphQL API** built with **TypeScript** and **Apollo Server**.  
It also includes a legacy version implemented with JavaScript for comparison.

---

## 📁 Project Structure

```sh
.
├── \_db.ts # In-memory mock database
├── index.ts # Entry point for the TypeScript-based GraphQL server
├── schema.graphql.ts # GraphQL schema definitions (typeDefs)
├── old-grapql-server/ # Legacy JS-based GraphQL implementation
│ ├── package.json
│ ├── sample_data.js
│ └── server.js
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md

```

---

## 🚀 Features

- **Apollo Server (v5)** with **GraphQL v16**
- Written in **TypeScript** for improved type safety
- **Modular schema** design (`typeDefs` + `resolvers`)
- **CRUD operations** for games using mutations
- **In-memory data source** (for simplicity)
- Includes an **older JavaScript version** for learning comparison

---

## 🧩 GraphQL Schema Overview

The schema models three main entities — `Game`, `Review`, and `Author` — with relationships between them.

```graphql
type Game {
  id: ID!
  title: String!
  platform: [String!]!
  reviews: [Review!]
}

type Review {
  id: ID!
  gameId: ID!
  content: String!
  rating: Int!
  game: Game!
  author: Author!
}

type Author {
  id: ID!
  name: String!
  verified: Boolean!
  reviews: [Review!]
}

type Query {
  reviews: [Review]
  review(id: ID!): Review
  games: [Game]
  game(id: ID!): Game
  authors: [Author]
  author(id: ID!): Author
}

type Mutation {
  addGame(game: NewGameInput!): Game
  deleteGame(id: ID!): [Game]
  updateGame(id: ID!, game: UpdateGameInput!): Game
}

input NewGameInput {
  title: String!
  platform: [String!]!
}

input UpdateGameInput {
  title: String
  platform: [String!]
}
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/graphql-poc.git
cd graphql-poc
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run in Development Mode

```bash
pnpm dev
```

This uses **tsx** for live reloading.

### 4. Build for Production

```bash
pnpm build
```

### 5. Start the Server

```bash
pnpm start
```

The GraphQL playground will be available at:

```
http://localhost:4000
```

---

## 🧾 Example Queries

### Fetch All Games

```graphql
query {
  games {
    id
    title
    platform
  }
}
```

### Add a New Game

```graphql
mutation {
  addGame(game: { title: "Elden Ring", platform: ["PC", "PS5"] }) {
    id
    title
  }
}
```

---

## 📦 Dependencies

| Package          | Purpose                               |
| ---------------- | ------------------------------------- |
| `@apollo/server` | GraphQL server implementation         |
| `graphql`        | Core GraphQL library                  |
| `typescript`     | TypeScript compiler                   |
| `tsx`            | TypeScript execution with live reload |
| `@types/node`    | Type definitions for Node.js          |

---

## 🧠 Notes

- The **old GraphQL server** (`old-grapql-server/`) is written in plain JavaScript for legacy reference.
- This POC is designed for **learning and experimentation**, not for production use.

---

## 📚 References

- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL Official Specification](https://spec.graphql.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Author:** Robiul Hossain
**License:** MIT
