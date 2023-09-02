import path from "path";

// Abstracts
import Source from "../abstracts/Source.js";

// CSV
import { readCSV } from "../../utils/data.js";

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

export default CSV;
