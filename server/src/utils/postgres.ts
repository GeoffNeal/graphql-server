import {
  insertProduct,
  insertCustomer,
  getAllProducts,
  getAllCustomers,
} from "../db/queries.js";

/**
 *
 * @param data
 * @returns
 */
export const getWriteData = (data: Entity) => {
  if ("vin" in data) {
    const { vin, colour, make, model, price } = data;
    return [vin, colour, make, model, price];
  } else {
    const { email, forename, surname, contact_number, postcode } = data;
    return [email, forename, surname, contact_number, postcode];
  }
};

/**
 * Get the SQL query relating to specified type
 * for read operations
 *
 * @returns A Postgres SQL query
 */
export const getReadSQLQuery = (type: EntityType) => {
  switch (type) {
    case "product":
      return getAllProducts;
    case "customer":
      return getAllCustomers;
    default:
      throw new Error(`\`${type}\` is not a valid entity`);
  }
};

/**
 * Get the SQL query relating to specified type
 * for write operations
 *
 * @returns A Postgres SQL query
 */
export const getWriteSQLQuery = (type: EntityType) => {
  switch (type) {
    case "product":
      return insertProduct;
    case "customer":
      return insertCustomer;
    default:
      throw new Error(`\`${type}\` is not a valid entity`);
  }
};
