/* READ */
export const getAllProducts = "SELECT * FROM products;";
export const getProductByVin = "SELECT * FROM products WHERE vin = $1";
export const getAllCustomers = "SELECT * FROM customers;";
export const getCustomerBySurname =
  "SELECT * FROM customers WHERE surname = $1";

/* WRITE */
export const insertProduct =
  "INSERT INTO products (vin, colour, make, model, price) VALUES ($1, $2, $3, $4, $5);";
export const insertCustomer =
  "INSERT INTO customers (email, forename, surname, contact_number, postcode) VALUES ($1, $2, $3, $4, $5);";
