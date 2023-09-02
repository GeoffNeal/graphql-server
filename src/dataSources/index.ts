// Abstracts
import Source from "./abstracts/Source.js";

// Formats
import Postgres from "./formats/Postgres.js";
import CSV from "./formats/CSV.js";

/**
 * Provides functionality to retrieve data from a specified source
 */
class DataSource implements IDataSource {
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
