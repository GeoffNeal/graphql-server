/**
 * Abstract for classes that represent
 * types of data source
 */
abstract class Source implements ISource {
  type: EntityType;

  constructor(type: EntityType) {
    this.type = type;
  }

  /**
   * Inheriting classes are expected to implement this method
   * to get all data from their specified data source
   */
  abstract read<T>(): Promise<ArrayResponse<T>>;

  /**
   * Inheriting classes are expected to implement this method
   * to write an item to the specified data source
   */
  abstract write(data: Entity): Promise<void>;
}

export default Source;
