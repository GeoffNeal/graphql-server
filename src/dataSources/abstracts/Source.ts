/**
 * Abstract for classes that represent
 * types of data source
 */
abstract class Source implements ISource {
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

export default Source;
