import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

const query = gql`
  {
    customers {
      forename
      surname
      email
      contact_number
    }
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Item = styled.li`
  margin: 1rem;
  width: calc(100% / 3 - 2rem);
`;

const Image = styled.div`
  width: 100%;
  height: 200px;
  background: url("https://picsum.photos/id/64/250/200?greyscale") center center /
    cover;
`;

const ProductDetails = styled.div`
  display: flex;
  padding: 1rem;
  background-color: #f7f7f7;
`;

const Product = ({ customer }) => {
  return (
    <>
      <Image />
      <ProductDetails>
        <p>{customer.forename}</p>
        <p>{customer.surname}</p>
        <p>{customer.email}</p>
        <p>{customer.contact_number}</p>
      </ProductDetails>
    </>
  );
};

export default function CustomersRoute() {
  const { data, loading } = useQuery(query);

  console.log("DATA: ", loading, data);

  if (loading) return <h3>Loading...</h3>;

  return (
    <List>
      {data.customers.map((customer) => (
        <Item key={customer.email}>
          <Product customer={customer} />
        </Item>
      ))}
    </List>
  );
}
