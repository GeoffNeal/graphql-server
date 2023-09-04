/* READ */
export const getAllProducts = "SELECT * FROM products;";
export const getAllCustomers = "SELECT * FROM customers;";

/* WRITE */
export const insertProduct =
  "INSERT INTO products (vin, colour, make, model, price) VALUES ($1, $2, $3, $4, $5);";
export const insertCustomer =
  "INSERT INTO customers (email, forename, surname, contact_number, postcode) VALUES ($1, $2, $3, $4, $5);";
