import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

const query = gql`
  {
    products {
      vin
      make
      model
      colour
      price
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
  background: url("https://picsum.photos/id/111/250/200?greyscale") center
    center / cover;
`;

const ProductDetails = styled.div`
  display: flex;
  padding: 1rem;
  background-color: #f7f7f7;
`;

const Product = ({ product }) => {
  return (
    <>
      <Image />
      <ProductDetails>
        <p>{product.make}</p>
        <p>{product.model}</p>
        <p>{product.colour}</p>
        <p>{product.price}</p>
      </ProductDetails>
    </>
  );
};

export default function ProductsRoute() {
  const { data, loading } = useQuery(query);

  console.log("DATA: ", loading, data);

  if (loading) return <h3>Loading...</h3>;

  return (
    <List>
      {data.products.map((product) => (
        <Item key={product.vin}>
          <Product product={product} />
        </Item>
      ))}
    </List>
  );
}
