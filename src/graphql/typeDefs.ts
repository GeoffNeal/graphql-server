const typeDefs = `#graphql
  # The types of car available
  type Product {
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

  type Query {
    products: [Product],
    product(vin: ID!): Product
    customers: [Customer],
    customer(surname: String!): Customer
  }
`;

export default typeDefs;
