// Abstracts
import Source from "./abstracts/Source";

// Sources
import Postgres from "./formats/Postgres";
import CSV from "./formats/CSV";

/**
 * Provides functionality to retrieve data from a specified source
 */
class DataSource extends Source {
  private creator: Source;

  /**
   * DataSource constructor
   *
   * @param format The format that you wish to source the data from
   * @param type The type of data you wish to retrieve
   */
  constructor(format: Format, type: EntityType) {
    super(type);
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

  /**
   * Fetch data from either Postgres or a CSV file, depending on what
   * was specified at instantiation
   *
   * @returns Promise that resolves to an array of the specified data type
   */
  async read<T>(): Promise<ArrayResponse<T>> {
    return await this.creator.read<T>();
  }

  /**
   * Write data to either Postgres or a CSV file, depending on what
   * was specified at instantiation
   *
   * @returns Promise that resolves to an array of the specified data type
   */
  async write(data: Entity): Promise<void> {
    return await this.creator.write(data);
  }
}

export default DataSource;
