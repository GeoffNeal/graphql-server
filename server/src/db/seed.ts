import path from "path";
import dotenv from "dotenv";

// db
import db from "./postgres";
import { insertProduct, insertCustomer } from "./queries";

// Utils
import { readCSV } from "../utils/csv";

//load the .env file
dotenv.config();

const seed = async () => {
  const client = await db.connect();

  const products: Product[] = await readCSV(
    path.resolve(process.cwd(), `data/product.csv`)
  );
  const customers: Customer[] = await readCSV(
    path.resolve(process.cwd(), `data/customer.csv`)
  );

  products.forEach(async (entry) => {
    const { vin, colour, make, model, price } = entry;
    await client
      .query(insertProduct, [vin.trim(), colour, make, model, price])
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
