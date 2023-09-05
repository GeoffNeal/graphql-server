import path from "path";

// Abstracts
import Source from "../abstracts/Source";

// CSV
import { readCSV, writeCSV } from "../../utils/csv";

/**
 * Class for accessing csv files
 */
class CSV extends Source {
  constructor(type: EntityType) {
    super(type);
  }

  /**
   * Reads from a csv file located in the `data` directory in the root
   * of the project.
   *
   * @returns Promise that resolves to an array of csv rows
   */
  async read<T>(): Promise<ArrayResponse<T>> {
    try {
      // Attempt to read csv file for specified type
      const res = await readCSV<T>(
        path.resolve(process.cwd(), `data/${this.type}.csv`)
      );
      return { err: null, res };
    } catch (err) {
      return { err, res: null };
    }
  }

  /**
   * Writes to a csv file located in the `data` directory in the root
   * of the project.
   *
   * The file it writes to will depend on the arguments this instance
   * was given at instantiation.
   *
   * @param data JSON object to convert to a csv row
   * @returns Promise that resolves to an array of csv rows
   */
  async write(data: Entity): Promise<void> {
    try {
      await writeCSV<Entity>(
        path.resolve(process.cwd(), `data/${this.type}.csv`),
        data
      );
    } catch (err) {
      console.error(err);
    }
  }
}

export default CSV;
