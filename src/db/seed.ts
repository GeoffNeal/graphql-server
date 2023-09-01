import minimist from "minimist";

// db
import db from "./db.js";
import { insertProduct, insertCustomer } from "./queries.js";

// Utils
import { readCSV } from "../utils/data.js";

const seed = async () => {
  const args = minimist(process.argv.slice(2));
  const productCsvFile = args["product"];
  const customerCsvFile = args["customer"];
  const client = await db.connect();

  const products: Product[] = await readCSV(productCsvFile);
  const customers: Customer[] = await readCSV(customerCsvFile);

  products.forEach(async (entry) => {
    const { vin, colour, make, model, price } = entry;
    await client
      .query(insertProduct, [vin, colour, make, model, price])
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
    console.log("INSERTED_PRODUCT: ", entry);
  });

  customers.forEach(async (entry) => {
    const { email, forename, surname, contact_number, postcode } = entry;
    await client
      .query(insertCustomer, [
        email,
        forename,
        surname,
        contact_number,
        postcode,
      ])
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
    console.log("INSERTED_CUSTOMER: ", entry);
  });

  client.release();
  console.log("Connection closed");
};

seed();
