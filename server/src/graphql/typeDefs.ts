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
    # responds with a message
    addProduct(product: ProductInput!): String

    # This mutation takes a Customer and
    # responds with a message
    addCustomer(customer: CustomerInput!): String
  }
`;

export default typeDefs;
