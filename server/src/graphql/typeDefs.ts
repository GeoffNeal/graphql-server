const typeDefs = `#graphql
  # The types of car available
  type Product {
    vin: String
    colour: String
    make: String
    model: String
    price: Int
  }

  # Product input for mutations
  input ProductInput {
    vin: String
    colour: String
    make: String
    model: String
    price: Int
  }

  # Customer details
  type Customer {
    email: String
    forename: String
    surname: String
    contact_number: String
    postcode: String
  }

  # Customer input for mutations
  input CustomerInput {
    email: String
    forename: String
    surname: String
    contact_number: String
    postcode: String
  }

  type Query {
    products: [Product],
    product(vin: ID!): Product
    customers: [Customer],
    customer(surname: String!): Customer
  }

  type Mutation {
    # This mutation takes a Product and
    # responds with the new Product entry
    addProduct(product: ProductInput!): Product
    # This mutation takes a Customer and
    # responds with the new Customer entry
    addCustomer(customer: CustomerInput!): Customer
  }
`;

export default typeDefs;
