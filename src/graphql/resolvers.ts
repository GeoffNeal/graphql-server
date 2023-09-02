const resolvers = {
  Query: {
    products: async (
      // Unused positional arguments, so any type is given
      _: any,
      __: any,
      // Apollo server context includes a dataSources property
      { dataSources }: { dataSources: GQLDataSources }
    ): Promise<Product[]> => {
      const { err, res } = await dataSources.products.fetch<Product>();

      if (err) {
        // Do thing with error
        // I'm throwing here so that the error is included in the response
        // for the consumer of the API. There's nothing more frustrating
        // than just getting a null response with no indication as to why.
        throw new Error(err.message);
      }

      return res;
    },
    customers: async (
      // Unused positional arguments, so any type is given
      _: any,
      __: any,
      // Apollo server context includes a dataSources property
      { dataSources }: { dataSources: GQLDataSources }
    ) => {
      const { err, res } = await dataSources.customers.fetch<Customer>();

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
