import { QueryResult, QueryResultRow } from "pg";

// Formats
import CSV from "../src/dataSources/formats/CSV";
import Postgres from "../src/dataSources/formats/Postgres";

// DB
import db from "../src/db/postgres";

// Stubs
import { productListStub } from "../stubs/product";
import { customerListStub } from "../stubs/customer";

// Utils
import { readCSV } from "../src/utils/csv";

jest.mock("../src/utils/csv");
jest.mock("../src/db/postgres", () => {
  const mockDB = {
    connect: jest.fn(async () => ({
      release: jest.fn(),
      query: jest.fn(
        (): QueryResult<QueryResultRow> => ({
          rows: productListStub,
          rowCount: 2,
          command: "",
          oid: null,
          fields: [],
        })
      ),
    })),
  };

  return {
    connect: mockDB.connect,
  };
});

const mockedReadCSV = jest.mocked(readCSV);

describe("CSV", () => {
  test("read products", async () => {
    const csvFormat = new CSV("product");

    mockedReadCSV.mockImplementation(
      () => new Promise((resolve) => resolve(productListStub))
    );

    expect(await csvFormat.read<Product>()).toEqual({
      err: null,
      res: productListStub,
    });
  });

  test("read customers", async () => {
    const csvFormat = new CSV("customer");

    mockedReadCSV.mockImplementation(
      () => new Promise((resolve) => resolve(customerListStub))
    );

    expect(await csvFormat.read<Customer>()).toEqual({
      err: null,
      res: customerListStub,
    });
  });
});

describe("Postgres", () => {
  test("read products", async () => {
    const postgresFormat = new Postgres("product");

    expect(await postgresFormat.read<Product>()).toEqual({
      err: null,
      res: productListStub,
    });
  });

  test("read customers", async () => {
    const postgresFormat = new Postgres("customer");

    // Update the result returned from the mock db
    (db.connect as jest.Mock).mockResolvedValue({
      query: jest.fn(
        (): QueryResult<QueryResultRow> => ({
          rows: customerListStub,
          rowCount: 2,
          command: "",
          oid: null,
          fields: [],
        })
      ),
      release: () => {},
    });

    expect(await postgresFormat.read<Customer>()).toEqual({
      err: null,
      res: customerListStub,
    });
  });
});
