/**
 * Type of car and associated details
 */
type Product = {
  vin: string;
  colour: string;
  make: string;
  model: string;
  price: number;
};

/**
 * Customer details
 */
type Customer = {
  email: string;
  forename: string;
  surname: string;
  contact_number: string;
  postcode: string;
};

/**
 * Possible values for data retrieval method
 */
type Format = "csv" | "postgres";

/**
 * Possible entities that data can be retrieved for
 */
type DataType = "product" | "customer";

interface ISource {
  read<T>(): Promise<{ err: Error | null; res: T[] | null }>;
}

interface IDataSource {
  fetch<T>(): Promise<{ err: Error | null; res: T[] | null }>;
}

/**
 *
 */
type GQLDataSources = {
  products: IDataSource;
  customers: IDataSource;
};
