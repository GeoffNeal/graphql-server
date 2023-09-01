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
    customers: [Customer],
  }
`;

export default typeDefs;
