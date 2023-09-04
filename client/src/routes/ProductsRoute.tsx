import { useQuery, gql } from "@apollo/client";

// Components
import Display, { DisplayItem } from "../components/Display.js";

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

export default function ProductsRoute() {
  const { data, loading } = useQuery(query);

  if (loading) return <h3>Loading...</h3>;

  return (
    <Display>
      {data.products.map((product) => (
        <DisplayItem
          key={product.vin}
          imgSrc={"https://picsum.photos/id/111/250/200?greyscale"}
        >
          <p>{product.make}</p>
          <p>{product.model}</p>
          <p>{product.colour}</p>
          <p>{product.price}</p>
        </DisplayItem>
      ))}
    </Display>
  );
}
