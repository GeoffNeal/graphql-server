const resolvers = {
  Query: {
    products: async (
      // Unused positional arguments, so any type is given
      _: any,
      __: any,
      // Apollo server context includes a dataSources property
      { dataSources }: ApolloContext
    ) => {
      const { err, res } = await dataSources.products.read<Product>();

      if (err) {
        // Do thing with error
        // I'm throwing here so that the error is included in the response
        // for the consumer of the API. There's nothing more frustrating
        // than just getting a null response with no indication as to why.
        throw new Error(err.message);
      }

      return res;
    },

    product: async (
      _: any,
      args: { vin: string },
      { dataSources }: ApolloContext
    ) => {
      const { err, res } = await dataSources.products.read<Product>();

      if (err) {
        throw new Error(err.message);
      }

      // Return the product with the matching vin number
      return res.find((product: Product) => product.vin === args.vin);
    },

    customers: async (_: any, __: any, { dataSources }: ApolloContext) => {
      const { err, res } = await dataSources.customers.read<Customer>();

      if (err) {
        throw new Error(err.message);
      }

      return res;
    },

    customer: async (
      _: any,
      args: { surname: string },
      { dataSources }: ApolloContext
    ) => {
      const { err, res } = await dataSources.customers.read<Customer>();

      if (err) {
        throw new Error(err.message);
      }

      // Return the customer with the matching surname
      return res.find(
        (customer: Customer) => customer.surname === args.surname
      );
    },
  },
  Mutation: {
    addProduct: async (
      _,
      args: { product: Product },
      { dataSources }: ApolloContext
    ) => {
      const { err, res } = await dataSources.products.write(args.product);

      if (err) {
        throw new Error(err.message);
      }

      return res.find((product: Product) => product.vin === args.product.vin);
    },

    addCustomer: async (
      _,
      args: { customer: Customer },
      { dataSources }: ApolloContext
    ) => {
      const { err, res } = await dataSources.customers.write(args.customer);

      if (err) {
        throw new Error(err.message);
      }

      return res.find(
        (customer: Customer) => customer.surname === args.customer.surname
      );
    },
  },
};

export default resolvers;
