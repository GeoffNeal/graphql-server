import { QueryResult, Client, PoolClient } from "pg";

// DB
import db from "../../db/postgres";

// Abstracts
import Source from "../abstracts/Source";

// Utils
import {
  getReadSQLQuery,
  getWriteData,
  getWriteSQLQuery,
} from "../../utils/postgres";

/**
 * Class representing a Postgres DB
 */
class Postgres extends Source {
  constructor(type: EntityType) {
    super(type);
  }

  /**
   * Essentially a wrapper around a query attempt so that errors
   * can be caught but the boilerplate doesn't need to be repeated
   *
   * @param cb Callback function that runs the actual query
   * @returns The result of the query
   */
  async attemptQuery<T>(
    cb: (client: Client & PoolClient) => Promise<QueryResult<T>>
  ): Promise<ArrayResponse<T>> {
    // Connect to db
    const client = await db.connect();

    try {
      // Run the provided query
      const res = await cb(client);

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
      client.release();
    }
  }

  /**
   * Reads from a Postgres database.
   *
   * @returns Promise that resolves to an array of the specified data type
   */
  async read<T>(): Promise<ArrayResponse<T>> {
    // Ensure you are using the correct pg query
    // TODO: This needs to be more extensible
    const dbQuery: string = getReadSQLQuery(this.type);

    // Run the query to retrieve all rows relating to the specified type
    return await this.attemptQuery<T>(
      async (client) => await client.query(dbQuery)
    );
  }

  /**
   * Perform a write operation to a Postgres database
   *
   * @param data The entity to insert into the database
   * @returns
   */
  async write(data: Entity): Promise<void> {
    // Ensure you are using the correct pg query
    const dbQuery: string = getWriteSQLQuery(this.type);

    // Run the query to write an entity to a table in the database
    await this.attemptQuery<Entity>(
      async (client) => await client.query(dbQuery, getWriteData(data))
    );
  }
}

export default Postgres;
