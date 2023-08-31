import path from "path";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Utils
import { readCSV } from "./utils/data.js";

const typeDefs = `#graphql
  # The types of car available
  type Product {
    vin: String
    colour: String
    make: String
    model: String
    price: Int
  }

  # Customer details
  type Customer {
    email: String
    forename: String
    surname: String
    contact_number: String
    postcode: String
  }

  type Query {
    products: [Product],
    customers: [Customer],
  }
`;

const resolvers = {
  Query: {
    products: () => readCSV(path.resolve(process.cwd(), "data/product.csv")),
    customers: () => readCSV(path.resolve(process.cwd(), "data/customer.csv")),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
