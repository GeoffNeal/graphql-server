import path from "path";

// Utils
import { readCSV } from "../utils/data.js";

const resolvers = {
  Query: {
    products: () => readCSV(path.resolve(process.cwd(), "data/product.csv")),
    customers: () => readCSV(path.resolve(process.cwd(), "data/customer.csv")),
  },
};

export default resolvers;
