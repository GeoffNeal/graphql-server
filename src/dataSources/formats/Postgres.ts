import { QueryResult, Client, PoolClient } from "pg";

// DB
import db from "../../db/db.js";
import { getAllProducts, getAllCustomers } from "../../db/queries.js";

// Abstracts
import Source from "../abstracts/Source.js";

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
  getSQLQuery() {
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
    const dbQuery: string = this.getSQLQuery();

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

export default Postgres;
