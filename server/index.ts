import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// graphql
import typeDefs from "./src/graphql/typeDefs";
import resolvers from "./src/graphql/resolvers";
import DataSource from "./src/dataSources/index";

//load the .env file
dotenv.config();

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  context: async () => ({
    dataSources: {
      products: new DataSource(
        process.env.DATASOURCE_FORMAT as Format,
        "product"
      ),
      customers: new DataSource(
        process.env.DATASOURCE_FORMAT as Format,
        "customer"
      ),
    },
  }),
  listen: { port: 4000 },
});

console.log(`🚀  GraphQL server ready at: ${url}`);
