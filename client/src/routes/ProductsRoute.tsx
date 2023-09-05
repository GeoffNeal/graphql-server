import { useQuery, gql } from "@apollo/client";
import { styled } from "styled-components";

// Components
import Display, { DisplayItem } from "../components/Display";

// Graphql
import { getProductsQuery } from "../graphql/queries";

const Name = styled.p`
  width: 100%;
  text-align: center;
`;

export default function ProductsRoute() {
  const { data, loading } = useQuery(getProductsQuery);

  if (loading) return <h3>Loading...</h3>;

  return (
    <Display>
      {data.products.map((product) => (
        <DisplayItem
          key={product.vin}
          imgSrc={"https://picsum.photos/id/111/250/200?greyscale"}
        >
          <Name>
            {product.make} {product.model}
          </Name>
        </DisplayItem>
      ))}
    </Display>
  );
}
