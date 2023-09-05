import { gql } from "@apollo/client";

export const getProductsQuery = gql`
  query GetProducts {
    products {
      vin
      make
      model
    }
  }
`;

export const getCustomersQuery = gql`
  query GetCustomers {
    customers {
      forename
      surname
    }
  }
`;
