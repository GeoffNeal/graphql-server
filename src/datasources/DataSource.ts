import path from "path";
import { QueryResult, Client, PoolClient } from "pg";

// DB
import db from "../db/db.js";
import { getAllProducts, getAllCustomers } from "../db/queries.js";

// CSV
import { readCSV } from "../utils/data.js";

/**
 * Abstract for classes that represent
 * types of data source
 */
abstract class Source {
  type: DataType;

  constructor(type: DataType) {
    this.type = type;
  }

  /**
   * Inheriting classes are expected to implement this method
   * to get data from their specified data source
   */
  abstract read<T>(): Promise<{ err: Error | null; res: T[] | null }>;
}

/**
 * Class representing a Postgres DB
 */
class Postgres extends Source {
  /**
   * The Postgres client
   */
  private client: Client & PoolClient;

  constructor(type: DataType) {
    super(type);
  }

  /**
   * Connect to a Postgres db
   */
  async connect() {
    this.client = await db.connect();
  }

  /**
   * Get the SQL query relating to specified type
   * @returns A Postgres SQL query
   */
  getPgQuery() {
    switch (this.type) {
      case "product":
        return getAllProducts;
      case "customer":
        return getAllCustomers;
      default:
        throw new Error(`\`${this.type}\` is not a valid type`);
    }
  }

  /**
   * Reads from a postgres database.
   *
   * @returns Promise that resolves to an array of the specified data type
   */
  async read<T>(): Promise<{ err: Error | null; res: T[] | null }> {
    // Connect to db
    await this.connect();

    // Ensure you are using the correct pg query
    const dbQuery: string = this.getPgQuery();

    try {
      // Run the query to retrieve all rows relating to the specified type
      const res: QueryResult<T> = await this.client.query(dbQuery);
      // Format the response so that it has the same structure
      // for both successful and unsuccessful requests.
      return { err: null, res: res.rows };
    } catch (err) {
      // Perform some logging
      // This will probably use a library like Sentry
      // but for now I'm just logging to the console.
      console.log("Something went wrong");
      console.error(err);
      // Format the response so that it has the same structure
      // for both successful and unsuccessful requests.
      return { err, res: null };
    } finally {
      // Close the connection when finished
      this.client.release();
    }
  }
}

/**
 * Class for accessing csv files
 */
class CSV extends Source {
  constructor(type: DataType) {
    super(type);
  }

  /**
   * Reads from a csv file located in the `data` directory in the root
   * of the project.
   *
   * @returns Promise that resolves to an array of the specified data type
   */
  async read<T>(): Promise<{ err: Error | null; res: T[] | null }> {
    try {
      // Attempt to read csv file for specified type
      const res = (await readCSV(
        path.resolve(process.cwd(), `data/${this.type}.csv`)
      )) as T[];
      return { err: null, res };
    } catch (err) {
      return { err, res: null };
    }
  }
}

/**
 * Provides functionality to retrieve data from a specified source
 */
class DataSource {
  private creator: Source;

  /**
   * DataSource constructor
   * @param format The format that you wish to source the data from
   * @param type The type of data you wish to retrieve
   */
  constructor(format: Format, type: DataType) {
    switch (format) {
      case "csv":
        this.creator = new CSV(type);
        break;
      case "postgres":
        this.creator = new Postgres(type);
        break;
      default:
        throw new Error(`Specified invalid DataSource format \`${format}\``);
    }
  }

  async fetch<T>(): Promise<{ err: Error | null; res: T[] | null }> {
    return await this.creator.read<T>();
  }
}

export default DataSource;
