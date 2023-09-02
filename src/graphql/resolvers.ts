import DataSource from "../datasources/DataSource.js";

const resolvers = {
  Query: {
    products: async (): Promise<Product[]> => {
      const { err, res } = await new DataSource(
        process.env.DATASOURCE_FORMAT as Format,
        "product"
      ).fetch<Product>();

      if (err) {
        // Do thing with error
        // I'm throwing here so that the error is included in the response
        // for the consumer of the API. There's nothing more frustrating
        // than just getting a null response with no indication as to why.
        throw new Error(err.message);
      }

      return res;
    },
    customers: async () => {
      const { err, res } = await new DataSource(
        process.env.DATASOURCE_FORMAT as Format,
        "customer"
      ).fetch<Customer>();

      if (err) {
        // Do thing with error
        // As above
        throw new Error(err.message);
      }

      return res;
    },
  },
};

export default resolvers;
