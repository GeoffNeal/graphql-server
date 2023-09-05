import { expect, jest, test } from "@jest/globals";
import { ApolloServer } from "@apollo/server";
import assert from "assert";

// Graphql - server
import typeDefs from "../src/graphql/typeDefs";
import resolvers from "../src/graphql/resolvers";

// Graphql - client
import {
  getProductsQuery,
  getCustomersQuery,
} from "../../client/src/graphql/queries";

// Data source
import DataSource from "../src/dataSources";

// jest.mock("../src/utils/csv");
jest.mock("../src/dataSources/formats/CSV");
jest.mock("../src/dataSources/formats/Postgres");

const productsQueryExpectedResponse: PartialProduct[] = [
  { make: "Landrover", model: "Evoque", vin: "1C6RR6LT9DS578427" },
  { make: "Jaguar", model: "XE", vin: "1G6DP567X50115827" },
];

const customersQueryExpectedResponse: PartialCustomer[] = [
  { forename: "Osman", surname: "Ahmed" },
  { forename: "Dominic", surname: "Sutton" },
];

test("returns a list of products when reading from a csv", async () => {
  const testServer = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation(
    {
      query: getProductsQuery,
    },
    {
      contextValue: {
        dataSources: {
          products: new DataSource("csv", "product"),
          customers: new DataSource("csv", "customer"),
        },
      },
    }
  );

  assert(response.body.kind === "single");
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data?.products).toEqual(
    productsQueryExpectedResponse
  );
});

test("returns a list of products when reading from postgres", async () => {
  const testServer = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation(
    {
      query: getProductsQuery,
    },
    {
      contextValue: {
        dataSources: {
          products: new DataSource("postgres", "product"),
          customers: new DataSource("postgres", "customer"),
        },
      },
    }
  );

  assert(response.body.kind === "single");
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data?.products).toEqual(
    productsQueryExpectedResponse
  );
});

test("returns a list of customers when reading from csv", async () => {
  const testServer = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation(
    {
      query: getCustomersQuery,
    },
    {
      contextValue: {
        dataSources: {
          products: new DataSource("csv", "product"),
          customers: new DataSource("csv", "customer"),
        },
      },
    }
  );

  assert(response.body.kind === "single");
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data?.customers).toEqual(
    customersQueryExpectedResponse
  );
});

test("returns a list of customers when reading from postgres", async () => {
  const testServer = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation(
    {
      query: getCustomersQuery,
    },
    {
      contextValue: {
        dataSources: {
          products: new DataSource("postgres", "product"),
          customers: new DataSource("postgres", "customer"),
        },
      },
    }
  );

  assert(response.body.kind === "single");
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data?.customers).toEqual(
    customersQueryExpectedResponse
  );
});
