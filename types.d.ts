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
 * Identical to Product but all fields
 * are optional. This is because sometimes
 * we don't query for all fields in a gql request
 */
type PartialProduct = Partial<Product>;

/**
 * Identical to Customer but all fields
 * are optional. This is because sometimes
 * we don't query for all fields in a gql request
 */
type PartialCustomer = Partial<Customer>;

/**
 * Anything that can have it's own table in a database
 * and can be queried for.
 *
 * You can use type narrowing to determine which entity
 * you are working with.
 */
type Entity = Product | Customer;

/**
 * Possible entities that can be retrieved
 */
type EntityType = "product" | "customer";

/**
 * Possible values for data retrieval method
 */
type Format = "csv" | "postgres";

/**
 * A universal response format that ensures any consumers of
 * an API can expect the same object signiture at the top level
 */
type ArrayResponse<T> = { err: Error | null; res: T[] | null };

/**
 * Used in conjunction with `@apollo/server`
 *
 * The Apollo server allows us to pass in data sources
 * under the `dataSources` key in it's context argument
 *
 * @see https://www.apollographql.com/docs/apollo-server/data/context/
 */
type ApolloContext = {
  dataSources: {
    products: ISource;
    customers: ISource;
  };
};

interface ICallback<ArgType, Ret = void> {
  (...args: ArgType[]): Ret;
}
interface IArgCollector<ArgType> {
  (...args: ArgType[]): void;
}

/**
 * Type definition for the `callAll` util function
 * which provides the developer with the ability to
 * call multiple functions at the same time with the
 * same arguments. This is useful for using multiple
 * event handlers for the same event.
 */
interface ICaller {
  <ArgType>(
    ...fns: (ICallback<ArgType, void> | undefined)[]
  ): IArgCollector<ArgType>;
}

/**
 * Used for classes that inherit from `Source`, so that
 * we can be sure they implement these methods
 *
 * A Source should provide functionality to read and write
 * to a data source, whatever type of data source that
 * may be
 */
interface ISource {
  read<T>(): Promise<ArrayResponse<T>>;
  write(data: Entity): Promise<void>;
}
