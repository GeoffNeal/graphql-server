import { gql } from "@apollo/client";

/**
 * Mutation to create a new product
 */
export const createProductMutation = gql`
  mutation CreateProduct($product: ProductInput!) {
    addProduct(product: $product)
  }
`;

/**
 * Mutation to create a new customer
 */
export const createCustomerMutation = gql`
  mutation CreateCustomer($customer: CustomerInput!) {
    addCustomer(customer: $customer)
  }
`;
